"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "./SideBarMenu";
import { motion, AnimatePresence } from "framer-motion";

interface SubSidebarProps {
  activeMenuItem: MenuItem;
  isOpen?: boolean;
}

const SubSidebar: FC<SubSidebarProps> = ({ activeMenuItem, isOpen = false }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="sub-sidebar"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`
            fixed lg:relative top-0 left-0 h-screen w-64 lg:w-52
            bg-gradient-to-b from-[#F0F4FF] to-[#FFFFFF]
            border-r border-[#C5D2FF]
            shadow-md shadow-black/10
            z-40 flex flex-col
            transition-all duration-300 ease-in-out
          `}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-20 flex items-center justify-between border-b border-[#C5D2FF]
            p-4 bg-gradient-to-b from-[#F0F4FF] to-[#FFFFFF] h-16"
          >
            <h3 className="text-[15px] font-semibold text-[#002B5B] truncate">
              {activeMenuItem.name}
            </h3>
          </div>

          {/* Submenu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {activeMenuItem.subItems?.map((sub) => {
              const isActive = pathname === sub.href;

              return (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className={`block py-2 px-3 text-sm rounded-lg cursor-pointer select-none transition-all duration-200 ${
                    isActive
                      ? "bg-[#D6E3FF] text-[#165DFC] font-medium shadow-sm"
                      : "text-[#002B5B] hover:bg-[#E2EBFF] hover:text-[#165DFC]"
                  }`}
                >
                  <span className="truncate">{sub.name}</span>
                </Link>
              );
            })}

            {!activeMenuItem.subItems?.length && (
              <div className="text-sm text-[#667A9B] italic py-3 text-center">
                No available items
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-[#C5D2FF] text-[11px] text-[#8091B3] text-center">
            Powered by <span className="font-semibold text-[#165DFC]">Pivota Connect</span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SubSidebar;
