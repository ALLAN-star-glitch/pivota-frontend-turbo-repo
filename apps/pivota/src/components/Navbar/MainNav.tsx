'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Drawer, ScrollArea, Burger } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

export default function MainNav() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const teal = '#14b8a6';
  const terracotta = '#E2725B';

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/pivotalogo.png"
            alt="Pivota Logo"
            width={120}
            height={34}
            className="w-24 sm:w-32 h-auto object-contain"
            priority
          />
        </Link>

        {/* Search Bar - stays visible across all sizes */}
        <div className="flex-grow max-w-md flex-1 mx-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 pr-10 border rounded-full text-sm focus:outline-none"
              style={{
                borderColor: teal,
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

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 ml-auto">
          <Link href="/" className="hover:underline whitespace-nowrap">Home</Link>
          <Link href="/explore" className="hover:underline whitespace-nowrap">Explore</Link>
          <Link href="/add" className="hover:underline whitespace-nowrap">Add New</Link>
          <Link href="/about" className="hover:underline whitespace-nowrap">About Us</Link>
          <Link href="/pricing" className="hover:underline whitespace-nowrap">Pricing</Link>
          <Link href="/contact" className="hover:underline whitespace-nowrap">Contact Us</Link>
          <Link
            href="/register"
            className="min-w-[7rem] text-center px-4 py-1.5 rounded-full bg-amber-300 text-black hover:bg-amber-200 text-sm"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="min-w-[7rem] text-center px-4 py-1.5 rounded-full border bg-white hover:bg-red-50 text-sm"
            style={{
              borderColor: terracotta,
              color: terracotta,
            }}
          >
            Login
          </Link>
        </nav>

        {/* Burger for Mobile + Tablet */}
        <div className="lg:hidden ml-2">
          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened(!drawerOpened)}
            color={teal}
            aria-label="Toggle navigation"
            size="sm"
          />
        </div>
      </div>

      {/* Drawer for smaller screens */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Menu"
        padding="md"
        size="75%"
        withCloseButton
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{ transition: 'slide-right', duration: 250 }}
      >
        <ScrollArea style={{ height: '100%' }}>
          <div className="flex flex-col gap-4 py-2">
            <Link href="/" onClick={() => setDrawerOpened(false)}>Home</Link>
            <Link href="/explore" onClick={() => setDrawerOpened(false)}>Explore</Link>
            <Link href="/add" onClick={() => setDrawerOpened(false)}>Add New</Link>
            <Link href="/about" onClick={() => setDrawerOpened(false)}>About Us</Link>
            <Link href="/pricing" onClick={() => setDrawerOpened(false)}>Pricing</Link>
            <Link href="/contact" onClick={() => setDrawerOpened(false)}>Contact Us</Link>

            <div className="pt-4 border-t">
              <Link
                href="/register"
                onClick={() => setDrawerOpened(false)}
                className="block w-full text-center px-4 py-2 rounded-full bg-[#14b8a6] text-white hover:bg-[#0f9d91] text-sm"
              >
                Register
              </Link>
              <Link
                href="/login"
                onClick={() => setDrawerOpened(false)}
                className="block w-full text-center mt-2 px-4 py-2 rounded-full border bg-white text-sm"
                style={{
                  borderColor: terracotta,
                  color: terracotta,
                }}
              >
                Login
              </Link>
            </div>
          </div>
        </ScrollArea>
      </Drawer>
    </header>
  );
}
