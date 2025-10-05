"use client";

import React, { useMemo, useState } from "react";
import { Map, MapPin, Filter, Star } from "lucide-react";

/**
 * Land page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const LANDS = [
  {
    id: 1,
    title: "1/8 Acre Plot",
    owner: "Sunrise Realty",
    type: "Residential",
    location: "Nairobi",
    price: 2500000,
    postedAt: "3 days ago",
    desc: "Prime serviced plot in a gated community with ready title deed.",
  },
  {
    id: 2,
    title: "Commercial Land",
    owner: "CityLand Agencies",
    type: "Commercial",
    location: "Mombasa",
    price: 12000000,
    postedAt: "1 week ago",
    desc: "Ideal for petrol station or warehouse development near highway.",
  },
  {
    id: 3,
    title: "5-Acre Farmland",
    owner: "Agro Estates",
    type: "Agricultural",
    location: "Kisumu",
    price: 4500000,
    postedAt: "2 weeks ago",
    desc: "Fertile land suitable for crops or dairy, with river frontage.",
  },
  {
    id: 4,
    title: "1/4 Acre Plot",
    owner: "BlueSky Properties",
    type: "Residential",
    location: "Eldoret",
    price: 3800000,
    postedAt: "5 days ago",
    desc: "Plot near university, great for rentals or family home.",
  },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Kisumu", label: "Kisumu" },
  { value: "Eldoret", label: "Eldoret" },
];

const TYPES = [
  { value: "", label: "Any" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Agricultural", label: "Agricultural" },
];

export default function LandPage() {
  const [location, setLocation] = useState("");
  const [landType, setLandType] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const landsPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setLandType("");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const filteredLands = useMemo(() => {
    return LANDS.filter((land) => {
      if (location && land.location !== location) return false;
      if (landType && land.type !== landType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !land.title.toLowerCase().includes(q) &&
          !land.owner.toLowerCase().includes(q) &&
          !land.desc.toLowerCase().includes(q)
        )
          return false;
      }
      if (minPrice !== "" && land.price < Number(minPrice)) return false;
      if (maxPrice !== "" && land.price > Number(maxPrice)) return false;
      return true;
    });
  }, [location, landType, search, minPrice, maxPrice]);

  const indexOfLast = currentPage * landsPerPage;
  const indexOfFirst = indexOfLast - landsPerPage;
  const currentLands = filteredLands.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLands.length / landsPerPage);

  const formatPrice = (value: number) => "Ksh " + value.toLocaleString();

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8 mt-3">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-[#008080]">
            Find Land & Plots on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Explore affordable land for residential, commercial, and agricultural use across Kenya.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            Post Land Listing
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
                placeholder="Title, owner, keyword"
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

              <label className="block text-sm text-gray-700">Land Type</label>
              <select
                value={landType}
                onChange={(e) => {
                  setLandType(e.target.value);
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
                  <label className="block text-sm text-gray-700">Min (Ksh)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value === "" ? "" : Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#008080]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Max (Ksh)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value === "" ? "" : Number(e.target.value));
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
              {filteredLands.length} land {filteredLands.length !== 1 ? "listings" : "listing"} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentLands.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No land matches your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentLands.map((land) => (
                <article
                  key={land.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md w-12 h-12 flex items-center justify-center bg-[#008080] text-white">
                          <Map />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#008080]">{land.title}</h3>
                          <p className="text-sm text-gray-600">
                            {land.owner} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {land.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{land.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">{land.type}</span>
                        <span className="text-xs px-2 py-1 rounded-full border">{land.postedAt}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="text-xl font-semibold text-gray-800">{formatPrice(land.price)}</div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#e07a5f" }}
                        >
                          Inquire
                        </button>
                        <button className="px-3 py-1 rounded border" style={{ borderColor: "#ffc107" }}>
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
        <h2 className="text-2xl font-semibold mb-3">Why Buy Land with PivotaConnect?</h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          Secure your future with verified plots, transparent pricing, and trusted agents across Kenya.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Verified Plots</h3>
            <p className="text-sm text-teal-100">Every listing is checked for authenticity and clear title deeds.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Map className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Diverse Options</h3>
            <p className="text-sm text-teal-100">From small plots to large farmlands, choose what fits your goals.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <MapPin className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Strategic Locations</h3>
            <p className="text-sm text-teal-100">Find land near towns, highways, or agricultural zones.</p>
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
            value={landType}
            onChange={(e) => setLandType(e.target.value)}
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
