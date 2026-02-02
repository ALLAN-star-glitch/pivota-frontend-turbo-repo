"use client";

import { Handshake, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Menu, ScrollArea, Modal, Button, Group, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { services } from "../../../libs/constants/services";
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

export default function SecondaryNav() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state: RootState) => state.country.selectedCountry);
  
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // State for the confirmation modal
  const [pendingCountry, setPendingCountry] = useState<typeof countries[0] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedCountry');
    if (stored) {
      try {
        dispatch(setCountry(JSON.parse(stored)));
        setIsLoading(false);
        return;
      } catch (err) { console.error(err); }
    }

    const detectCountry = async () => {
      try {
        const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
        const text = await res.text();
        const data = Object.fromEntries(text.trim().split('\n').map(line => line.split('=')));
        const match = countries.find(c => c.code === data.loc?.toLowerCase());
        if (match) {
          dispatch(setCountry(match));
          localStorage.setItem('selectedCountry', JSON.stringify(match));
        }
      } finally { setIsLoading(false); }
    };
    detectCountry();
  }, [dispatch]);

  const handleConfirmSwitch = () => {
    if (pendingCountry) {
      dispatch(setCountry(pendingCountry));
      localStorage.setItem('selectedCountry', JSON.stringify(pendingCountry));
      setPendingCountry(null);
      setSearch('');
    }
  };

  return (
    <div className="bg-teal-100/40 shadow-sm border-b border-teal-100/50">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 flex items-center justify-between gap-2">

        {/* Left: Services (Scrollable on mobile) */}
        <div className="flex-1 overflow-x-auto relative no-scrollbar">
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 whitespace-nowrap relative items-center">
            {services.map((item, index) => {
              const isActive = pathname === item.href;
              const isEmergency = item.label === "Emergency Alert";
              
              const labelColor = isActive 
                ? (isEmergency ? "text-[#e07a5f]" : "text-teal-600") 
                : (isEmergency ? "text-gray-800 hover:text-[#e07a5f]" : "text-gray-800 hover:text-teal-600");

              const underlineColor = isActive 
                ? (isEmergency ? "bg-[#e07a5f]" : "bg-teal-600") 
                : "bg-transparent";

              return (
                <div key={item.label} className="relative flex items-center">
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-0.5 text-xs sm:text-sm font-medium px-1 sm:px-1.5 md:px-2 py-0.5 rounded-lg hover:bg-teal-50 transition-all ${labelColor}`}
                  >
                    <span>{item.label}</span>
                    <span className={`h-0.5 w-full rounded-full transition-all duration-300 ${underlineColor}`}></span>
                  </Link>
                  {index !== services.length - 1 && (
                    <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-4 border-r border-gray-300"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Hybrid Indicator & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          <Menu shadow="md" width={180} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
            <Menu.Target>
              <div className="flex items-center gap-1.5 cursor-pointer px-2.5 py-1 bg-white border border-teal-200 rounded-full hover:border-teal-400 transition shadow-sm active:scale-95 shrink-0">
                <span className="text-teal-700 text-[10px] sm:text-xs font-bold uppercase tracking-tighter">
                  {selectedCountry?.code || '...'}
                </span>
                {selectedCountry && (
                  <Image
                    src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                    alt="" width={18} height={13} className="rounded-[1px] object-cover"
                  />
                )}
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <div className="px-2 py-1">
                <input
                  type="text"
                  placeholder="Change country..."
                  className="w-full px-2 py-1 text-xs border border-gray-100 rounded focus:outline-none bg-gray-50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ScrollArea.Autosize mah={220} type="auto">
                {countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                  <Menu.Item key={c.code} onClick={() => setPendingCountry(c)}>
                    <div className="flex items-center justify-between w-full text-xs sm:text-sm">
                        <span>{c.name}</span>
                        <Image src={`https://flagcdn.com/w20/${c.code}.png`} alt="" width={18} height={13} />
                    </div>
                  </Menu.Item>
                ))}
              </ScrollArea.Autosize>
            </Menu.Dropdown>
          </Menu>
          
          <div className="hidden md:flex gap-2 lg:gap-4">
            <Link
              href="/partner-with-us"
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-white border border-teal-400 text-teal-600 rounded-full shadow-sm hover:bg-teal-50 transition"
            >
              <Handshake size={16} /> Partner
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-teal-600 text-white rounded-full shadow-sm hover:opacity-90 transition"
            >
              <Heart size={16} /> Donate
            </Link>
          </div>
        </div>
      </div>

      {/* Localization Confirmation Modal */}
      <Modal
        opened={!!pendingCountry}
        onClose={() => setPendingCountry(null)}
        title={<Text fw={700}>Switch Localization?</Text>}
        centered
        radius="lg"
        size="sm"
        padding="lg"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          {pendingCountry && (
            <div className="p-3 bg-teal-50 rounded-full">
              <Image 
                src={`https://flagcdn.com/w80/${pendingCountry.code}.png`} 
                alt={pendingCountry.name} 
                width={60} 
                height={45} 
                className="rounded shadow-sm"
              />
            </div>
          )}
          
          <Text size="sm" c="dimmed" lh={1.6}>
            Are you sure you want to view listings for <b>{pendingCountry?.name}</b>? 
            This will prioritize services and partners localized to this region.
          </Text>

          <Group grow w="100%" mt="md">
            <Button variant="light" color="gray" radius="xl" onClick={() => setPendingCountry(null)}>
              Cancel
            </Button>
            <Button color="teal" radius="xl" onClick={handleConfirmSwitch}>
              Confirm
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
}