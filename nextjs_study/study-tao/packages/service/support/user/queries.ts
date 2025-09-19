import { MongoUser } from './schema'
import type { UserSchema } from './type'
import { type PhotoSchema } from '../photo/type'

/**
 * 查询name不为空的用户
 * @param options 查询选项
 * @returns 用户列表
 */
export const getUsersWithName = async (options: {
  limit?: number
  skip?: number
  sort?: { [key: string]: 1 | -1 }
  status?: string
  role?: string,
  populate?: any
} = {}) => {
  const {
    limit = 10,
    skip = 0,
    sort = { name: 1 },
    status,
    role,
    populate
  } = options

  const query: any = {
    $and: [
      { name: { $exists: true } },
      {
        $or: [
          { name: { $ne: null } },
          { name: { $ne: '' } }
        ]
      },
    ]
  }

  // 添加状态筛选
  if (status) {
    query.status = status
  }

  // 添加角色筛选
  if (role) {
    query.role = role
  }
  

  try {
    let queryBuilder = MongoUser.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      // .populate('associatedPhotos', 'desc views')
      .populate<{ associatedPhotos: PhotoSchema }>('associatedPhotos', 'desc views')
      .lean();

    const users = await queryBuilder
    const total = await MongoUser.countDocuments(query)

    return {
      users,
      total,
      hasMore: skip + users.length < total
    }
  } catch (error) {
    console.error('查询name不为空的用户失败:', error)
    throw error
  }
}

/**
 * 查询name为空的用户
 * @param options 查询选项
 * @returns 用户列表
 */
export const getUsersWithoutName = async (options: {
  limit?: number
  skip?: number
  sort?: { [key: string]: 1 | -1 }
} = {}) => {
  const {
    limit = 10,
    skip = 0,
    sort = { createdAt: -1 },
  } = options

  const query = {
    $or: [
      { name: { $exists: false } },
      { name: null },
      { name: '' }
    ]
  }

  try {
    let queryBuilder = MongoUser.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    const users = await queryBuilder
    const total = await MongoUser.countDocuments(query)

    return {
      users,
      total,
      hasMore: skip + users.length < total
    }
  } catch (error) {
    console.error('查询name为空的用户失败:', error)
    throw error
  }
}

/**
 * 根据name模糊查询用户
 * @param namePattern 姓名模式
 * @param options 查询选项
 * @returns 用户列表
 */
export const searchUsersByName = async (
  namePattern: string,
  options: {
    limit?: number
    skip?: number
    caseSensitive?: boolean
    status?: string
    role?: string
  } = {}
) => {
  const {
    limit = 10,
    skip = 0,
    caseSensitive = false,
    status,
    role
  } = options

  const query: any = {
    $and: [
      { name: { $exists: true } },
      { name: { $ne: null } },
      { name: { $ne: '' } },
      { name: { $regex: namePattern, $options: caseSensitive ? '' : 'i' } }
    ]
  }

  // 添加状态筛选
  if (status) {
    query.status = status
  }

  // 添加角色筛选
  if (role) {
    query.role = role
  }

  try {
    let queryBuilder = MongoUser.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean()


    const users = await queryBuilder
    const total = await MongoUser.countDocuments(query)

    return {
      users,
      total,
      hasMore: skip + users.length < total
    }
  } catch (error) {
    console.error('根据name模糊查询用户失败:', error)
    throw error
  }
}

/**
 * 获取用户name统计信息
 * @returns 统计信息
 */
export const getNameStatistics = async () => {
  try {
    const totalUsers = await MongoUser.countDocuments()
    const usersWithName = await MongoUser.countDocuments({
      $and: [
        { name: { $exists: true } },
        { name: { $ne: null } },
        { name: { $ne: '' } }
      ]
    })
    const usersWithoutName = totalUsers - usersWithName

    // 获取最常见的name（前10个）
    const commonNames = await MongoUser.aggregate([
      {
        $match: {
          $and: [
            { name: { $exists: true } },
            { name: { $ne: null } },
            { name: { $ne: '' } }
          ]
        }
      },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ])

    return {
      totalUsers,
      usersWithName,
      usersWithoutName,
      nameCompletionRate: totalUsers > 0 ? (usersWithName / totalUsers * 100).toFixed(2) : '0.00',
      commonNames
    }
  } catch (error) {
    console.error('获取name统计信息失败:', error)
    throw error
  }
}

/**
 * 批量更新用户的name字段
 * @param userIds 用户ID数组
 * @param name 新的name值
 * @returns 更新结果
 */
export const batchUpdateUserNames = async (userIds: string[], name: string) => {
  try {
    const result = await MongoUser.updateMany(
      { _id: { $in: userIds } },
      {
        $set: {
          name: name.trim(),
          updatedAt: new Date()
        }
      }
    )

    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged
    }
  } catch (error) {
    console.error('批量更新用户name失败:', error)
    throw error
  }
}
