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
  },
  webpack(config, { isServer, nextRuntime }) {
    Object.assign(config.resolve.alias, {
      '@mongodb-js/zstd': false,
      '@aws-sdk/credential-providers': false,
      snappy: false,
      aws4: false,
      'mongodb-client-encryption': false,
      kerberos: false,
      'supports-color': false,
      'bson-ext': false,
      'pg-native': false
    });

    return config;
  },

};

export default nextConfig;
