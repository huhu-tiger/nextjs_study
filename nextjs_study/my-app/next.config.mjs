/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用详细的服务器日志
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // 添加错误处理
  onError: (err) => {
    console.error('Next.js Global Error:', err)
  },
  // 更新中间件配置
  experimental: {
    logging: {
      level: 'verbose'
    },
    instrumentationHook: true,
    serverActions: true
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
      'pg-native': false,
      net: false,
      tls: false,
      fs: false,
      crypto: false,
      'mongodb-client-encryption': false,
      socks: false,  // 禁用 socks 模块
      'gcp-metadata': false,  // 禁用 gcp-metadata 模块
    });

    return config;
  },

};

export default nextConfig;
