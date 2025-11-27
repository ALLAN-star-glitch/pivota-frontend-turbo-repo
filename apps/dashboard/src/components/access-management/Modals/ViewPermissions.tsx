"use client";

import { useState } from 'react';
import { XIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { SystemPermission } from '../../../../libs/types/access-management/type';

interface ViewPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock permissions data using MODULES and including both system & business scopes
const allPermissions: SystemPermission[] = [
  // -------- System Scope --------
  // User Management
  { id: '1', name: 'user.view', module: 'User Management', description: 'View user details', scope: 'system' },
  { id: '2', name: 'user.create', module: 'User Management', description: 'Create new users', scope: 'system' },
  { id: '3', name: 'user.edit', module: 'User Management', description: 'Edit user details', scope: 'system' },
  { id: '4', name: 'user.delete', module: 'User Management', description: 'Delete users', scope: 'system' },

  // Role Management
  { id: '11', name: 'role.assign', module: 'Role Management', description: 'Assign roles to users', scope: 'system' },
  { id: '12', name: 'permission.assign', module: 'Role Management', description: 'Assign permissions to roles', scope: 'system' },

  // Dashboard & Reports
  { id: '13', name: 'dashboard.view', module: 'Dashboard', description: 'View analytics dashboard', scope: 'system' },
  { id: '14', name: 'reports.view', module: 'Reports', description: 'View system reports', scope: 'system' },
  { id: '15', name: 'reports.export', module: 'Reports', description: 'Export report data', scope: 'system' },

  // Settings
  { id: '16', name: 'settings.edit', module: 'Settings', description: 'Edit core system settings', scope: 'system' },

  // -------- Business Scope --------
  // Generic Listings (business-scoped)
  { id: '20', name: 'listing.view', module: 'Listings', description: 'View listings (business scope)', scope: 'business' },
  { id: '21', name: 'listing.create', module: 'Listings', description: 'Create listings (business scope)', scope: 'business' },
  { id: '22', name: 'listing.edit', module: 'Listings', description: 'Edit listings (business scope)', scope: 'business' },
  { id: '23', name: 'listing.approve', module: 'Listings', description: 'Approve listings (business scope)', scope: 'business' },
  { id: '24', name: 'listing.delete', module: 'Listings', description: 'Delete listings (business scope)', scope: 'business' },

  // Module-specific business permissions (examples)
  { id: '25', name: 'listings.housing.create', module: 'Housing', description: 'Create housing listing', scope: 'business' },
  { id: '26', name: 'listings.housing.approve', module: 'Housing', description: 'Approve housing listing', scope: 'business' },
  { id: '27', name: 'listings.jobs.create', module: 'Jobs', description: 'Create job listing', scope: 'business' },
  { id: '28', name: 'listings.jobs.approve', module: 'Jobs', description: 'Approve job listing', scope: 'business' },
];


export function ViewPermissionsModal({ isOpen, onClose }: ViewPermissionsModalProps) {
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('');

  if (!isOpen) return null;

  // Unique modules for dropdown
  const modules = Array.from(new Set(allPermissions.map(p => p.module)));

  // Filter permissions
  const filtered = allPermissions.filter(permission => {
    const searchMatch =
      permission.name.toLowerCase().includes(search.toLowerCase()) ||
      permission.description.toLowerCase().includes(search.toLowerCase());

    const moduleMatch = !filterModule || permission.module === filterModule;

    return searchMatch && moduleMatch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">

        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75" aria-hidden="true" />

        <div className="inline-block w-full max-w-3xl bg-white rounded-lg shadow-xl transform transition-all p-6 relative text-left">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-teal-500 rounded-md"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Header */}
          <h3 className="text-lg font-semibold text-gray-900">
            System Permissions Overview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Browse permissions grouped by system modules.
          </p>

          {/* Search + Module Filter */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search permission name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:border-teal-500 focus:ring-teal-500 text-sm"
              />
            </div>

            {/* Module Filter */}
            <div className="relative flex-1">
              <FilterIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:border-teal-500 focus:ring-teal-500 text-sm"
              >
                <option value="">All Modules</option>
                {modules.map((module) => (
                  <option key={module} value={module ?? ''}>
                    {module ?? 'Unknown'}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Permissions List */}
          <div className="mt-6 max-h-96 overflow-y-auto border border-gray-100 rounded-md">
            <ul className="divide-y divide-gray-200 bg-white">
              {filtered.map(permission => (
                <li key={permission.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-700 truncate">
                      {permission.name}
                    </p>
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {permission.module}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{permission.description}</p>
                </li>
              ))}

              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-gray-500 text-sm">
                  No permissions found
                </li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="cursor-pointer mt-6 flex flex-row-reverse">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
