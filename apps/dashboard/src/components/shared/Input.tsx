"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircleIcon } from 'lucide-react'
interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'number' | 'tel'
  placeholder?: string
  error?: string
  warning?: string
  required?: boolean
  disabled?: boolean
  className?: string
}
export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  warning,
  required = false,
  disabled = false,
  className = '',
}: InputProps) {
  const hasError = !!error
  const hasWarning = !!warning && !error
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : hasWarning ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'} ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
      />
      {(error || warning) && (
        <motion.div
          initial={{
            opacity: 0,
            y: -4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`flex items-start gap-1.5 text-sm ${hasError ? 'text-red-600' : 'text-amber-600'}`}
        >
          <AlertCircleIcon size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error || warning}</span>
        </motion.div>
      )}
    </div>
  )
}
