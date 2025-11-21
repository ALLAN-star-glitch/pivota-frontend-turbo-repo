'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { XIcon } from 'lucide-react'
import { Category, Permission, Role, RoleStatus, RoleType } from '../../../../libs/types/role-management/type'

interface RoleFormData {
  name: string
  description?: string
  type: RoleType
  status: RoleStatus
  categories: string[] // store category ids
  permissions: string[] // store permission ids
}

interface EditRoleModalProps {
  isOpen: boolean
  onClose: () => void
  role: Role | null
}

export function EditRoleModal({ isOpen, onClose, role }: EditRoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    type: 'RegisteredUser',
    status: 'Active',
    categories: [],
    permissions: [],
  })

  // ----- Mock categories and permissions -----
  const categories: Category[] = [
    { id: '1', name: 'Healthcare' },
    { id: '2', name: 'Education' },
    { id: '3', name: 'Finance' },
    { id: '4', name: 'Legal' },
    { id: '5', name: 'Technology' },
  ]

  const permissions: Permission[] = [
    { id: '1', name: 'user.view', description: 'View users', category: 'User Management' },
    { id: '2', name: 'user.create', description: 'Create users', category: 'User Management' },
    { id: '3', name: 'user.edit', description: 'Edit users', category: 'User Management' },
    { id: '4', name: 'user.delete', description: 'Delete users', category: 'User Management' },
    { id: '5', name: 'listing.view', description: 'View listings', category: 'Listings' },
    { id: '6', name: 'listing.create', description: 'Create listings', category: 'Listings' },
    { id: '7', name: 'listing.edit', description: 'Edit listings', category: 'Listings' },
    { id: '8', name: 'listing.approve', description: 'Approve listings', category: 'Listings' },
    { id: '9', name: 'listing.delete', description: 'Delete listings', category: 'Listings' },
  ]

  const permissionsByCategory: Record<string, Permission[]> = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) acc[permission.category] = []
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>
  )

  // ----- Populate formData when role changes -----
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        type: role.type,
        status: role.status || 'Active',
        categories: role.categories?.map((c) => c.id) || [],
        permissions: role.permissions?.map((p) => p.id) || [],
      })
    }
  }, [role])

  // ----- Handlers -----
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    console.log('Updated Role:', formData)
    onClose()
  }

  // ----- Role & Status Badge Colors -----
  const getRoleBadgeColor = (type: RoleType) => {
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

  const getStatusBadgeColor = (status: RoleStatus) => {
    return status === 'Active' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'
  }

  if (!isOpen || !role) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 z-20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Edit Role: {role.name}
          </h3>

          <div className="mb-4 flex gap-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(role.type)}`}>
              {role.type}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(role.status || 'Active')}`}>
              {role.status}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role Name</label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                disabled={formData.type === 'RootGuardian'}
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
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={formData.type === 'RootGuardian'}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            {/* Categories */}
            {formData.type === 'ServiceProvider' && (
              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-1">Categories</legend>
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
              <legend className="text-sm font-medium text-gray-700 mb-1">Permissions</legend>
              <div className="space-y-4">
                {Object.entries(permissionsByCategory).map(([cat, perms]) => (
                  <div key={cat}>
                    <h4 className="text-sm text-gray-500 font-medium mb-1">{cat}</h4>
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
