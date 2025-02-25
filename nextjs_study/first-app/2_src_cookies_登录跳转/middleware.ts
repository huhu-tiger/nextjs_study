import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 详细的调试日志
  console.log('\n=== Middleware Executed begin ===')
  console.log('Method:', request.method)
  console.log('URL:', request.url)
  console.log('Pathname:', request.nextUrl.pathname)
  console.log('Search Params:', request.nextUrl.searchParams.toString())
  console.log('Headers:', Object.fromEntries(request.headers))
  console.log('\n=== Middleware Executed end ===')
  const response = NextResponse.next()
  
  // 添加响应头
  response.headers.set('x-middleware-cache', 'no-cache')
  response.headers.set('x-middleware-timestamp', Date.now().toString())
  response.headers.set('x-blog-custom-header', 'blog-middleware-applied')
  response.headers.set('x-access-time', new Date().toISOString())

  // 设置 CORS 头，允许所有来源
  response.headers.set('Access-Control-Allow-Origin', '*'); // 或者设置为特定的域名，如 'https://example.com'
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 设置允许的 HTTP 方法
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 设置允许的请求头

  return response
}

// 配置匹配路径
export const config = {
  matcher: [
    // 匹配所有 /api 路径
    '/api/:path*'
  ]
} 