"use client"

import React from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'  

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon        //correct type
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-sm cursor-pointer',
    secondary:
      'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-sm cursor-pointer',
    outline:
      'border-2 border-teal-500 text-teal-600 hover:bg-teal-50 focus:ring-teal-500 cursor-pointer',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? disabledStyles : ''} ${className}`}
      whileHover={
        !disabled
          ? {
              scale: 1.02,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }
          : {}
      }
      whileTap={
        !disabled
          ? { scale: 0.98 }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      {/* Render icon if provided */}
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </motion.button>
  )
}
