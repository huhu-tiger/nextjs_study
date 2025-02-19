import { initializeServer } from '@/lib/init'

export async function register() {
  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      console.log('=== Server Initialization Start ===')
      await initializeServer()
      console.log('=== Server Initialization Complete ===')
    }
  } catch (error) {
    console.error('=== Server Initialization Failed ===', error)
    // 不要让初始化错误影响应用启动
  }
} 