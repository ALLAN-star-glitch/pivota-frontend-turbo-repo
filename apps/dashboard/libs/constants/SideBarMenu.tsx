"use client";

import {
  Home,
  Users,
  User,
  ClipboardList,
  PieChart,
  Settings,
  DollarSign,
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
  disabled?: boolean;
}

export interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  subItems?: SubItem[];
  disabled?: boolean;
  roles?: string[]; // Optional: restrict visibility per role
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

export const menuGroups: MenuGroup[] = [
  // -------------------------------------------------
  // GENERAL
  // -------------------------------------------------
  {
    group: "General",
    items: [
      { name: "Overview", icon: Home, href: "/", roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager","GeneralUser"] },
      {
        name: "Quick Actions",
        icon: Grid,
        href: "/dashboard/quick-actions",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin"],
        subItems: [
          { name: "Add User", href: "/dashboard/users/add" },
          { name: "Add Informal Job", href: "/jobs/informal-jobs/add-informal-job" },
          { name: "Add Formal Job", href: "/add-formal-job" },
          { name: "Add Property", href: "/dashboard/housing/add" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // USERS & PARTNERS
  // -------------------------------------------------
  {
    group: "Users & Partners",
    items: [
      { name: "All Users", icon: Users, href: "/all-users", roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin"] },
      {
        name: "Individuals",
        icon: User,
        href: "/dashboard/partners/individuals",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "Landlords", href: "/dashboard/partners/individuals/landlords" },
          { name: "Freelancers / Professionals", href: "/dashboard/partners/individuals/professionals" },
          { name: "Pending Approvals", href: "/dashboard/partners/individuals/pending" },
          { name: "Reported Listings", href: "/dashboard/partners/individuals/reported" },
        ],
      },
      {
        name: "Organizations",
        icon: User,
        href: "/dashboard/partners/organizations",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "Employers", href: "/dashboard/partners/organizations/employers" },
          { name: "NGOs / Support Orgs", href: "/dashboard/partners/organizations/ngos" },
          { name: "Businesses", href: "/dashboard/partners/organizations/businesses" },
          { name: "Pending Approvals", href: "/dashboard/partners/organizations/pending" },
          { name: "Reported Listings", href: "/dashboard/partners/organizations/reported" },
        ],
      },
      {
        name: "The Vulnerable",
        icon: Users,
        href: "/dashboard/users/vulnerable",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "List Vulnerable Users", href: "/dashboard/users/vulnerable/list" },
          { name: "Add Vulnerable User", href: "/dashboard/users/vulnerable/add" },
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
        name: "Rentals",
        icon: Database,
        href: "/dashboard/housing/rentals",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "All Rentals", href: "/dashboard/housing/rentals/all" },
          { name: "Create Rental Listing", href: "/dashboard/housing/rentals/add" },
          { name: "Pending Approvals", href: "/dashboard/housing/rentals/pending" },
          { name: "Reported Rentals", href: "/dashboard/housing/rentals/reported" },
          { name: "Maintenance Requests", href: "/dashboard/housing/rentals/maintenance" },
          { name: "Tenant Applications", href: "/dashboard/housing/rentals/applications" },
          { name: "Payments / Deposits", href: "/dashboard/housing/rentals/payments" },
        ],
      },
      {
        name: "Houses for Sale",
        icon: Database,
        href: "/dashboard/housing/sales",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "All Houses", href: "/dashboard/housing/sales/all" },
          { name: "Create Sale Listing", href: "/dashboard/housing/sales/add" },
          { name: "Pending Approvals", href: "/dashboard/housing/sales/pending" },
          { name: "Reported Listings", href: "/dashboard/housing/sales/reported" },
          { name: "Buyer Applications", href: "/dashboard/housing/sales/applications" },
          { name: "Payments / Deposits", href: "/dashboard/housing/sales/payments" },
        ],
      },
      {
        name: "Compliance",
        icon: Clipboard,
        href: "/dashboard/housing/compliance",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "Compliance Cases", href: "/dashboard/housing/compliance/cases" },
          { name: "Resolved Cases", href: "/dashboard/housing/compliance/resolved" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // JOBS MANAGEMENT
  // -------------------------------------------------
  {
    group: "Jobs",
    items: [
      {
        name: "Formal Jobs",
        icon: ClipboardList,
        href: "/dashboard/jobs/formal",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "All Formal Jobs", href: "/all-formal-jobs" },
          { name: "Add Formal Job", href: "/add-formal-job" },
          { name: "Applications", href: "/dashboard/jobs/formal/applications" },
          { name: "Pending Approvals", href: "/dashboard/jobs/formal/pending", disabled: true },
          { name: "Reported Jobs", href: "/dashboard/jobs/formal/reported", disabled: true },
        ],
      },
      {
        name: "Informal Jobs",
        icon: ClipboardList,
        href: "/dashboard/jobs/informal",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "Dashboard", href: "/jobs/informal-jobs/dashboard" },
          { name: "Add Job", href: "/jobs/informal-jobs/add-job" },
          { name: "Applications", href: "/jobs/informal-jobs/applications" },
          { name: "Pending Approvals", href: "/dashboard/jobs/informal/pending", disabled: true },
          { name: "Reported Jobs", href: "/dashboard/jobs/informal/reported", disabled: true },
        ],
      },
    ],
  },

