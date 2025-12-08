"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Calendar, User, Mail, Phone, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Application } from '../../../../../libs/interfaces/JobsApplications';
interface ViewApplicationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (application: Application) => void;
}
export const ViewApplicationModal: React.FC<ViewApplicationModalProps> = ({
  application,
  isOpen,
  onClose,
  onStatusUpdate
}) => {
  if (!application) return null;
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

          {/* Modal */}
          <motion.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-soft-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {application.jobTitle}
                  </h2>
                  <StatusBadge status={application.status} />
                </div>
                <motion.button whileHover={{
              rotate: 90,
              scale: 1.1
            }} transition={{
              duration: 0.2
            }} onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Applicant Info */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Applicant Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium text-gray-900">
                          {application.applicantName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">
                          {application.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {application.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Applied On</p>
                        <p className="font-medium text-gray-900">
                          {application.appliedOn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Job Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span>{' '}
                      {application.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      {application.jobDescription}
                    </p>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Attachments
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {application.attachments.map(attachment => <motion.a key={attachment.id} href={attachment.url} whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-teal hover:bg-teal-50 transition-colors">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500 uppercase">
                            {attachment.type}
                          </p>
                        </div>
                      </motion.a>)}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Activity Timeline
                  </h3>
                  <div className="space-y-3">
                    {application.timeline.map((event, index) => <motion.div key={event.id} initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-teal" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {event.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.date} • {event.user}
                          </p>
                        </div>
                      </motion.div>)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => onStatusUpdate(application)} className="flex-1 px-6 py-3 bg-teal text-white rounded-xl font-medium hover:bg-teal-600 transition-colors">
                    Update Status
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={onClose} className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};