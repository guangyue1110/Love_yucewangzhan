import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"

interface HeroProps {
  className?: string;
  children?: React.ReactNode;
}

export function Hero({ className, children }: HeroProps) {
  return (
    <section className={cn("min-h-[70vh] flex flex-col items-center justify-center px-4", className)}>
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        遇见心动，相守一生
      </motion.h1>
      
      <motion.p
        className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-[600px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        开启你的心动之旅，找寻属于你的另一半
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export default Hero; 