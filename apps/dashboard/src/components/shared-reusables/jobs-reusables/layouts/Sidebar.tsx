"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { QuickAction, RecentActivity } from "../../../../../libs/interfaces/JobsDashboardSidebarInterface";

interface SidebarProps {
  quickActions: QuickAction[];
  recentActivity: RecentActivity[];
}

export default function Sidebar({ quickActions, recentActivity }: SidebarProps) {
  const renderIcon = (iconName: string, className?: string) => {
    if (!iconName) return null;
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[iconName];
    if (!Icon) return null;
    return <Icon className={className} />;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Link
              href={action.href}
              key={index}
              className={`cursor-pointer w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                action.color === "teal"
                  ? "bg-teal-50 hover:bg-teal-100 text-teal-700"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-700"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  action.color === "teal" ? "bg-teal-100" : "bg-amber-100"
                }`}
              >
                {renderIcon(action.iconName, "w-4 h-4")}
              </div>
              <span className="font-semibold text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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
                <p className="text-sm text-slate-700 leading-snug">{activity.text}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
