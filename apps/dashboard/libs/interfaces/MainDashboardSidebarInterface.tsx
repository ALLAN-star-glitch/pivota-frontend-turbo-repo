// src/libs/interfaces/DashboardInterfaces.ts

/*-----------------------------------------------------------
| Color types for quick action buttons
-----------------------------------------------------------*/
export type ActionColor = "teal" | "amber" | "red";

/*-----------------------------------------------------------
| Quick Action type
| For buttons like "Manage Users", "Review Flags", etc.
-----------------------------------------------------------*/
export interface QuickAction {
  iconName: string; // string name of Lucide icon
  label: string;
  color: ActionColor;
  href: string;
}

/*-----------------------------------------------------------
| Recent Activity type
| Logs for main dashboard sidebar
-----------------------------------------------------------*/
export interface RecentActivity {
  type: "user" | "listing" | "revenue" | "flag"; // platform-wide activity types
  text: string;
  time: string;
}

/*-----------------------------------------------------------
| Platform KPI / Stats card type
| For cards like Total Users, Active Listings, Revenue, Flags
-----------------------------------------------------------*/
export interface PlatformStat {
  label: string;
  value: string;
  iconName: string; // string name of Lucide icon
  trend: string; // e.g., "12% increase"
  color: ActionColor; // for card styling (teal/amber/red)
}
