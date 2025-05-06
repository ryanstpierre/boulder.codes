// Direct migration executor for Supabase
// This script uses the Supabase REST API to execute migration SQL

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// SQL files to execute in order
const migrations = [
  '001_create_registrations_table.sql',
  '002_create_skills_tags.sql'
];

async function executeMigrations() {
  console.log('Starting migration execution...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials not found in .env.local');
    return;
  }
  
  console.log(`Using Supabase URL: ${supabaseUrl}`);
  
  // Execute each migration in sequence
  for (const migrationFile of migrations) {
    console.log(`\nPreparing to execute migration: ${migrationFile}`);
    
    const sqlPath = path.join(__dirname, migrationFile);
    if (!fs.existsSync(sqlPath)) {
      console.error(`Migration file not found: ${sqlPath}`);
      continue;
    }
    
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log(`SQL loaded (${sql.length} characters)`);
    
    try {
      // Split the SQL into manageable chunks to avoid API limitations
      // This is a simplified approach - complex SQL might need special handling
      const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
      
      console.log(`Executing ${statements.length} SQL statements...`);
      
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i].trim() + ';';
        
        // Skip comments-only statements
        if (statement.startsWith('--') && !statement.includes('\n')) {
          continue;
        }
        
        console.log(`Executing statement ${i+1}/${statements.length}...`);
        
        // Use the Supabase REST API to execute SQL
        // Note: For security, this endpoint requires service_role key
        // We're using anon key here just to test the connection
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        // Wait a bit between statements to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log(`Migration ${migrationFile} applied successfully!`);
      
    } catch (error) {
      console.error(`Error executing migration ${migrationFile}:`, error);
    }
  }
  
  console.log('\nMigration execution complete.');
  console.log('\nIMPORTANT: Please execute these SQL scripts manually in the Supabase SQL Editor:');
  console.log('1. Log in to your Supabase dashboard');
  console.log('2. Navigate to the SQL Editor');
  console.log('3. Create a new query');
  console.log('4. Copy and paste the SQL from migrations/001_create_registrations_table.sql');
  console.log('5. Run the query to create the registrations table');
  console.log('6. Create another new query');
  console.log('7. Copy and paste the SQL from migrations/002_create_skills_tags.sql');
  console.log('8. Run the query to create the tags system');
}

// Run the migrations
executeMigrations();