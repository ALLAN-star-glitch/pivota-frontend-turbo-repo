// src/libs/interfaces/Dashboard.ts

export type ActionColor = 'teal' | 'amber' | 'red';

export interface QuickAction {
  iconName: string; // string name of Lucide icon
  label: string;
  color: ActionColor;
  href: string;
}

export interface RecentActivity {
  type: 'application' | 'job' | 'review' | 'message';
  text: string;
  time: string;
}

export interface PlatformStat {
  label: string;
  value: string;
  iconName: string; // string name of Lucide icon
  trend: string;
}
