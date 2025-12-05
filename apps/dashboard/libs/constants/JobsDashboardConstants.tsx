// src/libs/constants/JobsDashboardConstants.ts

export const informalJobsKpiData = [
  {
    title: 'Total Jobs',
    value: '2,847',
    iconName: 'Briefcase',   // string instead of component
    color: 'teal' as const,
    trend: '+12%',
  },
  {
    title: 'Active Applications',
    value: '1,234',
    iconName: 'FileText',
    color: 'amber' as const,
    trend: '+8%',
  },
  {
    title: 'Pending Reviews',
    value: '156',
    iconName: 'Clock',
    color: 'red' as const,
    trend: '-3%',
  },
  {
    title: 'New Messages',
    value: '89',
    iconName: 'MessageSquare',
    color: 'teal' as const,
    trend: '+15%',
  },
]

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
