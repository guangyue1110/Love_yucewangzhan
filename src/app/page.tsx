'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 使用独立的加载组件
  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          欢迎来到爱情测试
        </h1>
        <div className="text-center">
          <Link 
            href="/quiz"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors"
          >
            开始测试
          </Link>
        </div>
      </div>
    </main>
  )
}