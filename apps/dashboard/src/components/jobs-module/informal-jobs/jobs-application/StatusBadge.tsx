"use client";

import React from 'react'
import { motion } from 'framer-motion'

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'rejected' | 'shortlisted'
}

const statusConfig = {
  active: {
    label: 'Active',
    className: 'bg-teal-50 text-teal-600 border-teal-200',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  shortlisted: {
    label: 'Shortlisted',
    className: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status]

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      {config.label}
    </motion.span>
  )
}
