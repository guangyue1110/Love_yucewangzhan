'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import useQuizStore from '@/store/quiz'
import type { Answer } from '@/store/quiz'

export default function QuizPage() {
  const router = useRouter()
  const { 
    questions, 
    answers, 
    currentQuestion,
    setCurrentQuestion,
    resetQuiz 
  } = useQuizStore()
  const [showHint, setShowHint] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  // 假设 currentQuestionData 是从某个状态或上下文中获取的
  const currentQuestionData = questions[currentQuestion]

  // 处理答题
  const handleAnswer = useCallback((answer: string) => {
    if (!currentQuestionData) return

    useQuizStore.getState().addAnswer({
      questionId: currentQuestionData.id,
      answer,
      type: '单选题'
    })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      router.push('/quiz/result')
    }
  }, [currentQuestion, currentQuestionData, questions.length, router, setCurrentQuestion])

  // 组件挂载时重置测试
  useEffect(() => {
    resetQuiz()
  }, [resetQuiz])

  // 计算进度
  const progress = answers ? (answers.length / questions.length) * 100 : 0

  // 计时器
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setInterval(() => {
        const startTime = useQuizStore.getState().startTime ?? Date.now()
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [])

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 处理退出
  const handleExit = () => {
    if (typeof window !== 'undefined' && confirm('确定要退出测试吗？已答题目将会保存哦 💝')) {
      localStorage.setItem('draftAnswers', JSON.stringify(answers))
      router.push('/')
    }
  }

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentQuestionData) return

      switch (e.key) {
        case 'ArrowLeft':
          if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
          }
          break
        case 'ArrowRight':
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
          }
          break
        case '1':
        case '2':
        case '3':
        case '4':
          const index = parseInt(e.key) - 1
          if (index < currentQuestionData.options.length) {
            handleAnswer(currentQuestionData.options[index])
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQuestion, currentQuestionData, questions.length, handleAnswer, setCurrentQuestion])

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 顶部导航 */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleExit}
            className="text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1"
          >
            <span>←</span> 
            <span>暂时离开</span>
          </button>
          <button
            onClick={() => setShowHint(true)}
            className="text-purple-500 hover:text-pink-500 transition-colors flex items-center gap-1"
          >
            <span>💝</span>
            <span>小贴士</span>
          </button>
          <span className="text-gray-500 flex items-center gap-1">
            <span>⏰</span>
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            进度: {Math.round(progress)}%
          </div>
        </div>

        {/* 问题区域 */}
        {currentQuestionData && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            {/* 问题类型标签 */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-pink-50 px-4 py-1.5 rounded-full text-pink-600 text-sm font-medium">
                {currentQuestionData.type} 
              </div>
              {currentQuestionData.category && (
                <div className="bg-purple-50 px-4 py-1.5 rounded-full text-purple-600 text-sm font-medium">
                  {currentQuestionData.category} 
                </div>
              )}
              <div className="text-pink-400 ml-2">💭</div>
            </div>
            
            {/* 问题标题 */}
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 leading-relaxed">
              {currentQuestionData.title}
            </h2>

            {/* 选项列表 */}
            <div className="space-y-4">
              {currentQuestionData?.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className="w-full group relative"
                  onClick={() => {
                    if (currentQuestionData.type === '多选题') {
                      useQuizStore.getState().toggleOption(option)
                    } else {
                      const answer: Answer = {
                        questionId: currentQuestionData.id,
                        answer: option,
                        type: currentQuestionData.type
                      }
                      useQuizStore.getState().addAnswer(answer)
                      
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                      } else {
                        router.push('/quiz/result')
                      }
                    }
                  }}
                >
                  <div className="p-4 border border-gray-200 rounded-xl hover:border-pink-200 transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02] bg-white">
                    <div className="flex items-center">
                      {/* 多选题选中状态 */}
                      {currentQuestionData.type === '多选题' && (
                        <div className={cn(
                          "w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-all",
                          useQuizStore.getState().selectedOptions.includes(option)
                            ? "border-pink-400 bg-pink-50 text-pink-500"
                            : "border-gray-200 group-hover:border-pink-400"
                        )}>
                          {useQuizStore.getState().selectedOptions.includes(option) && '✓'}
                        </div>
                      )}
                      {/* 选项内容 */}
                      <span className="text-gray-700 group-hover:text-pink-600 transition-colors">
                        {option}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 多选题提交按钮 */}
            {currentQuestionData.type === '多选题' && (
              <div className="mt-6">
                <button
                  onClick={() => useQuizStore.getState().submitMultipleChoice()}
                  disabled={useQuizStore.getState().selectedOptions.length === 0}
                  className={cn(
                    "w-full py-3 rounded-xl font-medium transition-all",
                    useQuizStore.getState().selectedOptions.length > 0
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  确认选择
                </button>
              </div>
            )}

            {/* 底部导航 */}
            <div className="mt-8 pt-6 border-t text-sm text-gray-500 flex items-center justify-between">
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <span>←</span>
                  <span>上一题</span>
                </button>
              )}
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span>使用键盘 1-{currentQuestionData.options.length} 快速选择</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 帮助提示模态框 */}
      {showHint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>💝</span> 
              小贴士
            </h3>
            <div className="space-y-6">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span>💌</span> 
                  选择后自动进入下一题哦
                </li>
                <li className="flex items-center gap-2">
                  <span>💭</span> 
                  可以随时返回修改答案
                </li>
                <li className="flex items-center gap-2">
                  <span>💝</span> 
                  退出测试会自动保存进度
                </li>
              </ul>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span>⌨️</span> 
                  快捷键
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-2">←</kbd>
                    <span>上一题</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-2">→</kbd>
                    <span>下一题</span>
                  </li>
                  <li className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-2">1-4</kbd>
                    <span>快速选择选项</span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              知道啦 💝
            </button>
          </div>
        </div>
      )}
    </main>
  )
}