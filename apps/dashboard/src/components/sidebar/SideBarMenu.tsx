"use client";

import {
  Home,
  Users,
  User,
  ClipboardList,
  PieChart,
  Settings,
  DollarSign,
  FileText,
  ShieldCheck,
  BookOpen,
  Archive,
  Grid,
  CreditCard,
  Wallet,
  Database,
  Clipboard,
  Zap,
} from "lucide-react";

export interface SubItem {
  name: string;
  href: string;
}

export interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  subItems?: SubItem[];
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

/**
 * Super Admin Menu for PivotaConnect – MVP1
 * Focuses on Users, Employers, Housing, Support Programs, Payments, RBAC, and Platform Analytics
 */
export const menuGroups: MenuGroup[] = [
  // -------------------------------------------------
  // GENERAL
  // -------------------------------------------------
  {
    group: "General",
    items: [
      { name: "Overview", icon: Home, href: "/" },
      {
        name: "Quick Actions",
        icon: Grid,
        href: "/dashboard/quick-actions",
        subItems: [
          { name: "Add User", href: "/dashboard/users/add" },
          { name: "Create Job", href: "/dashboard/jobs/create" },
          { name: "Add Property", href: "/dashboard/housing/add" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // USERS & PROVIDERS
  // -------------------------------------------------
  {
    group: "Users & Providers",
    items: [
      {
        name: "Users",
        icon: Users,
        href: "/dashboard/users",
        subItems: [
          { name: "All Users", href: "/dashboard/users/all" },
          { name: "Vulnerable Populations", href: "/dashboard/users/vulnerable" },
          { name: "Suspended Users", href: "/dashboard/users/suspended" },
        ],
      },
      {
        name: "Providers",
        icon: User,
        href: "/dashboard/providers",
        subItems: [
          { name: "Employers", href: "/dashboard/providers/employers" },
          { name: "Landlords", href: "/dashboard/providers/landlords" },
          { name: "NGOs / Support Orgs", href: "/dashboard/providers/ngos" },
          { name: "Verification Requests", href: "/dashboard/providers/verification" },
        ],
      },
      {
        name: "Role Management",
        icon: ShieldCheck,
        href: "/role-management",
      },
    ],
  },

  // -------------------------------------------------
  // EMPLOYMENT MANAGEMENT
  // -------------------------------------------------
  {
    group: "Employment",
    items: [
      {
        name: "Job Listings",
        icon: ClipboardList,
        href: "/dashboard/jobs",
        subItems: [
          { name: "All Jobs", href: "/dashboard/jobs/all" },
          { name: "Pending Approvals", href: "/dashboard/jobs/pending" },
          { name: "Reported Jobs", href: "/dashboard/jobs/reported" },
        ],
      },
      {
        name: "Applications",
        icon: FileText,
        href: "/dashboard/jobs/applications",
        subItems: [
          { name: "All Applications", href: "/dashboard/jobs/applications/all" },
          { name: "Analytics", href: "/dashboard/jobs/applications/analytics" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // HOUSING MANAGEMENT
  // -------------------------------------------------
  {
    group: "Housing",
    items: [
      {
        name: "Housing Listings",
        icon: Database,
        href: "/dashboard/housing",
        subItems: [
          { name: "All Listings", href: "/dashboard/housing/all" },
          { name: "Pending Approvals", href: "/dashboard/housing/pending" },
          { name: "Reported Properties", href: "/dashboard/housing/reported" },
        ],
      },
      {
        name: "Compliance",
        icon: Clipboard,
        href: "/dashboard/housing/compliance",
        subItems: [
          { name: "Compliance Cases", href: "/dashboard/housing/compliance/cases" },
          { name: "Resolved", href: "/dashboard/housing/compliance/resolved" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // SUPPORT & VULNERABLE POPULATIONS
  // -------------------------------------------------
  {
    group: "Support",
    items: [
      {
        name: "Support Programs",
        icon: BookOpen,
        href: "/dashboard/support",
        subItems: [
          { name: "All Programs", href: "/dashboard/support/all" },
          { name: "Beneficiaries", href: "/dashboard/support/beneficiaries" },
          { name: "NGO Submissions", href: "/dashboard/support/submissions" },
          { name: "Emergency Cases", href: "/dashboard/support/emergency" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // PLANS & BILLING
  // -------------------------------------------------
  {
    group: "Plans & Billing",
    items: [
      {
        name: "Subscription Plans",
        icon: CreditCard,
        href: "/dashboard/plans",
        subItems: [
          { name: "All Plans", href: "/dashboard/plans/all" },
          { name: "Corporate Packages", href: "/dashboard/plans/corporate" },
          { name: "Rules & Limits", href: "/dashboard/plans/rules" },
        ],
      },
      {
        name: "Billing & Usage",
        icon: Wallet,
        href: "/dashboard/billing",
        subItems: [
          { name: "Invoices", href: "/dashboard/billing/invoices" },
          { name: "Usage & Overages", href: "/dashboard/billing/usage" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // PAYMENTS
  // -------------------------------------------------
  {
    group: "Payments",
    items: [
      {
        name: "Financials",
        icon: DollarSign,
        href: "/dashboard/payments",
        subItems: [
          { name: "Transactions", href: "/dashboard/payments/transactions" },
          { name: "Payouts", href: "/dashboard/payments/payouts" },
          { name: "Refund Requests", href: "/dashboard/payments/refunds" },
          { name: "Reconciliation", href: "/dashboard/payments/reconciliation" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // REPORTS & ANALYTICS
  // -------------------------------------------------
  {
    group: "Reports & Insights",
    items: [
      {
        name: "Analytics",
        icon: PieChart,
        href: "/dashboard/reports",
        subItems: [
          { name: "User Analytics", href: "/dashboard/reports/users" },
          { name: "Employment Reports", href: "/dashboard/reports/jobs" },
          { name: "Housing Reports", href: "/dashboard/reports/housing" },
          { name: "Support Impact", href: "/dashboard/reports/support" },
          { name: "Revenue Analytics", href: "/dashboard/reports/revenue" },
        ],
      },
      {
        name: "System Logs",
        icon: Archive,
        href: "/dashboard/logs",
        subItems: [
          { name: "Audit Logs", href: "/dashboard/logs/audit" },
          { name: "Access History", href: "/dashboard/logs/access" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // SYSTEM ADMIN & SETTINGS
  // -------------------------------------------------
  {
    group: "System Administration",
    items: [
      {
        name: "Integrations",
        icon: Zap,
        href: "/dashboard/integrations",
        subItems: [
          { name: "Government APIs", href: "/dashboard/integrations/gov" },
          { name: "SMS / Email", href: "/dashboard/integrations/communication" },
          { name: "Payment Gateways", href: "/dashboard/integrations/payments" },
          { name: "Webhooks", href: "/dashboard/integrations/webhooks" },
        ],
      },
      {
        name: "Platform Settings",
        icon: Settings,
        href: "/dashboard/settings",
        subItems: [
          { name: "General", href: "/dashboard/settings/general" },
          { name: "Security", href: "/dashboard/settings/security" },
          { name: "API Keys", href: "/dashboard/settings/api" },
          { name: "Feature Flags", href: "/dashboard/settings/features" },
        ],
      },
    ],
  },
];
