import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@gravity/shared"],
	rewrites() {
		return [
			{
				source: "/api/:path*",
        destination: "http://localhost:3001/:path*", // Proxy to NestJS
			},
		];
	},
};

export default nextConfig;
