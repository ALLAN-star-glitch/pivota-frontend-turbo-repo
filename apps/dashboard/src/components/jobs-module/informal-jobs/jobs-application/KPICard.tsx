"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, XCircle, Star } from 'lucide-react';
interface KPICardProps {
  label: string;
  value: number;
  color: 'teal' | 'amber' | 'softRed' | 'indigo';
  icon: string;
  index: number;
}
const iconMap = {
  users: Users,
  clock: Clock,
  'x-circle': XCircle,
  star: Star
};
const colorClasses = {
  teal: 'text-teal bg-teal-50',
  amber: 'text-amber bg-amber-50',
  softRed: 'text-red bg-red-50',
  indigo: 'text-indigo bg-indigo-50'
};

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  color,
  icon,
  index
}) => {
  const [count, setCount] = useState(0);
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  useEffect(() => {
    // Count-up animation
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1,
    ease: [0.22, 1, 0.36, 1]
  }} whileHover={{
    scale: 1.03,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    transition: {
      duration: 0.2
    }
  }} className="bg-white rounded-2xl p-6 shadow-soft cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-2">{label}</p>
          <motion.p className={`text-4xl font-bold ${colorClasses[color].split(' ')[0]}`} key={count}>
            {count}
          </motion.p>
        </div>
        <motion.div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`} whileHover={{
        rotate: 5,
        scale: 1.1
      }} transition={{
        type: 'spring',
        stiffness: 300
      }}>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </motion.div>
      </div>
    </motion.div>;
};