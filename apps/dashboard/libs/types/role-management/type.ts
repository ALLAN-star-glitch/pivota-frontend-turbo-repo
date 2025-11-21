// app/role-management/types.ts

export type RoleType = 'RootGuardian' | 'Admin' | 'ServiceProvider' | 'RegisteredUser'
export type RoleStatus = 'Active' | 'Inactive'

export interface Category {
  id: string
  name: string
}

export interface Permission {
  id: string
  name: string
  description: string
  category: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
}

export interface Role {
  id: string
  name: string
  description?: string
  type: RoleType
  status?: RoleStatus
  categories?: Category[]
  permissions?: Permission[]
  usersAssigned?: number
}

// ----- Permission Matrix Types -----
export interface PermissionMatrixEntry {
  roleId: string
  permissionId: string
  assigned: boolean
}

export interface PermissionMatrixProps {
  roles: Role[]
  permissions: Permission[]
  matrix: PermissionMatrixEntry[]
  onTogglePermission: (role: Role, permission: Permission) => void
}
