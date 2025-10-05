"use client";

import React, { useMemo, useState } from "react";
import { Building2, MapPin, Filter, Star } from "lucide-react";

/**
 * Facilities page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const FACILITIES = [
  {
    id: 1,
    title: "Community Hall",
    owner: "City Council",
    type: "Event Space",
    location: "Nairobi",
    price: 15000,
    postedAt: "2 days ago",
    desc: "Spacious hall ideal for weddings, conferences, and events.",
  },
  {
    id: 2,
    title: "Sports Ground",
    owner: "Greenfields Estate",
    type: "Sports",
    location: "Mombasa",
    price: 5000,
    postedAt: "1 week ago",
    desc: "Football and athletics ground available for hire with lighting.",
  },
  {
    id: 3,
    title: "Parking Lot",
    owner: "SecurePark Ltd",
    type: "Parking",
    location: "Kisumu",
    price: 2000,
    postedAt: "3 days ago",
    desc: "Daily and monthly parking slots in CBD with 24/7 security.",
  },
  {
    id: 4,
    title: "Conference Room",
    owner: "BizHub Offices",
    type: "Office Space",
    location: "Nairobi",
    price: 8000,
    postedAt: "5 days ago",
    desc: "Modern conference room with projector and Wi-Fi.",
  },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Kisumu", label: "Kisumu" },
];

const TYPES = [
  { value: "", label: "Any" },
  { value: "Event Space", label: "Event Space" },
  { value: "Sports", label: "Sports" },
  { value: "Parking", label: "Parking" },
  { value: "Office Space", label: "Office Space" },
];

export default function FacilitiesPage() {
  const [location, setLocation] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [currentPage, setCurrentPage] = useState(1);
  const facilitiesPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setFacilityType("");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const filteredFacilities = useMemo(() => {
    return FACILITIES.filter((facility) => {
      if (location && facility.location !== location) return false;
      if (facilityType && facility.type !== facilityType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !facility.title.toLowerCase().includes(q) &&
          !facility.owner.toLowerCase().includes(q) &&
          !facility.desc.toLowerCase().includes(q)
        )
          return false;
      }
      if (minPrice !== "" && facility.price < Number(minPrice)) return false;
      if (maxPrice !== "" && facility.price > Number(maxPrice)) return false;
      return true;
    });
  }, [location, facilityType, search, minPrice, maxPrice]);

  const indexOfLast = currentPage * facilitiesPerPage;
  const indexOfFirst = indexOfLast - facilitiesPerPage;
  const currentFacilities = filteredFacilities.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredFacilities.length / facilitiesPerPage);

  const formatPrice = (value: number) => "Ksh " + value.toLocaleString();

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8 mt-3">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-[#008080]">
            Discover Facilities on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Explore halls, sports grounds, parking, and office spaces across
            Kenya.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            List a Facility
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
                placeholder="Facility title, owner, keyword"
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

              <label className="block text-sm text-gray-700">Facility Type</label>
              <select
                value={facilityType}
                onChange={(e) => {
                  setFacilityType(e.target.value);
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-700">
                    Min (Ksh)
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(
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
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(
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
              {filteredFacilities.length} facilit
              {filteredFacilities.length !== 1 ? "ies" : "y"} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentFacilities.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">
                  No facilities match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentFacilities.map((facility) => (
                <article
                  key={facility.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md w-12 h-12 flex items-center justify-center bg-[#008080] text-white">
                          <Building2 />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#008080]">
                            {facility.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {facility.owner} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {facility.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{facility.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {facility.type}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {facility.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="text-xl font-semibold text-gray-800">
                        {formatPrice(facility.price)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#e07a5f" }}
                        >
                          Book
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page ? "bg-[#008080] text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
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

      {/* Marketing Section */}
      <section className="mt-16 bg-gradient-to-r from-[#008080] to-[#006666] text-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why List Facilities on PivotaConnect?
        </h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          Connect with thousands of people looking for event spaces, parking,
          sports grounds, and more across Kenya.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Verified Listings</h3>
            <p className="text-sm text-teal-100">
              Trusted facilities from verified owners.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Building2 className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Affordable Rates</h3>
            <p className="text-sm text-teal-100">
              Options available for every budget and occasion.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <MapPin className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Prime Locations</h3>
            <p className="text-sm text-teal-100">
              Easily accessible facilities near you.
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
            value={facilityType}
            onChange={(e) => setFacilityType(e.target.value)}
            className="min-w-[120px] border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
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
