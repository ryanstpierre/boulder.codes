-- Migration: Add support for community members
-- This migration adds the necessary fields to the registrations table for community member profiles
-- and creates views and indices to support the community directory

-- Add new fields to registrations table
ALTER TABLE public.registrations 
ADD COLUMN registration_type TEXT DEFAULT 'hackathon', -- 'hackathon' or 'community'
ADD COLUMN personal_website TEXT,
ADD COLUMN twitter_handle TEXT,
ADD COLUMN linkedin_profile TEXT,
ADD COLUMN company TEXT,
ADD COLUMN looking_for_work BOOLEAN DEFAULT FALSE,
ADD COLUMN looking_to_hire BOOLEAN DEFAULT FALSE,
ADD COLUMN remote BOOLEAN DEFAULT FALSE,
ADD COLUMN open_to_collaboration BOOLEAN DEFAULT FALSE,
ADD COLUMN side_projects TEXT,
ADD COLUMN bio TEXT;

-- Add indices for performance
CREATE INDEX idx_registrations_type ON public.registrations(registration_type);
CREATE INDEX idx_registrations_collaboration ON public.registrations(open_to_collaboration) WHERE open_to_collaboration = TRUE;
CREATE INDEX idx_registrations_looking_for_work ON public.registrations(looking_for_work) WHERE looking_for_work = TRUE;
CREATE INDEX idx_registrations_looking_to_hire ON public.registrations(looking_to_hire) WHERE looking_to_hire = TRUE;
CREATE INDEX idx_registrations_remote ON public.registrations(remote) WHERE remote = TRUE;

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
  ARRAY_AGG(
    json_build_object(
      'id', t.id, 
      'name', t.name, 
      'slug', t.slug, 
      'category', t.category
    )
  ) AS tags
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

-- Enable access to the view for authenticated users
GRANT SELECT ON public.community_members TO authenticated;

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