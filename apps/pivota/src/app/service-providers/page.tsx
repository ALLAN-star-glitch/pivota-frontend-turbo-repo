"use client";

import React, { useMemo, useState } from "react";
import { Briefcase, MapPin, Filter, Star, Phone } from "lucide-react";

/**
 * Service Providers page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const PROVIDERS = [
  {
    id: 1,
    name: "Elite Plumbing Co.",
    category: "Plumber",
    location: "Nairobi",
    rate: 2500,
    postedAt: "2 days ago",
    desc: "Expert plumbing services including repairs, installation, and maintenance.",
  },
  {
    id: 2,
    name: "Bright Electricians",
    category: "Electrician",
    location: "Kisumu",
    rate: 3000,
    postedAt: "5 days ago",
    desc: "Certified electricians available for home and office wiring and repairs.",
  },
  {
    id: 3,
    name: "QuickFix Mechanics",
    category: "Mechanic",
    location: "Mombasa",
    rate: 4000,
    postedAt: "1 week ago",
    desc: "Affordable and reliable car repair and maintenance services.",
  },
  {
    id: 4,
    name: "SafeMove Logistics",
    category: "Mover",
    location: "Eldoret",
    rate: 8000,
    postedAt: "3 days ago",
    desc: "Trusted moving services for households and businesses across Kenya.",
  },
  {
    id: 5,
    name: "HandyWorks",
    category: "Handyman",
    location: "Nairobi",
    rate: 2000,
    postedAt: "6 days ago",
    desc: "All-in-one handyman services from carpentry to minor repairs.",
  },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Eldoret", label: "Eldoret" },
];

const CATEGORIES = [
  { value: "", label: "Any" },
  { value: "Plumber", label: "Plumber" },
  { value: "Electrician", label: "Electrician" },
  { value: "Mechanic", label: "Mechanic" },
  { value: "Mover", label: "Mover" },
  { value: "Handyman", label: "Handyman" },
];

export default function ServiceProvidersPage() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [minRate, setMinRate] = useState<number | "">("");
  const [maxRate, setMaxRate] = useState<number | "">("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const providersPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setCategory("");
    setSearch("");
    setMinRate("");
    setMaxRate("");
    setCurrentPage(1);
  };

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter((p) => {
      if (location && p.location !== location) return false;
      if (category && p.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.desc.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        )
          return false;
      }
      if (minRate !== "" && p.rate < Number(minRate)) return false;
      if (maxRate !== "" && p.rate > Number(maxRate)) return false;
      return true;
    });
  }, [location, category, search, minRate, maxRate]);

  // pagination slice
  const indexOfLast = currentPage * providersPerPage;
  const indexOfFirst = indexOfLast - providersPerPage;
  const currentProviders = filteredProviders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProviders.length / providersPerPage);

  const formatPrice = (value: number) => "Ksh " + value.toLocaleString();

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8 mt-3">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-[#008080]">
            Find Trusted Service Providers on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Connect with plumbers, electricians, movers, and more across Kenya.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            Offer Your Services
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
                placeholder="Name, category, keyword"
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

              <label className="block text-sm text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-700">
                    Min Rate (Ksh)
                  </label>
                  <input
                    type="number"
                    value={minRate}
                    onChange={(e) => {
                      setMinRate(
                        e.target.value === "" ? "" : Number(e.target.value)
                      );
                      setCurrentPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    Max Rate (Ksh)
                  </label>
                  <input
                    type="number"
                    value={maxRate}
                    onChange={(e) => {
                      setMaxRate(
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

        {/* Listings */}
        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filteredProviders.length} provider
              {filteredProviders.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentProviders.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No providers match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentProviders.map((p) => (
                <article
                  key={p.id}
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
                            {p.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {p.category} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {p.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{p.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {p.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="text-xl font-semibold text-gray-800">
                        {formatPrice(p.rate)} / service
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#e07a5f" }}
                        >
                          Hire
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

      {/* Marketing Section */}
      <section className="mt-16 bg-gradient-to-r from-[#008080] to-[#006666] text-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why Hire with PivotaConnect?
        </h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          We make it easier to find reliable, affordable, and trusted service
          providers across Kenya with verified professionals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Verified Providers</h3>
            <p className="text-sm text-teal-100">
              Work only with vetted and trusted professionals.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Briefcase className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Diverse Categories</h3>
            <p className="text-sm text-teal-100">
              From plumbers to movers, find exactly who you need.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Phone className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Direct Contact</h3>
            <p className="text-sm text-teal-100">
              Reach providers quickly and book services in minutes.
            </p>
          </div>
        </div>
      </section>

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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-w-[120px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
