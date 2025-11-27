'use client'

import React, { useState } from 'react'
import { CheckIcon, FilterIcon, SearchIcon } from 'lucide-react'
import {
  SystemPermission,
  SystemPermissionMatrixEntry,
  SystemPermissiosMatrixProps,
  SystemRole,
} from '../../../libs/types/access-management/type'

export function SystemPermissionMatrix({
  roles: initialRoles,
  permissions: initialPermissions,
  matrix: initialMatrix,
  onTogglePermission,
}: SystemPermissiosMatrixProps) {
  // --------------------------------------------
  // MOCK DATA (only used if props not provided)
  // --------------------------------------------
  const roles: SystemRole[] =
    initialRoles ??
    [
      { id: '1', name: 'Root Guardian', type: 'RootGuardian' },
      { id: '2', name: 'System Administrator', type: 'SystemAdmin' },
      { id: '3', name: 'Business System Admin', type: 'BusinessSystemAdmin' },
      { id: '4', name: 'Business Content Manager', type: 'BusinessContentManager' },
      { id: '5', name: 'General User', type: 'GeneralUser' },
    ]

  const permissions: SystemPermission[] =
    initialPermissions ??
    [
      // ---- System Scope ----
      { id: '1', name: 'user.view', description: 'View all users', scope: 'system' },
      { id: '2', name: 'user.create', description: 'Create users', scope: 'system' },
      { id: '3', name: 'user.edit', description: 'Edit user details', scope: 'system' },
      { id: '4', name: 'user.delete', description: 'Delete users', scope: 'system' },
      { id: '5', name: 'role.assign', description: 'Assign system roles', scope: 'system' },
      { id: '6', name: 'permission.assign', description: 'Assign system permissions', scope: 'system' },

      // ---- Business Scope ----
      { id: '7', name: 'listing.view', description: 'View listings', scope: 'business' },
      { id: '8', name: 'listing.create', description: 'Create listings', scope: 'business' },
      { id: '9', name: 'listing.edit', description: 'Edit listings', scope: 'business' },
      { id: '10', name: 'listing.approve', description: 'Approve listings', scope: 'business' },
      { id: '11', name: 'listing.delete', description: 'Delete listings', scope: 'business' },
    ]

  const matrix: SystemPermissionMatrixEntry[] =
    initialMatrix ??
    [
      // RootGuardian → all permissions
      ...permissions.map((p) => ({
        roleId: '1',
        permissionId: p.id,
        assigned: true,
      })),

      // SystemAdmin → all system permissions only
      ...permissions
        .filter((p) => p.scope === 'system')
        .map((p) => ({
          roleId: '2',
          permissionId: p.id,
          assigned: true,
        })),

      // Business System Admin → all business permissions
      ...permissions
        .filter((p) => p.scope === 'business')
        .map((p) => ({
          roleId: '3',
          permissionId: p.id,
          assigned: true,
        })),

      // Business Content Manager → only listing.edit & listing.approve
      { roleId: '4', permissionId: '7', assigned: true },
      { roleId: '4', permissionId: '9', assigned: true },
      { roleId: '4', permissionId: '10', assigned: true },

      // General User → listing.view
      { roleId: '5', permissionId: '7', assigned: true },
    ]

  // --------------------------------------------
  // SEARCH & FILTER
  // --------------------------------------------
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedScope, setSelectedScope] = useState('')

  const scopes = ['system', 'business']

  const filteredPermissions = permissions.filter(
    (permission) =>
      (permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedScope || permission.scope === selectedScope)
  )

  // --------------------------------------------
  // Permission Toggle
  // --------------------------------------------
  const isPermissionAssigned = (roleId: string, permissionId: string) =>
    matrix.find((item) => item.roleId === roleId && item.permissionId === permissionId)?.assigned ?? false

  const handleTogglePermission = (role: SystemRole, permission: SystemPermission) => {
    onTogglePermission(role, permission)
  }

  // --------------------------------------------
  // RENDER
  // --------------------------------------------
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">System Permission Matrix</h2>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search permissions"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Scope Filter */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">All Scopes</option>
                {scopes.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PERMISSION TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role / Permission
              </th>

              {filteredPermissions.map((permission) => (
                <th key={permission.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  <div className="flex flex-col items-center">
                    <span>{permission.name}</span>
                    <span className="text-xs text-gray-400 mt-1">{permission.scope}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>

                {filteredPermissions.map((permission) => {
                  const assigned = isPermissionAssigned(role.id, permission.id)

                  return (
                    <td key={`${role.id}-${permission.id}`} className="px-4 py-4 text-center">
                      <button
                        className={`cursor-pointer w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
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
