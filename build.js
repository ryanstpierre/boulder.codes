/**
 * Custom build script for Cloudflare Pages deployment
 * 
 * This script creates a special next.config.js for the production build
 * that excludes API routes from the static export.
 */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Backup the original next.config.js
console.log('Backing up next.config.js...');
try {
  fs.copyFileSync('next.config.js', 'next.config.js.bak');
} catch (err) {
  console.error('Failed to backup next.config.js:', err);
  process.exit(1);
}

// Create a simplified next.config.js for the build
console.log('Creating production next.config.js...');
const prodConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['boulder.codes', 'buildersroom.boulder.codes'],
    unoptimized: true,
  },
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
`;

try {
  fs.writeFileSync('next.config.js', prodConfig);
} catch (err) {
  console.error('Failed to write production next.config.js:', err);
  process.exit(1);
}

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install @supabase/supabase-js', { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to install dependencies:', err);
  
  // Restore the original config
  fs.copyFileSync('next.config.js.bak', 'next.config.js');
  fs.unlinkSync('next.config.js.bak');
  
  process.exit(1);
}

// Run the build
console.log('Running the build...');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed:', err);
  
  // Restore the original config
  fs.copyFileSync('next.config.js.bak', 'next.config.js');
  fs.unlinkSync('next.config.js.bak');
  
  process.exit(1);
}

// Restore the original config
console.log('Restoring original next.config.js...');
fs.copyFileSync('next.config.js.bak', 'next.config.js');
fs.unlinkSync('next.config.js.bak');

console.log('Build completed successfully!');