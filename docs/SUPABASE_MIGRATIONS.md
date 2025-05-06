# Managing Supabase Migrations

This document outlines best practices for handling database migrations in your Supabase project for the Builders' Room application.

## Migration Approaches

### 1. Supabase CLI (Recommended)

The Supabase CLI provides a robust way to manage migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase in your project
supabase init

# Link to your Supabase project
supabase link --project-ref your-project-ref

# Create a new migration
supabase migration new create_registrations_table

# Apply migrations to your local development setup
supabase db push

# Apply migrations to your remote project
supabase db push --db-url postgresql://postgres:password@db.your-project-ref.supabase.co:5432/postgres
```

Benefits:
- Version-controlled migrations
- Can be used in CI/CD pipelines
- Provides local development with Docker
- Allows you to see differences between local and remote schemas

### 2. SQL Scripts with Version Control

For simpler projects, you can maintain migrations as versioned SQL scripts:

```
/migrations
  /001_initial_setup.sql
  /002_create_registrations.sql
  /003_add_index_to_registrations.sql
```

Execute these scripts manually in the Supabase dashboard SQL editor or with a script that connects to your database.

Benefits:
- Simple to understand and implement
- Doesn't require additional tools
- Easy to review changes

### 3. Tracking Migrations in Your Application

You can also implement a simple migration system within your application:

```javascript
// Example migration tracker
async function runMigrations(supabase) {
  // Check current migration version
  const { data: version } = await supabase
    .from('migrations')
    .select('version')
    .single();
  
  const currentVersion = version?.version || 0;
  
  // Run migrations in order
  if (currentVersion < 1) {
    await supabase.rpc('run_sql', { sql: `
      CREATE TABLE registrations (...);
    `});
  }
  
  if (currentVersion < 2) {
    await supabase.rpc('run_sql', { sql: `
      ALTER TABLE registrations ADD COLUMN new_field TEXT;
    `});
  }
  
  // Update migration version
  await supabase
    .from('migrations')
    .upsert({ id: 1, version: 2 });
}
```

## Setting Up a Migration Process for Builders' Room

### Initial Setup

1. Create a dedicated `/migrations` directory in your project:

```bash
mkdir -p migrations
```

2. Add your initial schema migration:

```bash
cp sql/create_registrations_table.sql migrations/001_initial_schema.sql
```

3. Create a migration runner script:

```bash
touch migrations/run-migrations.js
```

### Migration Runner Script

Here's a simple script to run migrations:

```javascript
// migrations/run-migrations.js
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function runMigrations() {
  // Get Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    return;
  }
  
  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Ensure migrations tracking table exists
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS _migrations (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    
    // Get applied migrations
    const { data: appliedMigrations, error } = await supabase
      .from('_migrations')
      .select('name');
      
    if (error) {
      console.error('Error fetching applied migrations:', error);
      return;
    }
    
    const appliedMigrationNames = new Set(appliedMigrations.map(m => m.name));
    
    // Get migration files
    const migrationsDir = path.join(__dirname);
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ensure they run in order
    
    // Run pending migrations
    for (const file of migrationFiles) {
      if (!appliedMigrationNames.has(file)) {
        console.log(`Applying migration: ${file}`);
        
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        
        const { error: migrationError } = await supabase.rpc('exec_sql', { sql });
        
        if (migrationError) {
          console.error(`Error applying migration ${file}:`, migrationError);
          return;
        }
        
        // Record successful migration
        await supabase
          .from('_migrations')
          .insert({ name: file });
          
        console.log(`Migration ${file} applied successfully`);
      } else {
        console.log(`Migration ${file} already applied, skipping`);
      }
    }
    
    console.log('All migrations completed successfully');
    
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

// Run the migrations
runMigrations();
```

### CI/CD Integration

For automated deployments, you can run migrations as part of your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
name: Deploy with Migrations

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run migrations
        run: node migrations/run-migrations.js
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
      - name: Build and deploy
        run: npm run build && npm run deploy
```

## Best Practices

1. **Always make migrations reversible** where possible (include `UP` and `DOWN` migrations)
2. **Test migrations locally** before applying to production
3. **Back up your database** before running migrations in production
4. **Use transactions** to ensure migrations are atomic
5. **Version control your migrations** with your application code
6. **Use descriptive names** for migration files (e.g., `001_create_registrations_table.sql`)
7. **Keep migrations small and focused** to minimize risk
8. **Document schema changes** in your migration files with comments

## Handling Production Deployments

For production environments:

1. Always schedule migrations during low-traffic periods
2. Consider using a staging environment to test migrations
3. Have a rollback plan for each migration
4. Monitor database performance after applying migrations

By following these practices, you can maintain a reliable and predictable database schema evolution for your Supabase-backed application.