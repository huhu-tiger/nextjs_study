import { db } from './db'
import { config } from './config'
import { type Login } from '@/types/next-dev'
// 服务器初始化函数
export async function initializeServer() {
  // 确保只在服务器端运行
  if (typeof window !== 'undefined') {
    console.warn('initializeServer 应该只在服务器端运行')
    return
  }

  try {
    // 1. 加载配置
    console.log('环境:', config.get('environment'))
    console.log('API版本:', config.get('apiVersion'))

    // 2. 连接数据库
    await db.connect()

    // 3. 其他初始化操作
    // 例如: 缓存预热、定时任务设置等
    const login:Login = {login: 'admin', password: '123456'}
    await db.writeLogin(login)
    console.log('服务器初始化完成')

  } catch (error) {
    console.error('服务器初始化失败:', error)
    // process.exit(1)
  }
} 