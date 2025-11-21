import React from 'react'
import { PlusIcon, ShieldIcon } from 'lucide-react'
interface HeaderProps {
  onCreateRole: () => void
  onManagePermissions: () => void
}
export function Header({ onCreateRole, onManagePermissions }: HeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg px-6 py-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage roles, permissions, and assignments for users in the
            PivotaConnect system.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onManagePermissions}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
          >
            <ShieldIcon className="h-4 w-4 mr-2" />
            Manage Permissions
          </button>
          <button
            onClick={onCreateRole}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Role
          </button>
        </div>
      </div>
    </div>
  )
}
