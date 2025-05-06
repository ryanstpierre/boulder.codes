/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure image optimization
  images: {
    domains: ['boulder.codes', 'buildersroom.boulder.codes'],
    unoptimized: true, // For static export on Cloudflare
  },
  
  // Security
  poweredByHeader: false,
  
  // Trailing slash for better compatibility
  trailingSlash: true,
  
  // Output static files
  output: 'export',
}

module.exports = nextConfig