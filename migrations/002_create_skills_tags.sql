-- Migration: Create skills/tags system
-- For Boulder Startup Week Builders' Room hackathon skills tagging

-- Create tags table
CREATE TABLE public.tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- For grouping tags: 'language', 'framework', 'tool', etc.
  approved BOOLEAN DEFAULT true, -- For admin moderation
  hidden BOOLEAN DEFAULT false, -- For admin to hide inappropriate tags
  usage_count INT DEFAULT 0, -- Track popularity
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create registration_tags junction table for many-to-many relationship
CREATE TABLE public.registration_tags (
  id SERIAL PRIMARY KEY,
  registration_id INT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(registration_id, tag_id) -- Prevent duplicate tags for the same registration
);

-- Create indexes for performance
CREATE INDEX idx_tags_name ON public.tags(name);
CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_tags_category ON public.tags(category);
CREATE INDEX idx_tags_approved ON public.tags(approved);
CREATE INDEX idx_tags_hidden ON public.tags(hidden);
CREATE INDEX idx_registration_tags_registration_id ON public.registration_tags(registration_id);
CREATE INDEX idx_registration_tags_tag_id ON public.registration_tags(tag_id);

-- Enable RLS on tags table
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on registration_tags table
ALTER TABLE public.registration_tags ENABLE ROW LEVEL SECURITY;

-- Policy for anon users to read approved, non-hidden tags
CREATE POLICY "Anyone can view approved tags" 
  ON public.tags 
  FOR SELECT 
  TO anon 
  USING (approved = true AND hidden = false);

-- Policy for authenticated users to read all tags
CREATE POLICY "Authenticated users can read all tags" 
  ON public.tags 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Policy for authenticated users to create tags
CREATE POLICY "Authenticated users can create tags" 
  ON public.tags 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Policy for authenticated users to update tags
CREATE POLICY "Authenticated users can update tags" 
  ON public.tags 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Policy for authenticated users to read registration_tags
CREATE POLICY "Authenticated users can read registration_tags" 
  ON public.registration_tags 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Policy for authenticated users to insert registration_tags
CREATE POLICY "Authenticated users can insert registration_tags" 
  ON public.registration_tags 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Comments on tables and columns
COMMENT ON TABLE public.tags IS 'Skills, technologies, and interests that can be associated with registrations';
COMMENT ON COLUMN public.tags.name IS 'Display name of the tag';
COMMENT ON COLUMN public.tags.slug IS 'URL-friendly version of the tag name';
COMMENT ON COLUMN public.tags.category IS 'Category for organizing tags';
COMMENT ON COLUMN public.tags.approved IS 'Whether this tag has been approved by an admin';
COMMENT ON COLUMN public.tags.hidden IS 'Whether this tag is hidden from public view';
COMMENT ON COLUMN public.tags.usage_count IS 'Number of registrations using this tag';

COMMENT ON TABLE public.registration_tags IS 'Junction table linking registrations to tags';
COMMENT ON COLUMN public.registration_tags.registration_id IS 'Reference to the registration';
COMMENT ON COLUMN public.registration_tags.tag_id IS 'Reference to the tag';

-- Insert some common starter tags
INSERT INTO public.tags (name, slug, category, approved, hidden, usage_count) VALUES
-- Languages
('JavaScript', 'javascript', 'language', true, false, 0),
('TypeScript', 'typescript', 'language', true, false, 0),
('Python', 'python', 'language', true, false, 0),
('Java', 'java', 'language', true, false, 0),
('C#', 'csharp', 'language', true, false, 0),
('PHP', 'php', 'language', true, false, 0),
('Ruby', 'ruby', 'language', true, false, 0),
('Go', 'go', 'language', true, false, 0),
('Rust', 'rust', 'language', true, false, 0),
('Swift', 'swift', 'language', true, false, 0),
('Kotlin', 'kotlin', 'language', true, false, 0),
('C++', 'cpp', 'language', true, false, 0),

