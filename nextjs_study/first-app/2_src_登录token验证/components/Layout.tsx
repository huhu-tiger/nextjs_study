import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1>我的博客 全局layout</h1>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <p>© 2024 我的博客</p>
      </footer>
    </div>
  )
} 