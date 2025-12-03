
"use client";

import { motion } from 'framer-motion'
import {
  Briefcase,
  FileText,
  Clock,
  MessageSquare,
  ArrowLeft,
  Plus,
} from 'lucide-react'
import KPICard from '@/components/shared/Cards/KPICard'
import ApplicationTrendChart from '@/components/shared/Charts/ApplicationTrendChart'
import CategoryActivityChart from '@/components/shared/Charts/CategoryActivityChart'
import JobsTable from '@/components/shared/modals/JobsTable'
import Sidebar from '@/components/shared/Sidebar'
import Link from 'next/link';
export default function AllInformalJobsClient() {
  const kpiData = [
    {
      title: 'Total Jobs',
      value: '2,847',
      icon: Briefcase,
      color: 'teal' as const,
      trend: '+12%',
    },
    {
      title: 'Active Applications',
      value: '1,234',
      icon: FileText,
      color: 'amber' as const,
      trend: '+8%',
    },
    {
      title: 'Pending Reviews',
      value: '156',
      icon: Clock,
      color: 'red' as const,
      trend: '-3%',
    },
    {
      title: 'New Messages',
      value: '89',
      icon: MessageSquare,
      color: 'teal' as const,
      trend: '+15%',
    },
  ]
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/20">
      {/* Decorative Kenyan Pattern */}
      <div className="fixed top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <pattern
            id="kenyan-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="2"
              fill="currentColor"
              className="text-teal-600"
            />
            <path
              d="M20 10 L30 20 L20 30 L10 20 Z"
              fill="currentColor"
              className="text-teal-600"
              opacity="0.3"
            />
          </pattern>
          <rect width="200" height="200" fill="url(#kenyan-pattern)" />
        </svg>
      </div>

      <div className="relative">
        {/* Header Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white/80 backdrop-blur-sm border-b border-slate-100"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="cursor-pointer p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className=" text-2xl sm:text-2xl font-bold text-slate-900">
                    Informal Jobs
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Monitor and manage Kenya&apos;s informal job market with
                    real-time insights
                  </p>
                </div>
              </div>
              <Link
                href="/add-informal-job"
                className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span>Post Informal Job</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* KPI Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {kpiData.map((kpi, index) => (
                  <KPICard key={index} {...kpi} index={index} />
                ))}
              </motion.div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ApplicationTrendChart />
                <CategoryActivityChart />
              </div>

              {/* Jobs Table */}
              <JobsTable />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
