"use client";

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, SendIcon, ArrowLeftIcon } from 'lucide-react'
import { useJobListingForm } from '../../../libs/hooks/useJobListingForm'
import Button from '@/components/shared/Button';
import JobListingForm from '@/components/jobs-module/informal-jobs/JobListingForm';
import JobPreviewPanel from '@/components/jobs-module/informal-jobs/JobPreviewPanel';

export default function CreateJobListing() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const {
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
    publish,
  } = useJobListingForm()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePublish = () => {
    if (publish()) {
      alert('Job listing published successfully!')
    } else {
      alert('Please fill in all required fields before publishing.')
    }
  }

  return (
    <div className="min-h-screen">

      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-24 z-40 bg-white transition-shadow rounded-2xl shadow-duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Left: Title */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
              <button
                onClick={() => window.history.back()}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon size={20} className="text-gray-600" />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  Create Job Listing
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Post opportunities for informal workers in Kenya
                </p>
              </div>
            </div>

            {/* Right: Buttons — improved mobile layout */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">

              {/* Preview (mobile only) */}
              <Button
                variant="ghost"
                icon={EyeIcon}
                onClick={() => setShowPreview(true)}
                className="md:hidden w-full"
              >
                Preview
              </Button>

              <Button
                variant="primary"
                icon={SendIcon}
                onClick={handlePublish}
                className="w-full sm:w-auto"
              >
                Publish Job
              </Button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <JobListingForm
              formData={formData}
              updateField={updateField}
              currentSkillInput={currentSkillInput}
              setCurrentSkillInput={setCurrentSkillInput}
              addSkill={addSkill}
              removeSkill={removeSkill}
              currentDocumentInput={currentDocumentInput}
              setCurrentDocumentInput={setCurrentDocumentInput}
              addDocument={addDocument}
              removeDocument={removeDocument}
              currentEquipmentInput={currentEquipmentInput}
              setCurrentEquipmentInput={setCurrentEquipmentInput}
              addEquipment={addEquipment}
              removeEquipment={removeEquipment}
              getError={getError}
            />
          </div>

          {/* Right Column: Preview — desktop only */}
          <div className="lg:col-span-5 hidden md:hidden lg:block">
            <JobPreviewPanel formData={formData} />
          </div>

        </div>
      </main>

      {/* Mobile Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon size={20} />
              </button>
            </div>

            <JobPreviewPanel formData={formData}/>
          </motion.div>
        </motion.div>
      )}

    </div>
  )
}
