import React from 'react';
import { LucideIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}
export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBgColor,
  iconColor
}: StatCardProps) {
  return <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && <p className={`text-sm font-medium flex items-center gap-1 ${changeType === 'increase' ? 'text-green-600' : changeType === 'decrease' ? 'text-pivota-red-500' : 'text-pivota-amber-600'}`}>
              {changeType === 'increase' && '↑'}
              {changeType === 'decrease' && '↓'}
              {changeType === 'neutral' && '↑'}
              {change}
            </p>}
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>;
}