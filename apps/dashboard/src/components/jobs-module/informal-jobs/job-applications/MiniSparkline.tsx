"use client";

import React from 'react';
import { motion } from 'framer-motion';
interface MiniSparklineProps {
  data: number[];
  color?: string;
}
export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color = '#008C8C'
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, index) => {
    const x = index / (data.length - 1) * 100;
    const y = 100 - (value - min) / range * 100;
    return `${x},${y}`;
  }).join(' ');
  return <svg viewBox="0 0 100 30" className="w-full h-8" preserveAspectRatio="none">
      <motion.polyline initial={{
      pathLength: 0,
      opacity: 0
    }} animate={{
      pathLength: 1,
      opacity: 1
    }} transition={{
      duration: 1,
      ease: 'easeOut'
    }} points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <motion.polyline initial={{
      opacity: 0
    }} animate={{
      opacity: 0.2
    }} transition={{
      duration: 1,
      delay: 0.5
    }} points={`0,100 ${points} 100,100`} fill={color} stroke="none" />
    </svg>;
};