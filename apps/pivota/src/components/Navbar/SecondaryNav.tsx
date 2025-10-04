"use client";

import { Briefcase, Home, MapPin, Building2, Users, HeartPulse, Bell, Handshake, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const services = [
  { label: "Jobs", icon: <Briefcase size={18} />, href: "/jobs" },
  { label: "Houses", icon: <Home size={18} />, href: "/houses" },
  { label: "Land", icon: <MapPin size={18} />, href: "/land" },
  { label: "Other Facilities", icon: <Building2 size={18} />, href: "/other-facilities" },
  { label: "Service Providers", icon: <Users size={18} />, href: "/service-providers" },
  { label: "Social Support", icon: <HeartPulse size={18} />, href: "/social-support" },
  { label: "Emergency Alert", icon: <Bell size={18} />, href: "/emergency-alert" },
];

export default function SecondaryNav() {
  const pathname = usePathname();

  return (
    <div className="bg-teal-100/40 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 flex flex-col md:flex-row items-start md:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">

        {/* Scrollable services on mobile + medium devices */}
        <div className="flex-1 w-full md:w-auto overflow-x-auto relative">
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 whitespace-nowrap relative">
            {services.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.label} className="relative flex items-center">
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-0.5 text-sm sm:text-sm md:text-sm font-medium px-1 sm:px-1.5 md:px-2 py-0.5 rounded-lg hover:bg-teal-50 transition-all ${
                      isActive ? "text-teal-600" : "text-gray-800 hover:text-teal-600"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                        isActive ? 'bg-teal-600' : 'bg-transparent'
                      }`}
                    ></span>
                  </Link>
                  {/* Divider */}
                  {index !== services.length - 1 && (
                    <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-4 border-r border-gray-300"></span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Gradient fade on right for mobile + medium */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-teal-100/40 md:block lg:hidden"></div>
        </div>

        {/* Fixed CTA buttons - hidden on mobile */}
        <div className="hidden md:flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          <Link
            href="/partner-with-us"
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium bg-white border border-teal-400 text-teal-600 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 transition"
          >
            <Handshake size={16} />
            Partner with Us
          </Link>
          <Link
            href="/donate"
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium bg-amber-400 text-white rounded-full shadow-sm hover:shadow-md hover:opacity-90 transition"
          >
            <Heart size={16} />
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
