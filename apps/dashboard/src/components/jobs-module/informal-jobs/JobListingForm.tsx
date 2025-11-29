'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  BriefcaseIcon,
  MapPinIcon,
  DollarSignIcon,
  FileTextIcon,
  WrenchIcon,
} from 'lucide-react'
import { Input } from '@/components/shared/Input'
import { Select } from '@/components/shared/Select'
import { Textarea } from '@/components/shared/Textarea'
import { Badge } from '../../shared/Badge'
import { Tooltip } from '@/components/shared/Tooltip'
import { NestedKeyOf, ValueAtPath } from '../../../../libs/hooks/useJobListingForm'
import { JobListing } from '../../../../libs/types/jobs/job'
import DatePicker from '@/components/shared/DatePicker'
import Button from '../../shared/Button'

// -------------------- Dropdown Options --------------------
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
]

const experienceLevels = [
  { value: 'no-experience', label: 'No experience / Hakuna uzoefu' },
  { value: '6-months', label: '6 months / Miezi 6' },
  { value: '1-year', label: '1 year / Mwaka 1' },
  { value: '2-years', label: '2 years / Miaka 2' },
  { value: '3-plus-years', label: '3+ years / Miaka 3+' },
]

const employmentTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'contract', label: 'Contract' },
]

const payRates: JobListing['pay']['rate'][] = ['daily', 'weekly', 'hourly', 'fixed']

// -------------------- Props --------------------
interface JobListingFormProps {
  formData: JobListing
 updateField: <P extends NestedKeyOf<JobListing>>(
    field: P,
    value: ValueAtPath<JobListing, P>
  ) => void;
  currentSkillInput: string
  setCurrentSkillInput: (value: string) => void
  addSkill: () => void
  removeSkill: (index: number) => void
  currentDocumentInput: string
  setCurrentDocumentInput: (value: string) => void
  addDocument: () => void
  removeDocument: (index: number) => void
  currentEquipmentInput: string
  setCurrentEquipmentInput: (value: string) => void
  addEquipment: () => void
  removeEquipment: (index: number) => void
  getError: (field: keyof JobListing) => string | undefined
}

