/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем StrictMode для совместимости
  reactStrictMode: false,
  // Включаем сжатие ответов
  compress: true,
  // Игнорируем предупреждения ESLint при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Игнорируем ошибки TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  // Настройки для оптимизированной работы с изображениями
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Настройки Webpack
  webpack: (config) => {
    // Отключаем ноды-независимые модули
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  // Отключаем экспериментальные оптимизации пакетов
  experimental: {
    optimizePackageImports: [],
  },
};

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}