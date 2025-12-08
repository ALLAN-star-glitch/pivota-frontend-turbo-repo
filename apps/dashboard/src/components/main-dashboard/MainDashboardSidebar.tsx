"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { QuickAction, RecentActivity } from "../../../libs/interfaces/MainDashboardSidebarInterface";
import KPICard from "../shared-reusables/jobs-reusables/cards/KPICard";

interface UserStat {
  role: string;
  count: number;
  color: "teal" | "amber" | "red";
  trend?: string; // optional, e.g., "+5%"
}

interface SidebarProps {
  quickActions: QuickAction[];
  recentActivity: RecentActivity[];
  userStats?: UserStat[];
}

export default function MainDashboardSidebar({ quickActions, recentActivity, userStats }: SidebarProps) {
  const renderIcon = (iconName: string, className?: string) => {
    if (!iconName) return null;
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[iconName];
    if (!Icon) return null;
    return <Icon className={className} />;
  };

  return (
    <div className="space-y-6">

      {/* USER ROLE KPI CARDS */}
      {userStats && userStats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {userStats.map((stat, idx) => (
            <KPICard
              key={idx}
              title={stat.role}
              value={stat.count.toString()}
              color={stat.color}
              iconName="" // optionally you can set icons for roles
              trend={stat.trend}
            />
          ))}
        </div>
      )}

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
                  : action.color === "amber"
                  ? "bg-amber-50 hover:bg-amber-100 text-amber-700"
                  : "bg-red-50 hover:bg-red-100 text-red-700"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  action.color === "teal"
                    ? "bg-teal-100"
                    : action.color === "amber"
                    ? "bg-amber-100"
                    : "bg-red-100"
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
              <div
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  activity.type === "user"
                    ? "bg-teal-500"
                    : activity.type === "listing"
                    ? "bg-amber-500"
                    : activity.type === "revenue"
                    ? "bg-teal-400"
                    : "bg-red-500"
                }`}
              />
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
