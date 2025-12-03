"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import EditJobModal from './EditJobModal'
import DeleteJobModal from './DeleteJobModal'
import ViewJobModal from './ViewJobModal'
interface Job {
  id: string
  title: string
  category: string
  status: 'active' | 'pending' | 'rejected'
  createdOn: string
}
const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Carpenter - Westlands',
    category: 'Fundi',
    status: 'active',
    createdOn: '2024-01-15',
  },
  {
    id: '2',
    title: 'Laundry Services - Kilimani',
    category: 'Mama Fua',
    status: 'active',
    createdOn: '2024-01-14',
  },
  {
    id: '3',
    title: 'Boda Rider - CBD',
    category: 'Boda Services',
    status: 'pending',
    createdOn: '2024-01-14',
  },
  {
    id: '4',
    title: 'Mason - Kasarani',
    category: 'Masonry',
    status: 'active',
    createdOn: '2024-01-13',
  },
  {
    id: '5',
    title: 'Electrician - Parklands',
    category: 'Electrician',
    status: 'rejected',
    createdOn: '2024-01-12',
  },
  {
    id: '6',
    title: 'Hairstylist - Ngara',
    category: 'Hair & Beauty',
    status: 'active',
    createdOn: '2024-01-12',
  },
  {
    id: '7',
    title: 'Plumber - Lavington',
    category: 'Fundi',
    status: 'pending',
    createdOn: '2024-01-11',
  },
]
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
export function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const handleView = (job: Job) => {
    setSelectedJob(job)
    setViewModalOpen(true)
  }
  const handleEdit = (job: Job) => {
    setSelectedJob(job)
    setEditModalOpen(true)
  }
  const handleDelete = (job: Job) => {
    setSelectedJob(job)
    setDeleteModalOpen(true)
  }
  const handleSaveEdit = (updatedJob: Job) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
  }
  const handleConfirmDelete = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.6,
        }}
        className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Jobs</h2>
          <p className="text-sm text-slate-500">Latest informal job listings</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Created On
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <motion.tr
                  key={job.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + index * 0.05,
                  }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-900">
                      {job.title}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600">{job.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[job.status]}`}
                    >
                      {statusLabels[job.status]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600">
                      {new Date(job.createdOn).toLocaleDateString('en-GB')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(job)}
                        className="cursor-pointer p-2 rounded-xl hover:bg-teal-50 text-teal-600 transition-colors"
                        aria-label="View job"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(job)}
                        className="cursor-pointer p-2 rounded-xl hover:bg-amber-50 text-amber-600 transition-colors"
                        aria-label="Edit job"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="cursor-pointer p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                        aria-label="Delete job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.7 + index * 0.05,
              }}
              className="bg-slate-50 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-600">{job.category}</p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[job.status]}`}
                >
                  {statusLabels[job.status]}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-sm text-slate-500">
                  {new Date(job.createdOn).toLocaleDateString('en-GB')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(job)}
                    className="cursor-pointer p-2 rounded-xl hover:bg-teal-100 text-teal-600 transition-colors"
                    aria-label="View job"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(job)}
                    className="cursor-pointer p-2 rounded-xl hover:bg-amber-100 text-amber-600 transition-colors"
                    aria-label="Edit job"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job)}
                    className="cursor-pointer p-2 rounded-xl hover:bg-red-100 text-red-600 transition-colors"
                    aria-label="Delete job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <ViewJobModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        job={selectedJob}
      />
      <EditJobModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        job={selectedJob}
        onSave={handleSaveEdit}
      />
      <DeleteJobModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        job={selectedJob}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
export default JobsTable
