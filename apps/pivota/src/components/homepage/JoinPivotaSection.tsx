'use client';
import Link from 'next/link';

export default function JoinPivotaSection() {
  return (
    <section id="join" className="bg-teal-700 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Pivot Your Life?
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Join thousands of Africans making real progress with Pivota.
        </p>
        <Link
          href="/register"
          className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-teal-100 transition inline-block"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
