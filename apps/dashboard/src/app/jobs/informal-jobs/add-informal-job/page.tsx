'use client';

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  EyeIcon,
  SendIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
} from 'lucide-react'
import Button from '@/components/shared/Button';
import JobListingForm from '@/components/jobs-module/informal-jobs/JobListingForm';
import JobPreviewPanel from '@/components/jobs-module/informal-jobs/JobPreviewPanel';
import { useJobListingForm } from '../../../../../libs/hooks/useJobListingForm';

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
    resetForm,
  } = useJobListingForm()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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

            {/* Back + Title */}
            <div className="hidden sm:block flex items-center gap-2 sm:gap-3 flex-1">
              <button
                onClick={() => window.history.back()}
                className="cursor-pointer p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon size={20} className="text-gray-600" />
              </button>

              <div>
                <h1 className="hidden sm:block text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  Post Inform Job 
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-600">
                  Post opportunities for informal workers in Kenya
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">

              {/* MOBILE: Text Links */}
              <div className="flex md:hidden items-center justify-center gap-4 text-sm font-medium">

                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-1 text-gray-700 hover:text-teal-600"
                >
                  <EyeIcon size={16} />
                  Preview
                </button>

                <button
                  onClick={resetForm}
                  className="flex items-center gap-1 text-gray-700 hover:text-orange-600"
                >
                  <RefreshCwIcon size={16} />
                  Reset
                </button>

                <button
                  onClick={handlePublish}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                >
                  <SendIcon size={16} />
                  Publish
                </button>

              </div>

              {/* DESKTOP BUTTONS */}
              <div className="hidden md:flex gap-2">


                <Button
                  variant="primary"
                  icon={SendIcon}
                  onClick={handlePublish}
                >
                  Publish Job
                </Button>

              </div>

            </div>

          </div>
        </div>
      </motion.header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

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

          <div className="lg:col-span-5 hidden md:hidden lg:block">
            <JobPreviewPanel formData={formData} onReset={resetForm} />
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

            <JobPreviewPanel formData={formData} onReset={resetForm} />
          </motion.div>
        </motion.div>
      )}

    </div>
  )
}
