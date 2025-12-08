"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MainDashboardConfig } from "../../../libs/interfaces/MainDashboardInterface";
import KPICard from "../shared-reusables/jobs-reusables/cards/KPICard";

interface MainDashboardLayoutProps {
  config: MainDashboardConfig;
}

interface MainDashboardLayoutProps {
  config: MainDashboardConfig;
  userName?: string; // optional: first name of user
}

export default function MainDashboardLayout({ config, userName }: MainDashboardLayoutProps) {
  const { title, subtitle, ctaLabel, ctaHref, kpis } = config;

  return (
    <div className="min-h-screen w-full">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" backdrop-blur-md border-b border-slate-200 shadow-sm rounded-3xl"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Optional: Breadcrumb / Back Button */}
            {false && (
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-xl hover:bg-slate-100 transition"
              >
                {/* Add ArrowLeft Icon */}
              </button>
            )}

            <div>
              {userName && (
                <p className="text-sm sm:text-base text-slate-500 mb-1 font-medium">
                  Welcome back, <span className="font-semibold text-slate-900">{userName}</span>!
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{title}</h1>
              {subtitle && (
                <p className="mt-1 text-sm sm:text-base text-slate-500 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {ctaHref && ctaLabel && (
            <Link
              href={ctaHref}
              className="px-6 py-3 rounded-xl text-white bg-teal-500 hover:bg-teal-600 transition-shadow shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </motion.div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-8">
          {/* KPI Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Platform Overview</h2>
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            >
              {kpis?.map((item, idx) => (
                <KPICard key={idx} {...item} index={idx} />
              ))}
            </motion.div>
          </section>

          {/* Analytics Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Analytics</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {config.charts}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto space-y-6 pr-2">
            {config.sidebarComponent}
          </div>
        </div>

      </div>
    </div>
  );
}