// -------------------------------------------------
// SOCIAL SUPPORT
// -------------------------------------------------
{
  group: "Support",
  items: [
    // Admin / System View
    {
      name: "Programs",
      icon: BookOpen,
      href: "/dashboard/support/programs",
      roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
    },
    {
      name: "NGOs",
      icon: Users,
      href: "/dashboard/support/ngos",
      roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
    },
    {
      name: "Services",
      icon: ClipboardList,
      href: "/dashboard/support/services",
      roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
    },
    {
      name: "Add Service",
      icon: ClipboardList,
      href: "/dashboard/support/services/add",
      roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
    },
    {
      name: "Add Program",
      icon: BookOpen,
      href: "/dashboard/support/programs/add",
      roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
    },

    // NGO / Partner View
    {
      name: "My Programs",
      icon: BookOpen,
      href: "/dashboard/support/my-programs",
      roles: ["PartnerNGO","PartnerOrg"], 
      subItems: [
        { name: "Submit Program", href: "/dashboard/support/my-programs/submit" },
        { name: "View Beneficiaries", href: "/dashboard/support/my-programs/beneficiaries" },
        { name: "Emergency Requests", href: "/dashboard/support/my-programs/emergency" },
      ],
    },
    {
      name: "My Services",
      icon: ClipboardList,
      href: "/dashboard/support/my-services",
      roles: ["PartnerNGO","PartnerOrg"], 
      subItems: [
        { name: "Submit Service", href: "/dashboard/support/my-services/submit" },
        { name: "Service Applications", href: "/dashboard/support/my-services/applications" },
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
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin"],
        subItems: [
          { name: "Free Plan", href: "/dashboard/plans/free" },
          { name: "Bronze Plan", href: "/dashboard/plans/bronze" },
          { name: "Silver Plan", href: "/dashboard/plans/silver" },
          { name: "Gold Plan", href: "/dashboard/plans/gold" },
          { name: "Corporate Plan", href: "/dashboard/plans/corporate" },
          { name: "Rules & Limits", href: "/dashboard/plans/rules" },
        ],
      },
      {
        name: "Billing & Usage",
        icon: Wallet,
        href: "/dashboard/billing",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin"],
        subItems: [
          { name: "Invoices", href: "/dashboard/billing/invoices" },
          { name: "Usage & Overages", href: "/dashboard/billing/usage" },
        ],
      },
      {
        name: "Payment Methods",
        icon: DollarSign,
        href: "/dashboard/payments",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin"],
        subItems: [
          { name: "Cards", href: "/dashboard/payments/cards" },
          { name: "MPesa", href: "/dashboard/payments/mpesa" },
          { name: "Transactions", href: "/dashboard/payments/transactions" },
          { name: "Payouts", href: "/dashboard/payments/payouts" },
          { name: "Refund Requests", href: "/dashboard/payments/refunds" },
          { name: "Reconciliation", href: "/dashboard/payments/reconciliation" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // REPORTS & INSIGHTS
  // -------------------------------------------------
  {
    group: "Reports & Insights",
    items: [
      {
        name: "Analytics",
        icon: PieChart,
        href: "/dashboard/reports",
        roles: ["SuperAdmin","SystemAdmin","BusinessSystemAdmin","BusinessContentManager"],
        subItems: [
          { name: "User Analytics", href: "/dashboard/reports/users" },
          { name: "Jobs Reports", href: "/dashboard/reports/jobs" },
          { name: "Housing Reports", href: "/dashboard/reports/housing" },
          { name: "Support Impact", href: "/dashboard/reports/support" },
          { name: "Revenue Analytics", href: "/dashboard/reports/revenue" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // SYSTEM ADMINISTRATION
  // -------------------------------------------------
  {
    group: "System Administration",
    items: [
      { name: "System Access", icon: ShieldCheck, href: "/system-access", roles: ["SuperAdmin","SystemAdmin"] },
      {
        name: "Integrations",
        icon: Zap,
        href: "/dashboard/integrations",
        roles: ["SuperAdmin","SystemAdmin"],
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
        roles: ["SuperAdmin","SystemAdmin"],
        subItems: [
          { name: "General", href: "/dashboard/settings/general" },
          { name: "Security", href: "/dashboard/settings/security" },
          { name: "API Keys", href: "/dashboard/settings/api" },
          { name: "Feature Flags", href: "/dashboard/settings/features" },
        ],
      },
      {
        name: "System Logs",
        icon: Archive,
        href: "/dashboard/logs",
        roles: ["SuperAdmin","SystemAdmin"],
        subItems: [
          { name: "Audit Logs", href: "/dashboard/logs/audit" },
          { name: "Access History", href: "/dashboard/logs/access" },
        ],
      },
    ],
  },
];
