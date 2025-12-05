import { Application } from "../interfaces/JobsApplications"

export const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    applicantName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    appliedOn: '2024-01-15',
    status: 'active',
    jobDescription:
      'Looking for an experienced frontend developer with React and TypeScript expertise.',
    category: 'Engineering',
    attachments: [
      { id: 'a1', name: 'Resume_SarahChen.pdf', type: 'pdf', url: '#' },
      { id: 'a2', name: 'Portfolio.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't1',
        action: 'Application submitted',
        date: '2024-01-15',
        user: 'System',
      },
      {
        id: 't2',
        action: 'Application reviewed',
        date: '2024-01-16',
        user: 'John Doe',
      },
    ],
  },
  {
    id: '2',
    jobTitle: 'UX Designer',
    applicantName: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    phone: '+1 (555) 234-5678',
    appliedOn: '2024-01-14',
    status: 'shortlisted',
    jobDescription:
      'Seeking a creative UX designer with strong portfolio and user research experience.',
    category: 'Design',
    attachments: [
      { id: 'a3', name: 'Resume_Marcus.pdf', type: 'pdf', url: '#' },
      { id: 'a4', name: 'Portfolio_Samples.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't3',
        action: 'Application submitted',
        date: '2024-01-14',
        user: 'System',
      },
      {
        id: 't4',
        action: 'Shortlisted for interview',
        date: '2024-01-15',
        user: 'Jane Smith',
      },
    ],
  },
  {
    id: '3',
    jobTitle: 'Product Manager',
    applicantName: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    appliedOn: '2024-01-13',
    status: 'pending',
    jobDescription:
      'Product manager role focusing on B2B SaaS products and agile methodologies.',
    category: 'Product',
    attachments: [
      { id: 'a5', name: 'Resume_Emily.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't5',
        action: 'Application submitted',
        date: '2024-01-13',
        user: 'System',
      },
    ],
  },
  {
    id: '4',
    jobTitle: 'Backend Engineer',
    applicantName: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    appliedOn: '2024-01-12',
    status: 'rejected',
    jobDescription:
      'Backend engineer with Node.js and database optimization experience.',
    category: 'Engineering',
    attachments: [
      { id: 'a6', name: 'Resume_David.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't6',
        action: 'Application submitted',
        date: '2024-01-12',
        user: 'System',
      },
      {
        id: 't7',
        action: 'Application rejected',
        date: '2024-01-13',
        user: 'John Doe',
      },
    ],
  },
  {
    id: '5',
    jobTitle: 'Data Analyst',
    applicantName: 'Priya Patel',
    email: 'priya.p@email.com',
    phone: '+1 (555) 567-8901',
    appliedOn: '2024-01-11',
    status: 'active',
    jobDescription:
      'Data analyst with SQL, Python, and data visualization skills.',
    category: 'Analytics',
    attachments: [
      { id: 'a7', name: 'Resume_Priya.pdf', type: 'pdf', url: '#' },
      { id: 'a8', name: 'CaseStudy.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't8',
        action: 'Application submitted',
        date: '2024-01-11',
        user: 'System',
      },
    ],
  },
  {
    id: '6',
    jobTitle: 'Marketing Manager',
    applicantName: 'Alex Thompson',
    email: 'alex.t@email.com',
    phone: '+1 (555) 678-9012',
    appliedOn: '2024-01-10',
    status: 'shortlisted',
    jobDescription:
      'Marketing manager with digital marketing and campaign management expertise.',
    category: 'Marketing',
    attachments: [{ id: 'a9', name: 'Resume_Alex.pdf', type: 'pdf', url: '#' }],
    timeline: [
      {
        id: 't9',
        action: 'Application submitted',
        date: '2024-01-10',
        user: 'System',
      },
      {
        id: 't10',
        action: 'Shortlisted',
        date: '2024-01-11',
        user: 'Jane Smith',
      },
    ],
  },
  {
    id: '7',
    jobTitle: 'DevOps Engineer',
    applicantName: 'Lisa Wang',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 789-0123',
    appliedOn: '2024-01-09',
    status: 'pending',
    jobDescription:
      'DevOps engineer with AWS, Docker, and Kubernetes experience.',
    category: 'Engineering',
    attachments: [
      { id: 'a10', name: 'Resume_Lisa.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't11',
        action: 'Application submitted',
        date: '2024-01-09',
        user: 'System',
      },
    ],
  },
  {
    id: '8',
    jobTitle: 'Content Writer',
    applicantName: 'James Miller',
    email: 'james.m@email.com',
    phone: '+1 (555) 890-1234',
    appliedOn: '2024-01-08',
    status: 'active',
    jobDescription:
      'Content writer for technical documentation and blog posts.',
    category: 'Content',
    attachments: [
      { id: 'a11', name: 'Resume_James.pdf', type: 'pdf', url: '#' },
      { id: 'a12', name: 'WritingSamples.pdf', type: 'pdf', url: '#' },
    ],
    timeline: [
      {
        id: 't12',
        action: 'Application submitted',
        date: '2024-01-08',
        user: 'System',
      },
    ],
  },
]

