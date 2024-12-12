'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    title: "完成测评问卷",
    description: "通过精心设计的问卷了解你的性格特征"
  },
  {
    title: "获取个性化报告",
    description: "基于你的答案生成详细的个性分析报告"
  },
  {
    title: "查看匹配建议",
    description: "获得与你性格相匹配的约会对象推荐"
  }
]

export function Steps() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          三步找到真爱
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}