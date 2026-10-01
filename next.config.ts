import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/courses/:slug/lessons",
        destination: "/courses/:slug?tab=lessons",
        permanent: true,
      },
      {
        source: "/courses/:slug/reviews",
        destination: "/courses/:slug?tab=reviews",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
