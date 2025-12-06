"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JobsDashboardConfig } from "../../../../../libs/interfaces/JobsDashboardInterface";
import KPICard from "../cards/KPICard";



interface JobsDashboardLayoutProps {
  config: JobsDashboardConfig; 
}

export default function JobsDashboardLayout({ config }: JobsDashboardLayoutProps) {
  const { title, subtitle, ctaLabel, ctaHref, kpis } = config;

  return (
    <div className="min-h-screen w-full">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border-b border-slate-100"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-xl hover:bg-slate-100"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>

          {ctaHref && ctaLabel && (
            <Link
              href={ctaHref}
              className="px-6 py-3 rounded-xl text-white bg-teal-500 hover:bg-teal-600"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </motion.div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-6">
          {/* KPI Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {kpis?.map((item, idx) => (
              <KPICard
                key={idx}
                {...item}
                index={idx}  // dynamically add index       
              />
            ))}
          </motion.div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {config.charts}
            
          </div>
          
        </div>

        {/* RIGHT SIDE (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            {config.sidebarComponent}
          </div>
        </div>

      </div>
    </div>
  );
}
