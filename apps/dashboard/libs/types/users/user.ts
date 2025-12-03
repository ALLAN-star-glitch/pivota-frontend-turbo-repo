export interface User {
  id: string;
  name: string;
  email: string;
  userId: string;
  role: 'Premium User' | 'Registered User' | 'Admin';
  plan: 'Premium' | 'Free' | 'Custom';
  category: string;
  status: 'Active' | 'Suspended' | 'Pending';
  lastActive: string;
  avatar: string;
}
export interface UserStats {
  totalUsers: number;
  totalUsersChange: number;
  activeUsers: number;
  activeUsersChange: number;
  pendingVerifications: number;
  pendingVerificationsNew: number;
  bannedUsers: number;
  bannedUsersChange: number;
}