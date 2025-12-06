// src/libs/interfaces/JobsDashboard.ts
import React, { ComponentType, SVGProps } from "react";

export interface KPICardProps {
  title: string;
  value: string;
  iconName?: string; // just the string name of the icon
  color: "teal" | "amber" | "red";
  trend?: string;
  index?: number;
}

// JobsDashboardConfig
export interface JobsDashboardConfig {
  title: string;
  sidebarComponent: React.ReactNode;
  charts: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  kpis?: KPICardProps[];
}

// Optionally, a type for icon components (used in KPICard)
export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;
