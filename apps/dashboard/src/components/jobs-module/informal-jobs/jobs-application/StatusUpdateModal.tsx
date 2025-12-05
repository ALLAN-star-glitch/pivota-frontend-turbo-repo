"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Application } from '../../../../../libs/interfaces/JobsApplications';
interface StatusUpdateModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: Application['status'], reason: string) => void;
}
export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  application,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Application['status']>('active');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  if (!application) return null;
  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm(selectedStatus, reason);
      setShowSuccess(false);
      setReason('');
      onClose();
    }, 1000);
  };
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
        y: -50,
        scale: 0.9
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: -50,
        scale: 0.9
      }} transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-soft-lg max-w-md w-full">
              {/* Success Animation Overlay */}
              <AnimatePresence>
                {showSuccess && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} className="absolute inset-0 bg-teal/10 rounded-2xl flex items-center justify-center z-10">
                    <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                damping: 15,
                stiffness: 300
              }} className="w-20 h-20 bg-teal rounded-full flex items-center justify-center">
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                  </motion.div>}
              </AnimatePresence>

              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Update Application Status
                </h2>
                <motion.button whileHover={{
              rotate: 90,
              scale: 1.1
            }} transition={{
              duration: 0.2
            }} onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Applicant</p>
                  <p className="font-semibold text-gray-900">
                    {application.applicantName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.jobTitle}
                  </p>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value as Application['status'])} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason / Notes (Optional)
                  </label>
                  <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Add any notes or reasons for this status change..." rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-teal transition-colors resize-none" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={handleConfirm} className="flex-1 px-6 py-3 bg-teal text-white rounded-xl font-medium hover:bg-teal-600 transition-colors">
                    Confirm
                  </motion.button>
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={onClose} className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};