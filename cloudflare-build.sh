#!/bin/bash
# Cloudflare Pages custom build script

# Disable package-lock
echo "Disabling package-lock.json during build..."
mv package-lock.json package-lock.json.bak || true

# Install dependencies without generating a lock file
echo "Installing dependencies..."
npm install --no-package-lock

# Build the Next.js application
echo "Building the Next.js application..."
NODE_ENV=production npm run build:next

# Success message
echo "Build completed successfully!"