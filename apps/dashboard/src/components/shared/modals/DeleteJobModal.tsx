"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
interface Job {
  id: string
  title: string
  category: string
  status: 'active' | 'pending' | 'rejected'
  createdOn: string
}
interface DeleteJobModalProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
  onConfirm: (jobId: string) => void
}
export function DeleteJobModal({
  isOpen,
  onClose,
  job,
  onConfirm,
}: DeleteJobModalProps) {
  if (!job) return null
  const handleDelete = () => {
    onConfirm(job.id)
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
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-red-50 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Delete Job
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-slate-900">
                    &quot;{job.title}&quot;
                  </span>
                  ? This will permanently remove the job listing and all
                  associated data.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Delete Job
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
export default DeleteJobModal
