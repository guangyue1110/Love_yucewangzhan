'use client'

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div 
          className={`inline-block h-8 w-8 border-2 border-pink-500 rounded-full ${className}`}
          style={{ 
            borderRightColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }}
        />
      </div>
    </div>
  )
} 