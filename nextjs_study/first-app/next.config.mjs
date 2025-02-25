/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用详细的服务器日志
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // 更新中间件配置
  transpilePackages: [
    'rc-util',
    'antd',
    '@ant-design',
    'rc-pagination',
    'rc-picker',
    '@babel/runtime',
    'rc-input',
    '@rc-component',
    '@babel/runtime',
    'rc-field-form',
    'rc-textarea',
    'rc-select'
  ],
  experimental: {
    esmExternals: false,
    instrumentationHook: true
  },
  webpack(config, { isServer, nextRuntime }) {
    // 添加对 antd 的特殊处理
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false
      };
    }

    // 修改模块解析配置
    config.resolve = {
      ...config.resolve,
      extensionAlias: {
        '.js': ['.js', '.ts', '.tsx']
      },
      alias: {
        ...config.resolve.alias,
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
        socks: false,
        'gcp-metadata': false,
      }
    };

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
