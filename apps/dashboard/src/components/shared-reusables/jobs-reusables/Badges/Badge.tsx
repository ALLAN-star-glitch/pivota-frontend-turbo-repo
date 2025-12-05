import React from 'react'
import { XIcon } from 'lucide-react'
import { motion } from 'framer-motion'
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'teal' | 'amber' | 'red'
  onRemove?: () => void
  className?: string
}
export function Badge({
  children,
  variant = 'default',
  onRemove,
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <motion.span
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${variants[variant]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors cursor-pointer"
          aria-label="Remove"
        >
          <XIcon size={14} />
        </button>
      )}
    </motion.span>
  )
}
