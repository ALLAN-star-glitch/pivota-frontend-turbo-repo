import React, { useState, ChangeEvent, FormEvent } from 'react'
import { XIcon } from 'lucide-react'
import { RoleType, RoleStatus, Permission, Category } from '../../../../libs/types/role-management/type'


// -------------------------------------------------
// Form Data Type
// -------------------------------------------------
interface RoleFormData {
  name: string
  description: string
  type: RoleType
  status: RoleStatus
  categories: string[]
  permissions: string[]
}

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    type: 'ServiceProvider',
    status: 'Active',
    categories: [],
    permissions: [],
  })

  // -------------------------------------------------
  // Mock Data
  // -------------------------------------------------
  const categories: Category[] = [
    { id: '1', name: 'Healthcare' },
    { id: '2', name: 'Education' },
    { id: '3', name: 'Finance' },
    { id: '4', name: 'Legal' },
    { id: '5', name: 'Technology' },
  ]

  const permissions: Permission[] = [
    {
      id: '1',
      name: 'user.view',
      category: 'User Management',
      description: 'Allows viewing user records',
    },
    {
      id: '2',
      name: 'user.create',
      category: 'User Management',
      description: 'Allows creating new user accounts',
    },
    {
      id: '3',
      name: 'user.edit',
      category: 'User Management',
      description: 'Allows editing existing user details',
    },
    {
      id: '4',
      name: 'user.delete',
      category: 'User Management',
      description: 'Allows deleting user accounts',
    },
    {
      id: '5',
      name: 'listing.view',
      category: 'Listings',
      description: 'Allows viewing listings and posts',
    },
    {
      id: '6',
      name: 'listing.create',
      category: 'Listings',
      description: 'Allows creating new listings',
    },
    {
      id: '7',
      name: 'listing.edit',
      category: 'Listings',
      description: 'Allows editing existing listings',
    },
    {
      id: '8',
      name: 'listing.approve',
      category: 'Listings',
      description: 'Allows approving submitted listings',
    },
    {
      id: '9',
      name: 'listing.delete',
      category: 'Listings',
      description: 'Allows deleting listings',
    },
]


  // -------------------------------------------------
  // Group permissions by category
  // -------------------------------------------------
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) acc[permission.category] = []
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  // -------------------------------------------------
  // Handlers
  // -------------------------------------------------
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset categories if role type changed away from ServiceProvider
      ...(name === 'type' &&
        value !== 'ServiceProvider' && {
          categories: [],
        }),
    }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('FORM DATA SUBMITTED:', formData)
    onClose()
  }

  if (!isOpen) return null

  // -------------------------------------------------
  // UI Layout
  // -------------------------------------------------
  return (
    <div className="fixed inset-0 z-1000 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 z-20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Create New Role
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Fields */}
            <div>
              <label className="block text-sm text-gray-700 font-medium">
                Role Name
              </label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            {/* Role Type */}
            <div>
              <label className="block text-sm text-gray-700 font-medium">
                Role Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                <option value="RootGuardian">Root Guardian</option>
                <option value="Admin">Admin</option>
                <option value="ServiceProvider">Service Provider</option>
                <option value="RegisteredUser">Registered User</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-gray-700 font-medium">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-700 font-medium">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            {/* Categories (Only if ServiceProvider) */}
            {formData.type === 'ServiceProvider' && (
              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-1">
                  Categories
                </legend>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Permissions */}
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-1">
                Permissions
              </legend>

              <div className="space-y-4">
                {Object.entries(permissionsByCategory).map(([cat, perms]) => (
                  <div key={cat}>
                    <h4 className="text-sm text-gray-500 font-medium mb-1">
                      {cat}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {perms.map((perm) => (
                        <label key={perm.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(perm.id)}
                            onChange={() => handlePermissionToggle(perm.id)}
                          />
                          {perm.name}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md"
              >
                Create Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
