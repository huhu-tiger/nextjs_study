import { NextApiRequest, NextApiResponse } from 'next';
import { MongoUser } from "@backend/service/support/user/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `方法 ${method} 不被允许` });
    }
  } catch (error) {
    console.error('API错误:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}

// 查询用户列表
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { 
    page = '1', 
    limit = '100', 
    search = '',
    hasName = ''
  } = req.query;

  try {
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // 构建查询条件
    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (hasName === 'true') {
      query.$and = [
        { name: { $exists: true } },
        { name: { $ne: null } },
        { name: { $ne: '' } }
      ];
    }

    // 查询用户
    const users = await MongoUser.find(query)
      .select('_id name email role avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await MongoUser.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: {
        users,
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
    console.error('查询用户失败:', error);
    return res.status(500).json({ error: '查询用户失败' });
  }
}
