"use client";

import { Header } from "@/components/access-management/Header";
import { ConfirmationModal } from "@/components/access-management/Modals/ConfirmationModal";
import { EditRoleModal } from "@/components/access-management/Modals/EditRoleModal";
import { ViewRoleModal } from "@/components/access-management/Modals/ViewRoleModal";
import { SystemRolesTable } from "@/components/access-management/SystemRolesTable";
import { ViewPermissionsModal } from "@/components/access-management/Modals/ViewPermissions";

import React, { useState } from "react";
import {
  SystemPermission,
  SystemPermissionMatrixEntry,
  SystemRole,
  ModuleScope,
} from "../../../libs/types/access-management/type";
import { SystemPermissionMatrix } from "@/components/access-management/SystemPermissionMatrix";

export default function SystemAccessPage() {
  // ================= ROLES ==================
  const [roles] = useState<SystemRole[]>([
    { id: "1", name: "Root Guardian", type: "RootGuardian", description: "Full system-level control", status: "Active", usersAssigned: 2 },
    { id: "2", name: "System Admin", type: "SystemAdmin", description: "High-level admin, limited from critical RootGuardian privileges", status: "Active", usersAssigned: 1 },
    { id: "3", name: "Content Manager Admin", type: "ContentManagerAdmin", description: "Manages platform content", status: "Active", usersAssigned: 6 },
    { id: "4", name: "Compliance Admin", type: "ComplianceAdmin", description: "Validates providers & ensures platform compliance", status: "Active", usersAssigned: 4 },
    { id: "5", name: "Fraud Admin", type: "FraudAdmin", description: "Monitors suspicious activity and fraud", status: "Active", usersAssigned: 2 },
    { id: "6", name: "Analytics Admin", type: "AnalyticsAdmin", description: "Access to dashboards, metrics, and reporting", status: "Active", usersAssigned: 1 },
    { id: "7", name: "Business Content Manager", type: "BusinessContentManager", description: "Manages system categories / modules", status: "Active", usersAssigned: 3 },
    { id: "8", name: "Business System Admin", type: "BusinessSystemAdmin", description: "Businesses posting listings", status: "Active", usersAssigned: 122, modules: [
      { id: "m1", name: "Housing" },
      { id: "m2", name: "Jobs" },
      { id: "m3", name: "Health" }
    ] },
    { id: "9", name: "General User", type: "GeneralUser", description: "Basic user account", status: "Active", usersAssigned: 800 },
  ]);

  // ================= SYSTEM-WIDE MODULES ==================
  const systemModules: ModuleScope[] = [
    { id: "mod1", name: "Dashboard" },
    { id: "mod2", name: "User" },
    { id: "mod3", name: "Listings" },
    { id: "mod4", name: "Analytics" },
    { id: "mod5", name: "Compliance" },
    { id: "mod6", name: "Fraud" },
    { id: "mod7", name: "Settings" },
  ];

  // ================= BUSINESS-SPECIFIC MODULES ==================
  const businessModules: ModuleScope[] = [
    { id: "b1", name: "Housing" },
    { id: "b2", name: "Jobs" },
    { id: "b3", name: "Health" },
  ];

  const actions = ["view", "create", "edit", "delete", "approve"];

  // ================= PERMISSIONS ==================
  const [permissions] = useState<SystemPermission[]>(
    [...systemModules, ...businessModules].flatMap((module, i) =>
      actions.map((action, j) => ({
        id: `${i * actions.length + j + 1}`,
        name: `${module.name?.toLowerCase() ?? "unknown"}.${action}`,
        category: module.name ?? "unknown",
        description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${module.name ?? "unknown"}`,
        scope: systemModules.includes(module) ? "system" : "business",
        module: module.name ?? "unknown",
      }))
    )
  );

  // ================= MATRIX ==================
  const [matrix, setMatrix] = useState<SystemPermissionMatrixEntry[]>(() => {
    const allMatrix: SystemPermissionMatrixEntry[] = [];

    // Root Guardian: all permissions
    permissions.forEach(p => allMatrix.push({ roleId: "1", permissionId: p.id, assigned: true }));

    // System Admin: all system permissions except critical RootGuardian actions
    permissions
      .filter(p => p.scope === "system" && !["delete.rootguardian", "override.auditlogs"].includes(p.name))
      .forEach(p => allMatrix.push({ roleId: "2", permissionId: p.id, assigned: true }));

    // Content Manager Admin: all Listings
    permissions.filter(p => (p.module ?? "") === "Listings").forEach(p => allMatrix.push({ roleId: "3", permissionId: p.id, assigned: true }));

    // Compliance Admin: view & approve listings, view compliance
    permissions.filter(p =>
      ((p.module ?? "") === "Listings" && ["view", "approve"].some(a => p.name.endsWith(a))) ||
      ((p.module ?? "") === "Compliance" && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "4", permissionId: p.id, assigned: true }));

    // Fraud Admin: view fraud
    permissions.filter(p => (p.module ?? "") === "Fraud" && p.name.endsWith("view")).forEach(p => allMatrix.push({ roleId: "5", permissionId: p.id, assigned: true }));

    // Analytics Admin: view analytics, dashboard, user
    permissions.filter(p =>
      ((p.module ?? "") === "Analytics" && p.name.endsWith("view")) ||
      ((p.module ?? "") === "Dashboard" && p.name.endsWith("view")) ||
      ((p.module ?? "") === "User" && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "6", permissionId: p.id, assigned: true }));

    // Business Content Manager: all business modules permissions
    permissions.filter(p => p.scope === "business").forEach(p => allMatrix.push({ roleId: "7", permissionId: p.id, assigned: true }));

    // Business System Admin: all business modules permissions
    permissions.filter(p => p.scope === "business").forEach(p => allMatrix.push({ roleId: "8", permissionId: p.id, assigned: true }));

    // General User: view system modules (Dashboard, Listings)
    permissions.filter(p =>
      (["Listings", "Dashboard"].includes(p.module ?? "") && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "9", permissionId: p.id, assigned: true }));

    return allMatrix;
  });

  // ================= MODAL STATE ==================
  const [isManagePermissionsModalOpen, setIsManagePermissionsModalOpen] = useState(false);
  const [isViewRoleModalOpen, setIsViewRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<SystemRole | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<SystemPermission | null>(null);
  const [selectedIsAssigned, setSelectedIsAssigned] = useState(false);

  // ================= HANDLERS ==================
  const handleTogglePermission = (role: SystemRole, permission: SystemPermission) => {
    setSelectedRole(role);
    setSelectedPermission(permission);

    const assigned = matrix.some(m => m.roleId === role.id && m.permissionId === permission.id && m.assigned);
    setSelectedIsAssigned(assigned);

    setIsConfirmationModalOpen(true);
  };

  const handleConfirmPermissionChange = () => {
    if (!selectedRole || !selectedPermission) return;

    setMatrix(prev => {
      const exists = prev.find(m => m.roleId === selectedRole.id && m.permissionId === selectedPermission.id);
      if (exists) {
        return prev.map(m =>
          m.roleId === selectedRole.id && m.permissionId === selectedPermission.id
            ? { ...m, assigned: !m.assigned }
            : m
        );
      }
      return [...prev, { roleId: selectedRole.id, permissionId: selectedPermission.id, assigned: true }];
    });

    setIsConfirmationModalOpen(false);
  };

  // ================= RENDER ==================
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header onManagePermissions={() => setIsManagePermissionsModalOpen(true)} />

        {/* --- ROLES TABLE --- */}
        <div className="mt-8">
          <SystemRolesTable
            onViewRole={role => { setSelectedRole(role); setIsViewRoleModalOpen(true); }}
            onEditRole={role => { setSelectedRole(role); setIsEditRoleModalOpen(true); }}
          />
        </div>

        {/* --- PERMISSION MATRIX --- */}
        <div className="mt-4">
          <SystemPermissionMatrix
            roles={roles}
            permissions={permissions}
            matrix={matrix}
            onTogglePermission={handleTogglePermission}
          />
        </div>
      </div>

      {/* ========== MODALS ========== */}
      <ViewPermissionsModal isOpen={isManagePermissionsModalOpen} onClose={() => setIsManagePermissionsModalOpen(false)} />

      {selectedRole && (
        <>
          <ViewRoleModal isOpen={isViewRoleModalOpen} role={selectedRole} onClose={() => setIsViewRoleModalOpen(false)} />
          <EditRoleModal isOpen={isEditRoleModalOpen} role={selectedRole} onClose={() => setIsEditRoleModalOpen(false)} />
        </>
      )}

      {selectedRole && selectedPermission && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          role={selectedRole}
          permission={selectedPermission}
          isAssigned={selectedIsAssigned}
          onConfirm={handleConfirmPermissionChange}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
}
