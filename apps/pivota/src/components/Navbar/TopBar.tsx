"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

// Hard-coded data
const CONTACT_INFO = {
  email: "info@pivotaconnect.com",
  phone: "+254 700 000 000",
  facebook: "https://facebook.com/pivotaconnect",
  twitter: "https://twitter.com/pivotaconnect",
  instagram: "https://instagram.com/pivotaconnect",
};

export default function TopBar() {
  return (
    <div className="bg-teal-600 text-white text-sm rounded-b-2xl">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        
        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 text-white text-sm">
          <a 
            href={`mailto:${CONTACT_INFO.email}`} 
            className="flex items-center gap-1 hover:text-teal-100 transition"
          >
            <MdEmail size={16} className="text-amber-300" />
            {CONTACT_INFO.email}
          </a>
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className="flex items-center gap-1 max-sm:hidden hover:text-teal-100 transition"
          >
            <MdPhone size={16} className="text-amber-300" />
            {CONTACT_INFO.phone}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
            <FaFacebookF size={14} />
          </a>
          <a href={CONTACT_INFO.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
            <FaTwitter size={14} />
          </a>
          <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
            <FaInstagram size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}