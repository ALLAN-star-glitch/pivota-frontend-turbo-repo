"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
  XCircle,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { menuGroups } from "./SideBarMenu";

export default function Sidebar() {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null); // null initially

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleItem = (item: string) =>
    setOpenItem(openItem === item ? null : item);

  const handleClose = () => setIsMobileOpen(false);

  // Don't render sidebar until we know if it's desktop or mobile
  if (isDesktop === null) return null;

  return (
    <>
      {/* Mobile toggle button */}
      {!isDesktop && (
        <button
          className="fixed top-[5.8rem] left-5 z-50 p-3 rounded-full bg-teal-500 text-white shadow-lg transition hover:bg-teal-600"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[5.5rem] left-0 h-[calc(100vh-5.5rem)] flex flex-col
          transition-all duration-300 ease-in-out
          bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg rounded-r-2xl
          w-64 overflow-y-auto z-50
          ${isCollapsed && isDesktop ? "lg:w-20" : ""}
          ${isMobileOpen && !isDesktop ? "translate-x-0" : !isDesktop ? "-translate-x-full" : ""}
          lg:translate-x-0 lg:sticky lg:ml-8 lg:top-[7.5rem] lg:h-[calc(100vh-9.5rem)]
        `}
      >
        {/* Top stripe */}
        <div className="h-8 w-full rounded-t-2xl bg-gradient-to-r from-teal-500 via-teal-100 to-teal-500" />

        {/* Toggle header */}
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
          onClick={() =>
            isDesktop ? setIsCollapsed(!isCollapsed) : setIsMobileOpen(false)
          }
        >
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-700 select-none">
              {isDesktop ? "Collapse Sidebar" : "Close Sidebar"}
            </span>
          )}
          <span className="cursor-pointer text-teal-500">
            {isDesktop ? (
              isCollapsed ? (
                <AlignLeftIcon className="h-5 w-5" />
              ) : (
                <AlignRightIcon className="h-5 w-5" />
              )
            ) : (
              <XCircle className="h-5 w-5" onClick={handleClose} />
            )}
          </span>
        </div>

        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {menuGroups.map((group) => (
            <div key={group.group}>
              {!isCollapsed && (
                <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  {group.group}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;

                  // Unified click handler
                  const handleItemClick = () => {
                    // On desktop, if collapsed, open sidebar
                    if (isDesktop && isCollapsed) setIsCollapsed(false);
                    // Toggle sub-menu if it exists
                    if (item.subItems) toggleItem(item.name);
                    // Close mobile sidebar
                    if (!isDesktop) handleClose();
                  };

                  if (item.subItems) {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={handleItemClick}
                          className={`
                            flex items-center justify-between w-full px-3 py-2 rounded-lg
                            text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer
                            ${openItem === item.name ? "bg-teal-100 font-medium" : ""}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-teal-500" />
                            {!isCollapsed && <span>{item.name}</span>}
                          </div>
                          {!isCollapsed &&
                            (openItem === item.name ? (
                              <ChevronDown className="h-4 w-4 text-teal-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            ))}
                        </button>

                        {openItem === item.name && !isCollapsed && (
                          <div className="ml-9 mt-1 space-y-1">
                            {item.subItems.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={handleClose}
                                  className={`
                                    block text-sm px-3 py-1 rounded-md transition cursor-pointer
                                    ${
                                      isSubActive
                                        ? "bg-teal-100 text-teal-700 font-medium"
                                        : "text-gray-600 hover:text-teal-500 hover:bg-gray-50"
                                    }
                                  `}
                                >
                                  {sub.name}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href || "#"}
                      onClick={handleItemClick}
                      className={`
                        flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer
                        ${isActive ? "bg-teal-100 font-medium" : ""}
                      `}
                    >
                      <item.icon className="h-5 w-5 text-teal-500" />
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stripe */}
        <div className="h-12 w-full rounded-b-2xl flex items-center justify-center px-2 bg-gradient-to-r from-teal-500 via-teal-100 to-teal-500">
          {!isCollapsed && (
            <span className="text-xs text-gray-700 text-center select-none">
              {isDesktop ? "Collapse sidebar for more space" : "Powered by PivotaConnect"}
            </span>
          )}
        </div>
      </aside>
    </>
  );
}
