"use client";

import { Header } from "@/components/access-management/Header";
import { ConfirmationModal } from "@/components/access-management/Modals/ConfirmationModal";
import { EditRoleModal } from "@/components/access-management/Modals/EditRoleModal";
import { ViewRoleModal } from "@/components/access-management/Modals/ViewRoleModal";
import { SystemRolesTable } from "@/components/access-management/SystemRolesTable";
import { ViewPermissionsModal } from "@/components/access-management/Modals/ViewPermissions";

import React, { useState } from "react";
import { SystemPermission, SystemPermissionMatrixEntry, SystemRole } from "../../../libs/types/access-management/type";
import { SystemPermissionMatrix } from "@/components/access-management/SystemPermissionMatrix";

export default function SystemAccessPage() {
  // ================= ROLES ==================
  const [roles] = useState<SystemRole[]>([
    { id: "1", name: "Root Guardian", type: "RootGuardian", description: "Full system-level control", status: "Active", usersAssigned: 2 },
    { id: "2", name: "Content Manager Admin", type: "ContentManagerAdmin", description: "Manages platform content", status: "Active", usersAssigned: 6 },
    { id: "3", name: "Compliance Admin", type: "ComplianceAdmin", description: "Validates providers & ensures platform compliance", status: "Active", usersAssigned: 4 },
    { id: "4", name: "Fraud Admin", type: "FraudAdmin", description: "Monitors suspicious activity and fraud", status: "Active", usersAssigned: 2 },
    { id: "5", name: "Analytics Admin", type: "AnalyticsAdmin", description: "Access to dashboards, metrics, and reporting", status: "Active", usersAssigned: 1 },
    { id: "6", name: "Category Manager", type: "CategoryManager", description: "Manages system categories / modules", status: "Active", usersAssigned: 3 },
    { id: "7", name: "Service Provider", type: "ServiceProvider", description: "Service providers listing on the platform", status: "Active", usersAssigned: 122 },
    { id: "8", name: "Registered User", type: "RegisteredUser", description: "Basic user account", status: "Active", usersAssigned: 800 },
  ]);

  // ================= SYSTEM-WIDE CATEGORIES / MODULES ==================
  const systemCategories = [
    "Dashboard",
    "User",
    "Listings",
    "Analytics",
    "Compliance",
    "Fraud",
    "Settings",
  ];
  const actions = ["view", "create", "edit", "delete", "approve"];

  // ================= PERMISSIONS ==================
  const [permissions] = useState<SystemPermission[]>(
    systemCategories.flatMap((category, i) =>
      actions.map((action, j) => ({
        id: `${i * actions.length + j + 1}`,
        name: `${category.toLowerCase()}.${action}`,
        category,
        description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${category}`,
      }))
    )
  );

  // ================= MATRIX ==================
  const [matrix, setMatrix] = useState<SystemPermissionMatrixEntry[]>(() => {
    const allMatrix: SystemPermissionMatrixEntry[] = [];

    // Root Guardian: all permissions
    permissions.forEach(p => allMatrix.push({ roleId: "1", permissionId: p.id, assigned: true }));

    // Content Manager Admin: all Listings
    permissions.filter(p => p.category === "Listings").forEach(p => allMatrix.push({ roleId: "2", permissionId: p.id, assigned: true }));

    // Compliance Admin: view & approve listings, view compliance
    permissions.filter(p =>
      (p.category === "Listings" && ["view", "approve"].some(a => p.name.endsWith(a)))
      || (p.category === "Compliance" && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "3", permissionId: p.id, assigned: true }));

    // Fraud Admin: view fraud
    permissions.filter(p => p.category === "Fraud" && p.name.endsWith("view")).forEach(p => allMatrix.push({ roleId: "4", permissionId: p.id, assigned: true }));

    // Analytics Admin: view analytics, dashboard, user
    permissions.filter(p =>
      (p.category === "Analytics" && p.name.endsWith("view"))
      || (p.category === "Dashboard" && p.name.endsWith("view"))
      || (p.category === "User" && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "5", permissionId: p.id, assigned: true }));

    // Category Manager: view/edit/approve Settings, Compliance, Listings
    permissions.filter(p =>
      ["Settings", "Compliance", "Listings"].includes(p.category)
      && ["view", "edit", "approve"].some(a => p.name.endsWith(a))
    ).forEach(p => allMatrix.push({ roleId: "6", permissionId: p.id, assigned: true }));

    // Service Provider: create/edit/view Listings
    permissions.filter(p =>
      p.category === "Listings" && ["create", "edit", "view"].some(a => p.name.endsWith(a))
    ).forEach(p => allMatrix.push({ roleId: "7", permissionId: p.id, assigned: true }));

    // Registered User: view listings, dashboard
    permissions.filter(p =>
      (p.category === "Listings" && p.name.endsWith("view"))
      || (p.category === "Dashboard" && p.name.endsWith("view"))
    ).forEach(p => allMatrix.push({ roleId: "8", permissionId: p.id, assigned: true }));

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

    // check if assigned
    const assigned = matrix.some(
      m => m.roleId === role.id && m.permissionId === permission.id && m.assigned
    );
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
          isAssigned={selectedIsAssigned} // pass assigned state
          onConfirm={handleConfirmPermissionChange}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
}
