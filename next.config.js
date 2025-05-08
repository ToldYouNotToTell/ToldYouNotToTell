/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Фикс для Firebase на Vercel
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  },

  // Разрешаем eval только для Phantom
  async headers() {
    return process.env.NODE_ENV === 'production' ? [{
      source: '/(.*)',
      headers: [{
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' https://*.phantom.app",
          "connect-src 'self' https://*.firebaseio.com",
          "img-src 'self' data:",
          "style-src 'self' 'unsafe-inline'"
        ].join('; ')
      }]
    }] : []
  }
}

module.exports = nextConfig