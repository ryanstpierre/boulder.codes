# Boulder Startup Week Builders' Room API

This document outlines the API architecture for the Builders' Room registration system.

## Architecture

The application uses:
- Next.js API routes for local development 
- Cloudflare Functions for production deployment

## API Endpoints

- **GET `/api/tags`** - Retrieve skills tags
- **POST `/api/register-with-tags`** - Register a participant with skills
- **POST `/api/admin/tags`** - Admin endpoint for tag management

## Database Structure

The system uses Supabase with three main tables:

1. `registrations` - Participant information
2. `tags` - Skills and technologies 
3. `registration_tags` - Junction table for registrations and tags

## Setup

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_API_KEY=your_admin_api_key
```

### Development & Deployment

- Local development: `npm run dev`
- Deployment: `./deploy.sh` or via GitHub integration

## Admin Authentication

The admin endpoints are secured with API key authentication:

```javascript
fetch('/api/admin/tags', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminApiKey}`
  },
  body: JSON.stringify({
    action: 'approve',
    tagData: { id: 123 }
  })
});
```