"use client";

import { FC } from "react";
import {
  Users,
  Briefcase,
  Heart,
  DollarSign,
  CheckCircle,
  UserCheck,
  ClipboardList,
  Shield,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpiData = [
  {
    title: "Total Users",
    value: 1245,
    icon: <Users className="w-6 h-6 text-white" />,
    bg: "bg-gradient-to-r from-teal-400 to-teal-600",
  },
  {
    title: "Active Listings",
    value: 312,
    icon: <Briefcase className="w-6 h-6 text-white" />,
    bg: "bg-gradient-to-r from-amber-300 to-amber-500",
  },
  {
    title: "Engagement",
    value: "82%",
    icon: <Heart className="w-6 h-6 text-white" />,
    bg: "bg-gradient-to-r from-rose-200 to-rose-400",
  },
  {
    title: "Revenue",
    value: "$14,320",
    icon: <DollarSign className="w-6 h-6 text-white" />,
    bg: "bg-gradient-to-r from-emerald-500 to-teal-600",
  },
];

const lineChartData = [
  { day: "Mon", users: 120, listings: 45 },
  { day: "Tue", users: 200, listings: 60 },
  { day: "Wed", users: 150, listings: 80 },
  { day: "Thu", users: 250, listings: 120 },
  { day: "Fri", users: 300, listings: 150 },
  { day: "Sat", users: 200, listings: 100 },
  { day: "Sun", users: 180, listings: 90 },
];

const pieData = [
  { name: "Designers", value: 120, color: "#14B8A6" },
  { name: "Developers", value: 90, color: "#FBBF24" },
  { name: "Marketers", value: 60, color: "#FCA5A5" },
  { name: "Others", value: 30, color: "#99F6E4" },
];

const recentActivities = [
  { icon: <CheckCircle className="text-teal-500" />, text: "New user registered: Allan M.", time: "2h ago" },
  { icon: <CheckCircle className="text-amber-500" />, text: "Listing approved: Web Design", time: "4h ago" },
  { icon: <CheckCircle className="text-rose-400" />, text: "Payment failed for order #124", time: "5h ago" },
];

const topListings = [
  { title: "Web Design Services", price: "$400 / project" },
  { title: "House Rental", price: "$1200 / month" },
  { title: "Social Media Marketing", price: "$300 / campaign" },
];

const pendingApprovals = [
  { type: "User", name: "John Doe" },
  { type: "Listing", name: "Photography Services" },
  { type: "User", name: "Mary Jane" },
];

const topUsers = [
  { name: "Allan M.", listings: 5 },
  { name: "Mary J.", listings: 4 },
  { name: "Peter L.", listings: 3 },
];

const DashboardOverview: FC = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Main Section */}
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
          <p className="text-gray-500">{today}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <div
              key={kpi.title}
              className={`p-6 rounded-2xl text-white shadow-sm hover:shadow-lg transition ${kpi.bg} flex items-center justify-between border-r-4 border-white/30`}
            >
              <div>
                <p className="text-sm font-medium opacity-90">{kpi.title}</p>
                <p className="text-3xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div className="p-3 bg-white/15 rounded-full">{kpi.icon}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-r-4 border-teal-400">
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#14B8A6" strokeWidth={2.5} />
                <Line type="monotone" dataKey="listings" stroke="#F59E0B" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-r-4 border-amber-400">
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">
              User Categories / Roles
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold p-5 rounded-xl shadow-sm hover:shadow-md transition border-r-4 border-teal-300">
            Manage Users
          </button>
          <button className="bg-gradient-to-r from-amber-300 to-amber-500 text-white font-semibold p-5 rounded-xl shadow-sm hover:shadow-md transition border-r-4 border-amber-300">
            Manage Listings
          </button>
          <button className="bg-gradient-to-r from-rose-200 to-rose-400 text-white font-semibold p-5 rounded-xl shadow-sm hover:shadow-md transition border-r-4 border-rose-300">
            View Reports
          </button>
        </div>

        {/* Top Listings */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4 text-lg">Top Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topListings.map((listing, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border-r-4 border-teal-400"
              >
                <p className="font-semibold text-gray-800">{listing.title}</p>
                <p className="text-gray-500 text-sm mt-1">{listing.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-96 p-6 bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner space-y-6 rounded-l-2xl">
        {/* Mini KPIs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-xl text-white shadow-sm border-r-4 border-teal-300">
            <p className="text-sm">Admins</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-gradient-to-r from-amber-300 to-amber-500 p-4 rounded-xl text-white shadow-sm border-r-4 border-amber-300">
            <p className="text-sm">Premium Users</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="bg-gradient-to-r from-rose-200 to-rose-400 p-4 rounded-xl text-white shadow-sm border-r-4 border-rose-300">
            <p className="text-sm">Pending Approvals</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-400 to-teal-600 p-4 rounded-xl text-white shadow-sm border-r-4 border-teal-300">
            <p className="text-sm">Active Plans</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-gray-800 font-semibold text-lg">Quick Actions</h3>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-white hover:from-white hover:to-teal-50 rounded-xl shadow-sm transition border-r-4 border-teal-300">
              <UserCheck className="w-5 h-5 text-teal-600" /> Add User
            </button>
            <button className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-white hover:from-white hover:to-amber-50 rounded-xl shadow-sm transition border-r-4 border-amber-300">
              <ClipboardList className="w-5 h-5 text-amber-500" /> Approve Listings
            </button>
            <button className="flex items-center gap-2 p-3 bg-gradient-to-r from-rose-50 to-white hover:from-white hover:to-rose-50 rounded-xl shadow-sm transition border-r-4 border-rose-300">
              <Shield className="w-5 h-5 text-rose-500" /> Generate Report
            </button>
          </div>
        </div>

        {/* Pending Approvals */}
        <div>
          <h3 className="text-gray-800 font-semibold text-lg">Pending Approvals</h3>
          <div className="bg-gradient-to-br from-amber-50 to-gray-50 p-4 rounded-xl shadow-sm space-y-3 border-r-4 border-amber-300">
            {pendingApprovals.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b last:border-0 pb-2">
                <p className="text-gray-700 text-sm">
                  {item.type}: {item.name}
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-xs hover:bg-teal-600">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-rose-400 text-white rounded-lg text-xs hover:bg-rose-500">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-r-4 border-teal-300 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
          <h3 className="text-gray-800 font-semibold text-lg mb-3">Recent Activity</h3>
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-white rounded-full">{activity.icon}</div>
              <div>
                <p className="text-gray-800 text-sm">{activity.text}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Users */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl space-y-2 border-r-4 border-teal-300">
          <h3 className="text-gray-800 font-semibold text-lg mb-2">Top Users</h3>
          {topUsers.map((user, idx) => (
            <p key={idx} className="text-gray-700">
              {user.name} - {user.listings} listings
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
