'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative bg-gradient-to-br from-teal-100 to-teal-300 text-white overflow-hidden min-h-[500px] px-6 py-20 flex items-center justify-between"
    >
      <div className="z-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-teal-900">
          Pivota: Life Made Simple in Africa
        </h1>
        <p className="mb-8 text-lg md:text-xl text-teal-800">
          Discover jobs, housing, services, and support — all in one platform.
        </p>
        <Link
          href="/explore"
          className="inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-teal-100 transition"
        >
          Get Started
        </Link>
      </div>
      <Image
        src="/hero-image.png"
        alt="Pivota overview illustration"
        width={500}
        height={500}
        loading="eager"
        className="absolute bottom-0 right-0 w-auto h-[90%] object-contain pointer-events-none"
        priority
      />
    </section>
  );
}