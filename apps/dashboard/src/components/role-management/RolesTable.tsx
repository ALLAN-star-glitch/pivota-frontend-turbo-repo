'use client'

import React from 'react'
import { EyeIcon, EditIcon } from 'lucide-react'
import { Role } from '../../../libs/types/role-management/type'


interface RolesTableProps {
  onViewRole: (role: Role) => void
  onEditRole: (role: Role) => void
}

export function RolesTable({ onViewRole, onEditRole }: RolesTableProps) {
  // Temporary mock roles
  const roles: Role[] = [
    {
      id: '1',
      name: 'RootGuardian',
      description: 'Super administrator with full system access',
      usersAssigned: 1,
      status: 'Active',
      type: 'RootGuardian',
    },
    {
      id: '2',
      name: 'Content Administrator',
      description: 'Manages and approves content and listings',
      usersAssigned: 3,
      status: 'Active',
      type: 'Admin',
    },
    {
      id: '3',
      name: 'User Administrator',
      description: 'Manages user accounts and access',
      usersAssigned: 2,
      status: 'Active',
      type: 'Admin',
    },
    {
      id: '4',
      name: 'Healthcare Provider',
      description: 'Provides services in healthcare category',
      usersAssigned: 15,
      status: 'Active',
      type: 'ServiceProvider',
    },
    {
      id: '5',
      name: 'Education Provider',
      description: 'Provides services in education category',
      usersAssigned: 8,
      status: 'Inactive',
      type: 'ServiceProvider',
    },
    {
      id: '6',
      name: 'Standard User',
      description: 'Regular user with basic permissions',
      usersAssigned: 156,
      status: 'Active',
      type: 'RegisteredUser',
    },
  ]

  // Style color by role type
  const getRoleBadgeColor = (type: Role['type']) => {
    switch (type) {
      case 'RootGuardian':
        return 'bg-red-100 text-red-700'
      case 'Admin':
        return 'bg-teal-100 text-teal-700'
      case 'ServiceProvider':
        return 'bg-amber-100 text-amber-700'
      case 'RegisteredUser':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Roles Overview</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* TABLE HEADER */}
          <thead className="bg-gray-50">
            <tr>
              {['Role Name', 'Description', 'Users Assigned', 'Status', 'Actions'].map(
                (label) => (
                  <th
                    key={label}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 transition-colors duration-150">
                {/* Role Name + Type Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {role.name}
                    </span>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(
                        role.type
                      )}`}
                    >
                      {role.type}
                    </span>
                  </div>
                </td>

                {/* Description */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {role.description || '—'}
                  </span>
                </td>

                {/* Users Assigned */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {role.usersAssigned ?? 0}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      role.status === 'Active'
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {role.status ?? 'Inactive'}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    {/* View */}
                    <button
                      onClick={() => onViewRole(role)}
                      className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors duration-150"
                      title="View role"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => onEditRole(role)}
                      className="cursor-pointer text-amber-600 hover:text-amber-800 transition-colors duration-150"
                      title="Edit role"
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
