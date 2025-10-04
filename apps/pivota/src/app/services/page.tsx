"use client";

import React from "react";
import { Briefcase, Heart, Building2, Users, Bell } from "lucide-react";

/**
 * Services Page (PivotaConnect)
 * - Professional, elegant, responsive
 * - Hero intro
 * - Services grid with icons
 * - Call to action
 */

export default function ServicesPage() {
  const services = [
    {
      title: "Job Opportunities",
      desc: "Discover jobs tailored to your skills and interests.",
      icon: <Briefcase className="w-8 h-8 text-[#008080]" />,
    },
    {
      title: "Healthcare Access",
      desc: "Connect with trusted healthcare providers and facilities.",
      icon: <Heart className="w-8 h-8 text-[#e07a5f]" />,
    },
    {
      title: "Housing & Land",
      desc: "Find safe, affordable housing and land opportunities.",
      icon: <Building2 className="w-8 h-8 text-[#ffc107]" />,
    },
    {
      title: "Community Support",
      desc: "Access resources, counseling, and social support services.",
      icon: <Users className="w-8 h-8 text-[#008080]" />,
    },
    {
      title: "Emergency Alerts",
      desc: "Stay informed with real-time alerts and quick response.",
      icon: <Bell className="w-8 h-8 text-[#e07a5f]" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#008080]">Our Services</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          PivotaConnect provides trusted, people-centered services designed to connect, empower, and transform communities.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-[#008080] text-white py-12 px-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Explore our services today and discover opportunities that matter to you and your community.
        </p>
        <button className="bg-[#ffc107] px-6 py-3 rounded-lg font-semibold text-gray-800 hover:opacity-90 transition">
          Explore Opportunities
        </button>
      </div>
    </div>
  );
}
