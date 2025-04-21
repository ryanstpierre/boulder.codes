/**
 * API endpoint for handling Builders' Room hackathon registrations
 * This function will save registration data to a Cloudflare D1 database
 */

export async function onRequestPost(context) {
  try {
    // Get form data from request body
    const formData = await context.request.json();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.role) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Check if email already registered
    const existingRegistration = await context.env.DB.prepare(
      'SELECT id FROM registrations WHERE email = ?'
    )
    .bind(formData.email)
    .first();
    
    if (existingRegistration) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email already registered' 
        }), 
        { 
          status: 409, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Insert new registration
    const result = await context.env.DB.prepare(
      `INSERT INTO registrations (
        name, email, role, experience, team_preference, 
        bsw_attendance, project_idea, dietary, tshirt_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      formData.name,
      formData.email,
      formData.role,
      formData.experience || '',
      formData.teamPreference || '',
      formData.bswAttendance || '',
      formData.projectIdea || '',
      formData.dietary || '',
      formData.tshirtSize || ''
    )
    .run();
    
    // Send confirmation email (mock implementation)
    // In a real app, you would integrate with an email service
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Registration successful',
        registrationId: result.meta.last_row_id
      }), 
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    // Log error (would go to Cloudflare logs)
    console.error('Registration error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process registration'
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}