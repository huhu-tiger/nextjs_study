export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <h1 className="text-2xl font-bold">加载中...</h1>
    </div>
  )
} 