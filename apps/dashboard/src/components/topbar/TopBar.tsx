'use client';

import { BellIcon, MessageSquareIcon, ChevronDown, Plus, LogOut, Search } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Topbar() {
  const user = {
    firstName: "Allan",
    role: "Super Admin",
    avatar: "/avatar.jpg",
  };

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const addDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target as Node)) {
        setAddDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addOptions = [
    "Informal Job",
    "Formal Job",
    "Rental House",
    "House for Sale",
    "Service",
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[96%] sm:w-[98%] bg-white/70 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">

      {/* Left: Logo + Dashboard */}
      <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer">
        <Image
          src="/pivotaconnectlogo.png"
          alt="PivotaConnect Logo"
          width={48}
          height={48}
          className="rounded-md"
        />
        <h1 className="text-lg font-semibold text-teal-700 hidden sm:block">Dashboard</h1>
      </div>

      {/* Middle: Search input (Desktop only) */}
      <div className="hidden lg:flex flex-1 min-w-[120px] max-w-lg mx-6 w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-sm sm:text-base shadow-sm"
        />
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 relative">

        {/* Add New Dropdown */}
        <div ref={addDropdownRef} className="relative hidden lg:flex">
          <button
            onClick={() => setAddDropdownOpen(!addDropdownOpen)}
            className="cursor-pointer flex items-center gap-2 bg-teal-600 text-white px-3 py-1.5 rounded-full hover:bg-teal-700 transition text-sm sm:text-base shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${addDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {addDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
              {addOptions.map((option, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition cursor-pointer"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Icon (Tablet & Mobile) */}
        <button className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <Search className="h-5 w-5 text-gray-600 hover:text-amber-500" />
        </button>

        {/* Icons */}
        <MessageSquareIcon className="h-5 w-5 text-gray-600 hover:text-amber-500 transition cursor-pointer" />
        <BellIcon className="h-5 w-5 text-gray-600 hover:text-amber-500 transition cursor-pointer" />

        {/* User Dropdown */}
        <div ref={userDropdownRef} className="relative">
          <div
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer select-none hover:bg-gray-100 rounded-full px-2 py-1 transition"
          >
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border border-gray-200"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">{user.firstName}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-600 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg flex items-center gap-2 transition cursor-pointer">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg flex items-center gap-2 transition cursor-pointer">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg flex items-center gap-2 transition cursor-pointer">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
