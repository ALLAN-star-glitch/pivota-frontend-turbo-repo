"use client";

import React from "react";

/**
 * About Us Page (PivotaConnect)
 * - Elegant, professional, responsive
 * - Hero intro
 * - Mission, Vision, Values
 * - Team section (optional placeholder)
 * - Call to action
 */

export default function AboutUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#008080]">
          About PivotaConnect
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We are building bridges between people, organizations, and opportunities.
          At <span className="text-[#e07a5f] font-semibold">PivotaConnect</span>,
          our mission is to empower collaboration and create lasting impact.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-[#008080] mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To connect individuals and organizations with meaningful opportunities 
            that drive positive change and sustainable growth.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-[#008080] mb-3">Our Vision</h2>
          <p className="text-gray-600">
            A world where collaboration knows no boundaries, and every connection 
            contributes to building stronger communities.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-[#008080] mb-3">Our Values</h2>
          <ul className="text-gray-600 space-y-2">
            <li>🤝 Collaboration</li>
            <li>✨ Integrity</li>
            <li>🌍 Impact</li>
            <li>🚀 Innovation</li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { name: "Allan Mathenge", role: "Founder & CEO" },
            { name: "Jane Doe", role: "Partnerships Manager" },
            { name: "John Smith", role: "Tech Lead" },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition"
            >
              <div className="w-24 h-24 rounded-full bg-[#008080]/10 mx-auto mb-4 flex items-center justify-center text-[#008080] text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-[#008080] text-white py-12 px-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Whether you are an NGO, sponsor, volunteer, or vendor — 
          we believe together we can create powerful change.  
        </p>
        <button className="bg-[#e07a5f] px-6 py-3 rounded-lg font-semibold hover:bg-[#cf674c] transition">
          Partner With Us
        </button>
      </div>
    </div>
  );
}
