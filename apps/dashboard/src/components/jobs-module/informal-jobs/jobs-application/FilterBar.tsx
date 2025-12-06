"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
interface FilterBarProps {
  onSearchChange: (value: string) => void;
}
export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchChange
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  return <motion.div initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="bg-white rounded-2xl p-4 shadow-soft mb-6">
      <motion.div className="relative" animate={{
      boxShadow: searchFocused ? '0 0 20px rgba(0, 140, 140, 0.15)' : '0 0 0 rgba(0, 140, 140, 0)'
    }} transition={{
      duration: 0.2
    }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search by job title or applicant name..." onChange={e => onSearchChange(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors" />
      </motion.div>
    </motion.div>;
};