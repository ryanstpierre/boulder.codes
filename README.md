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

### Cloudflare GitHub Integration

This site uses Cloudflare Pages' built-in GitHub integration for automatic deployments:

1. When changes are pushed to the connected GitHub repository, Cloudflare automatically detects the changes
2. Cloudflare Pages builds the site according to the configured build settings
3. The built site is automatically deployed to Cloudflare's global network

No additional setup is required once the GitHub repository is connected to your Cloudflare Pages project.

#### Cloudflare Pages Build Configuration

When connecting your GitHub repository to Cloudflare Pages, use these build settings:

- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node.js version:** 18.x (or newer)

This ensures Cloudflare Pages correctly builds and serves the Next.js static export.

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
npx wrangler pages publish out --project-name=builders-room-bsw --branch=main
```

### Deployment Environment

The site is configured for static export optimized for Cloudflare Pages. Key configuration files:

- `next.config.js` - Contains export configuration
- `wrangler.toml` - Cloudflare Pages configuration
- `public/_headers` - Custom headers for Cloudflare
- `public/_redirects` - Redirect rules for client-side routing
- `workers-site/index.js` - Cloudflare Workers script for enhanced routing

### Setting up the Custom Domain

After deploying to Cloudflare Pages, follow these steps to set up the custom domain:

1. Navigate to your project in the Cloudflare Pages dashboard
2. Go to the "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter `buildersroom.boulder.codes` as the domain
5. Verify ownership by updating DNS settings as prompted
6. Wait for the domain to be verified (usually within minutes)

If the boulder.codes domain is already managed by Cloudflare, this process should be seamless. Otherwise, follow Cloudflare's instructions for adding the required DNS records.

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