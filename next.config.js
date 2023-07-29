/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  offlineGoogleAnalytics: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },

  reactStrictMode: false,
});

module.exports = nextConfig;
