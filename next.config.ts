import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // image external from domain hwztchapter.dramaboxdb.com
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.dramaboxdb.com',
      },
    ],
  },
};

export default nextConfig;
