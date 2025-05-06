// API proxy for the registration endpoint during local development
import { createClient } from '@supabase/supabase-js';

// Helper function to create a slug from a string
function createSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    // Get form data from request body
    const formData = req.body;
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in environment');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Extract tags from the request
    const tags = formData.tags || [];
    
    // Check if email already registered
    const { data: existingUser, error: lookupError } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', formData.email)
      .maybeSingle();
    
    if (lookupError) {
      console.error('Supabase lookup error:', lookupError);
      throw new Error('Database error while checking registration');
    }
    
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }
    
    // Process custom tags first
    const customTags = tags.filter(tag => tag.isCustom);
    const existingTags = tags.filter(tag => !tag.isCustom);
    
    const createdTagIds = [];
    
    // Create custom tags if needed
    for (const customTag of customTags) {
      // Check if a similar tag already exists (by name)
      const { data: similarTag, error: similarTagError } = await supabase
        .from('tags')
        .select('id')
        .ilike('name', customTag.name)
        .maybeSingle();
      
      if (similarTagError) {
        console.error('Error checking for similar tags:', similarTagError);
        // Continue with other tags
        continue;
      }
      
      if (similarTag) {
        // Use the existing similar tag
        createdTagIds.push(similarTag.id);
        continue;
      }
      
      // Create new tag (unapproved by default)
      const { data: newTag, error: createTagError } = await supabase
        .from('tags')
        .insert([{
          name: customTag.name,
          slug: createSlug(customTag.name),
          category: 'custom',
          approved: false, // Needs admin approval
          hidden: false
        }])
        .select('id')
        .single();
      
      if (createTagError) {
        console.error('Error creating custom tag:', createTagError);
        // Continue with other tags
        continue;
      }
      
      if (newTag) {
        createdTagIds.push(newTag.id);
      }
    }
    
    // Prepare the final list of tag IDs
    const tagIds = [
      ...existingTags.map(tag => tag.id),
      ...createdTagIds
    ];
    
    // Create the registration
    const registrationData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      github_username: formData.githubUsername || null,
      role: formData.role,
      hackathon_experience: formData.hackathonExperience || null,
      past_attendance: formData.pastAttendance || false,
      has_team: formData.hasTeam || false,
      team_size: formData.hasTeam ? (parseInt(formData.teamSize) || null) : null,
      project_idea: formData.projectIdea || null,
      skills: formData.skills || null, // Keep the text field for backwards compatibility
      interests: formData.interests || null,
      dietary_restrictions: formData.dietaryRestrictions || null,
      additional_notes: formData.additionalNotes || null
    };
    
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select('id')
      .single();
    
    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error('Failed to save registration data');
    }
    
    // Associate tags with the registration
    if (tagIds.length > 0 && registration) {
      const tagAssociations = tagIds.map(tagId => ({
        registration_id: registration.id,
        tag_id: tagId
      }));
      
      const { error: tagAssociationError } = await supabase
        .from('registration_tags')
        .insert(tagAssociations);
      
      if (tagAssociationError) {
        console.error('Error associating tags with registration:', tagAssociationError);
        // Continue anyway, as the registration itself was successful
      }
    }
    
    // Return successful response
    return res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      registrationId: registration.id,
      dbStatus: 'connected'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to process registration' 
    });
  }
}