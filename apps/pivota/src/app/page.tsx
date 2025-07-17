import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-100 to-teal-300 text-white overflow-hidden min-h-[500px] px-6 py-20 flex items-center justify-between">
        {/* Text Content */}
        <div className="z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-teal-900">
            Pivota: Life Made Simple in Africa
          </h1>
          <p className="mb-8 text-lg md:text-xl text-teal-800">
            Discover jobs, housing, services, and support — all in one platform.
          </p>
          <Link href="/explore">
            <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-teal-100 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Hero Image - directly positioned in the section */}
        <Image
          src="/hero-image.png"
          alt="Hero"
          width={500}
          height={500}
          className="absolute bottom-0 right-0 w-auto h-[90%] object-contain pointer-events-none"
          priority
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            What You Can Do on Pivota
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Find Jobs & Gigs</h3>
              <p className="text-gray-600">
                Access verified job listings and part-time opportunities.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Get Housing or Land</h3>
              <p className="text-gray-600">
                Browse rental spaces or land for sale from trusted agents.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Access Services</h3>
              <p className="text-gray-600">
                Book services like legal aid, counseling, and tutoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Pivot Your Life?
          </h2>
          <p className="mb-8 text-lg md:text-xl">
            Join thousands of Africans solving real-life problems with Pivota.
          </p>
          <Link href="/register">
            <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-teal-100 transition">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
