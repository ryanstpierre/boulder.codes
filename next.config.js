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
  
  // Output as static for Cloudflare Pages
  output: 'export',
  
  // Trailing slash for better compatibility
  trailingSlash: true,
}

module.exports = nextConfig