"use client";

import React, { useMemo, useState } from "react";
import { Home, MapPin, Filter, Star } from "lucide-react";

/**
 * Houses page (PivotaConnect)
 * Brand colors:
 * - primary: #008080
 * - secondary: #e07a5f
 * - accent: #ffc107
 */

const HOUSES = [
  {
    id: 1,
    title: "2-Bedroom Apartment",
    owner: "Greenview Realty",
    type: "Apartment",
    location: "Nairobi",
    price: 45000,
    postedAt: "2 days ago",
    desc: "Modern 2-bedroom apartment with parking, security, and water included.",
  },
  {
    id: 2,
    title: "3-Bedroom Bungalow",
    owner: "Urban Homes",
    type: "House",
    location: "Kisumu",
    price: 80000,
    postedAt: "1 week ago",
    desc: "Spacious bungalow with compound, ideal for families near town center.",
  },
  {
    id: 3,
    title: "Studio Bedsitter",
    owner: "QuickRent Agency",
    type: "Bedsitter",
    location: "Mombasa",
    price: 15000,
    postedAt: "3 days ago",
    desc: "Affordable bedsitter close to public transport and shopping malls.",
  },
  {
    id: 4,
    title: "4-Bedroom Maisonette",
    owner: "Elite Realty",
    type: "Maisonette",
    location: "Nairobi",
    price: 120000,
    postedAt: "5 days ago",
    desc: "Spacious maisonette with garden and secure gated community.",
  },
  {
    id: 5,
    title: "1-Bedroom Apartment",
    owner: "BlueSky Properties",
    type: "Apartment",
    location: "Eldoret",
    price: 25000,
    postedAt: "2 weeks ago",
    desc: "Affordable 1-bedroom unit ideal for students and young professionals.",
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
  { value: "Apartment", label: "Apartment" },
  { value: "House", label: "House" },
  { value: "Maisonette", label: "Maisonette" },
  { value: "Bedsitter", label: "Bedsitter" },
];

export default function HousesPage() {
  const [location, setLocation] = useState("");
  const [houseType, setHouseType] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 3;

  const clearFilters = () => {
    setLocation("");
    setHouseType("");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const filteredHouses = useMemo(() => {
    return HOUSES.filter((house) => {
      if (location && house.location !== location) return false;
      if (houseType && house.type !== houseType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !house.title.toLowerCase().includes(q) &&
          !house.owner.toLowerCase().includes(q) &&
          !house.desc.toLowerCase().includes(q)
        )
          return false;
      }
      if (minPrice !== "" && house.price < Number(minPrice)) return false;
      if (maxPrice !== "" && house.price > Number(maxPrice)) return false;
      return true;
    });
  }, [location, houseType, search, minPrice, maxPrice]);

  // pagination slice
  const indexOfLast = currentPage * housesPerPage;
  const indexOfFirst = indexOfLast - housesPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);

  const formatPrice = (value: number) => "Ksh " + value.toLocaleString();

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-20 md:pb-8 mt-3">
      {/* Hero */}
      <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-[#008080]">
            Find Your Next Home on PivotaConnect
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Browse affordable houses, apartments, and rentals across Kenya.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            style={{ backgroundColor: "#008080" }}
            className="text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
          >
            Post a House
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
                placeholder="House title, owner, keyword"
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

              <label className="block text-sm text-gray-700">House Type</label>
              <select
                value={houseType}
                onChange={(e) => {
                  setHouseType(e.target.value);
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
              {filteredHouses.length} house
              {filteredHouses.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-4">
            {currentHouses.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-white shadow">
                <p className="text-gray-700">No houses match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 rounded shadow text-white"
                  style={{ backgroundColor: "#e07a5f" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              currentHouses.map((house) => (
                <article
                  key={house.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                >
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md w-12 h-12 flex items-center justify-center bg-[#008080] text-white">
                          <Home />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#008080]">
                            {house.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {house.owner} •{" "}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {house.location}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{house.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {house.type}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full border">
                          {house.postedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                      <div className="text-xl font-semibold text-gray-800">
                        {formatPrice(house.price)} / month
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded text-white"
                          style={{ backgroundColor: "#e07a5f" }}
                        >
                          Rent
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

      {/* Marketing Section */}
      <section className="mt-16 bg-gradient-to-r from-[#008080] to-[#006666] text-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why Rent with PivotaConnect?
        </h2>
        <p className="max-w-2xl mx-auto text-teal-100 mb-6">
          We make it easier to find secure, affordable, and trusted housing
          across Kenya with verified landlords and agents.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg">
            <Star className="mx-auto mb-2 text-yellow-300" />
            <h3 className="font-semibold">Verified Listings</h3>
            <p className="text-sm text-teal-100">
              Rent with confidence from trusted agents and landlords.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <Home className="mx-auto mb-2 text-amber-300" />
            <h3 className="font-semibold">Affordable Options</h3>
            <p className="text-sm text-teal-100">
              From student bedsitters to family houses, we have all budgets.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <MapPin className="mx-auto mb-2 text-pink-300" />
            <h3 className="font-semibold">Prime Locations</h3>
            <p className="text-sm text-teal-100">
              Discover houses near schools, transport, and workplaces.
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
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
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
