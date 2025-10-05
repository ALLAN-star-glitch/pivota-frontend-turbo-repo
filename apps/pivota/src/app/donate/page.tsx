"use client";

import React, { useState } from "react";

/**
 * Donate Page (PivotaConnect)
 * Interactive version
 */

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [cause, setCause] = useState("Education");
  const [donationType, setDonationType] = useState("One-time");
  const [formData, setFormData] = useState({ name: "", email: "", customAmount: "" });
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = ["Ksh 500", "Ksh 1,000", "Ksh 2,500", "Custom"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 mt-3">
        <h1 className="text-3xl font-bold text-[#008080]">Thank you for your donation!</h1>
        <p className="mt-3 text-lg text-gray-600">
          Your contribution is making a difference in the {cause} cause.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#008080]">Make a Difference Today</h1>
        <p className="mt-3 text-lg text-gray-600">
          Your donation supports trusted causes across Kenya.
        </p>
      </div>

      {/* Grid: Options + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Quick Options */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Quick Donation Options
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedAmount(amount)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedAmount === amount
                    ? "bg-[#008080] text-white"
                    : "bg-[#ffc107] text-white hover:opacity-90"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Cause</label>
            <select
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080]"
            >
              <option>Education</option>
              <option>Health</option>
              <option>Food Security</option>
              <option>Emergency Relief</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="donationType"
                value="One-time"
                checked={donationType === "One-time"}
                onChange={() => setDonationType("One-time")}
              />
              <span>One-time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="donationType"
                value="Monthly"
                checked={donationType === "Monthly"}
                onChange={() => setDonationType("Monthly")}
              />
              <span>Monthly</span>
            </label>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Donation Form</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080]"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080]"
                placeholder="you@example.com"
                required
              />
            </div>
            {selectedAmount === "Custom" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Custom Amount</label>
                <input
                  type="number"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080]"
                  placeholder="Enter amount"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffc107] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
