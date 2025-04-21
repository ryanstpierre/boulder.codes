# boulder.codes - Builders' Room

This is the official website for the Builders' Room hackathon, presented by boulder.codes as part of Boulder Startup Week. The site is built with [Next.js](https://nextjs.org) and deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- Modern, responsive design with dark theme
- Fun, hip branding focusing on developer experience
- Registration form for hackathon participants
- Sponsor showcase and sponsorship tiers
- Detailed event schedule
- Information about past successes and project highlights
- Overview of boulder.codes initiatives and community

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/pages` - Page components and routes
- `/src/components` - Reusable UI components
- `/src/styles` - Global styles and theme configuration
- `/public` - Static assets (images, logos, etc.)
- `/public/images` - Event photos from previous events

## Deployment to Cloudflare Pages

The site is configured to deploy to Cloudflare Pages using the custom domain `buildersroom.boulder.codes`.

### Using the Deployment Script

For convenience, you can use the included deployment script:

```bash
./deploy.sh
```

### Manual Deployment

To manually deploy the site:

```bash
# Login to Cloudflare if not already logged in
npx wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages publish .next --project-name=builders-room-bsw --branch=main
```

### Deployment Environment

The site is configured for static export optimized for Cloudflare Pages. Key configuration files:

- `next.config.js` - Contains export configuration
- `wrangler.toml` - Cloudflare Pages configuration
- `public/_headers` - Custom headers for Cloudflare
- `public/_redirects` - Redirect rules for client-side routing
- `workers-site/index.js` - Cloudflare Workers script for enhanced routing

## Customization

### Sponsors

To update sponsor information, edit the `sponsorTiers` array in `/src/pages/sponsors.js`.

### Schedule

To update the event schedule, edit the `days` array in `/src/pages/schedule.js`.

### Content

Most text content can be edited directly in the page components in `/src/pages/`.

## Credits

- Built for Boulder Startup Week
- Hosted on [boulder.codes](https://boulder.codes)