
"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, TrendingUp, Bookmark, Filter as FilterIcon } from 'lucide-react';
import { MiniSparkline } from './MiniSparkline';
import { Application } from '../../../../../libs/interfaces/JobsApplications';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  applications: Application[];
  onFilterByStatus: (statuses: string[]) => void;
  onFilterByCategory: (category: string) => void;
  onDateRangeFilter: (days: number) => void;
  onSavedViewClick: (view: string) => void;
  onClearFilters: () => void;
  activeFilters: {
    statuses: string[];
    category: string;
    dateRange: number;
  };
}
export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  applications,
  onFilterByStatus,
  onFilterByCategory,
  onDateRangeFilter,
  onSavedViewClick,
  onClearFilters,
  activeFilters
}) => {
  const statusCounts = {
    active: applications.filter(a => a.status === 'active').length,
    pending: applications.filter(a => a.status === 'pending').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length
  };
  const categoryCounts = applications.reduce((acc, app) => {
    acc[app.category] = (acc[app.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCategories = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a).slice(0, 3);
  const recentActivity = applications.flatMap(app => app.timeline.map(event => ({
    ...event,
    applicant: app.applicantName
  }))).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const weeklyData = [3, 5, 4, 7, 6, 8, 8];
  const filterChips = [{
    label: 'Active',
    value: 'active',
    color: 'teal'
  }, {
    label: 'Pending',
    value: 'pending',
    color: 'amber'
  }, {
    label: 'Shortlisted',
    value: 'shortlisted',
    color: 'indigo'
  }, {
    label: 'Rejected',
    value: 'rejected',
    color: 'softRed'
  }];
  const savedViews = [{
    label: 'Most Recent',
    icon: Clock,
    filter: 'recent'
  }, {
    label: 'Pending Review',
    icon: FilterIcon,
    filter: 'pending'
  }, {
    label: 'Shortlisted',
    icon: Bookmark,
    filter: 'shortlisted'
  }];
  const toggleStatusFilter = (status: string) => {
    const currentStatuses = activeFilters.statuses;
    const newStatuses = currentStatuses.includes(status) ? currentStatuses.filter(s => s !== status) : [...currentStatuses, status];
    onFilterByStatus(newStatuses);
  };
  const hasActiveFilters = activeFilters.statuses.length > 0 || activeFilters.category || activeFilters.dateRange > 0;
  return <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30" />}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && <motion.aside initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }} className="fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-100 shadow-soft-lg overflow-y-auto z-40 lg:z-0">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Filters & Insights
                </h2>
                <motion.button whileHover={{
              rotate: 90,
              scale: 1.1
            }} onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Quick Filters */}
              <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  Status Filters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterChips.map((chip, index) => {
                const isActive = activeFilters.statuses.includes(chip.value);
                return <motion.button key={chip.value} initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.1 + index * 0.05
                }} whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} onClick={() => toggleStatusFilter(chip.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? `bg-${chip.color} text-white shadow-glow-${chip.color}` : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                        {chip.label} (
                        {statusCounts[chip.value as keyof typeof statusCounts]})
                      </motion.button>;
              })}
                </div>

                {/* Date Range */}
                <div className="mt-4">
                  <label className="text-xs font-medium text-gray-600 mb-2 block">
                    Date Range
                  </label>
                  <select onChange={e => onDateRangeFilter(Number(e.target.value))} value={activeFilters.dateRange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-teal transition-colors">
                    <option value={0}>All Time</option>
                    <option value={7}>Last 7 Days</option>
                    <option value={14}>Last 14 Days</option>
                    <option value={30}>Last 30 Days</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && <motion.button initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={onClearFilters} className="w-full mt-3 px-3 py-2 text-xs font-medium text-softRed bg-softRed-50 rounded-lg hover:bg-softRed-100 transition-colors">
                    Clear All Filters
                  </motion.button>}
              </motion.div>

              {/* Applicant Insights */}
              <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal" />
                  Insights
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Applications This Week
                    </p>
                    <MiniSparkline data={weeklyData} color="#008C8C" />
                    <p className="text-lg font-bold text-teal mt-1">
                      {applications.length} Total
                    </p>
                  </div>

                  <div className="pt-3 border-t border-teal-200">
                    <p className="text-xs text-gray-600 mb-2">Top Categories</p>
                    {topCategories.map(([category, count], index) => <motion.button key={category} initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.3 + index * 0.05
                }} whileHover={{
                  scale: 1.02,
                  x: 2
                }} onClick={() => onFilterByCategory(category)} className={`w-full flex items-center justify-between p-2 rounded-lg text-xs mb-1 transition-colors ${activeFilters.category === category ? 'bg-teal text-white' : 'bg-white/60 text-gray-700 hover:bg-white'}`}>
                        <span className="font-medium">{category}</span>
                        <span className="font-bold">{count}</span>
                      </motion.button>)}
                  </div>
                </div>
              </motion.div>

              {/* Saved Views */}
              <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Saved Views
                </h3>
                <div className="space-y-2">
                  {savedViews.map((view, index) => <motion.button key={view.filter} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.35 + index * 0.05
              }} whileHover={{
                scale: 1.02,
                x: 2
              }} whileTap={{
                scale: 0.98
              }} onClick={() => onSavedViewClick(view.filter)} className="w-full flex items-center gap-3 p-3 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal transition-colors border border-gray-100">
                      <view.icon className="w-4 h-4" />
                      {view.label}
                    </motion.button>)}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => <motion.div key={activity.id} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.45 + index * 0.05
              }} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-900 font-medium">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.applicant}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {activity.date}
                        </p>
                      </div>
                    </motion.div>)}
                </div>
              </motion.div>
            </div>
          </motion.aside>}
      </AnimatePresence>
    </>;
};