/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';

// Create the base config
const baseConfig = {
  reactStrictMode: true,
  
  // Optimize for Cloudflare Pages
  swcMinify: true,
  
  // Configure image optimization
  images: {
    domains: ['boulder.codes', 'buildersroom.boulder.codes'],
    unoptimized: true, // For static export on Cloudflare
  },
  
  // Security
  poweredByHeader: false,
  
  // Production optimizations
  compiler: {
    removeConsole: !isDevelopment,
  },
  
  // Trailing slash for better compatibility
  trailingSlash: true,
};

// Add environment-specific config
const envConfig = isDevelopment 
  ? {
      // Development-specific config
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: '/api/:path*'
          }
        ];
      }
    }
  : {
      // Production-specific config
      output: 'export'
    };

// Merge configs
const nextConfig = {
  ...baseConfig,
  ...envConfig
};

module.exports = nextConfig