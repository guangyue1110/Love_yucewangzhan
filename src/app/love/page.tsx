'use client'
import { useRouter } from 'next/navigation'
import useQuizStore from '@/store/quiz'
import { useEffect } from 'react'

export default function QuizPage() {
  const router = useRouter()
  const { 
    questions, 
    currentQuestion,
    selectedOptions,
    toggleOption,
    submitMultipleChoice,
    addAnswer,
    setCurrentQuestion,
    initStartTime 
  } = useQuizStore()

  useEffect(() => {
    initStartTime()
  }, [])

  const handleAnswer = (answer: string) => {
    const question = questions[currentQuestion]
    
    if (question.type === '多选题') {
      toggleOption(answer)
    } else {
      addAnswer({
        questionId: question.id,
        answer,
        type: question.type
      })
      
      if (currentQuestion === questions.length - 1) {
        router.push('/love/result')
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }
  }

  const handleSubmitMultiple = () => {
    submitMultipleChoice()
    if (currentQuestion === questions.length - 1) {
      router.push('/love/result')
    }
  }

  return (
    <div>
      {/* 测试题目展示和答题逻辑 */}
      {questions[currentQuestion].type === '多选题' && (
        <button onClick={handleSubmitMultiple}>提交答案</button>
      )}
    </div>
  )
} 