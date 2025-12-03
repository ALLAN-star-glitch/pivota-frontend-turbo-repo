"use client";

import React from "react";
import { Filter } from "lucide-react";
import { UserFilters } from "../../../libs/types/users/filters";

interface FilterBarProps {
  filters: UserFilters;
  onFilterChange: (filters: UserFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}: FilterBarProps) {
  const handleChange = (field: keyof UserFilters, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div
      className="rounded-lg p-6 mb-6 border"
      style={{
        background: "var(--background)",
        borderColor: "var(--pivota-teal-200)",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-3">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Filters
        </h3>

        <button
          onClick={onClearFilters}
          className="text-sm font-medium cursor-pointer transition-colors"
          style={{ color: "var(--soft-red-500)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--soft-red-600)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--soft-red-500)")
          }
        >
          Clear Filters
        </button>
      </div>

      {/* FILTER GRID - MOBILE FRIENDLY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Role */}
        <select
          value={filters.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm cursor-pointer"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--pivota-teal-200)",
          }}
        >
          <option>All Roles</option>
          <option>Premium User</option>
          <option>Registered User</option>
          <option>Admin</option>
        </select>

        {/* Plan */}
        <select
          value={filters.plan}
          onChange={(e) => handleChange("plan", e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm cursor-pointer"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--pivota-teal-200)",
          }}
        >
          <option>All Plans</option>
          <option>Premium</option>
          <option>Free</option>
          <option>Custom</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm cursor-pointer"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--pivota-teal-200)",
          }}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Pending</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm cursor-pointer"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--pivota-teal-200)",
          }}
        >
          <option>All Categories</option>
          <option>Web Development</option>
          <option>Graphic Design</option>
          <option>Digital Marketing</option>
          <option>Content Writing</option>
          <option>Video Production</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm cursor-pointer"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--pivota-teal-200)",
          }}
        />

        {/* Apply Button */}
        <button
          onClick={onApplyFilters}
          className="w-full px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer transition-all"
          style={{
            background: "var(--pivota-teal-500)",
            color: "#fff",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--pivota-teal-600)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--pivota-teal-500)")
          }
        >
          <Filter className="w-4 h-4" />
          Apply
        </button>
      </div>
    </div>
  );
}
