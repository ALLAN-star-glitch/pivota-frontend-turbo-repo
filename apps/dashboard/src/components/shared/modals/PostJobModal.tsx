"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
interface PostJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (job: NewJob) => void
}
interface NewJob {
  title: string
  category: string
  location: string
  contact: string
  description: string
}
export function PostJobModal({ isOpen, onClose, onSubmit }: PostJobModalProps) {
  const [formData, setFormData] = useState<NewJob>({
    title: '',
    category: 'Fundi',
    location: '',
    contact: '',
    description: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: '',
      category: 'Fundi',
      location: '',
      contact: '',
      description: '',
    })
    onClose()
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Post Informal Job
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Create a new job listing
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-180px)]"
              >
                <div>
                  <label
                    htmlFor="job-title"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="job-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g., Experienced Carpenter - Westlands"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="job-category"
                      className="block text-sm font-semibold text-slate-900 mb-2"
                    >
                      Category *
                    </label>
                    <select
                      id="job-category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      required
                    >
                      <option value="Fundi">Fundi</option>
                      <option value="Mama Fua">Mama Fua</option>
                      <option value="Boda Services">Boda Services</option>
                      <option value="Masonry">Masonry</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Hair & Beauty">Hair & Beauty</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="job-location"
                      className="block text-sm font-semibold text-slate-900 mb-2"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="job-location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g., Westlands, Nairobi"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="job-contact"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="job-contact"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: e.target.value,
                      })
                    }
                    placeholder="+254 700 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="job-description"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="job-description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the job, skills required, and any other relevant details..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                    required
                  />
                </div>
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors shadow-sm"
                >
                  Post Job
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
export default PostJobModal
