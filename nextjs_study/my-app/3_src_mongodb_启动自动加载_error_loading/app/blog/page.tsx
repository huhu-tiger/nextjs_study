import Link from 'next/link'
import { Post } from '@/types/next-dev'

// 获取文章列表
async function getPosts(): Promise<Post[]> {
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
      }),
      // 禁用缓存，确保每次获取最新数据
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const data = await res.json()
    return data.posts || []

  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// 页面组件
export default async function BlogPage() {
  try {
    const posts = await getPosts()
    
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
                  href={`/blog/${post.slug}?page=1&sort=desc&category=tech`}
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
  } catch (error) {
    console.error('Blog page error:', error)
    throw error // 让错误边界处理它
  }
}
