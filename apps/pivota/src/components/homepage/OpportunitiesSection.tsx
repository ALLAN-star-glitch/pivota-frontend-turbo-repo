'use client';
import Link from 'next/link';

export default function OpportunitiesSection() {
  return (
    <section id="opportunities" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Available Opportunities
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {['Job Listings', 'Gigs Near You', 'Volunteer Roles'].map((label, i) => (
            <Link
              key={i}
              href={`/explore?tab=${label.toLowerCase().replace(/\s/g, '-')}`}
              className="block bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{label}</h3>
                <p className="text-gray-600">
                  Browse recent {label.toLowerCase()} and more.
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/explore"
          className="mt-8 inline-block bg-teal-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-teal-600 transition"
        >
          View All Opportunities
        </Link>
      </div>
    </section>
  );
}
