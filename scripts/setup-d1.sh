#!/bin/bash

# Script to set up Cloudflare D1 database for Builders' Room

# Create database in Cloudflare
echo "Creating D1 database in Cloudflare..."
DB_INFO=$(npx wrangler d1 create builders_room_registrations)

# Extract the database ID from the response
DB_ID=$(echo "$DB_INFO" | grep -o "database_id = \"[^\"]*\"" | cut -d '"' -f 2)

if [ -z "$DB_ID" ]; then
  echo "Error: Could not extract database ID"
  exit 1
fi

echo "Database created with ID: $DB_ID"

# Update wrangler.toml with the actual database ID
echo "Updating wrangler.toml with database ID..."
sed -i.bak "s/database_id = \"placeholder-id\"/database_id = \"$DB_ID\"/" ../wrangler.toml
rm ../wrangler.toml.bak

# Apply the schema to the database
echo "Applying schema to database..."
npx wrangler d1 execute builders_room_registrations --file=../functions/schema.sql

echo "Creating environment variable for admin API key..."
# Generate a random secure API key (in a real setup, you'd store this securely)
API_KEY=$(openssl rand -hex 16)
npx wrangler secret put ADMIN_API_KEY --text "$API_KEY"

echo "✅ D1 database setup complete!"
echo "-------------------------------------"
echo "Admin API Key (for viewing registrations): $API_KEY"
echo "-------------------------------------"
echo "To view registrations, make a GET request to /api/registrations with the header:"
echo "Authorization: Bearer $API_KEY"
echo ""
echo "Store this key securely and share only with authorized personnel."