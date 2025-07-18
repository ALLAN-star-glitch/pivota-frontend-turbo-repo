// apps/pivota/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import "@mantine/core/styles.css";
//import { SpeedInsights } from "@vercel/speed-insights/next";
import StoreProvider from "../../../../packages/store/StoreProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pivota",
  description: "Connecting Africa to Opportunities that matter",
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
          
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
