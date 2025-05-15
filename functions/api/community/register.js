export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
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
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if email already exists
    const checkResponse = await env.SUPABASE
      .from('registrations')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (checkResponse.data && checkResponse.data.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'This email address is already registered'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
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
    const insertResponse = await env.SUPABASE
      .from('registrations')
      .insert([registrationData])
      .select();

    if (insertResponse.error) {
      console.error('Error inserting registration:', insertResponse.error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create registration'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const registration = insertResponse.data[0];

    // Process tags
    let tagResults = [];
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        // Check if tag is custom and needs to be created
        if (tag.isCustom) {
          const newTagResponse = await env.SUPABASE
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

          if (!newTagResponse.error && newTagResponse.data.length > 0) {
            tag.id = newTagResponse.data[0].id;
          }
        }

        // Associate tag with registration
        const tagAssocResponse = await env.SUPABASE
          .from('registration_tags')
          .insert([{
            registration_id: registration.id,
            tag_id: tag.id
          }]);

        if (!tagAssocResponse.error) {
          tagResults.push({
            id: tag.id,
            name: tag.name,
            category: tag.category
          });
        }
      }
    }

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Community member registration successful',
      registrationId: registration.id,
      tags: tagResults
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Community registration error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}