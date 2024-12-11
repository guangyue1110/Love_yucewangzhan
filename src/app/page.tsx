'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端执行
  useEffect(() => {
    setMounted(true)
  }, [])

  // 服务端渲染时显示加载状态
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* 页面内容 */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          欢迎来到爱情测试
        </h1>
        <div className="text-center">
          <button
            onClick={() => router.push('/quiz')}
            className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors"
          >
            开始测试
          </button>
        </div>
      </div>
    </main>
  )
}