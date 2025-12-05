export interface Attachment {
  id: string
  name: string
  type: 'pdf' | 'image' | 'doc'
  url: string
}

export interface TimelineEvent {
  id: string
  action: string
  date: string
  user: string
}

export interface Application {
  id: string
  jobTitle: string
  applicantName: string
  email: string
  phone: string
  appliedOn: string
  status: 'active' | 'pending' | 'rejected' | 'shortlisted'
  jobDescription: string
  category: string
  attachments: Attachment[]
  timeline: TimelineEvent[]
}


export interface KPIMetric {
  label: string
  value: number
  color: 'teal' | 'amber' | 'softRed' | 'indigo'
  icon: string
}

export const kpiMetrics: KPIMetric[] = [
  { label: 'Total Applications', value: 8, color: 'teal', icon: 'users' },
  { label: 'Active Applications', value: 3, color: 'amber', icon: 'clock' },
  {
    label: 'Rejected Applications',
    value: 1,
    color: 'softRed',
    icon: 'x-circle',
  },
  { label: 'Shortlisted Candidates', value: 2, color: 'indigo', icon: 'star' },
]
