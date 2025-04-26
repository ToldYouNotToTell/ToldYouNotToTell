/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['imagizer.imageshack.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600, // Увеличено до 1 часа
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Оптимальные размеры
  },

  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lodash-es',
      '@heroicons/react'
    ],
    turbo: {
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'], // Для ускорения сборки
    }
  },

  headers: async () => [
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

  // Оптимизация webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);