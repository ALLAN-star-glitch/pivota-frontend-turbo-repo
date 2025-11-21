'use client'

import { Header } from '@/components/role-management/Header'
import { ManagePermissionsModal } from '@/components/role-management/ManagePermissions'
import { ConfirmationModal } from '@/components/role-management/Modals/ConfirmationModal'
import { CreateRoleModal } from '@/components/role-management/Modals/CreateRoleModal'
import { EditRoleModal } from '@/components/role-management/Modals/EditRoleModal'
import { ViewRoleModal } from '@/components/role-management/Modals/ViewRoleModal'
import { PermissionMatrix } from '@/components/role-management/PermissionMatrix'
import { RolesTable } from '@/components/role-management/RolesTable'

import React, { useState } from 'react'
import { Permission, PermissionMatrixEntry, Role } from '../../../libs/types/role-management/type'

// ----- Types -----


export default function RoleManagementPage() {
  // ---------------- Mock Data (Replace with DB/API later) ----------------
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Root Guardian',
      description: 'System-level control',
      type: 'RootGuardian',
      status: 'Active',
      usersAssigned: 2,
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Manages system operations',
      type: 'Admin',
      status: 'Active',
      usersAssigned: 6,
    },
    {
      id: '3',
      name: 'Service Provider',
      description: 'Businesses and individuals posting listings',
      type: 'ServiceProvider',
      status: 'Active',
      usersAssigned: 122,
    },
    {
      id: '4',
      name: 'Registered User',
      description: 'Basic user account',
      type: 'RegisteredUser',
      status: 'Active',
      usersAssigned: 800,
    },
  ])

  const [permissions] = useState<Permission[]>([
    { id: '1', name: 'user.view', category: 'User Management', description: 'Can view users' },
    { id: '2', name: 'user.create', category: 'User Management', description: 'Can create users' },
    { id: '3', name: 'user.edit', category: 'User Management', description: 'Can edit users' },
    { id: '4', name: 'user.delete', category: 'User Management', description: 'Can delete users' },

    { id: '5', name: 'listing.view', category: 'Listings', description: 'Can view listings' },
    { id: '6', name: 'listing.create', category: 'Listings', description: 'Can create listings' },
    { id: '7', name: 'listing.edit', category: 'Listings', description: 'Can edit listings' },
    { id: '8', name: 'listing.approve', category: 'Listings', description: 'Can approve listings' },
    { id: '9', name: 'listing.delete', category: 'Listings', description: 'Can delete listings' },
  ])

  const [matrix, setMatrix] = useState<PermissionMatrixEntry[]>([
    { roleId: '1', permissionId: '1', assigned: true },
    { roleId: '1', permissionId: '2', assigned: true },
    { roleId: '1', permissionId: '3', assigned: true },
    { roleId: '1', permissionId: '4', assigned: true },
    { roleId: '1', permissionId: '5', assigned: true },
    { roleId: '1', permissionId: '6', assigned: true },
    { roleId: '1', permissionId: '7', assigned: true },
    { roleId: '1', permissionId: '8', assigned: true },
    { roleId: '1', permissionId: '9', assigned: true },

    { roleId: '2', permissionId: '1', assigned: true },
    { roleId: '2', permissionId: '5', assigned: true },

    { roleId: '3', permissionId: '6', assigned: true },
    { roleId: '3', permissionId: '7', assigned: true },

    { roleId: '4', permissionId: '5', assigned: true },
  ])

  // ---------------- UI State ----------------
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)
  const [isManagePermissionsModalOpen, setIsManagePermissionsModalOpen] = useState(false)
  const [isViewRoleModalOpen, setIsViewRoleModalOpen] = useState(false)
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

  // ---------------- Handlers ----------------
  const handleTogglePermission = (role: Role, permission: Permission) => {
    setSelectedRole(role)
    setSelectedPermission(permission)
    setIsConfirmationModalOpen(true)
  }

  const handleConfirmPermissionChange = () => {
    if (!selectedRole || !selectedPermission) return

    setMatrix(prev => {
      const exists = prev.find(
        m => m.roleId === selectedRole.id && m.permissionId === selectedPermission.id,
      )

      if (exists) {
        return prev.map(m =>
          m.roleId === selectedRole.id && m.permissionId === selectedPermission.id
            ? { ...m, assigned: !m.assigned }
            : m,
        )
      }

      return [
        ...prev,
        {
          roleId: selectedRole.id,
          permissionId: selectedPermission.id,
          assigned: true,
        },
      ]
    })

    setIsConfirmationModalOpen(false)
  }

  // ---------------- Page JSX ----------------
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <Header
          onCreateRole={() => setIsCreateRoleModalOpen(true)}
          onManagePermissions={() => setIsManagePermissionsModalOpen(true)}
        />

        <div className="mt-8">
          <RolesTable
            onViewRole={role => {
              setSelectedRole(role)
              setIsViewRoleModalOpen(true)
            }}
            onEditRole={role => {
              setSelectedRole(role)
              setIsEditRoleModalOpen(true)
            }}
          />
        </div>

        <div className="mt-8">
          <PermissionMatrix
            roles={roles}
            permissions={permissions}
            matrix={matrix}
            onTogglePermission={handleTogglePermission}
          />
        </div>
      </div>

      {/* ------- Modals -------- */}
      <CreateRoleModal
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
      />

      <ManagePermissionsModal
        isOpen={isManagePermissionsModalOpen}
        onClose={() => setIsManagePermissionsModalOpen(false)}
      />

      {selectedRole && (
        <>
          <ViewRoleModal
            isOpen={isViewRoleModalOpen}
            role={selectedRole}
            onClose={() => setIsViewRoleModalOpen(false)}
          />

          <EditRoleModal
            isOpen={isEditRoleModalOpen}
            role={selectedRole}
            onClose={() => setIsEditRoleModalOpen(false)}
          />
        </>
      )}

      {selectedRole && selectedPermission && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          role={selectedRole}
          permission={selectedPermission}
          onConfirm={handleConfirmPermissionChange}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  )
}
