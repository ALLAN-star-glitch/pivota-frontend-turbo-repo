"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
} from "recharts";

// Example data for main dashboard
const data = [
  { category: "Jobs", value: 120 },
  { category: "Houses", value: 95 },
  { category: "Services", value: 75 },
  { category: "Education", value: 50 },
  { category: "Health", value: 40 },
];

export function CategoryDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Listings by Category</h2>
        <p className="text-sm text-slate-500">Overview of active listings per category</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="category"
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
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default CategoryDistributionChart;
