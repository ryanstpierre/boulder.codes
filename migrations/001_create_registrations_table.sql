-- Migration: Create registrations table with updated fields
-- For Boulder Startup Week Builders' Room hackathon registration

-- Create registrations table with enhanced fields
CREATE TABLE public.registrations (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  github_username TEXT,
  role TEXT NOT NULL,
  hackathon_experience TEXT,
  past_attendance BOOLEAN,
  has_team BOOLEAN,
  team_size INT,
  project_idea TEXT,
  skills TEXT,
  interests TEXT,
  dietary_restrictions TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_registrations_email ON public.registrations(email);

-- Create index on github_username for potential future integrations
CREATE INDEX idx_registrations_github ON public.registrations(github_username);

-- Enable row level security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for anon users to insert
CREATE POLICY "Anyone can register" 
  ON public.registrations 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy for authenticated users to read all registrations
CREATE POLICY "Authenticated users can read all registrations" 
  ON public.registrations 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Comment on table
COMMENT ON TABLE public.registrations IS 'Hackathon registration data for Boulder Startup Week Builders Room';

-- Comments on columns
COMMENT ON COLUMN public.registrations.first_name IS 'Participant first name';
COMMENT ON COLUMN public.registrations.last_name IS 'Participant last name';
COMMENT ON COLUMN public.registrations.email IS 'Participant email address (unique)';
COMMENT ON COLUMN public.registrations.github_username IS 'GitHub username (optional)';
COMMENT ON COLUMN public.registrations.role IS 'Participant role (developer, designer, etc.)';
COMMENT ON COLUMN public.registrations.hackathon_experience IS 'Previous hackathon experience';
COMMENT ON COLUMN public.registrations.past_attendance IS 'Has attended Boulder Startup Week hackathon before';
COMMENT ON COLUMN public.registrations.has_team IS 'Is signing up with a team';
COMMENT ON COLUMN public.registrations.team_size IS 'Number of team members (if has_team is true)';
COMMENT ON COLUMN public.registrations.project_idea IS 'Project idea or concept to work on';
COMMENT ON COLUMN public.registrations.skills IS 'Participant skills';
COMMENT ON COLUMN public.registrations.interests IS 'Areas of interest for the hackathon';
COMMENT ON COLUMN public.registrations.dietary_restrictions IS 'Dietary restrictions for food planning';
COMMENT ON COLUMN public.registrations.additional_notes IS 'Any additional information provided by the participant';