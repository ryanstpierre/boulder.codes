// Migration runner for Supabase
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function runMigrations() {
  console.log('Starting migration process...');
  
  // Get Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using anon key for testing
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local file');
    return;
  }
  
  console.log(`Connecting to Supabase at ${supabaseUrl}`);
  
  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Check if we can connect to Supabase
    const { error: connectionError } = await supabase.from('_migrations').select('name').limit(1).maybeSingle();
    
    // If the _migrations table doesn't exist, we'll get an error
    // This is expected the first time we run migrations
    if (connectionError && !connectionError.message.includes('does not exist')) {
      console.error('Connection error:', connectionError);
      return;
    }
    
    // Read migration SQL
    const migrationPath = path.join(__dirname, '001_create_registrations_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration: 001_create_registrations_table.sql');
    
    // For testing/demonstration, just print the SQL
    console.log('\nSQL to be executed:');
    console.log('-----------------------------------');
    console.log(migrationSQL);
    console.log('-----------------------------------\n');
    
    // Since we can't directly execute SQL through the Supabase JS client without custom RPC,
    // we'll provide manual instructions for running this SQL
    console.log('INSTRUCTIONS:');
    console.log('1. Log in to your Supabase dashboard');
    console.log('2. Navigate to the SQL Editor');
    console.log('3. Create a new query');
    console.log('4. Copy and paste the SQL from migrations/001_create_registrations_table.sql');
    console.log('5. Run the query to create the table and set up the necessary permissions');
    console.log('\nFor automated migrations in production, consider:');
    console.log('- Setting up the Supabase CLI for proper migration handling');
    console.log('- Creating a custom RPC function for executing SQL');
    console.log('- Using a database migration tool like Prisma or Drizzle');
    
    // Test if the registrations table exists
    console.log('\nTesting if the registrations table already exists...');
    const { error: tableCheckError } = await supabase.from('registrations').select('id').limit(1);
    
    if (tableCheckError && tableCheckError.message.includes('does not exist')) {
      console.log('The registrations table does not exist yet. Please run the SQL script.');
    } else if (tableCheckError) {
      console.error('Error checking for registrations table:', tableCheckError);
    } else {
      console.log('The registrations table already exists!');
    }
    
  } catch (error) {
    console.error('Migration error:', error);
  }
}

// Run the migrations
runMigrations();