#!/bin/bash
# Run migrations using psql
PGPASSWORD="h4Tz8xvHgAPm2awPAJXG" psql -h "db.knttgwhefurhoktkcbig.supabase.co" -p "5432" -U "postgres" -d "postgres" -f "/Users/rstpierre/Projects/builders-room/migrations/combined_migrations.sql"
