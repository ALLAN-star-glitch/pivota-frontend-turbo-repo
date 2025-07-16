'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMantineTheme } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useMantineTheme();
  const teal = theme.colors['pivota-teal']?.[5] ?? '#14b8a6';
  const terracotta = theme.colors['terracotta']?.[6] ?? '#E2725B';

  return (
    <div className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo Only */}
        <div className="flex items-center gap-2 shrink-0 min-w-[40px]">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Pivota Logo" width={50} height={40} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap md:flex-nowrap items-center justify-between gap-4 flex-grow">
          {/* Left Links */}
          <div className="flex gap-4 shrink-0">
            <Link href="/" className="hover:underline whitespace-nowrap">Home</Link>
            <Link href="/explore" className="hover:underline whitespace-nowrap">Explore</Link>
            <Link href="/add" className="hover:underline whitespace-nowrap">Add New</Link>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md flex-grow mx-auto">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none"
              style={{
                borderColor: teal,
                outlineColor: teal,
                boxShadow: `0 0 0 2px ${teal}22`,
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px ${teal}55`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px ${teal}22`;
              }}
            />
            <HiOutlineSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 pointer-events-none"
              size={18}
            />
          </div>

          {/* Right Links */}
          <div className="flex gap-4 shrink-0">
            <Link href="/about" className="hover:underline whitespace-nowrap">About Us</Link>
            <Link href="/pricing" className="hover:underline whitespace-nowrap">Pricing</Link>
            <Link href="/contact" className="hover:underline whitespace-nowrap">Contact Us</Link>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 shrink-0">
            <Link
              href="/register"
              className="min-w-[8rem] text-center px-3 py-1.5 rounded-full bg-teal-600 text-white hover:bg-teal-700"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="min-w-[8rem] text-center px-3 py-1.5 rounded-full border bg-white hover:bg-terracotta/5"
              style={{
                borderColor: terracotta,
                color: terracotta,
              }}
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden ml-auto text-teal-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="w-full mt-4 flex flex-col gap-2 md:hidden">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/explore" className="hover:underline">Explore</Link>
            <Link href="/add" className="hover:underline">Add New</Link>
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>

            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none"
                style={{
                  borderColor: teal,
                  outlineColor: teal,
                  boxShadow: `0 0 0 2px ${teal}22`,
                }}
              />
              <HiOutlineSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 pointer-events-none"
                size={18}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/register"
                className="w-full text-center px-3 py-1.5 rounded-full bg-teal-600 text-white hover:bg-teal-700"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="w-full text-center px-3 py-1.5 rounded-full border bg-white hover:bg-terracotta/5"
                style={{
                  borderColor: terracotta,
                  color: terracotta,
                }}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
