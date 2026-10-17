import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Rental equipment photos uploaded by the client in Sanity Studio.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
};

export default nextConfig;
