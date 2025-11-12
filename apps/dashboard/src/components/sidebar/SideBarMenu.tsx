"use client";

import {
  Home,
  Users,
  User,
  ClipboardList,
  MessageSquare,
  PieChart,
  Settings,
  Calendar,
  DollarSign,
  Send,
  FileText,
  Zap,
  CreditCard,
  Bell,
  Clock,
  ShieldCheck,
  FilePlus,
  Clipboard,
  BookOpen,
  Archive,
  Grid,
  Database,
  Globe,
  Wallet,
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
 * Tailored menu for Pivota Connect Dashboard
 * - focuses on users, providers, bookings, community, payments, insights, and admin settings
 */
export const menuGroups: MenuGroup[] = [
  {
    group: "General",
    items: [
      { name: "Overview", icon: Home, href: "/" },
      {
        name: "Quick Actions",
        icon: Grid,
        href: "/dashboard/quick-actions",
        subItems: [
          { name: "Book Session", href: "/dashboard/bookings/new" },
          { name: "Add Client", href: "/dashboard/clients/add" },
          { name: "Upload Record", href: "/dashboard/records/upload" },
        ],
      },
    ],
  },

  {
    group: "Users & Providers",
    items: [
      {
        name: "Members",
        icon: Users,
        href: "/dashboard/members",
        subItems: [
          { name: "All Users", href: "/dashboard/members/all" },
          { name: "Service Providers", href: "/dashboard/members/providers" },
          { name: "Verification Requests", href: "/dashboard/members/verify" },
        ],
      },
      {
        name: "Roles & Access",
        icon: User,
        href: "/dashboard/access",
        subItems: [
          { name: "Roles", href: "/dashboard/access/roles" },
          { name: "Permissions", href: "/dashboard/access/permissions" },
        ],
      },
      {
        name: "Categories",
        icon: ClipboardList,
        href: "/dashboard/categories",
        subItems: [
          { name: "All Categories", href: "/dashboard/categories/all" },
          { name: "Rules & Requirements", href: "/dashboard/categories/rules" },
        ],
      },
    ],
  },

  {
    group: "Bookings & Events",
    items: [
      {
        name: "Bookings",
        icon: Calendar,
        href: "/dashboard/bookings",
        subItems: [
          { name: "Upcoming", href: "/dashboard/bookings/upcoming" },
          { name: "Completed", href: "/dashboard/bookings/completed" },
          { name: "Cancelled", href: "/dashboard/bookings/cancelled" },
        ],
      },
      {
        name: "Events",
        icon: Clipboard,
        href: "/dashboard/events",
        subItems: [
          { name: "All Events", href: "/dashboard/events/all" },
          { name: "Create Event", href: "/dashboard/events/create" },
          { name: "Registrations", href: "/dashboard/events/registrations" },
        ],
      },
      {
        name: "Scheduler",
        icon: Clock,
        href: "/dashboard/scheduler",
        subItems: [
          { name: "My Calendar", href: "/dashboard/scheduler/calendar" },
          { name: "Automations", href: "/dashboard/scheduler/automations" },
        ],
      },
    ],
  },

  {
    group: "Health & Records",
    items: [
      {
        name: "My Records",
        icon: FileText,
        href: "/dashboard/records",
        subItems: [
          { name: "All Records", href: "/dashboard/records/all" },
          { name: "Upload Record", href: "/dashboard/records/upload" },
          { name: "Shared With Me", href: "/dashboard/records/shared" },
        ],
      },
      {
        name: "Storage",
        icon: Database,
        href: "/dashboard/storage",
        subItems: [
          { name: "Usage", href: "/dashboard/storage/usage" },
          { name: "Manage Files", href: "/dashboard/storage/manage" },
        ],
      },
    ],
  },

  {
    group: "Community",
    items: [
      {
        name: "Groups",
        icon: MessageSquare,
        href: "/dashboard/community",
        subItems: [
          { name: "My Groups", href: "/dashboard/community/my" },
          { name: "Find Groups", href: "/dashboard/community/find" },
        ],
      },
      {
        name: "Messages",
        icon: Send,
        href: "/dashboard/messages",
        subItems: [
          { name: "Inbox", href: "/dashboard/messages/inbox" },
          { name: "New Message", href: "/dashboard/messages/new" },
        ],
      },
      {
        name: "Notifications",
        icon: Bell,
        href: "/dashboard/notifications",
        subItems: [
          { name: "All Notifications", href: "/dashboard/notifications/all" },
          { name: "Preferences", href: "/dashboard/notifications/settings" },
        ],
      },
    ],
  },

  {
    group: "Plans & Payments",
    items: [
      {
        name: "Billing & Plans",
        icon: CreditCard,
        href: "/dashboard/billing",
        subItems: [
          { name: "My Subscription", href: "/dashboard/billing/subscription" },
          { name: "Invoices", href: "/dashboard/billing/invoices" },
          { name: "Usage & Limits", href: "/dashboard/billing/usage" },
        ],
      },
      {
        name: "Earnings",
        icon: DollarSign,
        href: "/dashboard/earnings",
        subItems: [
          { name: "Payouts", href: "/dashboard/earnings/payouts" },
          { name: "Payment Methods", href: "/dashboard/earnings/methods" },
        ],
      },
      {
        name: "Wallet",
        icon: Wallet,
        href: "/dashboard/wallet",
        subItems: [
          { name: "Transactions", href: "/dashboard/wallet/transactions" },
          { name: "Top-up", href: "/dashboard/wallet/topup" },
          { name: "Withdraw", href: "/dashboard/wallet/withdraw" },
        ],
      },
    ],
  },

  {
    group: "Reports & Insights",
    items: [
      {
        name: "Analytics",
        icon: PieChart,
        href: "/dashboard/reports",
        subItems: [
          { name: "Booking Trends", href: "/dashboard/reports/bookings" },
          { name: "Revenue", href: "/dashboard/reports/revenue" },
          { name: "User Activity", href: "/dashboard/reports/users" },
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

  {
    group: "Integrations",
    items: [
      {
        name: "Connected Apps",
        icon: Zap,
        href: "/dashboard/integrations",
        subItems: [
          { name: "Zoom / Google Meet", href: "/dashboard/integrations/meet" },
          { name: "Google Calendar", href: "/dashboard/integrations/calendar" },
          { name: "Fitbit / Health Apps", href: "/dashboard/integrations/fitbit" },
          { name: "WhatsApp Business", href: "/dashboard/integrations/whatsapp" },
        ],
      },
      {
        name: "API & Developer Tools",
        icon: Globe,
        href: "/dashboard/developer",
        subItems: [
          { name: "API Keys", href: "/dashboard/developer/api-keys" },
          { name: "Webhooks", href: "/dashboard/developer/webhooks" },
        ],
      },
    ],
  },

  {
    group: "Admin & Settings",
    items: [
      {
        name: "Platform Settings",
        icon: Settings,
        href: "/dashboard/settings",
        subItems: [
          { name: "Profile", href: "/dashboard/settings/profile" },
          { name: "Security", href: "/dashboard/settings/security" },
          { name: "Notifications", href: "/dashboard/settings/notifications" },
          { name: "Integrations", href: "/dashboard/settings/integrations" },
        ],
      },
      {
        name: "Admin Console",
        icon: ShieldCheck,
        href: "/dashboard/admin",
        subItems: [
          { name: "User Management", href: "/dashboard/admin/users" },
          { name: "Plans & Pricing", href: "/dashboard/admin/plans" },
          { name: "System Usage", href: "/dashboard/admin/usage" },
        ],
      },
    ],
  },

  {
    group: "Help & Support",
    items: [
      {
        name: "Knowledge Base",
        icon: BookOpen,
        href: "/dashboard/help",
        subItems: [
          { name: "Getting Started", href: "/dashboard/help/start" },
          { name: "FAQs", href: "/dashboard/help/faqs" },
          { name: "API Docs", href: "/dashboard/help/api" },
        ],
      },
      {
        name: "Support Center",
        icon: FilePlus,
        href: "/dashboard/support",
        subItems: [
          { name: "Open Ticket", href: "/dashboard/support/new" },
          { name: "My Tickets", href: "/dashboard/support/list" },
        ],
      },
    ],
  },
];
