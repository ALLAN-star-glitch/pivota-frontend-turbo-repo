// src/libs/constants/DashboardConstants.ts

import { QuickAction, RecentActivity } from "../interfaces/JobsDashboardSidebarInterface";

export const InformalJobsQuickActions: QuickAction[] = [
  { iconName: 'Plus', label: 'Post New Job', color: 'teal', href: '/jobs/informal-jobs/add-job' },
  { iconName: 'FileText', label: 'View Applications', color: 'amber', href: '/jobs/informal-jobs/applications' },
  { iconName: 'Users', label: 'Manage Employers', color: 'teal', href: '/users' },
  { iconName: 'Layers', label: 'Manage Categories', color: 'amber', href: '/jobs/informal-jobs/categories' },
];


export const informalJobsRecentActivity: RecentActivity[] = [
  { type: 'application', text: 'New application for Carpenter position', time: '5 min ago' },
  { type: 'job', text: 'Electrician job posted successfully', time: '1 hour ago' },
  { type: 'review', text: 'Pending review for Boda Rider', time: '2 hours ago' },
  { type: 'message', text: 'New message from applicant', time: '3 hours ago' },
];




