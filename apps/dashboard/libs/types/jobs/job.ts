export interface JobListing {
  id?: string
  title: string
  category: string
  description: string
  skills: string[]
  experienceLevel: string
  employmentType: string
  location: {
    city: string
    neighborhood: string
    isRemote: boolean
  }
  pay: {
    amount: string
    rate: 'daily' | 'weekly' | 'hourly' | 'fixed'
  }
  applicationPeriod: {
    startDate: string
    endDate: string
  }
  documentsNeeded: string[]
  equipmentRequired: string[]
  additionalNotes: string
  status: 'draft' | 'published'
  createdAt?: string
}

export interface ValidationError {
  field: string
  message: string
}
