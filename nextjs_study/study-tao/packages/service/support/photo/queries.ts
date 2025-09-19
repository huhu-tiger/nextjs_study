import { MongoPhoto } from './schema'
import { MongoUser } from '../user/schema'
import type { PhotoSchema } from './type'

/**
 * 查询所有照片并关联用户信息
 * @param options 查询选项
 * @returns 照片列表（带用户信息）
 */
export const getPhotosWithUsers = async (options: {
  limit?: number
  skip?: number
  sort?: { [key: string]: 1 | -1 }
  userId?: string
} = {}) => {
  const {
    limit = 10,
    skip = 0,
    sort = { date: -1 },
    userId
  } = options

  const query: any = {}
  
  // 如果指定了用户ID，只查询该用户的照片
  if (userId) {
    query.userId = userId
  }

  try {
    const photos = await MongoPhoto.find(query)
      .populate('associatedUser', 'name email role avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await MongoPhoto.countDocuments(query)

    return {
      photos,
      total,
      hasMore: skip + photos.length < total
    }
  } catch (error) {
    console.error('查询照片关联用户失败:', error)
    throw error
  }
}

/**
 * 根据照片描述模糊查询并关联用户
 * @param descPattern 描述模式
 * @param options 查询选项
 * @returns 照片列表（带用户信息）
 */
export const searchPhotosByDesc = async (
  descPattern: string,
  options: {
    limit?: number
    skip?: number
    caseSensitive?: boolean
    userId?: string
  } = {}
) => {
  const {
    limit = 10,
    skip = 0,
    caseSensitive = false,
    userId
  } = options

  const query: any = {
    desc: {
      $regex: descPattern,
      $options: caseSensitive ? '' : 'i'
    }
  }

  // 如果指定了用户ID，只查询该用户的照片
  if (userId) {
    query.userId = userId
  }

  try {
    const photos = await MongoPhoto.find(query)
      .populate('associatedUser', 'name email role')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)

    const total = await MongoPhoto.countDocuments(query)

    return {
      photos,
      total,
      hasMore: skip + photos.length < total
    }
  } catch (error) {
    console.error('根据描述模糊查询照片失败:', error)
    throw error
  }
}

/**
 * 获取用户照片统计信息
 * @param userId 用户ID（可选，不传则统计所有用户）
 * @returns 统计信息
 */
export const getUserPhotoStatistics = async (userId?: string) => {
  try {
    const matchStage = userId ? { userId } : {}
    
    const stats = await MongoPhoto.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$userId',
          totalPhotos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          avgViews: { $avg: '$views' },
          latestPhotoDate: { $max: '$date' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userId: '$_id',
          userName: '$user.name',
          userEmail: '$user.email',
          userRole: '$user.role',
          totalPhotos: 1,
          totalViews: 1,
          avgViews: { $round: ['$avgViews', 2] },
          latestPhotoDate: 1
        }
      },
      {
        $sort: { totalPhotos: -1 }
      }
    ])

    return stats
  } catch (error) {
    console.error('获取用户照片统计信息失败:', error)
    throw error
  }
}

/**
 * 获取热门照片（按浏览量排序）
 * @param options 查询选项
 * @returns 热门照片列表
 */
export const getPopularPhotos = async (options: {
  limit?: number
  skip?: number
  minViews?: number
} = {}) => {
  const {
    limit = 10,
    skip = 0,
    minViews = 0
  } = options

  const query: any = {
    views: { $gte: minViews }
  }

  try {
    const photos = await MongoPhoto.find(query)
      .populate('associatedUser', 'name email avatar')
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit)

    const total = await MongoPhoto.countDocuments(query)

    return {
      photos,
      total,
      hasMore: skip + photos.length < total
    }
  } catch (error) {
    console.error('获取热门照片失败:', error)
    throw error
  }
}

/**
 * 获取最近的照片
 * @param options 查询选项
 * @returns 最近照片列表
 */
export const getRecentPhotos = async (options: {
  limit?: number
  skip?: number
  days?: number
} = {}) => {
  const {
    limit = 10,
    skip = 0,
    days = 30
  } = options

  const query: any = {
    date: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
  }

  try {
    const photos = await MongoPhoto.find(query)
      .populate('associatedUser', 'name email avatar')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)

    const total = await MongoPhoto.countDocuments(query)

    return {
      photos,
      total,
      hasMore: skip + photos.length < total
    }
  } catch (error) {
    console.error('获取最近照片失败:', error)
    throw error
  }
}

/**
 * 批量更新照片的浏览量
 * @param photoIds 照片ID数组
 * @param increment 增量（默认为1）
 * @returns 更新结果
 */
export const batchUpdatePhotoViews = async (photoIds: string[], increment: number = 1) => {
  try {
    const result = await MongoPhoto.updateMany(
      { _id: { $in: photoIds } },
      { 
        $inc: { views: increment },
        $set: { updatedAt: new Date() }
      }
    )

    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged
    }
  } catch (error) {
    console.error('批量更新照片浏览量失败:', error)
    throw error
  }
}
