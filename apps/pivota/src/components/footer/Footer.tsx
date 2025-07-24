'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* CTA Banner */}
      <div className="absolute -top-20 left-0 w-full z-20">
        <div className="max-w-5xl mx-auto bg-teal-600 text-white rounded-2xl shadow-lg px-8 py-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Stay Connected with Pivota
          </h2>
          <button className="bg-white text-teal-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Subscribe to Updates
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-r from-teal-200 via-teal-100 to-teal-50 text-gray-800 px-6 pt-32 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
          {/* Logo - spans full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/pivotalogo.png" alt="Pivota Logo" width={120} height={50} className="mb-4" />
            <p className="text-sm">
              Connecting Africa to Opportunities that matter.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/team" className="hover:underline">Our Team</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/press" className="hover:underline">Press</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="font-semibold mb-4">Quick Access</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
              <li><Link href="/resources" className="hover:underline">Resources</Link></li>
              <li><Link href="/help" className="hover:underline">Help Center</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact + Social Icons */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link href="/contact" className="hover:underline">Email</Link></li>
              <li><Link href="/support" className="hover:underline">Support</Link></li>
            </ul>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white bg-white p-2 rounded-full shadow-md">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white bg-white p-2 rounded-full shadow-md">
                <FaXTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white bg-white p-2 rounded-full shadow-md">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-teal-700 text-white px-6 py-4 rounded-t-2xl z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
          <p>© 2025 Pivota. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
