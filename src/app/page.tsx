'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero/Hero'
import { Steps } from '@/components/Steps'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Hero>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          onClick={() => router.push('/quiz')}
        >
          开始测试 💝
        </motion.button>
      </Hero>
      <Steps />
    </main>
  )
}