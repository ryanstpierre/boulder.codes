# Setting Up Supabase for the Builders' Room Registration Form

This document explains how to set up Supabase for the Builders' Room hackathon registration form.

## Prerequisites

1. A Supabase account and project
2. Supabase project URL and API keys

## Steps to Set Up Supabase

### 1. Create the Registration Table

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the SQL from `sql/create_registrations_table.sql`
5. Run the query to create the table and set up the necessary permissions

The SQL script will:
- Create a `registrations` table with all the necessary fields
- Add an index on the email field for faster lookups
- Enable Row Level Security (RLS)
- Create policies for inserting and reading data
- Add a comment to the table for documentation

### 2. Configure Environment Variables

The following environment variables need to be set:

- For local development, update the `.env.local` file:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional)
  ADMIN_API_KEY=your-custom-admin-api-key
  ```

- For production deployment, add these environment variables to Cloudflare Pages:
  - Follow the instructions in `CLOUDFLARE_ENV_SETUP.md`

### 3. Testing the Connection

Before deploying, you can test the connection using the provided scripts:

```bash
# Test basic connectivity
node test-supabase-fetch-cjs.js

# Test data insertion (after creating the table)
node test-supabase-insert-direct.js
```

## Registration API Endpoints

The registration form uses two main API endpoints:

### `/api/register` (POST)

This endpoint handles form submissions and inserts data into Supabase:
- Validates required fields
- Checks for duplicate email addresses
- Inserts the registration data into Supabase
- Returns a success or error response

### `/api/registrations` (GET)

This endpoint retrieves registration data:
- Requires authentication via the `ADMIN_API_KEY`
- Returns a paginated list of registrations
- Supports query parameters for filtering

## Troubleshooting

If you encounter issues:

1. **Connection errors**:
   - Check that your Supabase URL and API keys are correct
   - Verify your network connectivity to Supabase

2. **Table not found errors**:
   - Ensure you've run the SQL script to create the `registrations` table
   - Check the table name in the SQL query matches exactly

3. **Authentication errors**:
   - Verify your API keys are up to date
   - Check that your RLS policies are correctly configured

4. **Deployment issues**:
   - Ensure all environment variables are set in Cloudflare Pages
   - Check the Cloudflare Functions logs for any errors