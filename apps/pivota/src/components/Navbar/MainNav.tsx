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
    <header className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-3 py-3 flex items-center justify-between">
        {/* Logo and Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/pivotalogo.png"
              alt="Pivota Logo"
              width={144}
              height={40}
              className="w-28 sm:w-36 h-auto object-contain"
              priority
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-teal-700 text-2xl ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-between gap-6 w-full ml-6">
          {/* Left Nav */}
          <div className="flex gap-4">
            <Link href="/" className="hover:underline whitespace-nowrap">Home</Link>
            <Link href="/explore" className="hover:underline whitespace-nowrap">Explore</Link>
            <Link href="/add" className="hover:underline whitespace-nowrap">Add New</Link>
          </div>

          {/* Search */}
          <div className="flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none text-sm"
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
          </div>

          {/* Right Nav + Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline whitespace-nowrap">About Us</Link>
            <Link href="/pricing" className="hover:underline whitespace-nowrap">Pricing</Link>
            <Link href="/contact" className="hover:underline whitespace-nowrap">Contact Us</Link>
            <Link
              href="/register"
              className="min-w-[8rem] text-center px-4 py-1.5 rounded-full bg-amber-300 text-black hover:bg-amber-200 text-sm"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="min-w-[8rem] text-center px-4 py-1.5 rounded-full border bg-white hover:bg-terracotta/5 text-sm"
              style={{
                borderColor: terracotta,
                color: terracotta,
              }}
            >
              Login
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/explore" className="hover:underline">Explore</Link>
          <Link href="/add" className="hover:underline">Add New</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>

          {/* Search */}
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none text-sm"
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

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <Link
              href="/register"
              className="w-full text-center px-3 py-1.5 rounded-full bg-teal-600 text-white hover:bg-teal-700 text-sm"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="w-full text-center px-3 py-1.5 rounded-full border bg-white hover:bg-terracotta/5 text-sm"
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
    </header>
  );
}
