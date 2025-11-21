'use client'

import React from 'react'
import { AlertTriangleIcon } from 'lucide-react'
import { Permission, Role } from '../../../../libs/types/role-management/type'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  role: Role
  permission: Permission
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  role,
  permission,
}: ConfirmationModalProps) {
  if (!isOpen) return null

  // TODO: Replace with real logic (check if permission assigned)
  const isAssigned = true

  return (
    <div className="fixed inset-0 z-1000 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        {/* Center Trick */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
        >
          &#8203;
        </span>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full p-6">

          {/* Header */}
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangleIcon className="h-6 w-6 text-amber-600" />
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {isAssigned ? 'Remove Permission' : 'Assign Permission'}
              </h3>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  {isAssigned
                    ? `Are you sure you want to remove the "${permission.name}" permission from the "${role.name}" role?`
                    : `Are you sure you want to assign the "${permission.name}" permission to the "${role.name}" role?`}
                </p>

                <p className="mt-2">
                  {isAssigned
                    ? 'Users under this role will lose this capability.'
                    : 'Users under this role will gain this capability.'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">

            {/* Confirm */}
            <button
              onClick={onConfirm}
              className={`w-full sm:w-auto inline-flex justify-center px-4 py-2 rounded-md text-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAssigned
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
              }`}
            >
              {isAssigned ? 'Remove' : 'Assign'}
            </button>

            {/* Cancel */}
            <button
              onClick={onClose}
              className="mt-3 sm:mt-0 sm:mr-3 w-full sm:w-auto inline-flex justify-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
