/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // разрешаем собирать проект даже при ошибках ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['imagizer.imageshack.com'],
  },
};

module.exports = nextConfig;