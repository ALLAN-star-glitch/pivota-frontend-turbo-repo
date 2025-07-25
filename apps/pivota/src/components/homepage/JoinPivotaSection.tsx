'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function JoinPivotaSection() {
  return (
    <section
      id="join"
      className=" relative py-9 px-6 sm:px-10 md:px-16 lg:px-20 bg-gradient-to-l from-teal-50 via-white to-white rounded-xl my-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 relative h-[500px] sm:h-[200px] md:h-[400px]">
          <Image
            src="/join-pivota.jpg"
            alt="Join Pivota"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Subtitle */}
          <p className="uppercase text-amber-500 tracking-widest font-semibold text-sm">
            Join Pivota Connect
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-black/70">
            The Pivota Mission in Motion
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            What started as a vision in Kenya to solve everyday challenges has become a
            growing movement transforming how millions across Africa access jobs, housing,
            services, and vital support.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap pt-2">
            <Link href="#get-started">
              <button className="px-8 py-2 bg-amber-300 text-black font-medium rounded-full hover:bg-amber-100 transition cursor-pointer">
                Get Started
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}
