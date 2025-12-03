import { User } from "../types/users/user";

export function exportUsersToCSV(users: User[], filename: string = 'users-export.csv') {
  // Define CSV headers
  const headers = ['User ID', 'Name', 'Email', 'Role', 'Plan', 'Category', 'Status', 'Last Active'];

  // Convert users to CSV rows
  const rows = users.map(user => [user.userId, user.name, user.email, user.role, user.plan, user.category, user.status, user.lastActive]);

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;'
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}