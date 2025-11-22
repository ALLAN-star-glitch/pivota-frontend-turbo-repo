import React from 'react'
import { Eye } from 'lucide-react'
interface HeaderProps {
  onManagePermissions: () => void
}
export function Header({ onManagePermissions }: HeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg px-6 py-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">System Access</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage system roles and permissions for users in the
            PivotaConnect system.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onManagePermissions}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            System Permissions
          </button>
         
        </div>
      </div>
    </div>
  )
}
