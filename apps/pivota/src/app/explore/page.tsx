'use client';

export default function ExplorePage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Explore Pivota</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Discover what's trending across Kenya and beyond. View top service providers, active jobs, affordable rentals, and public alerts.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl text-teal-700 mb-2">Featured Services</h2>
          <p>Plumbers, Tutors, Drivers, Tech Support...</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl text-teal-700 mb-2">Most Searched</h2>
          <p>Land in Kitengela, Jobs in Nairobi, Rentals in Mombasa...</p>
        </div>
      </div>
    </main>
  );
}
