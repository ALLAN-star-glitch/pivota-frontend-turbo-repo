import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircleIcon } from 'lucide-react'
interface TextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  maxLength?: number
  className?: string
}
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}: TextareaProps) {
  const hasError = !!error
  const charCount = value.length
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {maxLength && (
          <span
            className={`text-xs ${charCount > maxLength ? 'text-red-500' : 'text-gray-500'}`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'} ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
      />
      {error && (
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
          className="flex items-start gap-1.5 text-sm text-red-600"
        >
          <AlertCircleIcon size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  )
}
