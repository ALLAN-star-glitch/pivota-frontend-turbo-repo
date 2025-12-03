
"use client";

import React, { useMemo, useState } from 'react';
import { Search, Download, Plus, Users, UserCheck, AlertCircle, UserX } from 'lucide-react';
import { defaultFilters } from '../../../libs/types/users/filters';
import { User, UserStats } from '../../../libs/types/users/user';
import { UserFilters } from '../../../libs/types/users/filters';
import { exportUsersToCSV } from '../../../libs/utils/exportCSV';
import AddUserModal from '@/components/users-module/AddUserModal';
import FilterBar from '@/components/users-module/FilterBar';
import StatCard from '@/components/users-module/StatCard'; // Corrected import
import UserTable from '@/components/users-module/UserTable';
import Pagination from '@/components/users-module/Pagination';


const mockStats: UserStats = {
  totalUsers: 12847,
  totalUsersChange: 12,
  activeUsers: 11234,
  activeUsersChange: 8,
  pendingVerifications: 156,
  pendingVerificationsNew: 23,
  bannedUsers: 47,
  bannedUsersChange: -2
};
const initialMockUsers: User[] = [{
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  userId: '#USR-2024-001',
  role: 'Premium User',
  plan: 'Premium',
  category: 'Web Development',
  status: 'Active',
  lastActive: '2 hours ago',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
}, {
  id: '2',
  name: 'Michael Chen',
  email: 'michael.chen@email.com',
  userId: '#USR-2024-002',
  role: 'Registered User',
  plan: 'Free',
  category: 'Graphic Design',
  status: 'Suspended',
  lastActive: '1 day ago',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
}, {
  id: '3',
  name: 'David Rodriguez',
  email: 'david.rodriguez@email.com',
  userId: '#USR-2024-003',
  role: 'Admin',
  plan: 'Custom',
  category: 'Digital Marketing',
  status: 'Active',
  lastActive: '5 minutes ago',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
}, {
  id: '4',
  name: 'Emily Watson',
  email: 'emily.watson@email.com',
  userId: '#USR-2024-004',
  role: 'Premium User',
  plan: 'Premium',
  category: 'Content Writing',
  status: 'Active',
  lastActive: '30 minutes ago',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
}, {
  id: '5',
  name: 'James Wilson',
  email: 'james.wilson@email.com',
  userId: '#USR-2024-005',
  role: 'Registered User',
  plan: 'Free',
  category: 'Video Production',
  status: 'Pending',
  lastActive: '3 days ago',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
}, {
  id: '6',
  name: 'Lisa Anderson',
  email: 'lisa.anderson@email.com',
  userId: '#USR-2024-006',
  role: 'Premium User',
  plan: 'Premium',
  category: 'Graphic Design',
  status: 'Active',
  lastActive: '1 hour ago',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
}];
export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(initialMockUsers);
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<UserFilters>(defaultFilters);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Filter users based on applied filters and search
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const matchesSearch = searchQuery === '' || user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.userId.toLowerCase().includes(searchQuery.toLowerCase());
      // Role filter
      const matchesRole = appliedFilters.role === 'All Roles' || user.role === appliedFilters.role;
      // Plan filter
      const matchesPlan = appliedFilters.plan === 'All Plans' || user.plan === appliedFilters.plan;
      // Status filter
      const matchesStatus = appliedFilters.status === 'All Status' || user.status === appliedFilters.status;
      // Category filter
      const matchesCategory = appliedFilters.category === 'All Categories' || user.category === appliedFilters.category;
      return matchesSearch && matchesRole && matchesPlan && matchesStatus && matchesCategory;
    });
  }, [users, appliedFilters, searchQuery]);
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1);
  };
  const handleExportUsers = () => {
    exportUsersToCSV(filteredUsers, `pivota-users-${new Date().toISOString().split('T')[0]}.csv`);
  };
  const handleAddUser = (userData: Omit<User, 'id' | 'userId' | 'lastActive'>) => {
    const newUser: User = {
      ...userData,
      id: String(users.length + 1),
      userId: `#USR-2024-${String(users.length + 1).padStart(3, '0')}`,
      lastActive: 'Just now'
    };
    setUsers([newUser, ...users]);
  };
  return <div className="flex min-h-screen bg-gray-50">


      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Dashboard / User & Access Management /{' '}
                <span className="text-gray-900 font-medium">
                  User Management
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View, search, and manage all user accounts on Pivota Connect.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pivota-teal-500 focus:border-transparent" />
              </div>

              <button onClick={handleExportUsers} className="px-4 py-2 bg-white border border-pivota-amber-500 text-pivota-amber-600 rounded-lg font-medium hover:bg-pivota-amber-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Users
              </button>

              <button onClick={() => setIsAddUserModalOpen(true)} className="px-4 py-2 bg-pivota-teal-500 text-white rounded-lg font-medium hover:bg-pivota-teal-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New User
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Users" value={users.length.toLocaleString()} change={`${mockStats.totalUsersChange}% from last month`} changeType="increase" icon={Users} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatCard title="Active Users" value={users.filter(u => u.status === 'Active').length.toLocaleString()} change={`${mockStats.activeUsersChange}% from last month`} changeType="increase" icon={UserCheck} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatCard title="Pending Verifications" value={users.filter(u => u.status === 'Pending').length.toString()} change={`${mockStats.pendingVerificationsNew} new today`} changeType="neutral" icon={AlertCircle} iconBgColor="bg-pivota-amber-100" iconColor="text-pivota-amber-600" />
            <StatCard title="Banned Users" value={users.filter(u => u.status === 'Suspended').length.toString()} change={`${Math.abs(mockStats.bannedUsersChange)}% from last month`} changeType="decrease" icon={UserX} iconBgColor="bg-pivota-red-100" iconColor="text-pivota-red-600" />
          </div>

          {/* Filters */}
          <FilterBar filters={filters} onFilterChange={setFilters} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} /> {/* Corrected component usage */}

          {/* Table */}
          <UserTable users={filteredUsers} />

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredUsers.length / 3)} totalResults={filteredUsers.length} resultsPerPage={3} onPageChange={setCurrentPage} />
        </div>
      </main>

      {/* Add User Modal */}
      <AddUserModal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} onAddUser={handleAddUser} />
    </div>;
}