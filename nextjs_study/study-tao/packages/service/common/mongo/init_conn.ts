import { delay } from '@backend/service/system/utils';
import type { Mongoose } from 'mongoose';

// 简单的延迟函数
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const maxConnecting = Math.max(30, Number(process.env.DB_MAX_LINK || 20));

/**
 * connect MongoDB and init data
 */
export async function connectMongo(db: Mongoose, url: string): Promise<Mongoose> {
  /* Connecting, connected will return */
  if (db.connection.readyState !== 0) {
    return db;
  }

  console.log('MongoDB start connect');
  try {
    // Remove existing listeners to prevent duplicates
    db.connection.removeAllListeners('error');
    db.connection.removeAllListeners('disconnected');
    db.set('strictQuery', 'throw');

    db.connection.on('error', async (error) => {
      console.log('mongo error', error);
      try {
        if (db.connection.readyState !== 0) {
          await db.disconnect();
          await delay(1000);
          await connectMongo(db, url);
        }
      } catch (error) {}
    });
    db.connection.on('disconnected', () => {
      console.log('mongo disconnected');
      // 不立即重连，让连接池自然管理
    });

    const options = {
      bufferCommands: true,
      maxConnecting: maxConnecting,
      maxPoolSize: maxConnecting,
      minPoolSize: 5, // 减少最小连接数
      connectTimeoutMS: 60000,
      waitQueueTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      maxIdleTimeMS: 600000, // 增加空闲时间到10分钟
      retryWrites: true,
      retryReads: true,
      serverSelectionTimeoutMS: 5000, // 服务器选择超时
      heartbeatFrequencyMS: 10000 // 心跳频率
    };

    db.connect(url, options);

    console.log('mongo connected');
    return db;
  } catch (error) {
    console.error('Mongo connect error', error);

    await db.disconnect();

    await delay(1000);
    return connectMongo(db, url);
  }
}
