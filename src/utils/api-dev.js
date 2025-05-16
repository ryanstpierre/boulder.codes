// Development-specific API utilities that directly call Supabase
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch community members directly from Supabase (for development)
 * 
 * @returns {Promise<Array>} - Array of community members
 */
export async function fetchCommunityMembersDev() {
  try {
    const { data: members, error } = await supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching community members:', error);
      throw new Error('Failed to fetch community members');
    }

    return members || [];
  } catch (error) {
    console.error('Error fetching community members:', error);
    throw error;
  }
}

/**
 * Register a community member directly with Supabase (for development)
 * 
 * @param {Object} formData - Registration form data
 * @returns {Promise<Object>} - Registration result
 */
export async function registerCommunityMemberDev(formData) {
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
    } = formData;

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (existingUser && existingUser.length > 0) {
      throw new Error('This email address is already registered');
    }

    // Insert registration
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

    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select();

    if (insertError) {
      console.error('Error inserting registration:', insertError);
      throw new Error('Failed to create registration');
    }

    // Handle tags
    let tagResults = [];
    if (tags && tags.length > 0 && registration && registration[0]) {
      for (const tag of tags) {
        // Handle custom tags
        if (tag.isCustom) {
          const { data: newTag } = await supabase
            .from('tags')
            .insert([{
              name: tag.name,
              slug: tag.slug,
              category: tag.category || 'custom',
              approved: false,
              hidden: false,
              usage_count: 0
            }])
            .select();

          if (newTag && newTag[0]) {
            tag.id = newTag[0].id;
          }
        }

        // Associate tag with registration
        if (tag.id) {
          await supabase
            .from('registration_tags')
            .insert([{
              registration_id: registration[0].id,
              tag_id: tag.id
            }]);
          
          tagResults.push({
            id: tag.id,
            name: tag.name,
            category: tag.category
          });
        }
      }
    }

    return {
      registrationId: registration[0].id,
      tags: tagResults
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}