import React from 'react'
import { motion, Variants } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
interface KPICardProps {
  title: string
  value: string
  icon: LucideIcon
  color: 'teal' | 'amber' | 'red'
  trend: string
  index: number
}
export function KPICard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: KPICardProps) {
  const colorClasses = {
    teal: {
      gradient: 'from-teal-500/10 to-teal-600/5',
      icon: 'bg-teal-500/10 text-teal-600',
      trend: 'text-teal-600',
    },
    amber: {
      gradient: 'from-amber-500/10 to-amber-600/5',
      icon: 'bg-amber-500/10 text-amber-600',
      trend: 'text-amber-600',
    },
    red: {
      gradient: 'from-red-500/10 to-red-600/5',
      icon: 'bg-red-500/10 text-red-600',
      trend: 'text-red-600',
    },
  }
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.2,
        },
      }}
      className={`cursor-pointer relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].gradient} opacity-50`}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div
            className={`w-12 h-12 rounded-2xl ${colorClasses[color].icon} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {value}
            </h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">{title}</p>
          </div>
        </div>

        <div
          className={`text-sm font-semibold ${colorClasses[color].trend} bg-white/80 px-2.5 py-1 rounded-full`}
        >
          {trend}
        </div>
      </div>
    </motion.div>
  )
}
export default KPICard
