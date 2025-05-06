/** @type {import('next').NextConfig} */
const nextConfig = {
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
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Only use static export in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  
  // Trailing slash for better compatibility
  trailingSlash: true,
  
  // For local development, let's set up API endpoints
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: '/api/:path*'
          }
        ]
      : [];
  }
}

module.exports = nextConfig