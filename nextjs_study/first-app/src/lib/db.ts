import mongoose from 'mongoose'
import { Login } from '../types/next-dev'
import { Connection } from 'mongoose'
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
  // 切换数据库
  async useDb(dbName: string) :Promise<Connection>{
    return await mongoose.connection.useDb(dbName)
  }
  // 断开数据库连接
  async disconnect(force: boolean = false,con:Connection) {
    await con.close(force)
  }

  // 写入登录数据
  async writeLogin(data: Login): Promise<mongoose.Document | null> {
    try {
      console.log(`process.env.MONGODB_DB:${process.env.MONGODB_DB}`)
      let con=await this.useDb(process.env.MONGODB_DB || 'mydatabase')
      let  result = await this.readLogin(data,con)
      if (result.length > 0) {
        console.log('登录数据已存在')
        return result[0]
      }
      const LoginModel = con.model(process.env.LOGIN_COLLECTION || 'logins', new mongoose.Schema({}, { strict: false }))
      const writeResult = await LoginModel.create(data)
      return writeResult
    } catch (error) {
      console.error('写入登录数据失败:', error)
      return null
    }
  }
  async readLogin(data: Login,con?:Connection): Promise<mongoose.Document[]> {
    if (!con) {
      con = await this.useDb(process.env.MONGODB_DB || 'mydatabase')
    }
    const LoginModel = con.model(process.env.LOGIN_COLLECTION || 'logins', new mongoose.Schema({}, { strict: false }))
    const result = await LoginModel.find(data)
    return result
  }

  // 获取数据库连接
  getConnection() {
    return mongoose.connection
  }
}

export const db = Database.getInstance() 