"use client";

import React from "react";

/**
 * Partner With Us Page (PivotaConnect)
 * - Professional, elegant, responsive
 * - Left: Partnership opportunities
 * - Right: Partner form
 */

export default function PartnerWithUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#008080]">
          Let us Build a Better Future Together
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Partner with <span className="text-[#e07a5f] font-semibold">PivotaConnect</span> 
          to scale your impact, empower communities, and reach more people.
        </p>
      </div>

      {/* Grid: Opportunities + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Partnership Opportunities */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Partnership Opportunities
          </h2>

          <div className="space-y-5">
            {[
              { title: "NGO Collaboration", desc: "Work with us to amplify your programs and expand your reach." },
              { title: "Sponsorship", desc: "Support causes and create meaningful visibility for your brand." },
              { title: "Volunteer Programs", desc: "Mobilize communities and inspire social change together." },
              { title: "Vendor Partnerships", desc: "Offer services or supplies to strengthen our network." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 border rounded-xl hover:shadow-lg transition bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-[#008080]">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Partner Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Become a Partner
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Organization</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:outline-none"
                placeholder="Organization name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Partnership Type</label>
              <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:outline-none">
                <option>NGO Collaboration</option>
                <option>Sponsorship</option>
                <option>Volunteer Program</option>
                <option>Vendor Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:outline-none"
                placeholder="Tell us more..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008080] text-white font-semibold py-3 rounded-lg hover:bg-[#006666] transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
