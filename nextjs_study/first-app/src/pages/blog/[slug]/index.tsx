// 导入必要的 React 钩子和 Next.js 功能
import React, { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'

// 定义页面参数类型接口
// params: 包含动态路由参数 (slug)
// searchParams: 包含 URL 查询参数
type Props = {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

type Post = {
  id: number
  title: string
  slug: string
  content: string
}
// 模拟从 API 获取单篇博客文章的异步函数
// @param slug - 文章的唯一标识符
async function getPost(slug: string): Promise<Post | undefined> {
  // 模拟数据库中的文章数据
  // 实际应用中，这里应该是对后端 API 的调用
  const posts = [
    { id: 1, title: 'First Post', slug: 'first-post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', slug: 'second-post', content: 'This is the second post' },
    { id: 3, title: 'Third Post', slug: 'third-post', content: 'This is the third post' },
  ]
  
  // 根据 slug 查找并返回对应的文章
  return posts.find(post => post.slug === slug)
}

// 博客文章页面组件
// 解构 Props 类型的参数:
// params: 包含动态路由参数,如 slug
// searchParams: 包含 URL 查询参数,如 page、sort 等
export default function BlogPost({ params, searchParams }: Props) {
  // 使用 useState 管理文章数据状态
  const [post, setPost] = useState<Post | null>(null)
  // 获取路由参数
  const pathname = usePathname()

  // 使用 useEffect 在组件挂载和 slug 变化时获取文章数据
  useEffect(() => {
    async function fetchData() {
      const fetchedPost = await getPost(params.slug)
      if (fetchedPost) {
        setPost(fetchedPost)
      } else {
        // 如果文章不存在，重定向到 404 页面
        window.location.href = '/not-found'
      }
    }
    fetchData()
  }, [params.slug]) // 依赖项：当 slug 变化时重新获取数据

  // 数据加载时显示加载状态
  if (!post) {
    return <div>Loading...</div>
  }

  // 渲染文章内容
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">{post.content}</p>
          <p className="mt-4 text-sm text-gray-500">当前路径: {pathname}</p>
        </div>
      </main>
    </div>
  )
}
