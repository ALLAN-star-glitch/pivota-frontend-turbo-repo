// ===============================
// PivotAConnect RBAC Types
// ===============================

// ---------- Role Types ----------
export type RoleType =
  // ---- System Scope Roles ----
  | 'RootGuardian'
  | 'SystemAdmin'
  | 'AnalyticsAdmin'
  | 'ComplianceAdmin'
  | 'FraudAdmin'
  | 'ContentManagerAdmin' // platform-level content admin

  // ---- Business Scope Roles ----
  | 'BusinessSystemAdmin'
  | 'BusinessContentManager'

  // ---- General User Role ----
  | 'GeneralUser' // free users / non-premium users


export type RoleStatus = 'Active' | 'Inactive'


// ---------- Business Modules (Assigned by subscription plan) ----------
export interface ModuleScope {
  id: string
  name: string // e.g., Housing, Jobs, Health
}


// ---------- Permissions ----------
export interface SystemPermission {
  id: string
  name: string 
  description: string
  scope: 'system' | 'business'
  module?: string | null // null for global permissions
}


// ---------- Users ----------
export interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
}


// ---------- SystemRole ----------
export interface SystemRole {
  id: string
  name: string // Can be custom label (e.g., "Landlord Manager")
  description?: string
  type: RoleType
  status?: RoleStatus

  // For business roles: modules assigned by subscription plan
  modules?: ModuleScope[]

  // Permissions inherited by role type + modules
  permissions?: SystemPermission[]

  // Total users assigned to this role
  usersAssigned?: number
}


// ---------- Permission Matrix ----------
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
