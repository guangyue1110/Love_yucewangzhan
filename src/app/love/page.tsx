'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuizStore from '@/store/quiz'

export default function LovePage() {
  const router = useRouter()
  const { questions, answers } = useQuizStore()
  
  // 添加数据加载状态
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // 确保数据已加载
    if (!questions.length || !answers.length) {
      router.push('/quiz')
      return
    }
    setIsLoading(false)
  }, [questions, answers, router])

  // 添加加载状态检查
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* 确保在访问数据前进行检查 */}
      {questions.map((question) => {
        const answer = answers.find(a => a.questionId === question.id)
        if (!question || !answer) return null
        
        return (
          <div key={question.id}>
            <h3>{question.title}</h3>
            <p>
              {Array.isArray(answer.answer) 
                ? answer.answer.join(', ')
                : answer.answer}
            </p>
          </div>
        )
      })}
    </div>
  )
} 