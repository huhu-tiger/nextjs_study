import mongoose from 'mongoose'

// 数据库连接类
class Database {
  private static instance: Database
  private retryCount = 0
  private maxRetries = 3
  
  private constructor() {
    // 私有构造函数，防止直接实例化
  }

  // 单例模式获取实例
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // 连接数据库
  async connect(): Promise<typeof mongoose> {
    if (mongoose.connection.readyState === 1) {
      return mongoose
    }

    try {
      const options = {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 5000,
        auth: {
          username: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASS
        },
        authSource: 'admin',
        directConnection: true
      }

      const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`
      console.log('正在连接到:', url)
      console.log('options:', options)
      await mongoose.connect(url, options)
      console.log('数据库连接成功')
      this.retryCount = 0
      return mongoose

    } catch (error) {
      console.error('数据库连接失败:', error)
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        console.log(`重试连接 (${this.retryCount}/${this.maxRetries})...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.connect()
      }
      
      throw error
    }
  }

  // 获取数据库连接
  getConnection() {
    return mongoose.connection
  }
}

export const db = Database.getInstance() 