export interface UserFilters {
  role: string;
  plan: string;
  status: string;
  category: string;
  date: string;
}
export const defaultFilters: UserFilters = {
  role: 'All Roles',
  plan: 'All Plans',
  status: 'All Status',
  category: 'All Categories',
  date: ''
};