'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="relative h-[600px] my-16 overflow-hidden rounded-xl"
    >
      {/* Background Image */}
      <Image
        src="/about-bg.jpg"
        alt="About Background"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Mobile: full teal overlay */}
        <div className="block md:hidden w-full h-full bg-teal-600/80" />

        {/* Desktop: reduced-width teal overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="hidden md:block w-full h-full"
        >
          <rect x="0" y="0" width="45" height="100" fill="rgba(13, 148, 136, 0.8)" />
          <polygon points="45,0 45,100 65,100" fill="rgba(13, 148, 136, 0.8)" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="text-white space-y-6 px-6 sm:px-10 md:px-16 lg:px-20 max-w-[85%] md:max-w-[50%]">
          
          {/* Amber Bar */}
          <div className="w-20 h-1 bg-amber-500 rounded"></div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            About Us
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Pivota is a purpose-driven platform solving real-life challenges across Africa, starting in Kenya. We connect people to jobs, housing, services, and vital support — all in one inclusive space. Whether you're seeking opportunities or offering solutions, Pivota empowers individuals and uplifts communities through technology.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="#learn-more">
              <button className="px-9 py-2 border border-white text-white rounded-full hover:bg-white hover:text-teal-700 transition cursor-pointer">
                Learn More
              </button>
            </Link>
            <Link href="#join">
              <button className="px-9 py-2 bg-amber-300 text-black font-medium rounded-full hover:bg-amber-200 transition cursor-pointer">
                Join Now
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
