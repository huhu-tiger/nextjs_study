import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 允许外部访问
    port: 5173,
    proxy: {
      // 代理所有 /api 请求到后端服务器
      '/api': {
        target: 'http://localhost:3001', // 统一的后端API地址
        changeOrigin: true,
        secure: false,
        // 可选：重写路径
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
