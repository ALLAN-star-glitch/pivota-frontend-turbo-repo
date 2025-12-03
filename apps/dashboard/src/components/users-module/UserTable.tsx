"use client";

import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { User } from "../../../libs/types/users/user";
import Image from "next/image";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-soft-red-100 text-soft-red-700";
      case "Premium User":
        return "bg-pivota-teal-100 text-pivota-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-pivota-teal-100 text-pivota-teal-700";
      case "Custom":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-pivota-teal-100 text-pivota-teal-700";
      case "Suspended":
        return "bg-soft-red-100 text-soft-red-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "User",
                "Role",
                "Plan",
                "Category",
                "Status",
                "Last Active",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* USER */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      <p className="text-xs text-gray-400 truncate">{user.userId}</p>
                    </div>
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* PLAN */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanBadgeColor(user.plan)}`}
                  >
                    {user.plan}
                  </span>
                </td>

                {/* CATEGORY */}
                <td className="px-4 py-3">
                  <span className="text-sm truncate">{user.category}</span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* LAST ACTIVE */}
                <td className="px-4 py-3">
                  <span className="text-sm truncate">{user.lastActive}</span>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button className="p-1 text-pivota-teal-600 hover:bg-pivota-teal-50 rounded transition-colors cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-pivota-teal-600 hover:bg-pivota-teal-50 rounded transition-colors cursor-pointer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-soft-red-600 hover:bg-soft-red-50 rounded transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
