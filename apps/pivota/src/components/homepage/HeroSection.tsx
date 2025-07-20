'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[500px] bg-gradient-to-r from-white via-teal-50 to-teal-100 overflow-hidden"
    >
      {/* Faint mobile background image + gradient overlay */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/hero-image.png"
          alt="Faint background"
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-teal-50 to-teal-100 opacity-80" />
      </div>

      {/* Mobile content */}
      <div className="relative z-10 lg:hidden px-4 py-20 text-center text-teal-900">
        <p className="uppercase text-sm font-semibold mb-2 tracking-wide text-teal-500">
          PIVOTA CONNECT
        </p>
        <h1 className="text-2xl font-bold mb-4 leading-snug">
          Find Jobs. Secure Homes. Secure Land. Connect with Services — All in One Place.
        </h1>
        <p className="mb-6 text-base text-gray-800">
          Pivota is your all-in-one digital platform for accessing jobs, affordable housing,
          trusted service providers, and support services — tailored for Africa, starting with Kenya.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center">
          <Link
            href="/explore"
            className="bg-amber-400 text-teal-900 font-semibold px-6 py-2 rounded-md hover:bg-amber-300 transition"
          >
            Get Started
          </Link>
          <Link
            href="/learn-more"
            className="border border-teal-700 text-teal-700 bg-white font-semibold px-6 py-2 rounded-md hover:bg-teal-100 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex items-center justify-between px-6 py-20">
        <div className="z-10 md:max-w-2xl lg:max-w-3xl">
          <p className="uppercase text-sm font-semibold text-teal-700 mb-2 tracking-wide">
            PIVOTA CONNECT
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-teal-900">
            Find Jobs. Secure Homes. Secure Land. Connect with Services — All in One Place.
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-800">
            Pivota is your all-in-one digital platform for accessing jobs, affordable housing,
            trusted service providers, and support services — tailored for Africa, starting with Kenya.
          </p>
          <div className="flex gap-4">
            <Link
              href="/explore"
              className="bg-amber-400 text-teal-900 font-semibold px-6 py-2 rounded-md hover:bg-amber-300 transition"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="border border-teal-700 text-teal-700 bg-white font-semibold px-6 py-2 rounded-md hover:bg-teal-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <Image
          src="/hero-image.png"
          alt="Pivota overview illustration"
          width={500}
          height={500}
          loading="eager"
          className="absolute bottom-0 right-16 w-auto h-[90%] object-contain pointer-events-none"
          priority
        />
      </div>
    </section>
  );
}
