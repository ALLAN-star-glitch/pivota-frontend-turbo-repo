"use client";

import CategoryDistributionChart from "@/components/main-dashboard/CategoryDistributionChart";
import MainDashboardLayout from "@/components/main-dashboard/MainDashboardLayout";
import MainDashboardSidebar from "@/components/main-dashboard/MainDashboardSidebar";
import UserGrowthChart from "@/components/main-dashboard/UserGrowthChart";
import {  QuickAction, RecentActivity } from "../../libs/interfaces/MainDashboardSidebarInterface";
import { mainDashboardKpiData } from "../../libs/constants/MainDashboardConstants";


// Sidebar actions
const mainDashboardQuickActions: QuickAction[] = [
  { iconName: "Plus", label: "Add New Listing", color: "teal", href: "/listings/add" },
  { iconName: "Users", label: "Manage Users", color: "amber", href: "/users" },
  { iconName: "DollarSign", label: "View Revenue", color: "teal", href: "/revenue" },
  { iconName: "AlertTriangle", label: "View Flags", color: "red", href: "/flags" },
];

const mainDashboardRecentActivity: RecentActivity[] = [
  { type: "user", text: "New user registered: John Doe", time: "10 min ago" },
  { type: "listing", text: "New house listing added", time: "30 min ago" },
  { type: "revenue", text: "Revenue updated: $5,000", time: "1 hour ago" },
  { type: "flag", text: "Listing flagged for review", time: "2 hours ago" },
];

export default function MainDashboard() {
  const userName = "John";

  return (
    <MainDashboardLayout
      userName= {userName}
      config={{
        title: "Pivotaconnect Main Dashboard",
        subtitle: "Overview of platform statistics and activities",
        ctaLabel: "Add Listing",
        ctaHref: "/listings/add",
        kpis: mainDashboardKpiData,
        sidebarComponent: (
          <MainDashboardSidebar
            quickActions={mainDashboardQuickActions}
            recentActivity={mainDashboardRecentActivity}
          />
        ),
        charts: (
          <>
            <UserGrowthChart />
            <CategoryDistributionChart />
          </>
        ),
      }}
    />
  );
}
