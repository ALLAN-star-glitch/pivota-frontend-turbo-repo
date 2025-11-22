"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { XIcon } from 'lucide-react';
import { RoleStatus, RoleType, SystemRole } from '../../../../libs/types/access-management/type';

interface RoleFormData {
  name: string;
  description?: string;
  type: RoleType;
  status: RoleStatus;
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: SystemRole | null;
  onSave?: (updatedRole: SystemRole) => void;
}

export function EditRoleModal({ isOpen, onClose, role, onSave }: EditRoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    type: 'RegisteredUser',
    status: 'Active',
  });

  // Populate formData when role changes
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        type: role.type,
        status: role.status || 'Active',
      });
    }
  }, [role]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (role && onSave) {
      onSave({ ...role, name: formData.name, description: formData.description });
    }
    onClose();
  };

  const getRoleBadgeColor = (type: RoleType) => {
    switch (type) {
      case 'RootGuardian': return 'bg-red-100 text-red-700';
      case 'CategoryManager': return 'bg-teal-100 text-teal-700';
      case 'ServiceProvider': return 'bg-amber-100 text-amber-700';
      case 'RegisteredUser': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: RoleStatus) => {
    return status === 'Active' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700';
  };

  if (!isOpen || !role) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Role: {role.name}</h3>

          <div className="mb-4 flex gap-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(role.type)}`}>
              {role.type}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(role.status || 'Active')}`}>
              {role.status}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role Name</label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-3 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
