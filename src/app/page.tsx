'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              遇见心动，相守一生 💝
            </h1>
            <p className="text-lg text-gray-600">
              开始你的专属爱情测试之旅
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-400" />
              <h2 className="text-xl font-medium text-gray-700">测试说明</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 完成精心设计的问题</li>
              <li>• 获取你的个性化分析</li>
              <li>• 找到最适合你的另一半</li>
            </ul>
          </motion.div>

          <motion.button
            onClick={() => router.push('/quiz')}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full 
              hover:opacity-90 transition-all text-lg font-medium shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            立即开始测试
          </motion.button>
        </div>
      </div>
    </main>
  )
}