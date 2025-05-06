# Supabase Migration Guide

This guide provides step-by-step instructions for setting up the database schema in Supabase for the Builders' Room hackathon registration system.

## Prerequisites

- A Supabase account
- Access to your project: `knttgwhefurhoktkcbig`

## Migration Steps

### Step 1: Create the Registrations Table

1. Log in to your Supabase dashboard at https://app.supabase.io/
2. Select your project (`knttgwhefurhoktkcbig`)
3. Navigate to the SQL Editor (in the left sidebar)
4. Click "New query"
5. Copy and paste the entire contents of `migrations/001_create_registrations_table.sql`
6. Click the "Run" button
7. Verify the table was created by checking the Table Editor

### Step 2: Create the Tags System

1. Stay in the SQL Editor
2. Click "New query" again
3. Copy and paste the entire contents of `migrations/002_create_skills_tags.sql`
4. Click the "Run" button
5. Verify the tables were created by checking the Table Editor

### Step 3: Verify the Setup

After running the migrations, you should have the following tables:

1. `public.registrations` - Stores hackathon registrations
2. `public.tags` - Stores skill/technology tags
3. `public.registration_tags` - Junction table for the many-to-many relationship

You should also have:

- Row-level security (RLS) policies configured
- Indexes for performance
- Triggers to track tag usage

## SQL Files

The migration SQL files are in the `migrations` directory:

- `001_create_registrations_table.sql` - Creates the registrations table
- `002_create_skills_tags.sql` - Creates the tags system

## Troubleshooting

If you encounter errors:

### Table Already Exists

If you get an error that a table already exists, you can either:

1. Skip that migration, or
2. Drop the existing tables and run the migrations again:

```sql
DROP TABLE IF EXISTS public.registration_tags;
DROP TABLE IF EXISTS public.tags;
DROP TABLE IF EXISTS public.registrations;
```

### Permission Errors

If you encounter permission errors:

1. Make sure you're logged in with an account that has full access to the database
2. Ensure your project has the necessary capabilities enabled (Database, Authentication)

### API Integration Errors

If the API integration doesn't work after running the migrations:

1. Check if the tables were created properly
2. Verify that the RLS policies are configured correctly
3. Test with the `/api/tags` endpoint to see if you can retrieve tags

## After Migration

Once the migrations are complete, you should be able to:

1. Register with skills/tags using the updated registration form
2. View and manage tags in the admin interface
3. Filter and search registrations by skills