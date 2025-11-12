"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  X as CloseIcon,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import SubSidebar from "./SubSidebar";
import { MenuItem, menuGroups } from "./SideBarMenu";

interface DashboardSidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // --- Responsive behavior ---
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Highlight logic ---
  const isItemActive = useCallback(
    (item: MenuItem): boolean => {
      if (activeMenuItem) {
        if (item.name === activeMenuItem.name) return true;
        if (
          item.subItems &&
          activeMenuItem.subItems &&
          activeMenuItem.name === item.name &&
          item.subItems.some((sub) => sub.href === pathname)
        ) {
          return true;
        }
        return false;
      }

      if (item.href === pathname) return true;
      if (item.subItems && item.subItems.some((sub) => sub.href === pathname))
        return true;

      return false;
    },
    [pathname, activeMenuItem]
  );

  // --- Sync active menu on route change ---
  useEffect(() => {
    if (!isLargeScreen) return;
    const intendedActiveItem = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.subItems?.some((sub) => sub.href === pathname));

    queueMicrotask(() => {
      setActiveMenuItem((prev) =>
        prev?.name !== intendedActiveItem?.name ? intendedActiveItem || null : prev
      );
    });
  }, [pathname, isLargeScreen]);

  // --- Handle clicks ---
  const handleMenuClick = (item: MenuItem) => {
    if (isLargeScreen) {
      if (item.subItems) {
        setActiveMenuItem((prev) => (prev?.name === item.name ? null : item));
      } else if (item.href) {
        setActiveMenuItem(null);
        router.push(item.href);
      }
    } else {
      if (item.subItems) {
        setExpandedItem((prev) => (prev === item.name ? null : item.name));
        setActiveMenuItem(item);
      } else if (item.href) {
        setActiveMenuItem(null);
        router.push(item.href);
        setIsMobileSidebarOpen(false);
      }
    }
  };

  return (
    <>
      {/* Overlay Wrapper */}
      <div
        className={`fixed inset-0 z-[60] lg:static lg:z-auto lg:flex lg:flex-row transition-all duration-300 ease-in-out ${
          isMobileSidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible lg:visible lg:opacity-100"
        }`}
      >
        {/* Background overlay for mobile */}
        <div
          className="absolute inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>

        {/* MAIN SIDEBAR */}
        <aside
          className={`absolute lg:relative left-4 top-4 bottom-4 mt-[100px] ${
            isCollapsed ? "w-20" : "w-64"
          } bg-gradient-to-b from-teal-600 to-teal-500 text-white shadow-2xl rounded-2xl min-h-[calc(100vh-6rem)] border border-white/10 transform transition-all duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/20 p-4 bg-teal-600 rounded-t-2xl h-16">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold tracking-wide text-amber-200">
                PivotaConnect
              </h2>
            )}
            <button
              onClick={() =>
                isLargeScreen
                  ? setIsCollapsed(!isCollapsed)
                  : setIsMobileSidebarOpen(false)
              }
              className="p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
            >
              {isLargeScreen ? (
                isCollapsed ? (
                  <ChevronRight size={22} />
                ) : (
                  <ChevronLeft size={22} />
                )
              ) : (
                <CloseIcon size={22} />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav
            className={`flex-1 overflow-y-auto p-4 space-y-6 ${
              isCollapsed ? "px-2" : "px-4"
            }`}
          >
            {menuGroups.map((group) => (
              <div key={group.group}>
                {!isCollapsed && (
                  <p className="text-[11px] font-semibold text-white/70 uppercase mb-2 tracking-wider">
                    {group.group}
                  </p>
                )}

                {group.items.map((item) => {
                  const isActive = isItemActive(item);
                  const isExpanded =
                    expandedItem === item.name || (!isLargeScreen && isActive);

                  if (item.href && !item.subItems) {
                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            setActiveMenuItem(null);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`flex items-center w-full text-left rounded-lg px-2 py-2 transition cursor-pointer ${
                            isActive
                              ? "bg-amber-500/20 border-l-4 border-amber-400"
                              : "hover:bg-white/10"
                          }`}
                        >
                          <item.icon size={20} className="text-white/90" />
                          {!isCollapsed && (
                            <div className="flex justify-between items-center flex-1 ml-3">
                              <span className="text-sm">{item.name}</span>
                            </div>
                          )}
                        </Link>
                      </div>
                    );
                  }

                  // Parent items
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => handleMenuClick(item)}
                        className={`flex items-center w-full text-left rounded-lg px-2 py-2 transition cursor-pointer ${
                          isActive
                            ? "bg-amber-500/20 border-l-4 border-amber-400"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <item.icon size={20} className="text-white/90" />
                        {!isCollapsed && (
                          <div className="flex justify-between items-center flex-1 ml-3">
                            <span className="text-sm">{item.name}</span>
                            {item.subItems && (
                              <span>
                                {isExpanded ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </button>

                      {/* Submenu Accordion (mobile only) */}
                      {!isLargeScreen && item.subItems && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? "max-h-96 mt-1" : "max-h-0"
                          }`}
                        >
                          <div className="pl-6 space-y-1">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => {
                                  setActiveMenuItem(item);
                                  setIsMobileSidebarOpen(false);
                                }}
                                className={`block py-1 text-sm transition cursor-pointer ${
                                  pathname === sub.href
                                    ? "text-amber-300 font-medium"
                                    : "text-white/80 hover:text-white"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* SUB-SIDEBAR (large screens only) */}
        {isLargeScreen && activeMenuItem && (
          <div className="shrink-0 z-50 relative">
            <SubSidebar activeMenuItem={activeMenuItem} isOpen={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar;
