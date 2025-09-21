import { NextApiRequest, NextApiResponse } from 'next';
import { PhotoSchema } from "@backend/service/support/photo/type";
import { MongoPhoto } from "@backend/service/support/photo/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  try {
    
    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `方法 ${method} 不被允许` });
    }
  } catch (error) {
    console.error('API错误:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}

// 查询照片
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { 
    page = '1', 
    limit = '10', 
    search = '', 
    userId = '',
    sortBy = 'date',
    sortOrder = 'desc'
  } = req.query;

  try {
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // 构建查询条件
    const query: any = {};
    
    if (search) {
      query.desc = { $regex: search, $options: 'i' };
    }
    
    if (userId) {
      query.userId = userId;
    }

    // 构建排序条件
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    // 查询照片并关联用户信息
    const photos: PhotoSchema[] | undefined = await MongoPhoto.find(query)
        .populate('associatedUser', 'name email role')
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

    const total = await MongoPhoto.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: {
        photos: photos, // 使用 toObject() 确保包含虚拟字段
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
          hasNext: pageNum * limitNum < total,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('查询照片失败:', error);
    return res.status(500).json({ error: '查询照片失败' });
  }
}

// 创建照片
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { desc, userId, views = 0, date } = req.body;

  // 验证必填字段
  if (!desc || !userId) {
    return res.status(400).json({ 
      error: '缺少必填字段: desc 和 userId' 
    });
  }

  try {
    const photoData: Partial<PhotoSchema> = {
      desc: desc.trim(),
      userId,
      views: parseInt(views) || 0,
      delete: false,
      date: date ? new Date(date) : new Date()
    };

    const newPhoto = new MongoPhoto(photoData);
    const savedPhoto = await newPhoto.save();

    // 返回创建的照片并关联用户信息
    const photoWithUser = await MongoPhoto.findById(savedPhoto._id)
      .populate('associatedUser', 'name email role avatar');

    return res.status(201).json({
      success: true,
      data: photoWithUser,
      message: '照片创建成功'
    });
  } catch (error) {
    console.error('创建照片失败:', error);
    return res.status(500).json({ error: '创建照片失败' });
  }
}

// 更新照片
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { desc, views, date, delete: deleteFlag } = req.body;

  if (!id) {
    return res.status(400).json({ error: '缺少照片ID' });
  }

  try {
    // 构建更新数据
    const updateData: any = {
      updatedAt: new Date()
    };

    if (desc !== undefined) updateData.desc = desc.trim();
    if (views !== undefined) updateData.views = parseInt(views);
    if (date !== undefined) updateData.date = new Date(date);
    if (deleteFlag !== undefined) updateData.delete = Boolean(deleteFlag);

    const updatedPhoto = await MongoPhoto.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('associatedUser', 'name email role avatar');

    if (!updatedPhoto) {
      return res.status(404).json({ error: '照片不存在' });
    }

    return res.status(200).json({
      success: true,
      data: updatedPhoto,
      message: '照片更新成功'
    });
  } catch (error) {
    console.error('更新照片失败:', error);
    return res.status(500).json({ error: '更新照片失败' });
  }
}

// 删除照片
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { permanent = false } = req.body;

  if (!id) {
    return res.status(400).json({ error: '缺少照片ID' });
  }

  try {
    if (permanent) {
      // 永久删除
      const deletedPhoto = await MongoPhoto.findByIdAndDelete(id);
      if (!deletedPhoto) {
        return res.status(404).json({ error: '照片不存在' });
      }
      return res.status(200).json({
        success: true,
        message: '照片已永久删除'
      });
    } else {
      // 软删除（标记为删除）
      const updatedPhoto = await MongoPhoto.findByIdAndUpdate(
        id,
        { $set: { delete: true, updatedAt: new Date() } },
        { new: true }
      );
      
      if (!updatedPhoto) {
        return res.status(404).json({ error: '照片不存在' });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedPhoto,
        message: '照片已标记为删除'
      });
    }
  } catch (error) {
    console.error('删除照片失败:', error);
    return res.status(500).json({ error: '删除照片失败' });
  }
}