import { initUser } from './support/user/initdata'
import { initPhoto, initPhotoTestQuery, initPhotoIndex } from './support/photo/initdata'
import {initUserTestQuery, initUserIndex} from './support/user/initdata'

export const initData = async () => {
  console.log("开始初始化数据...")
  
  console.log("1. 初始化用户数据")
  await initUser()
  
  console.log("2. 初始化用户索引")
  await initUserIndex()

  console.log("2. 初始化照片数据")
  await initPhoto()

  console.log("3. 初始化照片索引")
  await initPhotoIndex()
  
  console.log("3. 测试用户查询功能")
  await initUserTestQuery()
  
  console.log("4. 测试照片查询功能")
  await initPhotoTestQuery()
  
  console.log("数据初始化完成！")
}