#!/usr/bin/env ts-node

import { initData } from '../packages/service/initdata'
import { connectionMongo, MONGO_URL } from '../packages/service/common/mongo'
import { connectMongo } from '../packages/service/common/mongo/init_conn'

async function main() {
  try {
    console.log('🚀 开始连接数据库...')
    await connectMongo(connectionMongo, MONGO_URL)
    console.log('✅ 数据库连接成功')
    
    console.log('📊 开始初始化数据...')
    await initData()
    
    console.log('🎉 数据初始化完成！')
    process.exit(0)
  } catch (error) {
    console.error('❌ 初始化失败:', error)
    process.exit(1)
  }
}

main()
