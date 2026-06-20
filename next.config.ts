import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow previewing the dev server from phones/other devices on the LAN
  // (e.g. http://192.168.1.9:3001) without the cross-origin HMR warning.
  allowedDevOrigins: ["192.168.1.9"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
