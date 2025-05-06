# Setting Up Environment Variables in Cloudflare Pages

This document explains how to add the required Supabase environment variables to your Cloudflare Pages deployment for the Builders' Room hackathon website.

## Required Environment Variables

You need to add the following environment variables to your Cloudflare Pages deployment:

- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anon/public key for your Supabase project (public)
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for your Supabase project (secret)
- `SUPABASE_DB_URL`: The PostgreSQL connection string (secret)
- `ADMIN_API_KEY`: The API key for accessing registration data (secret)

## Adding Environment Variables in the Cloudflare Dashboard

1. **Log in to the Cloudflare Dashboard**:
   - Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/) and log in with your credentials.

2. **Navigate to Pages**:
   - Click on "Pages" in the left sidebar.
   - Find and click on your project (builders-room-bsw).

3. **Go to Settings**:
   - Click on the "Settings" tab.
   - Scroll down to the "Environment variables" section.

4. **Add Production Environment Variables**:
   - Click on "Environment variables".
   - Select "Production" for the production environment.
   - Add each variable one by one:
     - Click on "Add variable".
     - Enter the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`).
     - Enter the variable value (e.g., `https://knttgwhefurhoktkcbig.supabase.co`).
     - For sensitive variables like `SUPABASE_SERVICE_ROLE_KEY`, check the "Encrypt" checkbox.
     - Click "Save".

5. **Add Preview Environment Variables** (Optional):
   - Repeat the same process, but select "Preview" for the preview environment.
   - These variables will be used when deploying preview branches.

## Using the Wrangler CLI (Alternative Method)

You can also set environment variables using the Wrangler CLI:

1. **Install or update Wrangler**:
   ```bash
   npm install -g wrangler
   ```

2. **Log in to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Set environment variables for your project**:
   ```bash
   wrangler pages env set NEXT_PUBLIC_SUPABASE_URL https://knttgwhefurhoktkcbig.supabase.co --project=builders-room-bsw
   wrangler pages env set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key" --project=builders-room-bsw
   wrangler pages env set SUPABASE_SERVICE_ROLE_KEY "your-service-role-key" --project=builders-room-bsw --secret
   wrangler pages env set SUPABASE_DB_URL "your-connection-string" --project=builders-room-bsw --secret
   wrangler pages env set ADMIN_API_KEY "your-admin-api-key" --project=builders-room-bsw --secret
   ```

4. **List environment variables to verify**:
   ```bash
   wrangler pages env list --project=builders-room-bsw
   ```

## Verifying Environment Variables

After deploying your site with the new environment variables, you can verify they're working by:

1. Visiting your live site and testing the registration form.
2. Checking the Cloudflare Functions logs for any errors related to Supabase connections.

## Troubleshooting

If your environment variables aren't working as expected:

1. **Check for typos**: Ensure variable names are exactly as expected in the code.
2. **Verify encryption**: Make sure sensitive values are encrypted.
3. **Redeploy your site**: Sometimes a fresh deployment is needed after adding environment variables.
4. **Check Functions logs**: Look for any error messages in the Cloudflare Functions logs.

## Security Considerations

- Never commit sensitive environment variables to your repository.
- Use the encryption option for all sensitive values.
- Regularly rotate your Supabase and API keys for improved security.
- Consider setting up IP restrictions in Supabase for additional security.