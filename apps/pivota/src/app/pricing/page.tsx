'use client';

export default function PricingPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="text-gray-600 mb-4">Basic access to explore and post limited listings.</p>
          <p className="text-teal-600 font-bold text-lg">KSh 0/month</p>
        </div>
        <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="text-gray-600 mb-4">Unlimited listings, priority placement & visibility.</p>
          <p className="text-teal-600 font-bold text-lg">KSh 500/month</p>
        </div>
        <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
          <p className="text-gray-600 mb-4">Custom plans for large service providers & organizations.</p>
          <p className="text-teal-600 font-bold text-lg">Contact Us</p>
        </div>
      </div>
    </main>
  );
}
