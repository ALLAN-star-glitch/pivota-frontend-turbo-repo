import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar/TopBar";
import Sidebar from "@/components/sidebar/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pivota Connect Dashboard - Manage Jobs, Listings & Opportunities",
  description:
    "Pivota Connect Dashboard allows you to efficiently manage jobs, listings, opportunities, and service providers. Access insights and tools to grow your business.",
  keywords: ["Pivota Connect", "dashboard", "jobs", "listings", "service providers", "opportunities"],
  openGraph: {
    title: "Pivota Connect Dashboard",
    description:
      "Manage jobs, listings, and opportunities efficiently with Pivota Connect Dashboard. Streamline your workflow and boost productivity.",
    url: "https://pivotaconnect.com/dashboard",
    siteName: "Pivota Connect",
    type: "website",
    images: [
      {
        url: "https://pivotaconnect.com/_next/image?url=%2Fpivotaconnectlogo.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Pivota Connect Dashboard",
      },
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {/* Topbar */}
        <Topbar />

        {/* Main container: Sidebar + Main */}
        <div className="flex pt-22"> {/* top padding = topbar height */}
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <main className="flex-1 p-6 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
