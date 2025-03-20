/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  // Performance optimizations
  poweredByHeader: false, // Disable x-powered-by header
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC minifier
  // Cache optimization
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
};

module.exports = nextConfig;
