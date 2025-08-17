import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qwik-store.storage.yandexcloud.net',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
