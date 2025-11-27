"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { XIcon } from "lucide-react";
import { SystemRole } from "../../../../libs/types/access-management/type";

interface RoleFormData {
  name: string;
  description?: string;
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: SystemRole | null;
  onSave?: (updatedRole: SystemRole) => void;
}

export function EditRoleModal({ isOpen, onClose, role, onSave }: EditRoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    description: "",
  });

  // Populate formData when role changes
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
      });
    }
  }, [role]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (role && onSave) {
      onSave({
        ...role,
        name: formData.name,
        description: formData.description,
      });
    }
    onClose();
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

          <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Role: {role.name}</h3>

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
