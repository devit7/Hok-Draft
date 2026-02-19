import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "camp.honorofkings.com",
      },
    ],
    // Use custom loader to bypass Vercel Image Optimization for external images
    // This prevents hitting the 5K transformations/month limit
    // loader: "custom",
    // loaderFile: "./lib/imageLoader.ts",
  },
};

export default nextConfig;
