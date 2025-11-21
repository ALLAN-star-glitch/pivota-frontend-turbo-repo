import { useState } from 'react'
import { XIcon, SearchIcon, FilterIcon } from 'lucide-react'
import { Permission } from '../../../libs/types/role-management/type'


interface ManagePermissionsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data typed using Permission interface
const allPermissions: Permission[] = [
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
  { id: '12', name: 'dashboard.view', category: 'Dashboard', description: 'View dashboard' },
  { id: '13', name: 'reports.view', category: 'Reports', description: 'View reports' },
  { id: '14', name: 'reports.export', category: 'Reports', description: 'Export reports' },
  { id: '15', name: 'settings.edit', category: 'Settings', description: 'Edit system settings' },
]

export function ManagePermissionsModal({ isOpen, onClose }: ManagePermissionsModalProps) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('')

  if (!isOpen) return null

  // Extract unique categories
  const categories = Array.from(new Set(allPermissions.map(p => p.category)))

  // Apply searching and filtering
  const filtered = allPermissions.filter(permission => {
    const searchMatch =
      permission.name.toLowerCase().includes(search.toLowerCase()) ||
      permission.description.toLowerCase().includes(search.toLowerCase())

    const categoryMatch =
      !filterCategory || permission.category === filterCategory

    return searchMatch && categoryMatch
  })

  return (
    <div className="fixed inset-0 z-1000 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75" aria-hidden="true" />

        <div className="inline-block w-full max-w-3xl bg-white rounded-lg shadow-xl transform transition-all p-6 relative text-left">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-teal-500 rounded-md"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Header */}
          <h3 className="text-lg font-semibold text-gray-900">
            Manage Permissions
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            View and maintain all permissions available in the system.
          </p>

          {/* Search + Filter */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search permissions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:border-teal-500 focus:ring-teal-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative flex-1">
              <FilterIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:border-teal-500 focus:ring-teal-500 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Permission List */}
          <div className="mt-6 max-h-96 overflow-y-auto border border-gray-100 rounded-md">
            <ul className="divide-y divide-gray-200 bg-white">
              {filtered.map(permission => (
                <li key={permission.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-700 truncate">
                      {permission.name}
                    </p>
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {permission.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {permission.description}
                  </p>
                </li>
              ))}

              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-gray-500 text-sm">
                  No permissions found
                </li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-row-reverse">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
