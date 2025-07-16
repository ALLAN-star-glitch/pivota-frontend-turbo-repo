'use client';

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="bg-teal-600 text-white text-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span>Email: info@pivota.com</span>
          <span>Call: +254 740 955 111</span>
        </div>

        <div className="flex items-center gap-6">
          

          <select className="bg-teal-600 text-white border border-white rounded px-2 py-1 text-sm">
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Tanzania</option>
            <option>Rwanda</option>
          </select>

          <div className="flex gap-2">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
          </div>

        </div>
      </div>
    </div>
  );
}
