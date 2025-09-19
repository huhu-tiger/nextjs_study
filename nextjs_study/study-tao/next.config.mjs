import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  output: 'standalone',
  reactStrictMode: isDev ? false : true,
  compress: true,
  typescript: {
    // 忽略TypeScript错误，让构建继续进行
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, './packages'),
    };
    
    // 确保服务器端也能正确解析别名
    if (isServer) {
      config.externals = [...(config.externals || []), 'mongoose'];
    }
    
    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/((?!chat/share$).*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY'
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block'
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin'
  //         },
  //         {
  //           key: 'Permissions-Policy',
  //           value: 'geolocation=(self), microphone=(self), camera=(self)'
  //         }
  //       ],
  //     }
  //   ];
  // }
    experimental: {
    // 优化 Server Components 的构建和运行，避免不必要的客户端打包。
    serverComponentsExternalPackages: [
      'mongoose',
      'pg',
      'bullmq',
      '@zilliz/milvus2-sdk-node',
      'tiktoken'
    ],
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    instrumentationHook: true
  }
};

export default nextConfig;