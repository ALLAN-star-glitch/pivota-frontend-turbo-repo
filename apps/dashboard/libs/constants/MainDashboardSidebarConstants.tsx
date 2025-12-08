// src/libs/constants/MainDashboardConstants.ts

import { QuickAction, RecentActivity } from "../interfaces/MainDashboardSidebarInterface";

/*  
|--------------------------------------------------------------------------
| MAIN DASHBOARD QUICK ACTIONS
| Actions for the pivotaconnect main admin dashboard
|--------------------------------------------------------------------------
*/

export const MainDashboardQuickActions: QuickAction[] = [
  {
    iconName: "Users",
    label: "Manage Users",
    color: "teal",
    href: "/admin/users",
  },
  {
    iconName: "Layers",
    label: "Manage Listings",
    color: "amber",
    href: "/admin/listings",
  },
  {
    iconName: "BarChart",
    label: "View Analytics",
    color: "teal",
    href: "/admin/analytics",
  },
  {
    iconName: "Flag",
    label: "Review Flags",
    color: "red",
    href: "/admin/flags",
  },
];

/*  
|--------------------------------------------------------------------------
| MAIN DASHBOARD RECENT ACTIVITY
| Latest system-wide activity logs
|--------------------------------------------------------------------------
*/

export const mainDashboardRecentActivity: RecentActivity[] = [
  {
    type: "user",
    text: "New user registered on the platform",
    time: "10 min ago",
  },
  {
    type: "listing",
    text: "New rental listing added in Nairobi",
    time: "1 hour ago",
  },
  {
    type: "revenue",
    text: "New subscription payment received",
    time: "3 hours ago",
  },
  {
    type: "flag",
    text: "Flag submitted on a suspicious job post",
    time: "5 hours ago",
  },
];
