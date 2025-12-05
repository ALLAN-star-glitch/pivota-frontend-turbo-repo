"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
interface Job {
  id: string
  title: string
  category: string
  status: 'active' | 'pending' | 'rejected'
  createdOn: string
}
interface EditJobModalProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
  onSave: (updatedJob: Job) => void
}
export function EditJobModal({
  isOpen,
  onClose,
  job,
  onSave,
}: EditJobModalProps) {
  const [formData, setFormData] = useState(
    job || {
      id: '',
      title: '',
      category: '',
      status: 'active' as const,
      createdOn: '',
    },
  )
  if (!job) return null
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
                <h2 className="text-2xl font-bold text-slate-900">Edit Job</h2>
                <button
                  onClick={onClose}
                  className="cursor-pointer p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
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
                    htmlFor="title"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
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
                    htmlFor="status"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as
                          | 'active'
                          | 'pending'
                          | 'rejected',
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer px-6 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer px-6 py-2.5 rounded-xl font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
export default EditJobModal
