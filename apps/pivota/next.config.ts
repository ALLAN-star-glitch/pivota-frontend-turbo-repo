import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
