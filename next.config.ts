import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  basePath: "",
  images: {
    unoptimized: false,
  },
  devIndicators: {
    appIsrStatus: process.env.NODE_ENV === "development",
    buildActivity: process.env.NODE_ENV === "development",
    buildActivityPosition: "bottom-right",
  },
};

export default withPWA(nextConfig);