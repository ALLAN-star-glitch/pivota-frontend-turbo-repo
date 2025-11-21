'use client'

import React, { useState } from 'react'
import { CheckIcon, FilterIcon, SearchIcon } from 'lucide-react'
import {
  Permission,
  Role,
  PermissionMatrixEntry,
  PermissionMatrixProps,
} from '../../../libs/types/role-management/type'

export function PermissionMatrix({
  roles: initialRoles,
  permissions: initialPermissions,
  matrix: initialMatrix,
  onTogglePermission,
}: PermissionMatrixProps) {
  // Optional mock data if props are not provided
  const roles: Role[] = initialRoles ?? [
    { id: '1', name: 'RootGuardian', type: 'RootGuardian' },
    { id: '2', name: 'Content Administrator', type: 'Admin' },
    { id: '3', name: 'User Administrator', type: 'Admin' },
    { id: '4', name: 'Healthcare Provider', type: 'ServiceProvider' },
    { id: '5', name: 'Education Provider', type: 'ServiceProvider' },
    { id: '6', name: 'Standard User', type: 'RegisteredUser' },
  ]

  const permissions: Permission[] = initialPermissions ?? [
    { id: '1', name: 'user.view', category: 'User Management', description: 'View user details' },
    { id: '2', name: 'user.create', category: 'User Management', description: 'Create new users' },
    { id: '3', name: 'user.edit', category: 'User Management', description: 'Edit user details' },
    { id: '4', name: 'user.delete', category: 'User Management', description: 'Delete users' },
    { id: '5', name: 'listing.view', category: 'Listings', description: 'View listings' },
    { id: '6', name: 'listing.create', category: 'Listings', description: 'Create listings' },
    { id: '7', name: 'listing.edit', category: 'Listings', description: 'Edit listings' },
    { id: '8', name: 'listing.approve', category: 'Listings', description: 'Approve listings' },
    { id: '9', name: 'listing.delete', category: 'Listings', description: 'Delete listings' },
    { id: '10', name: 'role.assign', category: 'Role Management', description: 'Assign roles' },
    { id: '11', name: 'permission.assign', category: 'Role Management', description: 'Assign permissions' },
  ]

  const matrix: PermissionMatrixEntry[] = initialMatrix ?? [
    // RootGuardian has all permissions
    ...permissions.map((permission) => ({ roleId: '1', permissionId: permission.id, assigned: true })),
    // Content Administrator
    { roleId: '2', permissionId: '5', assigned: true },
    { roleId: '2', permissionId: '6', assigned: true },
    { roleId: '2', permissionId: '7', assigned: true },
    { roleId: '2', permissionId: '8', assigned: true },
    { roleId: '2', permissionId: '9', assigned: true },
    // User Administrator
    { roleId: '3', permissionId: '1', assigned: true },
    { roleId: '3', permissionId: '2', assigned: true },
    { roleId: '3', permissionId: '3', assigned: true },
    { roleId: '3', permissionId: '4', assigned: true },
    // Healthcare Provider
    { roleId: '4', permissionId: '5', assigned: true },
    { roleId: '4', permissionId: '6', assigned: true },
    { roleId: '4', permissionId: '7', assigned: true },
    // Education Provider
    { roleId: '5', permissionId: '5', assigned: true },
    { roleId: '5', permissionId: '6', assigned: true },
    { roleId: '5', permissionId: '7', assigned: true },
    // Standard User
    { roleId: '6', permissionId: '5', assigned: true },
  ]

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Unique categories
  const categories = Array.from(new Set(permissions.map((p) => p.category)))

  // Filtered permissions
  const filteredPermissions = permissions.filter(
    (permission) =>
      (permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || permission.category === selectedCategory),
  )

  // Check if a permission is assigned
  const isPermissionAssigned = (roleId: string, permissionId: string) =>
    matrix.find((item) => item.roleId === roleId && item.permissionId === permissionId)?.assigned ?? false

  // Handle toggle
  const handleTogglePermission = (role: Role, permission: Permission) => {
    onTogglePermission(role, permission)
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">Permission Matrix</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search permissions"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role / Permission
              </th>
              {filteredPermissions.map((permission) => (
                <th
                  key={permission.id}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex flex-col items-center">
                    <span className="whitespace-nowrap">{permission.name}</span>
                    <span className="text-xs normal-case font-normal text-gray-400 mt-1">
                      {permission.category}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {role.name}
                </td>
                {filteredPermissions.map((permission) => {
                  const assigned = isPermissionAssigned(role.id, permission.id)
                  return (
                    <td key={`${role.id}-${permission.id}`} className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        title={`${assigned ? 'Remove' : 'Assign'} ${permission.name} permission from ${role.name}`}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-150 ${
                          assigned
                            ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTogglePermission(role, permission)}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
