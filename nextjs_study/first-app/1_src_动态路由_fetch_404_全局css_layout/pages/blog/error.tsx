'use client'

import { useEffect } from 'react'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('博客错误:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">博客页面出错了！</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            重试
          </button>
          <a
            href="/blog"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            返回博客列表
          </a>
        </div>
      </div>
    </div>
  )
} 