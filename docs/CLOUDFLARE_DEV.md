# Cloudflare Local Development

This guide explains how to test your Cloudflare Functions locally as they would run in production.

## Setup

1. **Install Wrangler** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Configure environment variables**:
   - Copy `.dev.vars.example` to `.dev.vars`
   - Fill in your Supabase credentials

3. **Build the Next.js app**:
   ```bash
   npm run build
   ```

## Running Locally with Cloudflare Functions

### Method 1: Full Cloudflare Pages Experience

1. Build and export the site:
   ```bash
   npm run build:cf
   ```

2. Run with Wrangler:
   ```bash
   npm run dev:cf
   ```

3. Your site will be available at http://localhost:3000 with Cloudflare Functions working

### Method 2: Just test specific functions

```bash
# Test a specific function
wrangler pages dev functions --port 8788

# Then make requests to:
# http://localhost:8788/api/community/members
```

## Environment Variables

When running with Wrangler, it reads from `.dev.vars` file instead of `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Debugging

- Check the terminal for function logs
- Wrangler shows all requests and responses
- Functions run in the same environment as production

## Differences from Next.js Dev Server

- Uses Cloudflare Workers runtime instead of Node.js
- Functions are in `functions/` directory, not `pages/api/`
- Environment variables come from `.dev.vars`
- Static files are served from `out/` directory

## Common Issues

1. **Functions not found**: Make sure they're in `functions/api/` directory
2. **Environment variables undefined**: Check `.dev.vars` file
3. **CORS errors**: The middleware should handle this, but check `functions/api/_middleware.js`