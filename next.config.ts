import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  ignoreDuringBuilds: true,
  "react/no-unescaped-entities": "off",
  // swcMinify: true,
};

export default nextConfig;
