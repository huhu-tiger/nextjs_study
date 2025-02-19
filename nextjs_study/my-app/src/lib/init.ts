import { db } from './db'
import { config } from './config'

// 服务器初始化函数
export async function initializeServer() {
  try {
    // 1. 加载配置
    console.log('环境:', config.get('environment'))
    console.log('API版本:', config.get('apiVersion'))

    // 2. 连接数据库
    await db.connect()

    // 3. 其他初始化操作
    // 例如: 缓存预热、定时任务设置等
    
    console.log('服务器初始化完成')

  } catch (error) {
    console.error('服务器初始化失败:', error)
    process.exit(1)
  }
} 