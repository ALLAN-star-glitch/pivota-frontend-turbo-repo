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
          { name: "Add Informal Job", href: "/add-informal-job-listing" },
          { name: "Add Formal Job", href: "/add-formal-job-listing" },
          { name: "Add Property", href: "/dashboard/housing/add" },
          { name: "Add Freelancer / Professional", href: "/dashboard/partners/individuals/professionals/add" },
          { name: "Add Organization Service", href: "/dashboard/services/organizations/add" },
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
      { name: "All Users", icon: Users, href: "/dashboard/users/all" },
      {
        name: "Individuals",
        icon: User,
        href: "/dashboard/partners/individuals",
        subItems: [
          { name: "Landlords", href: "/dashboard/partners/individuals/landlords" },
          { name: "Freelancers / Professionals", href: "/dashboard/partners/individuals/professionals" },
          { name: "Add Freelancer / Professional", href: "/dashboard/partners/individuals/professionals/add" },
          { name: "Pending Approvals", href: "/dashboard/partners/individuals/pending" },
          { name: "Reported Listings", href: "/dashboard/partners/individuals/reported" },
        ],
      },
      {
        name: "Organizations",
        icon: User,
        href: "/dashboard/partners/organizations",
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
        subItems: [
          { name: "All Jobs", href: "/dashboard/jobs/formal/all" },
          { name: "Create Job Listing", href: "/dashboard/jobs/formal/add" },
          { name: "Pending Approvals", href: "/dashboard/jobs/formal/pending" },
          { name: "Reported Jobs", href: "/dashboard/jobs/formal/reported" },
          { name: "Applications", href: "/dashboard/jobs/formal/applications" },
          { name: "Payments / Compensation", href: "/dashboard/jobs/formal/payments" },
        ],
      },
      {
        name: "Informal Jobs",
        icon: ClipboardList,
        href: "/dashboard/jobs/informal",
        subItems: [
          { name: "All Jobs", href: "/dashboard/jobs/informal/all" },
          { name: "Create Job Listing", href: "/create-job-listing" },
          { name: "Pending Approvals", href: "/dashboard/jobs/informal/pending" },
          { name: "Reported Jobs", href: "/dashboard/jobs/informal/reported" },
          { name: "Applications", href: "/dashboard/jobs/informal/applications" },
          { name: "Payments / Compensation", href: "/dashboard/jobs/informal/payments" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // SERVICES MANAGEMENT
  // -------------------------------------------------
  {
    group: "Services",
    items: [
      {
        name: "For Professionals",
        icon: ClipboardList,
        href: "/dashboard/services/freelancers",
        subItems: [
          { name: "All Services", href: "/dashboard/services/freelancers/all" },
          { name: "Create Service Listing", href: "/dashboard/services/freelancers/add" },
          { name: "Pending Approvals", href: "/dashboard/services/freelancers/pending" },
          { name: "Reported Services", href: "/dashboard/services/freelancers/reported" },
          { name: "Service Applications / Requests", href: "/dashboard/services/freelancers/applications" },
          { name: "Payments / Compensation", href: "/dashboard/services/freelancers/payments" },
        ],
      },
      {
        name: "For Organizations",
        icon: Users,
        href: "/dashboard/services/organizations",
        subItems: [
          { name: "All Services", href: "/dashboard/services/organizations/all" },
          { name: "Create Service Listing", href: "/dashboard/services/organizations/add" },
          { name: "Pending Approvals", href: "/dashboard/services/organizations/pending" },
          { name: "Reported Services", href: "/dashboard/services/organizations/reported" },
          { name: "Service Applications / Requests", href: "/dashboard/services/organizations/applications" },
          { name: "Payments / Compensation", href: "/dashboard/services/organizations/payments" },
        ],
      },
    ],
  },

  // -------------------------------------------------
  // SUPPORT PROGRAMS
  // -------------------------------------------------
  {
    group: "Support",
    items: [
      {
        name: "Programs",
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
        subItems: [
          { name: "Invoices", href: "/dashboard/billing/invoices" },
          { name: "Usage & Overages", href: "/dashboard/billing/usage" },
        ],
      },
      {
        name: "Payment Methods",
        icon: DollarSign,
        href: "/dashboard/payments",
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
        subItems: [
          { name: "User Analytics", href: "/dashboard/reports/users" },
          { name: "Jobs Reports", href: "/dashboard/reports/jobs" },
          { name: "Housing Reports", href: "/dashboard/reports/housing" },
          { name: "Services Reports", href: "/dashboard/reports/services" },
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
      { name: "System Access", icon: ShieldCheck, href: "/system-access" },
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
];
