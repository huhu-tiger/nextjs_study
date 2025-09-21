import { MongoPhoto, createIndexes } from './schema'
import { MongoUser } from '../user/schema'
import type { PhotoSchema } from './type'
import {
  checkIndexExists,
  getAllIndexes,
  printIndexInfo,
  createIndexIfNotExists
} from '../../common/mongo/index-utils'
import {
  getPhotosWithUsers,
  searchPhotosByDesc,
  getUserPhotoStatistics,
  getPopularPhotos,
  getRecentPhotos
} from './queries'

export const initPhoto = async () => {
  // 打印索引信息
  await printIndexInfo(MongoPhoto, '照片')



  // 删除30天内的照片数据
  const deletedPhotos = await MongoPhoto.deleteMany({ updatedAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } })
  console.log(`成功删除 ${deletedPhotos.deletedCount} 个照片数据`)

  // 检查是否已有照片数据
  const existingPhotos = await MongoPhoto.countDocuments()
  console.log(`当前照片数据量:`, existingPhotos)

  if (existingPhotos === 0) {
    console.log('开始初始化照片数据...')

    // 首先获取一些用户ID来关联照片
    const users = await MongoUser.find({}).limit(5)
    if (users.length === 0) {
      console.log('没有找到用户数据，请先初始化用户数据')
      return
    }

    const initialPhotos: Partial<PhotoSchema>[] = [
      {
        desc: '美丽的日出风景',
        views: 156,
        delete: false,
        date: new Date('2024-01-15'),
        userId: users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '城市夜景',
        views: 89,
        delete: false,
        date: new Date('2024-01-14'),
        userId: users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '海边日落',
        views: 234,
        delete: false,
        date: new Date('2024-01-13'),
        userId: users[1] ? users[1]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '山间小径',
        views: 67,
        delete: false,
        date: new Date('2024-01-12'),
        userId: users[1] ? users[1]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '花朵特写',
        views: 123,
        delete: false,
        date: new Date('2024-01-11'),
        userId: users[2] ? users[2]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '雪景',
        views: 198,
        delete: false,
        date: new Date('2024-01-10'),
        userId: users[2] ? users[2]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '森林深处',
        views: 45,
        delete: false,
        date: new Date('2024-01-09'),
        userId: users[3] ? users[3]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '湖光山色',
        views: 167,
        delete: false,
        date: new Date('2024-01-08'),
        userId: users[3] ? users[3]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '星空银河',
        views: 312,
        delete: false,
        date: new Date('2024-01-07'),
        userId: users[4] ? users[4]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      },
      {
        desc: '古建筑',
        views: 78,
        delete: false,
        date: new Date('2024-01-06'),
        userId: users[4] ? users[4]._id.toString() : users[0]._id.toString(),
        thumbnailUrl: `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`,
      }
    ]

    try {
      const insertedPhotos = await MongoPhoto.insertMany(initialPhotos)
      console.log(`成功插入 ${insertedPhotos.length} 个照片数据`)

      // 输出插入的照片信息
      insertedPhotos.forEach((photo, index) => {
        console.log(`照片 ${index + 1}: ${photo.desc} - 浏览量: ${photo.views}`)
      })

    } catch (error) {
      console.error('插入照片数据失败:', error)
    }
  } else {
    console.log(`数据库中已存在 ${existingPhotos} 个照片，跳过初始化`)
  }
}

export const initPhotoTestQuery = async () => {
  // 测试照片查询功能
  try {
    console.log('\n🔍 测试照片查询功能...')

    // 1. 查询照片（不使用 populate）
    const photos = await MongoPhoto.find({})
    console.log(`✅ 查询到 ${photos.length} 个照片`)
    photos.forEach(photo => {
      console.log(`  - ${photo.desc} - 浏览量: ${photo.views} - userId: ${photo.userId}`)
    })

    // 2. 查询照片并关联用户
    console.log('\n📸 查询照片并关联用户:')
    const photosWithUsers = await MongoPhoto.find({}).populate('associatedUser', 'name email role')
    // console.log(photosWithUsers[0])
    // console.log(photosWithUsers[0].associatedUser)
    // console.log(photosWithUsers[0].toObject())
    // console.log(photosWithUsers[0].toJSON())

    console.log(`✅ 查询到 ${photosWithUsers.length} 个照片（带用户信息）`)
    photosWithUsers.forEach((photo, index) => {
      console.log(`  ${index + 1}. ${photo.desc}`)
      console.log(`     - 浏览量: ${photo.views}`)
      console.log(`     - 日期: ${photo.date}`)
      console.log(`     - 关联用户: ${JSON.stringify(photo.associatedUser, null, 2)}`)
    })

    // 3. 查询特定用户的照片
    if (photosWithUsers.length > 0) {
      const firstPhoto = photosWithUsers[0]
      if (firstPhoto.associatedUser) {
        console.log(`\n👤 查询用户 ${firstPhoto.associatedUser.name} 的所有照片:`)
        const userPhotos = await MongoPhoto.find({ userId: firstPhoto.associatedUser._id })
        console.log(`  该用户有 ${userPhotos.length} 张照片:`)
        userPhotos.forEach((photo, index) => {
          console.log(`    ${index + 1}. ${photo.desc} - 浏览量: ${photo.views}`)
        })
      }
    }

    // 4. 使用新的查询函数统计用户照片
    console.log('\n📊 使用查询函数统计用户照片:')
    const userPhotoStats = await getUserPhotoStatistics()
    userPhotoStats.forEach((stat, index) => {
      console.log(`  ${index + 1}. ${stat.userName} (${stat.userEmail})`)
      console.log(`     - 照片数量: ${stat.totalPhotos}`)
      console.log(`     - 总浏览量: ${stat.totalViews}`)
      console.log(`     - 平均浏览量: ${stat.avgViews}`)
      console.log(`     - 最新照片日期: ${stat.latestPhotoDate}`)
    })

    // 5. 测试热门照片查询
    console.log('\n🔥 热门照片（浏览量前5）:')
    const popularPhotos = await getPopularPhotos({ limit: 5 })
    popularPhotos.photos.forEach((photo, index) => {
      console.log(`  ${index + 1}. ${photo.desc}`)
      console.log(`     - 浏览量: ${photo.views}`)
      console.log(`     - 作者: ${photo.associatedUser?.name}`)
    })

    // 6. 测试最近照片查询
    console.log('\n🕒 最近照片（最近7天）:')
    const recentPhotos = await getRecentPhotos({ limit: 3, days: 7 })
    recentPhotos.photos.forEach((photo, index) => {
      console.log(`  ${index + 1}. ${photo.desc}`)
      console.log(`     - 日期: ${photo.date}`)
      console.log(`     - 作者: ${photo.associatedUser?.name}`)
    })

    // 7. 测试照片描述搜索
    console.log('\n🔍 搜索包含"风景"的照片:')
    const searchResults = await searchPhotosByDesc('风景', { limit: 3 })
    searchResults.photos.forEach((photo, index) => {
      console.log(`  ${index + 1}. ${photo.desc}`)
      console.log(`     - 作者: ${photo.associatedUser?.name}`)
    })

  } catch (error) {
    console.log(`❌ 测试照片查询功能失败: ${error}`)
    throw error
  }
}


export const initPhotoIndex = async () => {
  await createIndexes()
}