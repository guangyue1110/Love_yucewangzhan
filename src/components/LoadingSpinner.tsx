'use client'

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-pink-500 mx-auto ${className}`}></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
} 