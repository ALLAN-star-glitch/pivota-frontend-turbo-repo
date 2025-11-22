"use client";

import React from "react";
import { EyeIcon, EditIcon } from "lucide-react";
import { SystemRole } from "../../../libs/types/access-management/type";

interface SystemRolesTableProps {
  onViewRole: (role: SystemRole) => void;
  onEditRole: (role: SystemRole) => void;
}

export function SystemRolesTable({ onViewRole, onEditRole }: SystemRolesTableProps) {
  const roles: SystemRole[] = [
    { id: "1", type: "RootGuardian", name: "Root Guardian", description: "Full system authority", usersAssigned: 1, status: "Active" },
    { id: "2", type: "ContentManagerAdmin", name: "Content Manager Admin", description: "Manages all content", usersAssigned: 6, status: "Active" },
    { id: "3", type: "ComplianceAdmin", name: "Compliance Admin", description: "Ensures compliance", usersAssigned: 4, status: "Active" },
    { id: "4", type: "FraudAdmin", name: "Fraud Admin", description: "Handles risk & fraud", usersAssigned: 2, status: "Active" },
    { id: "5", type: "AnalyticsAdmin", name: "Analytics Admin", description: "Trends & reporting", usersAssigned: 1, status: "Active" },
    { id: "6", type: "CategoryManager", name: "Category Manager", description: "Manages business modules", usersAssigned: 3, status: "Active" },
    { id: "7", type: "ServiceProvider", name: "Service Provider", description: "Businesses posting listings", usersAssigned: 122, status: "Active" },
    { id: "8", type: "RegisteredUser", name: "Registered User", description: "Basic platform account", usersAssigned: 800, status: "Active" },
  ];

  const systemOrder = [
    "RootGuardian",
    "ContentManagerAdmin",
    "ComplianceAdmin",
    "FraudAdmin",
    "AnalyticsAdmin",
    "CategoryManager",
    "ServiceProvider",
    "RegisteredUser",
  ];

  const sortedRoles = [...roles].sort((a, b) => {
    const aIndex = systemOrder.indexOf(a.type);
    const bIndex = systemOrder.indexOf(b.type);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  const getRoleBadgeColor = (type: SystemRole["type"]) => {
    switch (type) {
      case "RootGuardian": return "bg-red-100 text-red-700";
      case "ContentManagerAdmin": return "bg-blue-100 text-blue-700";
      case "ComplianceAdmin": return "bg-purple-100 text-purple-700";
      case "FraudAdmin": return "bg-pink-100 text-pink-700";
      case "AnalyticsAdmin": return "bg-indigo-100 text-indigo-700";
      case "CategoryManager": return "bg-teal-100 text-teal-700";
      case "ServiceProvider": return "bg-amber-100 text-amber-700";
      case "RegisteredUser": default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* Table for md+ */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Roles Table</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Role Name", "Description", "Users Assigned", "Status", "Actions"].map(label => (
                  <th key={label} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRoles.map(role => (
                <tr key={role.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{role.name}</span>
                      <span className={`mt-1 px-2 inline-flex text-xs font-semibold rounded-full w-fit ${getRoleBadgeColor(role.type)}`}>{role.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.usersAssigned ?? 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${role.status === "Active" ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-700"}`}>{role.status ?? "Inactive"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button onClick={() => onViewRole(role)} className="cursor-pointer text-teal-600 hover:text-teal-800"><EyeIcon className="h-5 w-5" /></button>
                      <button onClick={() => onEditRole(role)} className="cursor-pointer text-amber-600 hover:text-amber-800"><EditIcon className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden space-y-4">
        {sortedRoles.map(role => (
          <div key={role.id} className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{role.name}</span>
                <span className={`mt-1 px-2 inline-flex text-xs font-semibold rounded-full w-fit ${getRoleBadgeColor(role.type)}`}>{role.type}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onViewRole(role)} className="text-teal-600 hover:text-teal-800"><EyeIcon className="h-5 w-5" /></button>
                <button onClick={() => onEditRole(role)} className="text-amber-600 hover:text-amber-800"><EditIcon className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="text-sm text-gray-500">{role.description}</div>
            <div className="flex justify-between text-sm">
              <span>Users: {role.usersAssigned ?? 0}</span>
              <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${role.status === "Active" ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-700"}`}>{role.status ?? "Inactive"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
