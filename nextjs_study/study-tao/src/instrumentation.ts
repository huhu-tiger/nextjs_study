import { exit } from 'process';

/*
  Init system
*/


export async function register() {
  console.log('🚀 Instrumentation register function called');
  console.log('🔍 Environment check:', {
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PHASE: process.env.NEXT_PHASE
  });
  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      console.log('✅ Running in Node.js runtime');
      // 基础系统初始化
      const [
        { connectMongo },
        { connectionMongo, connectionLogMongo, MONGO_URL, MONGO_LOG_URL },
        { initData }
        // { systemStartCb },
        // { initGlobalVariables, getInitConfig, initSystemPluginGroups, initAppTemplateTypes },
        // { initVectorStore },
        // { initRootUser },
        // { startMongoWatch },
        // { startCron },
        // { startTrainingQueue },
        // { preLoadWorker },
        // { loadSystemModels }
      ] = await Promise.all([
        import('../packages/service/common/mongo/init_conn'),
        import('../packages/service/common/mongo/index'),
        import('../packages/service/initdata')
      ]);
      // 执行初始化流程
    //   systemStartCb();
    //   initGlobalVariables();

      // Connect to MongoDB
      await connectMongo(connectionMongo, MONGO_URL);  // 业务数据
      connectMongo(connectionLogMongo, MONGO_LOG_URL); // 日志数据


      initData()
    //   //init system config；init vector database；init root user
    //   await Promise.all([getInitConfig(), initVectorStore(), initRootUser(), loadSystemModels()]);

    //   try {
    //     await preLoadWorker();
    //   } catch (error) {
    //     console.error('Preload worker error', error);
    //   }

    //   // 异步加载
    //   initSystemPluginGroups();
    //   initAppTemplateTypes();
    //   // getSystemPlugins(true);
    //   startMongoWatch();
    //   startCron();
    //   startTrainingQueue(true);

      console.log('✅ Init system success');
    } else {
      console.log('❌ Not running in Node.js runtime, NEXT_RUNTIME:', process.env.NEXT_RUNTIME);
    }
  } catch (error) {
    console.error('❌ Init system error:', error);
    exit(1);
  }
}
