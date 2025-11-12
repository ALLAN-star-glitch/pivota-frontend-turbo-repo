"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bell,
  MessageSquare,
  Plus,
  ChevronDown,
  Search,
  X,
  Menu,
} from "lucide-react";

interface DashboardTopbarProps {
  onToggleSidebar?: () => void;
  user?: { firstName: string; role: string; avatarUrl: string };
}

export default function DashboardTopbar({
  onToggleSidebar,
  user = { firstName: "Allan", role: "Admin", avatarUrl: "/pivota_admin.jpg" },
}: DashboardTopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <header
      className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md 
      shadow-lg sticky top-4 z-50 flex-wrap md:flex-nowrap mx-4 rounded-2xl border border-gray-100"
    >
      {/* LEFT: Sidebar toggle + Title */}
      <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-teal-50 transition md:hidden"
          >
            <Menu className="w-5 h-5 text-teal-600" />
          </button>
        )}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-600 whitespace-nowrap">
          Dashboard
        </h1>
      </div>

      {/* CENTER: Search bar */}
      <div className="flex-1 flex justify-center w-full md:w-auto mt-2 md:mt-0 relative">
        {/* Desktop & md Search */}
        <div className="hidden md:flex w-full max-w-xs lg:max-w-md relative mx-4">
          <Search className="absolute left-3 top-2.5 text-teal-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-teal-500 
            focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-600 transition text-sm"
          />
        </div>

        {/* Mobile Search Icon */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-teal-50 transition"
          onClick={() => setMobileSearchOpen((prev) => !prev)}
        >
          <Search className="w-5 h-5 text-teal-600" />
        </button>

        {/* Mobile Search Overlay */}
        {mobileSearchOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white shadow-lg rounded-xl p-3 z-50 animate-fadeIn md:hidden">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-lg border-2 border-teal-500 
                focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-600 text-sm"
                autoFocus
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 w-full md:w-auto justify-end mt-2 md:mt-0">
        {/* Add New */}
        <button className="hidden md:flex items-center gap-2 bg-teal-600 text-white px-4 py-2 
          rounded-lg hover:bg-teal-700 transition font-medium text-sm whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Add New
        </button>

        {/* Messages */}
        <button className="p-2 rounded-full hover:bg-teal-50 transition relative">
          <MessageSquare className="w-5 h-5 text-teal-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-full" />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-teal-50 transition relative">
          <Bell className="w-5 h-5 text-teal-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-teal-50 transition cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500">
              <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800">{user.firstName}</span>
              <span className="text-xs text-teal-500">{user.role}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 
              rounded-lg shadow-lg py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                My Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Account Settings
              </a>
              <hr className="my-1 border-gray-100" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 transition"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
