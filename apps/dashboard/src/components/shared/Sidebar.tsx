import React from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Users, Bell, FileText, Calendar } from 'lucide-react'
interface SidebarProps {
  onPostJob: () => void
}
export function Sidebar({ onPostJob }: SidebarProps) {
  const quickActions = [
    {
      icon: Plus,
      label: 'Post New Job',
      color: 'teal',
      action: onPostJob,
    },
    {
      icon: FileText,
      label: 'View Reports',
      color: 'amber',
    },
    {
      icon: Users,
      label: 'Manage Users',
      color: 'teal',
    },
  ]
  const recentActivity = [
    {
      type: 'application',
      text: 'New application for Carpenter position',
      time: '5 min ago',
    },
    {
      type: 'job',
      text: 'Electrician job posted successfully',
      time: '1 hour ago',
    },
    {
      type: 'review',
      text: 'Pending review for Boda Rider',
      time: '2 hours ago',
    },
    {
      type: 'message',
      text: 'New message from applicant',
      time: '3 hours ago',
    },
  ]
  const platformStats = [
    {
      label: 'Total Users',
      value: '12,847',
      icon: Users,
      trend: '+18%',
    },
    {
      label: 'Success Rate',
      value: '94.2%',
      icon: TrendingUp,
      trend: '+5%',
    },
    {
      label: 'Avg. Response',
      value: '2.4 hrs',
      icon: Calendar,
      trend: '-12%',
    },
  ]
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        className="bg-white rounded-3xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${action.color === 'teal' ? 'bg-teal-50 hover:bg-teal-100 text-teal-700' : 'bg-amber-50 hover:bg-amber-100 text-amber-700'}`}
            >
              <div
                className={`p-2 rounded-lg ${action.color === 'teal' ? 'bg-teal-100' : 'bg-amber-100'}`}
              >
                <action.icon className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Platform Stats */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        className="bg-white rounded-3xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Platform Stats
        </h3>
        <div className="space-y-4">
          {platformStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.4,
        }}
        className="bg-white rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
          <Bell className="w-5 h-5 text-slate-400" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-slate-700 leading-snug">
                  {activity.text}
                </p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
export default Sidebar
