// libs/constants/MainDashboardConstants.ts

import { KPICardProps } from "../interfaces/MainDashboardInterface";


export const mainDashboardKpiData: KPICardProps[] = [
  {
    title: "Total Users",
    value: "42,380",
    iconName: "Users",
    color: "teal",
    trend: "12% increase",
  },
  {
    title: "Active Listings",
    value: "9,742",
    iconName: "ClipboardList",
    color: "amber",
    trend: "8% increase",
  },
  {
    title: "Revenue",
    value: "KES 1.2M",
    iconName: "DollarSign",
    color: "teal",
    trend: "5% increase",
  },
  {
    title: "Flags",
    value: "132",
    iconName: "Flag",
    color: "red",
    trend: "3% decline",
  },
];
