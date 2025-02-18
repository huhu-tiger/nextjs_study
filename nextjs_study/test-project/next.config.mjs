/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用详细的服务器日志
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  
  // 更新中间件配置
  experimental: {
    logging: {
      level: 'verbose'
    },
    instrumentationHook: true
  }
};

export default nextConfig;
