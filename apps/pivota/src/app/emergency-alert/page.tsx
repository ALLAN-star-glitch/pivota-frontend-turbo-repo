"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, MapPin, Filter, Share2, Star } from "lucide-react";

/**
 * Emergency Alerts Page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const ALERTS = [
  {
    id: 1,
    title: "Flood Warning",
    source: "Kenya Meteorological Dept",
    type: "Flood",
    location: "Kisumu",
    postedAt: "1 hour ago",
    desc: "Heavy rainfall expected, risk of flooding in low-lying areas.",
  },
  {
    id: 2,
    title: "Fire Outbreak",
    source: "Nairobi County Fire Dept",
    type: "Fire",
    location: "Nairobi",
    postedAt: "30 mins ago",
    desc: "Ongoing fire near Industrial Area. Avoid the region.",
  },
  {
    id: 3,
    title: "Missing Person Alert",
    source: "Kenya Police Service",
    type: "Missing Person",
    location: "Mombasa",
    postedAt: "2 hours ago",
    desc: "14-year-old reported missing. Public assistance requested.",
  },
  {
    id: 4,
    title: "Road Accident",
    source: "NTSA",
    type: "Accident",
    location: "Nakuru",
    postedAt: "3 hours ago",
    desc: "Multi-vehicle accident reported along Nakuru-Eldoret highway.",
  },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Nakuru", label: "Nakuru" },
];

const TYPES = [
  { value: "", label: "Any" },
  { value: "Flood", label: "Flood" },
  { value: "Fire", label: "Fire" },
  { value: "Missing Person", label: "Missing Person" },
  { value: "Accident", label: "Accident" },
];

export default function EmergencyAlertsPage() {
  const [location, setLocation] = useState("");
  const [alertType, setAlertType] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setAlertType("");
    setSearch("");
    setCurrentPage(1);
  };

  const filteredAlerts = useMemo(() => {
    return ALERTS.filter((alert) => {
      if (location && alert.location !== location) return false;
      if (alertType && alert.type !== alertType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !alert.title.toLowerCase().includes(q) &&
          !alert.source.toLowerCase().includes(q) &&
          !alert.desc.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [location, alertType, search]);

  const indexOfLast = currentPage * alertsPerPage;
  const indexOfFirst = indexOfLast - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#e07a5f] flex items-center gap-2">
            <AlertTriangle /> Emergency Alerts
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Get verified real-time updates on emergencies and alerts in your area.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#e07a5f" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            Report Emergency
          </button>
        </div>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-24 bg-white border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg text-[#008080] flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-gray-700">Search</label>
              <input
                type="text"
                placeholder="Title, source, keyword"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              />

              <label className="block text-sm text-gray-700">Location</label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>

              <label className="block text-sm text-gray-700">Alert Type</label>
              <select
                value={alertType}
                onChange={(e) => {
                  setAlertType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="mt-2 w-full border border-gray-300 px-3 py-2 rounded hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Listings */}
        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentAlerts.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No alerts match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentAlerts.map((alert) => (
                <article
                  key={alert.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#e07a5f]">
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {alert.source} •{" "}
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={14} />
                          {alert.location}
                        </span>
                      </p>
                      <p className="mt-2 text-gray-700">{alert.desc}</p>
                      <div className="mt-3 flex gap-2 text-xs text-gray-500">
                        <span className="px-2 py-1 rounded-full border">{alert.type}</span>
                        <span className="px-2 py-1 rounded-full border">{alert.postedAt}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button className="text-sm text-[#008080] flex items-center gap-1">
                        <Share2 size={16} /> Share
                      </button>
                      <button className="text-sm text-gray-500 hover:text-[#e07a5f] flex items-center gap-1">
                        <Star size={16} /> Save
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-[#008080] text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sticky filter bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-50">
        <div className="flex gap-2 overflow-x-auto">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[160px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="min-w-[120px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
          >
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            className="min-w-[140px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
