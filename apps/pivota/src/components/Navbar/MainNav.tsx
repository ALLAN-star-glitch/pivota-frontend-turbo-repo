"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  ScrollArea,
  Burger,
} from '@mantine/core';
import { FiUser } from 'react-icons/fi';
import { Handshake, Heart } from 'lucide-react';
import AuthModal from './AuthModal';

export default function MainNav() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const teal = '#14b8a6';
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Explore", href: "/explore" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/pivotaconnectlogo.png"
            alt="Pivota Logo"
            width={120}
            height={34}
            className="w-24 sm:w-32 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium relative">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-1 py-1 transition-colors"
            >
              <span
                className={`pb-1 border-b-2 transition-all duration-300 ${
                  pathname === link.href
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-700 hover:text-teal-600"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <div className="flex-1 sm:flex sm:justify-center md:flex">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full max-w-md px-4 py-2 border rounded-full text-sm placeholder:text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: teal }}
          />
        </div>

        {/* Right section for user actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpened(true)}
            className="hidden lg:inline-block bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            Get Started
          </button>

          <button
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-teal-600"
            onClick={() => setModalOpened(true)}
          >
            <FiUser className="text-xl" />
            <span className="cursor-pointer hidden lg:inline">My Account</span>
          </button>

          {/* Burger menu for mobile */}
          <div className="lg:hidden">
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened((o) => !o)}
              color="#000"
            />
          </div>
        </div>
      </div>

      {/* Drawer for mobile */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="80%"
        title="Menu"
      >
        <ScrollArea className="h-full">
          <nav className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpened(false)}
                className={`pb-1 border-b-2 transition-all duration-300 ${
                  pathname === link.href
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-700 hover:text-teal-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA buttons in drawer */}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/partner"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-teal-400 text-teal-600 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 transition"
                onClick={() => setDrawerOpened(false)}
              >
                <Handshake size={16} />
                Partner with Us
              </Link>
              <Link
                href="/donate"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-amber-400 text-white rounded-full shadow-sm hover:shadow-md hover:opacity-90 transition"
                onClick={() => setDrawerOpened(false)}
              >
                <Heart size={16} />
                Donate
              </Link>
            </div>
          </nav>
        </ScrollArea>
      </Drawer>

      <AuthModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </header>
  );
}
