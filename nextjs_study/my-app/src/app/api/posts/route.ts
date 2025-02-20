import { NextResponse } from 'next/server'
import type { Post } from '@/types/next-dev'

export async function POST(request: Request) {
  try {
    // 解析请求体中的 JSON 数据
    const body = await request.json()
    console.log('Received POST request with body:', body)

    // 模拟数据
    const posts: Post[] = [
      { id: 1, title: '第一篇文章', slug: 'first-post' },
      { id: 2, title: '第二篇文章', slug: 'second-post' },
      { id: 3, title: '第三篇文章', slug: 'third-post' },
    ]

    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 返回组合的数据
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: '请求处理失败' },
      { status: 400 }
    )
  }
} 