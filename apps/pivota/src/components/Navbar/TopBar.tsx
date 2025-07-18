'use client';

import { useEffect, useState } from 'react';
import { Menu } from '@mantine/core';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import {
  MdEmail,
  MdPhone,
  MdAccessTime,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../packages/store/store';
import { setCountry } from '../../../../../packages/store/features/country/countrySlice';

const countries = [
  { name: 'Kenya', code: 'ke' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Rwanda', code: 'rw' },
  { name: 'DRC', code: 'cd' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'South Africa', code: 'za' },
  { name: 'South Sudan', code: 'ss' },
];

export default function TopBar() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state: RootState) => state.country.selectedCountry
  );
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 👈 added for fallback UI
    const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('selectedCountry');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setCountry(parsed));
        setIsLoading(false);
        return;
      } catch (err) {
        console.error('❌ Error parsing stored country:', err);
      }
    }

    const detectCountry = async () => {
      try {
        const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
        const text = await res.text();
        const data = Object.fromEntries(
          text
            .trim()
            .split('\n')
            .map((line) => line.split('=').map((s) => s.trim()))
        );
        const countryCode = data.loc?.toLowerCase();
        const match = countries.find((c) => c.code === countryCode);

        if (match) {
          dispatch(setCountry(match));
          localStorage.setItem('selectedCountry', JSON.stringify(match));
          console.log('✅ Auto-selected country:', match.name);
        } else {
          console.log('⚠️ Country code not in list:', countryCode);
        }
      } catch (error) {
        console.error('❌ Error during country detection:', error);
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, [dispatch]);

  const handleSelectCountry = (country: { name: string; code: string }) => {
    dispatch(setCountry(country));
    localStorage.setItem('selectedCountry', JSON.stringify(country));
  };

  return (
    <div className="bg-teal-600 text-white text-sm rounded-b-2xl">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1">
            <MdEmail size={16} className="text-amber-300" />
            info@pivota.com
          </span>
          <span className="flex items-center gap-1 max-sm:hidden">
            <MdPhone size={16} className="text-amber-300" />
            +254 740 955 111
          </span>
          
          <span className="flex items-center gap-1 max-sm:hidden">
            <MdAccessTime size={16} className="text-amber-300" />
            24/7 Operation
          </span>
        </div>

        {/* Country Selector & Socials */}
        <div className="flex flex-wrap items-center gap-4">
          <Menu
            shadow="md"
            width={200}
            onOpen={() => setMenuOpened(true)}
            onClose={() => setMenuOpened(false)}
          >
            <Menu.Target>
              <div className="flex items-center gap-2 cursor-pointer group">
                {!isLoading && selectedCountry ? (
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
                    {isLoading ? 'Loading Country ... ' : 'Select Country'}
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

            {/* Search input */}
            <div className="px-2 py-1">
              <input
                type="text"
                placeholder="Search country..."
                className="w-full px-2 py-1 text-sm border border-teal-300 rounded-full focus:outline-none focus:border-teal-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Scrollable country list */}
            <div className="max-h-60 overflow-y-auto">
              {countries
                .filter((country) =>
                  country.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((country) => (
                  <Menu.Item
                    key={country.code}
                    onClick={() => handleSelectCountry(country)}
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

              {countries.filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No results found.
                </div>
              )}
            </div>
          </Menu.Dropdown>


          </Menu>

          {/* Socials */}
          <div className="flex items-center gap-3 max-sm:hidden">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer text-white" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer text-white" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
