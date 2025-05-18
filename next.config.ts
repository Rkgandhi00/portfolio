// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Make sure there are no custom route rewrites or redirects here
  // that might interfere with your page routes
};

module.exports = nextConfig;