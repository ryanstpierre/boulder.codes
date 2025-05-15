/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure image optimization
  images: {
    domains: ['boulder.codes', 'buildersroom.boulder.codes'],
    unoptimized: true, // Required for static export
  },
  
  // Security
  poweredByHeader: false,
  
  // Trailing slash for better compatibility
  trailingSlash: true,
  
  // Static export for Cloudflare Pages (production only)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Exclude API pages from build
  webpack: (config) => {
    if (!process.env.INCLUDE_API_ROUTES) {
      // Ignore API routes in client-side builds for deployment
      config.module.rules.push({
        test: /\/api\/.+\.(js|ts)x?$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  }
}

module.exports = nextConfig