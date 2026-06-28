import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@gravity/shared"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*", // NestJS backend
      },
    ];
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;