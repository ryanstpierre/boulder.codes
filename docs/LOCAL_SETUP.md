# Local Development Setup

## Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Setup

1. Run the SQL migrations in your Supabase dashboard:
   - First run migrations 001 and 002 (existing)
   - Then run `migrations/003_add_community_members.sql`
   - Finally run the commands from `supabase-commands-community.md`

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Visit:
   - Homepage: http://localhost:3000
   - Community registration: http://localhost:3000/community
   - Community directory: http://localhost:3000/community/directory

## Testing Community Features

1. Register as a community member at `/community`
2. Check the directory at `/community/directory`
3. If no members show, check:
   - Database has the `community_members` view created
   - Environment variables are set correctly
   - Check browser console for errors

## Common Issues

- **404 on API calls**: Make sure you're running `npm run dev` not Cloudflare's wrangler
- **Empty directory**: Check if the database view was created and has data
- **Environment variables**: Make sure they're prefixed with `NEXT_PUBLIC_` for client-side access