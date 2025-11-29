'use client'

import { motion } from 'framer-motion'
import {
  BriefcaseIcon,
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
  ClockIcon,
  LightbulbIcon,
  FileTextIcon,
} from 'lucide-react'
import { Badge } from '../../shared/Badge'
import { JobListing } from '../../../../libs/types/jobs/job'

interface JobPreviewPanelProps {
  formData: JobListing
}

const jobCategories = [
  { value: 'mjengo', label: 'Mjengo (Construction Worker)' },
  { value: 'fundi-stima', label: 'Fundi Stima (Electrician)' },
  { value: 'boda-boda', label: 'Boda Boda Rider (Motorcycle Taxi)' },
  { value: 'jiko-chef', label: 'Jiko / Chef (Cook)' },
  { value: 'barber', label: 'Barber / Kinyozi' },
  { value: 'shop-attendant', label: 'Ushauri / Shop Attendant' },
  { value: 'farmer', label: 'Farmer / Mkulima' },
  { value: 'messenger', label: 'Messenger / Runner' },
  { value: 'security', label: 'Security Guard / Askari' },
  { value: 'cleaner', label: 'Cleaner / Msafishaji' },
  { value: 'digital-freelancer', label: 'Digital Freelancer' },
] as const

const experienceLevels = [
  { value: 'no-experience', label: 'No experience / Hakuna uzoefu' },
  { value: '6-months', label: '6 months / Miezi 6' },
  { value: '1-year', label: '1 year / Mwaka 1' },
  { value: '2-years', label: '2 years / Miaka 2' },
  { value: '3-plus-years', label: '3+ years / Miaka 3+' },
] as const

const employmentTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'contract', label: 'Contract' },
] as const

export default function JobPreviewPanel({ formData }: JobPreviewPanelProps) {
  const formatPayRate = (rate: JobListing['pay']['rate']) => {
    const rates: Record<JobListing['pay']['rate'], string> = {
      daily: 'per day',
      weekly: 'per week',
      hourly: 'per hour',
      fixed: 'fixed rate',
    }
    return rates[rate] || rate
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const isEmptyForm = !formData.title && !formData.category

  return (
    <div className="sticky top-60 space-y-6">

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <Badge variant="teal">{formData.status === 'draft' ? 'Draft' : 'Published'}</Badge>
        </div>

        {isEmptyForm ? (
          // Dotted border placeholder inside the panel
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-3">
            <FileTextIcon size={36} className="text-gray-400" />
            <h4 className="text-lg font-semibold text-gray-900">Start filling the form</h4>
            <p className="text-sm text-gray-400">Your job listing preview will appear here</p>
          </div>
        ) : (
          // Live preview content
          <div className="space-y-4">
            {/* Job Title */}
            <div>
              <h4 className="text-xl font-bold text-gray-900">{formData.title}</h4>
              {formData.category && (
                <p className="text-sm text-teal-600 mt-1">
                  {jobCategories.find((c) => c.value === formData.category)?.label}
                </p>
              )}
            </div>

            {/* Key Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPinIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <span>
                  {formData.location.city}
                  {formData.location.neighborhood && `, ${formData.location.neighborhood}`}
                  {formData.location.isRemote && ' (Remote)'}
                </span>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <DollarSignIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <span>
                  KES {formData.pay.amount} {formatPayRate(formData.pay.rate)}
                </span>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <BriefcaseIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <span>
                  {experienceLevels.find((e) => e.value === formData.experienceLevel)?.label}
                </span>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <ClockIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <span>
                  {employmentTypes.find((e) => e.value === formData.employmentType)?.label}
                </span>
              </div>

              {(formData.applicationPeriod.startDate || formData.applicationPeriod.endDate) && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CalendarIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                  <span>
                    {formatDate(formData.applicationPeriod.startDate)} - {formatDate(formData.applicationPeriod.endDate)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {formData.description && (
              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Description</h5>
                <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-4">{formData.description}</p>
              </div>
            )}

            {/* Skills */}
            {formData.skills.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Required Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="teal">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            {formData.equipmentRequired.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Equipment Needed</h5>
                <div className="flex flex-wrap gap-2">
                  {formData.equipmentRequired.map((equipment, index) => (
                    <Badge key={index}>{equipment}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Tips & Quick Actions remain unchanged */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <LightbulbIcon size={20} className="text-teal-600" />
          <h3 className="text-base font-semibold text-teal-900">Tips for Better Listings</h3>
        </div>
        <ul className="space-y-2 text-sm text-teal-800">
          <li className="flex items-start gap-2"><span className="text-teal-500 mt-1">•</span>Be clear about pay and working hours</li>
          <li className="flex items-start gap-2"><span className="text-teal-500 mt-1">•</span>Keep requirements flexible for informal workers</li>
          <li className="flex items-start gap-2"><span className="text-teal-500 mt-1">•</span>Mention if no formal qualifications are needed</li>
          <li className="flex items-start gap-2"><span className="text-teal-500 mt-1">•</span>Include location details and transport info</li>
        </ul>
      </motion.div>

    
    </div>
  )
}
