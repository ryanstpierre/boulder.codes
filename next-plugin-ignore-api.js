/**
 * Next.js plugin to ignore API routes in static export
 */
module.exports = {
  webpack: (config, { isServer, dev }) => {
    // Only in production static build (not dev mode)
    if (!dev && !isServer) {
      // Ignore API routes in the client-side build
      config.module.rules.push({
        test: /\/api\/.+\.(js|ts)x?$/,
        loader: 'ignore-loader',
      });
    }
    
    return config;
  },
};