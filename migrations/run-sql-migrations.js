// Execute SQL migrations in Supabase using the REST API
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// SQL files to execute in order - add files to this array to run them
const migrations = [
  '001_create_registrations_table.sql',
  '002_create_skills_tags.sql'
];

async function executeSql(supabaseUrl, serviceKey, sql) {
  try {
    // Create a temporary API endpoint for SQL execution
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/pg_exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey
      },
      body: JSON.stringify({ sql: sql })
    });
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`SQL execution failed: ${response.status} ${response.statusText} - ${text}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function runMigrations() {
  console.log('Starting SQL migrations...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceKey) {
    console.error('Missing Supabase credentials in .env.local');
    return;
  }
  
  console.log('Creating SQL execution function...');
  
  // First, create a temporary SQL execution function in Supabase
  const createFunctionSql = `
    CREATE OR REPLACE FUNCTION pg_exec_sql(sql text)
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql;
      RETURN json_build_object('success', true);
    EXCEPTION WHEN OTHERS THEN
      RETURN json_build_object('success', false, 'error', SQLERRM);
    END;
    $$;
  `;
  
  try {
    // Create the SQL execution function
    console.log('First, let\'s check if we can connect to Supabase...');
    
    // Try a simple query to validate connection
    const testResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey
      }
    });
    
    if (!testResponse.ok) {
      console.error('Failed to connect to Supabase API');
      console.error(`Status: ${testResponse.status} ${testResponse.statusText}`);
      const errorText = await testResponse.text();
      console.error(`Response: ${errorText}`);
      return;
    }
    
    console.log('Connection successful! Now creating SQL execution function...');
    
    // As a fallback, prepare both options:
    // 1. Direct SQL via psql if available
    // 2. Manual SQL execution instructions

    // Create a file with all migrations for direct psql execution
    const combinedSqlPath = path.join(__dirname, 'combined_migrations.sql');
    let combinedSql = '';
    
    for (const migrationFile of migrations) {
      const migrationPath = path.join(__dirname, migrationFile);
      if (!fs.existsSync(migrationPath)) {
        console.error(`Migration file not found: ${migrationPath}`);
        continue;
      }
      
      const sql = fs.readFileSync(migrationPath, 'utf8');
      combinedSql += `-- Migration: ${migrationFile}\n${sql}\n\n`;
    }
    
    fs.writeFileSync(combinedSqlPath, combinedSql);
    console.log(`Combined SQL file created at: ${combinedSqlPath}`);
    
    // Extract connection details from DB URL
    const dbUrl = process.env.SUPABASE_DB_URL;
    if (dbUrl) {
      // URL format: postgresql://postgres:password@db.ref.supabase.co:5432/postgres
      try {
        // Extract connection details
        const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
        if (match) {
          const [_, user, password, host, port, database] = match;
          
          // Create a helper script to run psql
          const psqlScriptPath = path.join(__dirname, 'run_migrations.sh');
          
          // IMPORTANT: In a real project, be careful with passwords in scripts.
          // This is a simplified example.
          const psqlScript = `#!/bin/bash
# Run migrations using psql
PGPASSWORD="${password}" psql -h "${host}" -p "${port}" -U "${user}" -d "${database}" -f "${combinedSqlPath}"
`;
          
          fs.writeFileSync(psqlScriptPath, psqlScript);
          fs.chmodSync(psqlScriptPath, '755'); // Make executable
          
          console.log(`\nPSQL script created at: ${psqlScriptPath}`);
          console.log('You can run migrations directly with:');
          console.log(`./migrations/run_migrations.sh`);
        }
      } catch (error) {
        console.error('Failed to parse database URL:', error);
      }
    }
    
    console.log('\nIMPORTANT: Due to API limitations, it\'s best to run the migrations manually:');
    console.log('1. Log in to your Supabase dashboard at https://app.supabase.io/');
    console.log('2. Navigate to the SQL Editor');
    console.log('3. Run each migration in sequence:');
    
    for (const migrationFile of migrations) {
      console.log(`   - ${migrationFile}`);
    }
    
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migrations
runMigrations();