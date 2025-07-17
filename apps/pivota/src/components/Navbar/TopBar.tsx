'use client';

import { useEffect, useState } from 'react';
import { Menu } from '@mantine/core';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';

const countries = [
  { name: 'Kenya', code: 'ke' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Rwanda', code: 'rw' },
];

export default function TopBar() {
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string } | null>(null);
  const [menuOpened, setMenuOpened] = useState(false);

  // Detect country using jsDelivr GeoIP
  useEffect(() => {
  const detectCountry = async () => {
    try {
      const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
      const text = await res.text();
      const data = Object.fromEntries(text.split('\n').map(line => line.split('=')));
      const countryCode = data.loc?.toLowerCase();

      console.log('📍 Detected country code from IP:', countryCode);

      if (countryCode) {
        const match = countries.find((c) => c.code === countryCode);
        if (match) {
          setSelectedCountry(match);
          console.log('✅ Auto-selected country:', match.name);
        } else {
          console.log('⚠️ Country code not found in list.');
        }
      } else {
        console.log('❌ Country detection failed: no code found.');
      }
    } catch (error) {
      console.error('❌ Error detecting country:', error);
    }
  };

  detectCountry();
}, []);


  return (
    <div className="bg-teal-600 text-white text-sm rounded-b-2xl">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1">
            <MdEmail size={16} className="text-amber-300" />
            info@pivota.com
          </span>
          <span className="flex items-center gap-1">
            <MdPhone size={16} className="text-amber-300" />
            +254 740 955 111
          </span>
          <span className="flex items-center gap-1">
            <MdLocationOn size={16} className="text-amber-300" />
            Kimathi Street - Nairobi
          </span>
          <span className="flex items-center gap-1">
            <MdAccessTime size={16} className="text-amber-300" />
            24/7 Operation
          </span>
        </div>

        {/* Right Side: Country & Socials */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Country Dropdown */}
          <Menu
            shadow="md"
            width={200}
            onOpen={() => setMenuOpened(true)}
            onClose={() => setMenuOpened(false)}
          >
            <Menu.Target>
              <div className="flex items-center gap-2 cursor-pointer group">
                {selectedCountry ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                      alt={selectedCountry.name}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span className="text-amber-300 font-semibold text-base group-hover:underline">
                      {selectedCountry.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-amber-300 font-semibold text-base group-hover:underline">
                    Select Country
                  </span>
                )}
                <IconChevronDown
                  size={18}
                  className={`transition-transform duration-200 text-amber-300 mt-[1px] ${
                    menuOpened ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Select your current country</Menu.Label>
              {countries.map((country) => (
                <Menu.Item
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/w20/${country.code}.png`}
                      alt={country.name}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span>{country.name}</span>
                  </div>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer text-white" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer text-white" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
