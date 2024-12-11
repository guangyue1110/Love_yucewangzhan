'use client'
import { useRouter } from 'next/navigation'
import useQuizStore from '@/store/quiz'

export default function ResultPage() {
  const router = useRouter()
  const { resetQuiz } = useQuizStore()

  const handleRetake = () => {
    resetQuiz()
    router.push('/love')
  }

  return (
    <div>
      {/* 结果展示逻辑 */}
      <button onClick={handleRetake}>重新测试</button>
    </div>
  )
} 