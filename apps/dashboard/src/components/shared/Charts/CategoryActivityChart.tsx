import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
const data = [
  {
    category: 'Fundi',
    value: 450,
    color: '#14b8a6',
  },
  {
    category: 'Mama Fua',
    value: 380,
    color: '#f59e0b',
  },
  {
    category: 'Boda',
    value: 520,
    color: '#14b8a6',
  },
  {
    category: 'Masonry',
    value: 290,
    color: '#ef4444',
  },
  {
    category: 'Electrician',
    value: 410,
    color: '#f59e0b',
  },
  {
    category: 'Hair & Beauty',
    value: 340,
    color: '#14b8a6',
  },
]
export function CategoryActivityChart() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.5,
      }}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Category Activity</h2>
        <p className="text-sm text-slate-500">Jobs by category</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            stroke="#64748b"
            style={{
              fontSize: '11px',
              fontWeight: 500,
            }}
            tickLine={false}
            axisLine={false}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#64748b"
            style={{
              fontSize: '12px',
              fontWeight: 500,
            }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              padding: '12px 16px',
            }}
            labelStyle={{
              fontWeight: 600,
              color: '#0f172a',
            }}
            cursor={{
              fill: 'rgba(20, 184, 166, 0.05)',
              radius: 8,
            }}
          />
          <Bar
            dataKey="value"
            radius={[12, 12, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
export default CategoryActivityChart
