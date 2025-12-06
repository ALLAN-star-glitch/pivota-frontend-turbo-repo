import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Check, Trash2 } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { Application } from '../../../../../libs/interfaces/JobsApplications'

interface ApplicationsTableProps {
  applications: Application[]
  onView: (application: Application) => void
  onApprove: (application: Application) => void
  onReject: (application: Application) => void
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onView,
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Applicant Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Applied On
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((application, index) => (
              <motion.tr
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  transition: { duration: 0.2 },
                }}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">
                    {application.jobTitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.category}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">
                    {application.applicantName}
                  </p>
                  <p className="text-sm text-gray-500">{application.email}</p>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {application.appliedOn}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={application.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onView(application)}
                      className="cursor-pointer p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onApprove(application)}
                      className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onReject(application)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {applications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {application.jobTitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.category}
                  </p>
                </div>
                <StatusBadge status={application.status} />
              </div>

              <div>
                <p className="font-medium text-gray-900">
                  {application.applicantName}
                </p>
                <p className="text-sm text-gray-500">{application.email}</p>
              </div>

              <p className="text-sm text-gray-600">
                Applied: {application.appliedOn}
              </p>

              <div className="flex gap-2 pt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onView(application)}
                  className="flex-1 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg font-medium text-sm hover:bg-teal-100 transition-colors"
                >
                  View
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onApprove(application)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium text-sm hover:bg-teal-700 transition-colors"
                >
                  Approve
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onReject(application)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                >
                  Reject
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
