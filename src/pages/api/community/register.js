// API route for handling community member registrations
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Handle community member registration
 * This creates a new entry in the registrations table with type='community'
 * and associates any selected tags with the registration
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      githubUsername,
      personalWebsite,
      twitterHandle,
      linkedInProfile,
      role,
      company,
      lookingForWork,
      lookingToHire,
      remote,
      openToCollaboration,
      sideProjects,
      skills,
      interests,
      bio,
      tags
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Check if email already exists in the database
    const { data: existingUser, error: checkError } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (checkError) {
      console.error('Error checking existing user:', checkError);
      return res.status(500).json({
        success: false,
        error: 'Failed to check email availability'
      });
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'This email address is already registered'
      });
    }

    // Prepare registration data
    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      email,
      github_username: githubUsername || null,
      personal_website: personalWebsite || null,
      twitter_handle: twitterHandle || null,
      linkedin_profile: linkedInProfile || null,
      role,
      company: company || null,
      looking_for_work: lookingForWork || false,
      looking_to_hire: lookingToHire || false,
      remote: remote || false,
      open_to_collaboration: openToCollaboration || false,
      side_projects: sideProjects || null,
      skills: skills || null,
      interests: interests || null,
      bio: bio || null,
      registration_type: 'community'
    };

    // Insert registration data
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select();

    if (insertError) {
      console.error('Error inserting registration:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Failed to create registration'
      });
    }

    // Process tags
    let tagResults = [];
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        // Check if tag is custom and needs to be created
        if (tag.isCustom) {
          const { data: newTag, error: newTagError } = await supabase
            .from('tags')
            .insert([{
              name: tag.name,
              slug: tag.slug,
              category: tag.category || 'custom',
              approved: false, // New tags need admin approval
              hidden: false,
              usage_count: 0
            }])
            .select();

          if (newTagError) {
            console.error('Error creating new tag:', newTagError);
            continue; // Continue with other tags
          }

          tag.id = newTag[0].id; // Update the tag ID with the newly created one
        }

        // Associate tag with registration
        const { data: tagAssoc, error: tagAssocError } = await supabase
          .from('registration_tags')
          .insert([{
            registration_id: registration[0].id,
            tag_id: tag.id
          }]);

        if (tagAssocError) {
          console.error('Error associating tag:', tagAssocError);
          continue; // Continue with other tags
        }

        tagResults.push({
          id: tag.id,
          name: tag.name,
          category: tag.category
        });
      }
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Community member registration successful',
      registrationId: registration[0].id,
      tags: tagResults
    });

  } catch (error) {
    console.error('Community registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred'
    });
  }
}