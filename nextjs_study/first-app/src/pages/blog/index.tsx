import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/types/next-dev'

// 页面组件
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('http://127.0.0.1:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: 1,
            limit: 10,
            category: 'tech'
          })
        })

        if (!res.ok) {
          throw new Error(`获取文章失败: ${res.status}`)
        }

        const data = await res.json()
        if (!data.posts) {
          throw new Error('返回数据格式错误')
        }
        setPosts(data.posts)
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取文章失败')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, []) // 这里使用空依赖数组 []，表示 useEffect 只在组件首次渲染时执行一次
        // 如果这里写成 [posts]，会导致死循环:
        // 1. useEffect 执行，调用 fetchPosts
        // 2. fetchPosts 成功后调用 setPosts 更新 posts
        // 3. posts 变化触发 useEffect 再次执行
        // 4. 重复步骤 1-3，造成无限循环

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">暂无文章</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <nav className="p-6 bg-white shadow-sm">
        <Link 
          href="/" 
          className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg"
        >
          返回首页
        </Link>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">博客文章</h1>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link 
                href={`/blog/${post.slug}`}
                className="block p-6 hover:bg-gray-50"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600">点击阅读 →</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
