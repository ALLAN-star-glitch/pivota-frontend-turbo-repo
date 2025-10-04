"use client";

import React from "react";
import Image from "next/image";

/**
 * Blog Page (PivotaConnect)
 * - Professional, elegant, responsive
 * - Hero intro
 * - Blog post cards with optimized images
 * - Call to action
 */

export default function BlogPage() {
  const blogs = [
    {
      title: "Building Stronger Communities",
      excerpt:
        "Discover how partnerships and collaboration are shaping sustainable development across Kenya.",
      image: "https://source.unsplash.com/600x400/?community,people",
      author: "Jane Doe",
      date: "Sept 28, 2025",
    },
    {
      title: "Healthcare Access in Remote Areas",
      excerpt:
        "Learn how digital platforms are connecting patients to healthcare providers in underserved regions.",
      image: "https://source.unsplash.com/600x400/?healthcare,hospital",
      author: "John Smith",
      date: "Sept 15, 2025",
    },
    {
      title: "Youth Employment Opportunities",
      excerpt:
        "PivotaConnect is bridging the gap between young talent and job opportunities across industries.",
      image: "https://source.unsplash.com/600x400/?jobs,career",
      author: "Mary Wanjiku",
      date: "Aug 30, 2025",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#008080]">Our Blog</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Insights, stories, and updates on how PivotaConnect is empowering
          communities and creating impact.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1200px) 50vw, 
                       33vw"
                priority={index === 0} // prioritize first blog for LCP
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-[#008080] text-white py-12 px-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">Want to Share Your Story?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join our growing network of storytellers, volunteers, and experts
          sharing knowledge to inspire change.
        </p>
        <button className="bg-[#ffc107] px-6 py-3 rounded-lg font-semibold text-gray-800 hover:opacity-90 transition">
          Contribute to Our Blog
        </button>
      </div>
    </div>
  );
}
