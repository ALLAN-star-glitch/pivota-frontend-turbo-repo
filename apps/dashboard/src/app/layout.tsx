import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar/TopBar";
import Sidebar from "@/components/sidebar/SideBar";
import Script from "next/script";

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
  keywords: [
    "Pivota Connect",
    "dashboard",
    "jobs",
    "listings",
    "service providers",
    "opportunities",
  ],
  openGraph: {
    title: "Pivota Connect Dashboard",
    description:
      "Manage jobs, listings, and opportunities efficiently with Pivota Connect Dashboard. Streamline your workflow and boost productivity.",
    url: "https://pivotaconnect.com/dashboard",
    siteName: "Pivota Connect",
    type: "website",
    images: [
      {
        url: "https://pivotaconnect.com/_next/image?url=%2Fjoin-pivota.jpg&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "Pivota Connect Dashboard",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* --- GOOGLE ANALYTICS SCRIPTS --- */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-WD01V6808S"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WD01V6808S');
        `}
      </Script>
      {/* --- END GOOGLE ANALYTICS --- */}

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Background wrapper */}
        <div className="min-h-screen bg-linear-to-br from-teal-50/20 via-white to-teal-50/10 flex flex-col">

          {/* Topbar */}
          <Topbar />

          {/* Main container: Sidebar + Main */}
          <div className="flex pt-22 min-h-screen">
            <Sidebar />

            {/* Content */}
            <main className="flex-1 p-6 transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
