"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, ScrollArea, Burger } from "@mantine/core";
import { FiUser } from "react-icons/fi";
import { Handshake, Heart, Search } from "lucide-react";
import AuthModal from "./AuthModal";

export default function MainNav() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const teal = "#14b8a6";

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

        {/* Desktop / Tablet Search */}
        <div className="hidden sm:flex flex-1 justify-center md:flex relative max-w-md mx-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center pl-4 pr-3 py-2 border rounded-full text-sm text-gray-500 hover:bg-gray-50 transition cursor-pointer"
            style={{ borderColor: teal }}
          >
            <Search className="mr-2 text-gray-400" size={18} />
            What are you looking for?
          </button>
        </div>

        {/* Right section for user actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Search + User */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <Search size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => setModalOpened(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <FiUser size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Get Started button */}
          <button
            onClick={() => setModalOpened(true)}
            className="hidden lg:inline-block bg-amber-400 hover:bg-amber-300 text-black text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            Get Started
          </button>

          {/* User Account (desktop/tablet) */}
          <button
            className="hidden sm:flex items-center gap-1 text-sm text-gray-700 hover:text-teal-600 cursor-pointer"
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

      {/* Custom Search Modal */}
      {searchOpen && (
        <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-24"
        style={{ backgroundColor: "rgba(20, 184, 166, 0.2)" }} // ✅ transparent teal
      >
        <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg relative">
          {/* Close */}
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-teal-600 text-xl cursor-pointer"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-4 text-teal-700">Search Pivota</h2>

          {/* Input */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="What are you looking for?"
              autoFocus
              className="flex-1 outline-none text-sm text-gray-700"
            />
          </div>

          {/* Suggested searches */}
          <div className="mt-5">
            <p className="text-gray-500 mb-2 text-sm">Suggested searches</p>
            <div className="flex flex-wrap gap-2">
              {[
                "AI-powered jobs near me",
                "Top-rated hospitals",
                "Community events",
                "Affordable housing",
                "Volunteer opportunities",
              ].map((s, i) => (
                <button
                  key={i}
                  className="px-3 py-1 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded-full hover:bg-teal-100 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Auth Modal */}
      <AuthModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </header>
  );
}
