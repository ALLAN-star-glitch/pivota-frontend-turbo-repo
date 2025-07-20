'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Drawer,
  ScrollArea,
  Burger,
  Modal,
  Tabs,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { FiUser } from 'react-icons/fi';

export default function MainNav() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const teal = '#14b8a6';

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
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

        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <Link href="/about" className="hover:text-teal-600">About</Link>
          <Link href="/services" className="hover:text-teal-600">Services</Link>
          <Link href="/pricing" className="hover:text-teal-600">Pricing</Link>
          <Link href="/explore" className="hover:text-teal-600">Explore</Link>
          <Link href="/contact" className="hover:text-teal-600">Contact</Link>
        </nav>

        {/* Search bar for medium and smaller devices */}
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
            className="hidden lg:inline-block bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
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

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="80%"
        title="Menu"
      >
        <ScrollArea className="h-full">
          <nav className="flex flex-col gap-4 py-4">
            <Link href="/" onClick={() => setDrawerOpened(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setDrawerOpened(false)}>
              About
            </Link>
            <Link href="/services" onClick={() => setDrawerOpened(false)}>
              Services
            </Link>
            <Link href="/pricing" onClick={() => setDrawerOpened(false)}>
             Pricing
            </Link>
            <Link href="/explore" onClick={() => setDrawerOpened(false)}>
             Explore
            </Link>
            <Link href="/contact" onClick={() => setDrawerOpened(false)}>
             Contact
            </Link>
          </nav>
        </ScrollArea>
      </Drawer>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Welcome to Pivota"
        centered
        size="md"
      >
        <Tabs defaultValue="login">
          <Tabs.List grow>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="register">Register</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" pt="md">
            <TextInput label="Email" placeholder="you@example.com" required mb="sm" />
            <PasswordInput label="Password" placeholder="Your password" required mb="md" />
            <button
              onClick={() => setModalOpened(true)}
              className="bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer w-full"
            >
              Get Started
            </button>
          </Tabs.Panel>

          <Tabs.Panel value="register" pt="md">
            <TextInput label="Full Name" placeholder="John Doe" required mb="sm" />
            <TextInput label="Email" placeholder="you@example.com" required mb="sm" />
            <PasswordInput label="Password" placeholder="Create a password" required mb="md" />
            <button
              onClick={() => setModalOpened(true)}
              className="bg-amber-300 hover:bg-amber-200 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer w-full"
            >
              Get Started
            </button>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </header>
  );
}
