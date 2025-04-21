#!/bin/bash

# Build the Next.js app
echo "Building Next.js application..."
npm run build

# Ensure the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed, aborting deployment"
  exit 1
fi

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
npx wrangler pages publish out --project-name=builders-room-bsw --branch=main

echo "Deployment completed!"