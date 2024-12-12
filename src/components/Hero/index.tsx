'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    icon: '❤️',
    title: '完成测试',
    description: '回答精心设计的问题'
  },
  {
    icon: '✓',
    title: '获取结果',
    description: '了解你的灵魂特质'
  },
  {
    icon: '→',
    title: '找到真爱',
    description: '遇见命中注定的人'
  }
]

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* 主标题 */}
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        遇见心动，相守一生
      </motion.h1>

      {/* 副标题 */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        找到与你灵魂共鸣的另一半
      </motion.p>

      {/* 步骤说明 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl w-full">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <span className="text-3xl mb-4">{step.icon}</span>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 开始测试按钮 */}
      <motion.button
        className="px-12 py-4 text-xl font-medium text-white rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 hover:opacity-90 transition-opacity"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        开始测试 💝
      </motion.button>
    </div>
  )
}