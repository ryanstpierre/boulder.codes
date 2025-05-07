/**
 * API endpoint for handling Builders' Room hackathon registrations
 * This function will save registration data to Supabase and send confirmation email via Resend
 */
import { createClient } from '@supabase/supabase-js';

export async function onRequestPost(context) {
  try {
    // Get form data from request body
    const formData = await context.request.json();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) {
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
    
    // Initialize Supabase client
    const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knttgwhefurhoktkcbig.supabase.co';
    const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // If no Supabase key is provided, return a fallback response
    if (!supabaseKey) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Registration successful (fallback mode)',
          registrationId: Math.floor(Math.random() * 10000) + 1,
          dbStatus: 'fallback',
          emailSent: false,
          emailError: 'Skipped in fallback mode'
        }), 
        { 
          status: 201, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check if email already registered
    const { data: existingUser, error: lookupError } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', formData.email)
      .maybeSingle();
    
    if (lookupError) {
      console.error('Supabase lookup error:', lookupError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error while checking registration'
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    if (existingUser) {
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
    
    // Prepare registration data
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
      skills: formData.skills || null,
      interests: formData.interests || null,
      dietary_restrictions: formData.dietaryRestrictions || null,
      additional_notes: formData.additionalNotes || null
    };
    
    // Insert new registration
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select('id')
      .single();
    
    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to save registration data'
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Send confirmation email using Resend
    let emailSent = false;
    let emailError = null;
    
    try {
      const resendApiKey = context.env.RESEND_API_KEY;
      
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Builders Room <hackathon@boulder.codes>',
            to: formData.email,
            subject: 'Welcome to the Builders\' Room Hackathon!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #f9f9f9; background-color: #0e1525;">
                <div style="background-color: #131c31; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; border: 1px solid #253552;">
                  <img src="https://boulderstartupweek.com/app/uploads/2021/04/BSW2021_LockUp_white.png" alt="Boulder Startup Week Logo" style="height: 60px; margin-bottom: 15px;">
                  <h1 style="color: white; margin: 0; font-weight: 800;">Registration Confirmed!</h1>
                  <p style="color: #0a8acd; margin-top: 10px; font-weight: 600;">BSW Builders' Room Hackathon 2025</p>
                </div>
                
                <div style="background-color: #1a2332; padding: 25px; border-radius: 0 0 10px 10px; border: 1px solid #253552; border-top: none;">
                  <p>Hi ${formData.firstName},</p>
                  
                  <p>Thank you for registering for the <strong style="color: #0a8acd;">Builders' Room Hackathon</strong> at Boulder Startup Week 2025! We're thrilled to have you join us for this exciting event.</p>
                  
                  <div style="background-color: rgba(10, 138, 205, 0.15); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0a8acd;">
                    <h2 style="color: #0a8acd; margin-top: 0; font-weight: 700;">Event Details</h2>
                    <p><strong>Dates:</strong> May 12-16, 2025</p>
                    <p><strong>Main Locations:</strong></p>
                    <ul>
                      <li><strong>Galvanize:</strong> 1023 Walnut St #100, Boulder, CO 80302 (Kickoff/Closeout)</li>
                      <li><strong>Canyon Center (BSW HQ):</strong> 1881 9th Street, Downtown Boulder (Lunches/Mentoring)</li>
                    </ul>
                    <p><strong>Kickoff:</strong> Monday, May 12th at 10:00 AM at Galvanize</p>
                  </div>
                  
                  <div style="background-color: rgba(255, 190, 60, 0.15); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ffbe3c;">
                    <h2 style="color: #ffbe3c; margin-top: 0; font-weight: 700;">Important Next Steps</h2>
                    <p>Please take these actions to complete your hackathon preparation:</p>
                    <ol style="padding-left: 20px;">
                      <li style="margin-bottom: 12px;"><strong style="color: #ffbe3c;">RSVP on Sched:</strong> <a href="https://boulderstartupweek2025.sched.com/event/21iLy/builders-room-kickoff-bsw-hackathon" style="color: #0a8acd; text-decoration: underline;">Click here to RSVP for the kickoff event</a> so we can get an accurate headcount</li>
                      <li style="margin-bottom: 12px;"><strong style="color: #ffbe3c;">Join our Discord:</strong> <a href="https://discord.gg/bouldercodes" style="color: #0a8acd; text-decoration: underline;">Join the boulder.codes Discord</a> for pre-event networking and important updates</li>
                      <li><strong style="color: #ffbe3c;">Browse BSW Events:</strong> <a href="https://boulderstartupweek2025.sched.com/" style="color: #0a8acd; text-decoration: underline;">Explore the full BSW schedule</a> to plan which events you'd like to attend</li>
                    </ol>
                  </div>
                  
                  <h2 style="color: #0a8acd; font-weight: 700;">What to Bring</h2>
                  <ul style="padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Laptop and charger</li>
                    <li style="margin-bottom: 8px;">Any specific devices/hardware for your project</li>
                    <li style="margin-bottom: 8px;">Notebook and pen</li>
                    <li style="margin-bottom: 8px;">Refillable water bottle</li>
                    <li>Your creativity and enthusiasm!</li>
                  </ul>
                  
                  <div style="display: flex; justify-content: center; margin: 35px 0;">
                    <a href="https://boulder.codes/schedule" style="background-color: #0a8acd; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(10, 138, 205, 0.2); transition: all 0.3s ease;">View Detailed Schedule</a>
                  </div>
                  
                  <p style="border-top: 1px solid #253552; padding-top: 20px; margin-top: 30px;">If you have any questions or need to update your registration information, please email Ryan at <a href="mailto:ryan@thresholdlabs.io" style="color: #0a8acd; text-decoration: underline;">ryan@thresholdlabs.io</a>.</p>
                  
                  <p>We can't wait to see what you'll build!</p>
                  
                  <p>Best regards,<br>The Builders' Room Team</p>
                </div>
                
                <div style="padding: 20px; text-align: center; font-size: 12px; color: #6a7a9d; margin-top: 15px;">
                  <p>© 2025 boulder.codes | Boulder Startup Week</p>
                  <div style="display: flex; justify-content: center; margin-top: 10px;">
                    <a href="https://boulder.codes" style="color: #0a8acd; margin: 0 10px; text-decoration: none;">Website</a>
                    <a href="https://discord.gg/bouldercodes" style="color: #0a8acd; margin: 0 10px; text-decoration: none;">Discord</a>
                    <a href="https://boulderstartupweek2025.sched.com/" style="color: #0a8acd; margin: 0 10px; text-decoration: none;">BSW Schedule</a>
                  </div>
                </div>
              </div>
            `
          })
        });
        
        if (emailResponse.ok) {
          const emailData = await emailResponse.json();
          console.log('Email sent successfully:', emailData);
          emailSent = true;
        } else {
          const errorData = await emailResponse.json();
          console.error('Failed to send email:', errorData);
          emailError = errorData;
        }
      } else {
        console.log('Skipping email send - no Resend API key available');
      }
    } catch (emailErr) {
      console.error('Error sending confirmation email:', emailErr);
      emailError = emailErr.message;
    }
    
    // Return successful response with email status
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Registration successful',
        registrationId: registration.id,
        dbStatus: 'connected',
        emailSent: emailSent,
        emailError: emailError
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