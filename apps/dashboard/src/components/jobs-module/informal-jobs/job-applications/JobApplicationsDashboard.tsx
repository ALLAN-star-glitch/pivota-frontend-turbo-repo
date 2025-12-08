"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { mockApplications } from "../../../../../libs/constants/InformalJobsApplications";
import { Application, kpiMetrics } from "../../../../../libs/interfaces/JobsApplications";
import { ApplicationsTable } from "./ApplicationsTable";
import { FilterBar } from "./FilterBar";
import { KPICard } from "./KPICard";
import { StatusUpdateModal } from "./StatusUpdateModal";
import { ViewApplicationModal } from "./ViewApplicationModal";
import { Sidebar } from "./Sidebar";

export default function JobApplicationsDashboard() {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState(0);

  // Filter logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          app.jobTitle.toLowerCase().includes(query) ||
          app.applicantName.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      if (statusFilters.length > 0 && !statusFilters.includes(app.status)) return false;
      if (categoryFilter && app.category !== categoryFilter) return false;

      if (dateRangeFilter > 0) {
        const appliedDate = new Date(app.appliedOn);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() - dateRangeFilter);

        if (appliedDate < cutoff) return false;
      }

      return true;
    });
  }, [applications, searchQuery, statusFilters, categoryFilter, dateRangeFilter]);

  // KPI Metrics
  const updatedKpiMetrics = useMemo(() => {
    const total = filteredApplications.length;
    const active = filteredApplications.filter((a) => a.status === "active").length;
    const rejected = filteredApplications.filter((a) => a.status === "rejected").length;
    const shortlisted = filteredApplications.filter((a) => a.status === "shortlisted").length;

    return [
      { ...kpiMetrics[0], value: total },
      { ...kpiMetrics[1], value: active },
      { ...kpiMetrics[2], value: rejected },
      { ...kpiMetrics[3], value: shortlisted },
    ];
  }, [filteredApplications]);

  // Handlers
  const handleView = (app: Application) => {
    setSelectedApplication(app);
    setIsViewModalOpen(true);
  };

  const handleApprove = (app: Application) => {
    setSelectedApplication(app);
    setIsStatusModalOpen(true);
  };

  const handleReject = (app: Application) => {
    setSelectedApplication(app);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = (status: Application["status"]) => {
    if (!selectedApplication) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id ? { ...app, status } : app
      )
    );
  };

  const handleSavedViewClick = (view: string) => {
    switch (view) {
      case "recent":
        setDateRangeFilter(7);
        setStatusFilters([]);
        setCategoryFilter("");
        break;
      case "pending":
        setStatusFilters(["pending"]);
        setCategoryFilter("");
        setDateRangeFilter(0);
        break;
      case "shortlisted":
        setStatusFilters(["shortlisted"]);
        setCategoryFilter("");
        setDateRangeFilter(0);
        break;
    }
  };

  const handleClearFilters = () => {
    setDateRangeFilter(0);
    setCategoryFilter("");
    setStatusFilters([]);
  };

  const hasActiveFilters =
    statusFilters.length > 0 || categoryFilter || dateRangeFilter > 0;

  return (
    <div className="min-h-screen flex bg-surfaceAlt">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        applications={applications}
        onFilterByStatus={setStatusFilters}
        onFilterByCategory={setCategoryFilter}
        onDateRangeFilter={setDateRangeFilter}
        onSavedViewClick={handleSavedViewClick}
        onClearFilters={handleClearFilters}
        activeFilters={{
          statuses: statusFilters,
          category: categoryFilter,
          dateRange: dateRangeFilter,
        }}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* MOBILE TOGGLE */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 left-6 w-14 h-14 bg-primary text-white rounded-full shadow-soft-lg flex items-center justify-center z-30"
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {updatedKpiMetrics.map((metric, index) => (
              <KPICard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                color={metric.color}
                icon={metric.icon}
                index={index}
              />
            ))}
          </div>

          {/* SEARCH BAR */}
          <FilterBar onSearchChange={setSearchQuery} />

          {/* RESULTS COUNT */}
          {(searchQuery || hasActiveFilters) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-dark"
            >
              Showing{" "}
              <span className="font-semibold text-primary">
                {filteredApplications.length}
              </span>{" "}
              of {applications.length} applications
            </motion.div>
          )}

          {/* TABLE */}
          <ApplicationsTable
            applications={filteredApplications}
            onView={handleView}
            onApprove={handleApprove}
            onReject={handleReject}
          />

          {/* EMPTY STATE */}
          {filteredApplications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface rounded-2xl shadow-soft p-12 text-center"
            >
              <p className="text-muted-dark text-lg mb-2">
                No applications found
              </p>
              <p className="text-muted text-sm">
                Try adjusting your filters or search query
              </p>
            </motion.div>
          )}

          {/* MODALS */}
          <ViewApplicationModal
            application={selectedApplication}
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            onStatusUpdate={handleApprove}
          />

          <StatusUpdateModal
            application={selectedApplication}
            isOpen={isStatusModalOpen}
            onClose={() => setIsStatusModalOpen(false)}
            onConfirm={handleStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
}
