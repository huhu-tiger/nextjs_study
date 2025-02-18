'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 详细的调试日志
  console.log('\n=== Middleware Executed ===')
  console.log('当前路径是',request.nextUrl.pathname)
  console.log('当前请求是',request.method)
  
  const response = NextResponse.next()
  
  // 添加更多响应头以便于调试
  response.headers.set('x-middleware-cache', 'no-cache')
  response.headers.set('x-middleware-timestamp', Date.now().toString())
  response.headers.set('x-blog-custom-header', 'blog-middleware-applied')
  response.headers.set('x-access-time', new Date().toISOString())
  
  return response
}

// 简化 matcher 配置
export const config = {
  matcher: [
    '/blog/:path*',
    '/api/:path*'
  ]
} 