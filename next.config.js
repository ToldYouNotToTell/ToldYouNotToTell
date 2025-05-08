/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve.fallback = {
      "pino-pretty": false,
      fs: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
    };
    return config;
  },
};
module.exports = nextConfig;