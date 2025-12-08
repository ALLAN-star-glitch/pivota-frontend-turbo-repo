"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Example data for the main dashboard
const data = [
  { month: "Jan", value: 320 },
  { month: "Feb", value: 445 },
  { month: "Mar", value: 580 },
  { month: "Apr", value: 520 },
  { month: "May", value: 690 },
  { month: "Jun", value: 850 },
  { month: "Jul", value: 920 },
];

export function UserGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">User Growth Trend</h2>
        <p className="text-sm text-slate-500">Monthly active users</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#64748b"
            style={{ fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            style={{ fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              padding: "12px 16px",
            }}
            labelStyle={{ fontWeight: 600, color: "#0f172a" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#14b8a6"
            strokeWidth={3}
            fill="url(#colorValue)"
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default UserGrowthChart;
