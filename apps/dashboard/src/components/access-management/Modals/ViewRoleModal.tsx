'use client'

import React from 'react'
import { XIcon, UserIcon } from 'lucide-react'
import {  SystemRole, User } from '../../../../libs/types/access-management/type'


interface ViewRoleModalProps {
  isOpen: boolean
  onClose: () => void
  role: SystemRole | null
}

export function ViewRoleModal({ isOpen, onClose, role }: ViewRoleModalProps) {
  if (!isOpen || !role) return null

  // Example users (temporary placeholder)
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', name: 'Robert Johnson', email: 'robert.johnson@example.com' },
  ]

  return (
    <div className="fixed inset-0 z-1000 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative p-6">

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900">
            Role Details: {role.name}
          </h3>

          {/* Status */}
          <span
            className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              role.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {role.status}
          </span>

          {/* Description */}
          <div className="mt-4 text-sm text-gray-600 border-t pt-4">
            {role.description}
          </div>

          {/* Role Type */}
          <div className="mt-6 flex items-center">
            <h4 className="text-sm font-medium text-gray-900">Role Type:</h4>
            <span
              className={`ml-2 px-2 py-1 text-xs rounded-full font-semibold ${
                role.type === 'RootGuardian'
                  ? 'bg-purple-100 text-purple-800'
                  : role.type === 'CategoryManager'
                  ? 'bg-teal-100 text-teal-800'
                  : role.type === 'ServiceProvider'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {role.type}
            </span>
          </div>

          {/* Categories (Service Provider Only) */}
          {role.type === 'ServiceProvider' && role.categories && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {role.categories.map(category => (
                  <span
                    key={category.id}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Permissions */}
          {role.permissions && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>

              <div className="bg-gray-50 rounded px-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {role.permissions.map(permission => (
                    <div key={permission.id} className="flex items-center">
                      <span className="h-5 w-5 text-teal-500 mr-2">&#10003;</span>
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          {permission.name}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {permission.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assigned Users */}
          {role.usersAssigned && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Assigned Users ({role.usersAssigned})
              </h4>

              <ul className="divide-y divide-gray-200">
                {users.slice(0, 3).map(user => (
                  <li key={user.id} className="py-3 flex items-center">
                    <div>
                      {user.avatar ? (
                        <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                      ) : (
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                          <UserIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {role.usersAssigned > 3 && (
                <div className="mt-2 text-center text-sm">
                  <button className="cursor-pointer text-teal-600 hover:text-teal-800 font-medium">
                    View all {role.usersAssigned} users
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Close Footer Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 border-gray-300"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
