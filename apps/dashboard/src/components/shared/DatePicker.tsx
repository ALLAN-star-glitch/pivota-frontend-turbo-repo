import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircleIcon, CalendarIcon } from 'lucide-react'
interface DatePickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  min?: string
  max?: string
  className?: string
}
export default function DatePicker({
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  min,
  max,
  className = '',
}: DatePickerProps) {
  const hasError = !!error
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full px-4 py-2.5 pr-10 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'} ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
        />
        <CalendarIcon
          size={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
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
