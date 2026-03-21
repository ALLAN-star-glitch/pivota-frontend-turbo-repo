"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, ScrollArea, Burger, Avatar, Group,  } from "@mantine/core";
import { Handshake, Heart, Search, UserPlus } from "lucide-react";
import { PrimaryButton } from "./primary-button";

interface MainNavProps {
  children?: React.ReactNode;
  className?: string;
  isDashboard?: boolean;
}

export function MainNav({ children, className = '', isDashboard = false }: MainNavProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const teal = "#14b8a6";
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 border-b border-gray-100 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-nowrap">
        
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logofinaletransp-removebg-preview.png"
            alt="Pivotaconnect Logo"
            width={120}
            height={34}
            className="w-24 sm:w-32 h-auto object-contain"
            priority
          />
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium items-center mx-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-1 py-1 transition-colors group"
            >
              <span
                className={`pb-1 border-b-2 transition-all duration-300 ${
                  pathname === link.href
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-700 group-hover:text-teal-600"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* 3. Search Bar (Desktop/Tablet) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center pl-4 pr-3 py-2 border rounded-full text-sm text-gray-500 hover:bg-gray-50 transition cursor-pointer"
            style={{ borderColor: teal }}
          >
            <Search className="mr-2 text-gray-400" size={18} />
            <span className="truncate">What are you looking for?</span>
          </button>
        </div>

        {/* 4. Action Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
          >
            <Search size={20} className="text-gray-600" />
          </button>

          {children}

          {/* COMMENTED OUT: Notifications & Messages */}
          {/* <div className="hidden sm:flex items-center gap-3">
            <Indicator color="red" size={8} offset={2} withBorder>
              <button className="text-gray-600 hover:text-teal-600 transition cursor-pointer">
                <Bell size={22} />
              </button>
            </Indicator>
            <Indicator color="teal" size={8} offset={2} withBorder>
              <button className="text-gray-600 hover:text-teal-600 transition cursor-pointer">
                <Mail size={22} />
              </button>
            </Indicator>
          </div> */}

          <Group gap="sm" wrap="nowrap" className="items-center">
            {/* COMMENTED OUT: Premium Badge */}
            {/* <Badge variant="filled" color="orange" size="sm" radius="sm" className="hidden xl:block">
              Premium
            </Badge> */}

            {/* My Account Section with Teal Hover */}
            <button
  className="flex items-center gap-2 cursor-pointer border-none bg-transparent p-0 group transition"
>
  <Avatar
    radius="xl"
    size="md"
    src={null}
    className="
      border border-gray-100 transition-all 
      group-hover:ring-2 group-hover:ring-teal-500 group-hover:bg-teal-50
      transform group-hover:scale-105
    "
  />
  <span
    className="
      hidden sm:block text-sm font-medium text-gray-700
      group-hover:text-teal-600 transition-colors duration-200
    "
  >
    My Account
  </span>
</button>


            {!isDashboard && (
              <>
                <Link
                  href="/register"
                  className="hidden sm:flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-teal-600 text-white rounded-full shadow-sm hover:bg-teal-700 transition"
                >
                  <UserPlus size={16} />
                  <span>Register</span>
                </Link>
                
                {/* Get Started: Hidden on Mobile/Medium, visible on Large */}
                <PrimaryButton icon={<UserPlus size={16} />}>
                    Get Started
                </PrimaryButton>

              </>
            )}
          </Group>

          {/* Burger Toggle (Mobile/Tablet Only) */}
          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened((o) => !o)}
            color="#000"
            size="sm"
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="80%"
        title={<span className="font-bold text-teal-700 text-lg">Menu</span>}
        className="lg:hidden"
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpened(false)}
                className={`text-lg font-medium py-3 border-b border-gray-50 transition-colors ${
                  pathname === link.href ? "text-teal-600" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 mt-6">
              {/* Keep Get Started in Drawer for mobile accessibility */}
              <Link
                href="/get-started"
                className="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-sm"
                onClick={() => setDrawerOpened(false)}
              >
                Get Started
              </Link>
              <Link
                href="/partner-with-us"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-teal-400 text-teal-600 rounded-xl font-medium"
                onClick={() => setDrawerOpened(false)}
              >
                <Handshake size={18} /> Partner with Us
              </Link>
              <Link
                href="/donate"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 text-white rounded-xl font-bold shadow-sm"
                onClick={() => setDrawerOpened(false)}
              >
                <Heart size={18} /> Donate
              </Link>
            </div>
          </div>
        </ScrollArea>
      </Drawer>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-24 bg-teal-900/10 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="bg-white w-11/12 max-w-lg p-6 rounded-2xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-teal-800">Search</h2>
            <div className="flex items-center gap-3 border-2 border-teal-50 rounded-xl px-4 py-3 focus-within:border-teal-500 transition">
              <Search className="text-teal-400" size={20} />
              <input
                type="text"
                placeholder="What are you looking for?"
                autoFocus
                className="flex-1 outline-none text-base"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}