// -------------------- Component --------------------
export default function JobListingForm({
  formData,
  updateField,
  currentSkillInput,
  setCurrentSkillInput,
  addSkill,
  removeSkill,
  currentDocumentInput,
  setCurrentDocumentInput,
  addDocument,
  removeDocument,
  currentEquipmentInput,
  setCurrentEquipmentInput,
  addEquipment,
  removeEquipment,
  getError,
}: JobListingFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Basic Information */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <BriefcaseIcon size={20} className="text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
        </div>

        <Input
          label="Job Title"
          value={formData.title}
          onChange={(value) => updateField('title', value)}
          placeholder="e.g., Experienced Fundi Stima for Residential Projects"
          error={getError('title')}
          required
        />

        <Select
          label="Job Category / Type"
          value={formData.category}
          onChange={(value) => updateField('category', value)}
          options={jobCategories}
          placeholder="Select a job category"
          error={getError('category')}
          required
        />

        <Textarea
          label="Job Description"
          value={formData.description}
          onChange={(value) => updateField('description', value)}
          placeholder="Describe the job responsibilities, requirements, and what makes this opportunity great..."
          error={getError('description')}
          required
          rows={6}
          maxLength={1000}
        />
      </section>

      {/* Skills & Experience */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <WrenchIcon size={20} className="text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-900">Skills & Experience</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Skills / Competencies</label>
            <Tooltip content="Add specific skills needed for this job. These can be technical or soft skills." />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentSkillInput}
              onChange={(e) => setCurrentSkillInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addSkill())
              }
              placeholder="e.g., Electrical wiring, Problem solving"
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all"
            />
            <Button onClick={addSkill} icon={PlusIcon} size="md">Add</Button>
          </div>

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="teal" onRemove={() => removeSkill(index)}>
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Select
          label="Experience Level"
          value={formData.experienceLevel}
          onChange={(value) => updateField('experienceLevel', value)}
          options={experienceLevels}
          placeholder="Select experience level"
          error={getError('experienceLevel')}
          required
        />

        <Select
          label="Employment Type"
          value={formData.employmentType}
          onChange={(value) => updateField('employmentType', value)}
          options={employmentTypes}
          placeholder="Select employment type"
          error={getError('employmentType')}
          required
        />
      </section>

      {/* Location */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <MapPinIcon size={20} className="text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-900">Location</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            value={formData.location.city}
            onChange={(value) =>
              updateField('location', { ...formData.location, city: value })
            }
            placeholder="e.g., Nairobi"
            error={getError('location')}
            required
          />
          <Input
            label="Neighborhood"
            value={formData.location.neighborhood}
            onChange={(value) =>
              updateField('location', { ...formData.location, neighborhood: value })
            }
            placeholder="e.g., Westlands"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.location.isRemote}
            onChange={(e) =>
              updateField('location', { ...formData.location, isRemote: e.target.checked })
            }
            className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
          />
          <span className="text-sm text-gray-700">This is a remote position</span>
        </label>
      </section>

      {/* Pay & Compensation */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <DollarSignIcon size={20} className="text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-900">Pay & Compensation</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Pay Amount (KES)"
            value={formData.pay.amount}
            onChange={(value) =>
              updateField('pay', { ...formData.pay, amount: value })
            }
            type="number"
            placeholder="e.g., 1500"
            error={getError('pay')}
            required
          />
          <Select
            label="Pay Rate"
            value={formData.pay.rate}
            onChange={(value) =>
              updateField('pay', { ...formData.pay, rate: value as JobListing['pay']['rate'] })
            }
            options={payRates.map((rate) => ({ value: rate, label: rate }))}
            required
          />
        </div>
      </section>

      {/* Application Period */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <FileTextIcon size={20} className="text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-900">Application Period</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Application Start Date"
            value={formData.applicationPeriod.startDate}
            onChange={(value) =>
              updateField('applicationPeriod', { ...formData.applicationPeriod, startDate: value })
            }
            error={getError('applicationPeriod')}
            required
          />
          <DatePicker
            label="Application End Date"
            value={formData.applicationPeriod.endDate}
            onChange={(value) =>
              updateField('applicationPeriod', { ...formData.applicationPeriod, endDate: value })
            }
            min={formData.applicationPeriod.startDate}
            required
          />
        </div>
      </section>

      {/* Additional Requirements */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Documents */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Documents Needed (Optional)</label>
            <Tooltip content="List any documents applicants should have. Keep it flexible for informal workers." />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentDocumentInput}
              onChange={(e) => setCurrentDocumentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
              placeholder="e.g., ID copy, Reference letter (optional)"
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all"
            />
            <Button onClick={addDocument} icon={PlusIcon} size="md">Add</Button>
          </div>

          {formData.documentsNeeded.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.documentsNeeded.map((doc, index) => (
                <Badge key={index} variant="amber" onRemove={() => removeDocument(index)}>{doc}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Equipment */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Equipment / Tools Required</label>
            <Tooltip content="List any tools or equipment the worker should have or bring." />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentEquipmentInput}
              onChange={(e) => setCurrentEquipmentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
              placeholder="e.g., Own tools, Motorcycle"
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all"
            />
            <Button onClick={addEquipment} icon={PlusIcon} size="md">Add</Button>
          </div>

          {formData.equipmentRequired.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.equipmentRequired.map((eq, index) => (
                <Badge key={index} onRemove={() => removeEquipment(index)}>{eq}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <Textarea
          label="Additional Notes / Instructions"
          value={formData.additionalNotes}
          onChange={(value) => updateField('additionalNotes', value)}
          placeholder="Any other important information for applicants..."
          rows={4}
        />
      </section>
    </motion.div>
  )
}