-- Frameworks
('React', 'react', 'framework', true, false, 0),
('Angular', 'angular', 'framework', true, false, 0),
('Vue.js', 'vuejs', 'framework', true, false, 0),
('Next.js', 'nextjs', 'framework', true, false, 0),
('Django', 'django', 'framework', true, false, 0),
('Flask', 'flask', 'framework', true, false, 0),
('Ruby on Rails', 'rails', 'framework', true, false, 0),
('Spring Boot', 'spring-boot', 'framework', true, false, 0),
('ASP.NET', 'aspnet', 'framework', true, false, 0),
('Express', 'express', 'framework', true, false, 0),
('Laravel', 'laravel', 'framework', true, false, 0),

-- Databases
('PostgreSQL', 'postgresql', 'database', true, false, 0),
('MySQL', 'mysql', 'database', true, false, 0),
('MongoDB', 'mongodb', 'database', true, false, 0),
('SQLite', 'sqlite', 'database', true, false, 0),
('Redis', 'redis', 'database', true, false, 0),
('Firebase', 'firebase', 'database', true, false, 0),
('Supabase', 'supabase', 'database', true, false, 0),

-- Cloud/DevOps
('AWS', 'aws', 'cloud', true, false, 0),
('Azure', 'azure', 'cloud', true, false, 0),
('Google Cloud', 'gcp', 'cloud', true, false, 0),
('Docker', 'docker', 'devops', true, false, 0),
('Kubernetes', 'kubernetes', 'devops', true, false, 0),
('CI/CD', 'ci-cd', 'devops', true, false, 0),
('Terraform', 'terraform', 'devops', true, false, 0),

-- Design/UX
('UI Design', 'ui-design', 'design', true, false, 0),
('UX Research', 'ux-research', 'design', true, false, 0),
('Figma', 'figma', 'design', true, false, 0),
('Adobe XD', 'adobe-xd', 'design', true, false, 0),
('Sketch', 'sketch', 'design', true, false, 0),

-- Mobile
('iOS', 'ios', 'mobile', true, false, 0),
('Android', 'android', 'mobile', true, false, 0),
('React Native', 'react-native', 'mobile', true, false, 0),
('Flutter', 'flutter', 'mobile', true, false, 0),

-- AI/ML
('Machine Learning', 'machine-learning', 'ai', true, false, 0),
('Deep Learning', 'deep-learning', 'ai', true, false, 0),
('NLP', 'nlp', 'ai', true, false, 0),
('Computer Vision', 'computer-vision', 'ai', true, false, 0),
('TensorFlow', 'tensorflow', 'ai', true, false, 0),
('PyTorch', 'pytorch', 'ai', true, false, 0),

-- Other
('Product Management', 'product-management', 'business', true, false, 0),
('Agile', 'agile', 'process', true, false, 0),
('Blockchain', 'blockchain', 'technology', true, false, 0),
('AR/VR', 'ar-vr', 'technology', true, false, 0),
('IoT', 'iot', 'technology', true, false, 0),
('Game Development', 'game-dev', 'technology', true, false, 0);

-- Add function to create/update tags
CREATE OR REPLACE FUNCTION handle_new_tag() 
RETURNS TRIGGER AS $$
BEGIN
  -- Update the tag's usage count
  UPDATE public.tags
  SET usage_count = usage_count + 1
  WHERE id = NEW.tag_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updating tag usage count
CREATE TRIGGER update_tag_usage_count
AFTER INSERT ON public.registration_tags
FOR EACH ROW
EXECUTE FUNCTION handle_new_tag();

-- Add function to handle removing tags
CREATE OR REPLACE FUNCTION handle_remove_tag() 
RETURNS TRIGGER AS $$
BEGIN
  -- Update the tag's usage count
  UPDATE public.tags
  SET usage_count = usage_count - 1
  WHERE id = OLD.tag_id;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updating tag usage count when removed
CREATE TRIGGER update_tag_usage_count_on_delete
AFTER DELETE ON public.registration_tags
FOR EACH ROW
EXECUTE FUNCTION handle_remove_tag();