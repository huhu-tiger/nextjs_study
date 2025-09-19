import { MongoUser } from './schema'
import type { UserSchema } from './type'
import { 
  checkIndexExists, 
  getAllIndexes, 
  printIndexInfo,
  createIndexIfNotExists 
} from '../../common/mongo/index-utils'
import { 
  getUsersWithName, 
  getUsersWithoutName, 
  searchUsersByName, 
  getNameStatistics 
} from './queries'

export const initUser = async () => {
  // 打印索引信息
  await printIndexInfo(MongoUser, '用户')
  

  const deletedUsers = await MongoUser.deleteMany({updatedAt:{$gt:new Date(Date.now()-1000*60*60*24*30)}})
  console.log(`成功删除 ${deletedUsers.deletedCount} 个用户数据`)
  // 检查是否已有用户数据
  const existingUsers = await MongoUser.countDocuments()
  console.log(`当前user数据量:`,existingUsers)
  
  if (existingUsers === 0) {
    console.log('开始初始化用户数据...')
    
    const initialUsers: Partial<UserSchema>[] = [
      {
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://via.placeholder.com/100x100/0066cc/ffffff?text=张',
        role: 'admin',
        status: 'active',
        stats: {
          totalPhotos: 15,
          totalViews: 1250,
          lastPhotoDate: new Date('2024-01-15')
        }
      },
      {
        name: '李四',
        email: 'lisi@example.com',
        avatar: 'https://via.placeholder.com/100x100/00cc66/ffffff?text=李',
        role: 'user',
        status: 'active',
        stats: {
          totalPhotos: 8,
          totalViews: 680,
          lastPhotoDate: new Date('2024-01-10')
        }
      },
      {
        name: '王五',
        email: 'wangwu@example.com',
        avatar: 'https://via.placeholder.com/100x100/cc6600/ffffff?text=王',
        role: 'user',
        status: 'active',
        stats: {
          totalPhotos: 12,
          totalViews: 920,
          lastPhotoDate: new Date('2024-01-12')
        }
      },
      {
        name: '赵六',
        email: 'zhaoliu@example.com',
        avatar: 'https://via.placeholder.com/100x100/cc0066/ffffff?text=赵',
        role: 'user',
        status: 'inactive',
        stats: {
          totalPhotos: 3,
          totalViews: 150,
          lastPhotoDate: new Date('2023-12-20')
        }
      },
      {
        name: '孙七',
        email: 'sunqi@example.com',
        avatar: 'https://via.placeholder.com/100x100/6600cc/ffffff?text=孙',
        role: 'guest',
        status: 'active',
        stats: {
          totalPhotos: 0,
          totalViews: 0
        }
      }
    ]
    
    try {
      const insertedUsers = await MongoUser.insertMany(initialUsers)
      console.log(`成功插入 ${insertedUsers.length} 个用户数据`)
      
      // 输出插入的用户信息
      insertedUsers.forEach((user, index) => {
        console.log(`用户 ${index + 1}: ${user.name} (${user.email}) - ${user.role}`)
      })
      
    } catch (error) {
      console.error('插入用户数据失败:', error)
    }
  } else {
    console.log(`数据库中已存在 ${existingUsers} 个用户，跳过初始化`)
  }
}


export const initUserTestQuery = async () => {
    // 测试name查询功能
    try {
      console.log('\n🔍 测试name查询功能...')

      
      // 2. 查询name为空的用户
      const usersWithoutName = await getUsersWithoutName({ limit: 5 })
      console.log(`✅ 查询到 ${usersWithoutName.total} 个name为空的用户`)
      
      // 3. 根据name模糊查询
      const searchResults = await searchUsersByName('张', { limit: 3 })
      console.log(`✅ 模糊查询"张"找到 ${searchResults.total} 个用户`)
      searchResults.users.forEach(user => {
        console.log(`  - ${user.name} (${user.email})`)
      })
      
      // 4. 获取name统计信息
      const nameStats = await getNameStatistics()
      console.log(`✅ Name统计信息:`)
      console.log(`  - 总用户数: ${nameStats.totalUsers}`)
      console.log(`  - 有name的用户: ${nameStats.usersWithName}`)
      console.log(`  - 无name的用户: ${nameStats.usersWithoutName}`)
      console.log(`  - name完成率: ${nameStats.nameCompletionRate}%`)
      
      if (nameStats.commonNames.length > 0) {
        console.log(`  - 常见name:`)
        nameStats.commonNames.forEach((item, index) => {
          console.log(`    ${index + 1}. ${item._id} (${item.count}次)`)
        })
      }


            
      // 5. 查询name不为空的用户
      const usersWithName = await getUsersWithName({ limit: 5 })
      console.log(`✅ 查询到 ${usersWithName.total} 个name不为空的用户`)
      usersWithName.users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - ${user.role}`)
        console.log(`  - 用户关联的照片: ${JSON.stringify(user.associatedPhotos, null, 2)}`)
      })
      
    } catch (error) {
      console.log(`❌ 测试name查询功能失败: ${error}`)
    }
}