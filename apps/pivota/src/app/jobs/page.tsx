"use client";

import React, { useMemo, useState } from "react";
import { Briefcase, MapPin, Filter, Star } from "lucide-react";

/**
 * Jobs page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const JOBS = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Pivota Labs",
    sector: "it",
    location: "Nairobi",
    type: "Full-time",
    salary: 120000,
    postedAt: "3 days ago",
    desc: "Work on scalable web applications and integrations for PivotaConnect.",
  },
  {
    id: 2,
    title: "Community Health Nurse",
    company: "WellCare NGO",
    sector: "health",
    location: "Kisumu",
    type: "Part-time",
    salary: 40000,
    postedAt: "1 week ago",
    desc: "Provide community outreach health services and patient education.",
  },
  {
    id: 3,
    title: "Civil Site Supervisor",
    company: "BuildRight Ltd",
    sector: "construction",
    location: "Nairobi",
    type: "Full-time",
    salary: 90000,
    postedAt: "5 days ago",
    desc: "Supervise civil works on residential and small commercial projects.",
  },
  {
    id: 4,
    title: "Primary School Teacher (STEM)",
    company: "BrightStart Academy",
    sector: "education",
    location: "Mombasa",
    type: "Full-time",
    salary: 60000,
    postedAt: "2 days ago",
    desc: "Teach STEM subjects to lower primary classes and support curriculum.",
  },
  {
    id: 5,
    title: "Freelance Graphic Designer",
    company: "Creative Hive",
    sector: "it",
    location: "Remote",
    type: "Freelance",
    salary: 30000,
    postedAt: "1 month ago",
    desc: "Design marketing materials and brand assets for clients.",
  },
  {
    id: 6,
    title: "Agricultural Extension Officer",
    company: "AgriGrow",
    sector: "agriculture",
    location: "Eldoret",
    type: "Full-time",
    salary: 70000,
    postedAt: "3 weeks ago",
    desc: "Support farmers with best practices and field demonstrations.",
  },
  {
    id: 7,
    title: "Finance Officer",
    company: "MicroLend",
    sector: "finance",
    location: "Nairobi",
    type: "Full-time",
    salary: 95000,
    postedAt: "6 days ago",
    desc: "Manage reconciliation, reporting and support audit readiness.",
  },
];

const SECTORS = [
  { value: "", label: "All Sectors" },
  { value: "it", label: "IT & Software" },
  { value: "health", label: "Healthcare" },
  { value: "construction", label: "Construction" },
  { value: "education", label: "Education" },
  { value: "agriculture", label: "Agriculture" },
  { value: "finance", label: "Finance" },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Eldoret", label: "Eldoret" },
  { value: "Remote", label: "Remote" },
];

export default function JobsPage() {
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const clearFilters = () => {
    setSector("");
    setLocation("");
    setJobType("");
    setSearch("");
    setMinSalary("");
    setMaxSalary("");
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      if (sector && job.sector !== sector) return false;
      if (location && job.location !== location) return false;
      if (jobType && job.type !== jobType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.desc.toLowerCase().includes(q)
        )
          return false;
      }
      if (minSalary !== "" && job.salary < Number(minSalary)) return false;
      if (maxSalary !== "" && job.salary > Number(maxSalary)) return false;
      return true;
    });
  }, [sector, location, jobType, search, minSalary, maxSalary]);

  // pagination slice
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const formatSalary = (value: number) => "Ksh " + value.toLocaleString();

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8 mt-3">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-[#008080]">
            Discover Opportunities on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Browse local opportunities, connect directly with employers and
            access inclusive roles across sectors.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            Post a Job
          </button>
        </div>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar filters (sticky on desktop) */}
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-24 bg-white border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg text-[#008080] flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-gray-700">Search</label>
              <input
                type="text"
                placeholder="Job title, company, keyword"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              />

              <label className="block text-sm text-gray-700">Sector</label>
              <select
                value={sector}
                onChange={(e) => {
                  setSector(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              >
                {SECTORS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

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

              <label className="block text-sm text-gray-700">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => {
                  setJobType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              >
                <option value="">Any</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-700">
                    Min (Ksh)
                  </label>
                  <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => {
                      setMinSalary(
                        e.target.value === "" ? "" : Number(e.target.value)
                      );
                      setCurrentPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    Max (Ksh)
                  </label>
                  <input
                    type="number"
                    value={maxSalary}
                    onChange={(e) => {
                      setMaxSalary(
                        e.target.value === "" ? "" : Number(e.target.value)
                      );
                      setCurrentPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="mt-2 w-full border border-gray-300 px-3 py-2 rounded hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Job listings */}
        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filteredJobs.length} job
              {filteredJobs.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentJobs.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No jobs match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentJobs.map((job) => (
                <article
                  key={job.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md w-12 h-12 flex items-center justify-center bg-[#008080] text-white">
                          <Briefcase />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#008080]">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {job.company} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {job.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{job.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {job.sector.toUpperCase()}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {job.type}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {job.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="text-xl font-semibold text-gray-800">
                        {formatSalary(job.salary)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#e07a5f" }}
                        >
                          Apply
                        </button>
                        <button
                          className="px-3 py-1 rounded border"
                          style={{ borderColor: "#ffc107" }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination Controls */}
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Marketing Section (moved to bottom) */}
      <section className="mt-16 bg-gradient-to-r from-[#008080] to-[#006666] text-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why Choose PivotaConnect?
        </h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          We make it easier for professionals and businesses to connect in Kenya
          and beyond. Our platform is inclusive, affordable and built for the
          future of work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Verified Employers</h3>
            <p className="text-sm text-teal-100">
              Work with trusted companies and NGOs across sectors.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Briefcase className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Inclusive Jobs</h3>
            <p className="text-sm text-teal-100">
              Opportunities for youth, women, and professionals everywhere.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <MapPin className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Local & Remote</h3>
            <p className="text-sm text-teal-100">
              Find opportunities close to home or fully remote.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile sticky bottom filter bar - ALWAYS visible */}
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
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="min-w-[120px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
          >
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
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
        </div>
      </div>
      </div>
  );
}