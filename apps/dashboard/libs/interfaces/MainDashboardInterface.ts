// src/libs/interfaces/MainDashboardInterfaces.ts
import React, { ComponentType, SVGProps } from "react";

/*  
|--------------------------------------------------------------------------
| KPI CARD PROPS
|--------------------------------------------------------------------------
| Works for all dashboard cards: 
| Total Users, Active Listings, Revenue, Flags, etc.
|--------------------------------------------------------------------------
*/
export interface KPICardProps {
  title: string;
  value: string;
  iconName?: string; // Name of Lucide icon as string
  color: "teal" | "amber" | "red"; // Pivotaconnect main colors
  trend?: string; // e.g. "12% increase from last month"
  index?: number;
}

/*  
|--------------------------------------------------------------------------
| MAIN DASHBOARD CONFIG
|--------------------------------------------------------------------------
| Generic structure usable for the entire Pivotaconnect platform:
| - Main Dashboard
| - Jobs Dashboard
| - Housing Dashboard
| - Services Dashboard
|--------------------------------------------------------------------------
*/
export interface MainDashboardConfig {
  title: string;
  sidebarComponent: React.ReactNode;
  charts: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  kpis?: KPICardProps[];
}

/*  
|--------------------------------------------------------------------------
| OPTIONAL: ICON TYPE
|--------------------------------------------------------------------------
*/
export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;
