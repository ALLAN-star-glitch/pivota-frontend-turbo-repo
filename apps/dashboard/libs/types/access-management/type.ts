// app/role-management/types.ts

export type RoleType =
  | 'RootGuardian'
  | 'ContentManagerAdmin'
  | 'ComplianceAdmin'
  | 'FraudAdmin'
  | 'AnalyticsAdmin'
  | 'CategoryManager'
  | 'ServiceProvider'
  | 'RegisteredUser'

export type RoleStatus = 'Active' | 'Inactive'

export interface Category {
  id: string
  name: string
}

export interface SystemPermission {
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

export interface SystemRole {
  id: string
  name: string
  description?: string
  type: RoleType
  status?: RoleStatus
  categories?: Category[]
  permissions?: SystemPermission[]
  usersAssigned?: number
}

// ----- Permission Matrix Types -----
export interface SystemPermissionMatrixEntry {
  roleId: string
  permissionId: string
  assigned: boolean
}



export interface SystemPermissiosMatrixProps {
  roles: SystemRole[]
  permissions: SystemPermission[]
  matrix: SystemPermissionMatrixEntry[]
  onTogglePermission: (role: SystemRole, permission: SystemPermission) => void
}
