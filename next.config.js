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
  // Handle Node.js modules in browser environment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve Node.js modules on the client to prevent errors
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        http: false,
        https: false,
        path: false,
        os: false,
        stream: false,
        zlib: false,
        util: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
