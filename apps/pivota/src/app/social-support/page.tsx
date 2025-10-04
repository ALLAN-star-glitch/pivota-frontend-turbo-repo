"use client";

import React, { useMemo, useState } from "react";
import { Heart, MapPin, Filter, Star, Handshake } from "lucide-react";

/**
 * Social Support page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const SUPPORTS = [
  {
    id: 1,
    name: "Kenya Red Cross",
    category: "NGO",
    location: "Nairobi",
    postedAt: "2 days ago",
    desc: "Emergency response, blood donation drives, and disaster relief efforts.",
  },
  {
    id: 2,
    name: "Food Bank Kenya",
    category: "Food Bank",
    location: "Mombasa",
    postedAt: "5 days ago",
    desc: "Providing food to vulnerable families and communities.",
  },
  {
    id: 3,
    name: "Childline Kenya",
    category: "Helpline",
    location: "Kisumu",
    postedAt: "1 week ago",
    desc: "24/7 helpline offering support and protection for children in need.",
  },
  {
    id: 4,
    name: "GreenEarth Volunteers",
    category: "Volunteer Group",
    location: "Eldoret",
    postedAt: "3 days ago",
    desc: "Community group working on tree planting and environmental conservation.",
  },
  {
    id: 5,
    name: "Women Support Center",
    category: "Community",
    location: "Nairobi",
    postedAt: "6 days ago",
    desc: "Providing safe spaces and resources for women facing domestic challenges.",
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
  { value: "NGO", label: "NGO" },
  { value: "Food Bank", label: "Food Bank" },
  { value: "Helpline", label: "Helpline" },
  { value: "Volunteer Group", label: "Volunteer Group" },
  { value: "Community", label: "Community" },
];

export default function SocialSupportPage() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const supportsPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setCategory("");
    setSearch("");
    setCurrentPage(1);
  };

  const filteredSupports = useMemo(() => {
    return SUPPORTS.filter((s) => {
      if (location && s.location !== location) return false;
      if (category && s.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.desc.toLowerCase().includes(q) &&
          !s.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [location, category, search]);

  // pagination slice
  const indexOfLast = currentPage * supportsPerPage;
  const indexOfFirst = indexOfLast - supportsPerPage;
  const currentSupports = filteredSupports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSupports.length / supportsPerPage);

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#008080]">
            Find Social Support Services on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Discover NGOs, food banks, helplines, and community support
            organizations making an impact across Kenya.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            List Your Organization
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
              {filteredSupports.length} organization
              {filteredSupports.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentSupports.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No organizations match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentSupports.map((s) => (
                <article
                  key={s.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md w-12 h-12 flex items-center justify-center bg-[#008080] text-white">
                          <Heart />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#008080]">
                            {s.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {s.category} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {s.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{s.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {s.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#ffc107" }}
                        >
                          Donate
                        </button>
                        <button
                          className="px-3 py-1 rounded border"
                          style={{ borderColor: "#e07a5f" }}
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
          Empower Communities with PivotaConnect
        </h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          From NGOs to volunteer groups, connect with organizations that are
          driving change and making a positive impact across Kenya.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Trusted Organizations</h3>
            <p className="text-sm text-teal-100">
              Work only with verified and impactful social groups.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Handshake className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Community Impact</h3>
            <p className="text-sm text-teal-100">
              Support initiatives that uplift and empower people.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Heart className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Get Involved</h3>
            <p className="text-sm text-teal-100">
              Donate or volunteer to make a difference today.
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
