import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import "@mantine/core/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StoreProvider from "../../../../packages/store/StoreProvider";
import Footer from "@/components/footer/Footer";
import Script from "next/script"; // ✅ Import Script from Next.js

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PivotaConnect – Find Jobs, Homes & Services Across Africa",
  description:
    "PivotaConnect is Africa's trusted digital platform for finding jobs, housing, skilled service providers, and community support — all in one place.",
  metadataBase: new URL("https://pivotaconnect.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://pivotaconnect.com",
    title: "PivotaConnect – Empowering Lives Across Africa",
    description:
      "Explore verified jobs, housing, services, and social support across Africa on PivotaConnect.",
    siteName: "PivotaConnect",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "PivotaConnect – Life Made Simple in Africa",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <MantineProvider>
            <Navbar />
            {children}
            <Footer />
            <SpeedInsights />
          </MantineProvider>
        </StoreProvider>

        {/*  Tawk.to Live Chat Script */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/67afa49512b6af190bdc75b3/1ik31lql9';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
