const path = require("path")
const withPWAInit = require("next-pwa")

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  buildExcludes: ["app-build-manifest.json"],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = withPWA(nextConfig)
