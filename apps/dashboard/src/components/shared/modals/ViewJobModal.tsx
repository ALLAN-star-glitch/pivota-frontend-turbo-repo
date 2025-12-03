"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, User, Briefcase } from 'lucide-react'
interface Job {
  id: string
  title: string
  category: string
  status: 'active' | 'pending' | 'rejected'
  createdOn: string
  location?: string
  description?: string
  contact?: string
}
interface ViewJobModalProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
}
const statusStyles = {
  active: 'bg-teal-100 text-teal-700 border-teal-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
}
const statusLabels = {
  active: 'Active',
  pending: 'Pending',
  rejected: 'Rejected',
}
export function ViewJobModal({ isOpen, onClose, job }: ViewJobModalProps) {
  if (!job) return null
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
              <div className="flex items-start justify-between p-6 border-b border-slate-100">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[job.status]}`}
                    >
                      {statusLabels[job.status]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        Category
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        Created On
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(job.createdOn).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.location || 'Nairobi, Kenya'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        Contact
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {job.contact || '+254 700 000 000'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {job.description ||
                      'Experienced professional offering quality services in the informal sector. Reliable, skilled, and ready to work.'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="cursor-pointer px-6 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
export default ViewJobModal
