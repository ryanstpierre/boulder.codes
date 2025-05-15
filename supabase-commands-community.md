# Supabase Commands for Community Features

Execute the following SQL commands in your Supabase Dashboard SQL editor or using the Supabase CLI to set up the necessary schema for community members:

## 1. Add new columns to registrations table

```sql
-- Add new fields to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS registration_type TEXT DEFAULT 'hackathon',
ADD COLUMN IF NOT EXISTS personal_website TEXT,
ADD COLUMN IF NOT EXISTS twitter_handle TEXT,
ADD COLUMN IF NOT EXISTS linkedin_profile TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS looking_for_work BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS looking_to_hire BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS remote BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS open_to_collaboration BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS side_projects TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT;
```

## 2. Create indices for performance

```sql
-- Add indices for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_type ON public.registrations(registration_type);
CREATE INDEX IF NOT EXISTS idx_registrations_collaboration ON public.registrations(open_to_collaboration) WHERE open_to_collaboration = TRUE;
CREATE INDEX IF NOT EXISTS idx_registrations_looking_for_work ON public.registrations(looking_for_work) WHERE looking_for_work = TRUE;
CREATE INDEX IF NOT EXISTS idx_registrations_looking_to_hire ON public.registrations(looking_to_hire) WHERE looking_to_hire = TRUE;
CREATE INDEX IF NOT EXISTS idx_registrations_remote ON public.registrations(remote) WHERE remote = TRUE;
```

## 3. Create community members view

```sql
-- Create a view for community members to make querying easier
CREATE OR REPLACE VIEW public.community_members AS
SELECT 
  r.id,
  r.first_name,
  r.last_name,
  r.email,
  r.github_username,
  r.personal_website,
  r.twitter_handle,
  r.linkedin_profile,
  r.role,
  r.company,
  r.looking_for_work,
  r.looking_to_hire,
  r.remote,
  r.open_to_collaboration,
  r.side_projects,
  r.skills,
  r.interests,
  r.bio,
  r.created_at,
  CASE 
    WHEN COUNT(t.id) = 0 THEN ARRAY[]::json[]
    ELSE ARRAY_AGG(
      json_build_object(
        'id', t.id, 
        'name', t.name, 
        'slug', t.slug, 
        'category', t.category
      )
    )
  END AS tags
FROM 
  public.registrations r
LEFT JOIN 
  public.registration_tags rt ON r.id = rt.registration_id
LEFT JOIN 
  public.tags t ON rt.tag_id = t.id
WHERE 
  r.registration_type = 'community'
GROUP BY 
  r.id;
```

## 4. Grant permissions for the view

```sql
-- Enable access to the view for authenticated users
GRANT SELECT ON public.community_members TO authenticated;
GRANT SELECT ON public.community_members TO anon;
```

## 5. Add comments for documentation

```sql
-- Comments on new columns
COMMENT ON COLUMN public.registrations.registration_type IS 'Type of registration: hackathon or community';
COMMENT ON COLUMN public.registrations.personal_website IS 'Community member personal website URL';
COMMENT ON COLUMN public.registrations.twitter_handle IS 'Twitter/X handle (without @)';
COMMENT ON COLUMN public.registrations.linkedin_profile IS 'LinkedIn profile URL';
COMMENT ON COLUMN public.registrations.company IS 'Company or organization the member belongs to';
COMMENT ON COLUMN public.registrations.looking_for_work IS 'Whether the member is open to job opportunities';
COMMENT ON COLUMN public.registrations.looking_to_hire IS 'Whether the member is hiring/recruiting';
COMMENT ON COLUMN public.registrations.remote IS 'Whether the member works remotely';
COMMENT ON COLUMN public.registrations.open_to_collaboration IS 'Whether the member is open to collaborating on side projects';
COMMENT ON COLUMN public.registrations.side_projects IS 'Description of side projects and collaboration interests';
COMMENT ON COLUMN public.registrations.bio IS 'Member bio or about me text';
```

## 6. Create RLS policy for community members

```sql
-- Allow anyone to view community members
CREATE POLICY "Anyone can view community members" 
  ON public.registrations 
  FOR SELECT 
  TO anon
  USING (registration_type = 'community');
```

## 7. Update RLS for community registrations (if needed)

```sql
-- Allow authenticated users to create community registrations
CREATE POLICY "Authenticated users can register as community members" 
  ON public.registrations 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (registration_type = 'community');
```

## 8. Migrate existing users to community (optional)

If you want to automatically migrate existing hackathon registrations to the community:

```sql
-- Create a function to copy hackathon registrations to community members
CREATE OR REPLACE FUNCTION public.migrate_hackathon_to_community()
RETURNS void AS $$
BEGIN
  INSERT INTO public.registrations (
    first_name,
    last_name,
    email,
    github_username,
    role,
    skills,
    interests,
    registration_type,
    open_to_collaboration,
    created_at
  )
  SELECT 
    first_name,
    last_name,
    email || '_community', -- Temporary: append _community to avoid unique constraint
    github_username,
    role,
    skills,
    interests,
    'community',
    true,
    NOW()
  FROM public.registrations
  WHERE registration_type = 'hackathon'
  ON CONFLICT (email) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- To execute the migration:
-- SELECT public.migrate_hackathon_to_community();
```

## 9. API endpoint access

Make sure your API routes have access to the new columns. If using Supabase client libraries, the new fields should be available automatically.

## Testing Queries

After running these commands, you can test with:

```sql
-- Insert a test community member
INSERT INTO public.registrations (
  first_name, 
  last_name, 
  email, 
  registration_type,
  role,
  company,
  looking_for_work,
  bio
) VALUES (
  'Test',
  'User',
  'test@boulder.codes',
  'community',
  'developer',
  'Test Company',
  true,
  'This is a test user for the boulder.codes community'
);

-- Query community members
SELECT * FROM public.community_members;
```