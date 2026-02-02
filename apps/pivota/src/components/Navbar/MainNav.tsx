"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, ScrollArea, Burger, Avatar, Group /* Indicator, Badge */ } from "@mantine/core";
import { Handshake, Heart, Search, /* Bell, Mail */ 
UserPlus} from "lucide-react";
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
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/pivotaconnectlogo.png"
            alt="Pivotaconnect Logo"
            width={120}
            height={34}
            className="w-24 sm:w-32 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex gap-6 text-sm font-medium relative items-center">
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
        <div className="flex items-center gap-3 xl:gap-5">
          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
          >
            <Search size={20} className="text-gray-600" />
          </button>

          {/* Hidden for now: Notifications & Messages */}
          {/* <div className="hidden md:flex items-center gap-4">
            <Indicator color="red" size={8} offset={2} withBorder>
              <button className="text-gray-600 hover:text-teal-600 transition cursor-pointer flex items-center justify-center">
                <Bell size={22} />
              </button>
            </Indicator>
            
            <Indicator color="teal" size={8} offset={2} withBorder>
              <button className="text-gray-600 hover:text-teal-600 transition cursor-pointer flex items-center justify-center">
                <Mail size={22} />
              </button>
            </Indicator>
          </div> 
          */}

          {/* User Account / Avatar Section */}
          <Group gap="sm" wrap="nowrap" className="items-center">
            {/* Hidden for now: Premium Badge */}
            {/* <Badge 
              variant="filled" 
              color="orange" 
              size="sm" 
              radius="sm"
              className="hidden lg:block"
            >
              Premium
            </Badge> 
            */}

            <Link
              href="/register"
              className="hidden lg:flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-teal-600 text-white rounded-full shadow-sm hover:bg-teal-700 transition"
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
            <button
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setModalOpened(true)}
            >
              <Avatar 
                radius="xl" 
                size="md" 
                src={null} 
                className="group-hover:ring-2 ring-teal-500 transition-all border border-gray-100"
              />
              <span className="hidden xl:inline text-sm font-medium text-gray-700 group-hover:text-teal-600">
                My Account
              </span>
            </button>
          </Group>

          {/* Burger menu for mobile */}
          <div className="xl:hidden flex items-center">
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened((o) => !o)}
              color="#000"
              size="sm"
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

            {/* Hidden for now */}
            {/* <div className="flex gap-4 border-t pt-4 md:hidden">
                <div className="flex items-center gap-2 text-gray-600">
                    <Bell size={18}/> Notifications
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={18}/> Messages
                </div>
            </div> 
            */}

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/partner-with-us"
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
          style={{ backgroundColor: "rgba(20, 184, 166, 0.2)" }}
        >
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-teal-600 text-xl cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-teal-700">Search Pivota</h2>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
              <Search className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="What are you looking for?"
                autoFocus
                className="flex-1 outline-none text-sm text-gray-700"
              />
            </div>
          </div>
        </div>
      )}

      <AuthModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </header>
  );
}