import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wimg.mk.co.kr",
        port: "",
        pathname: "/news/cms/202603/11/**",
      },
    ],
  },
};

export default nextConfig;
