// API route for fetching public community member profiles
// This is the Next.js version for local development
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add logging to debug
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch community members for public directory
 * This is a public endpoint that doesn't require authentication
 */
export default async function handler(req, res) {
  console.log('Community members API called');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Check if Supabase is properly configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({
      success: false,
      error: 'Server configuration error - missing Supabase credentials'
    });
  }

  try {
    // Query the community_members view
    console.log('Querying community_members view...');
    
    let query = supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: members, error } = await query;

    if (error) {
      console.error('Error fetching community members:', error);
      return res.status(500).json({
        success: false,
        error: `Database error: ${error.message}`,
        details: error
      });
    }

    console.log(`Found ${members?.length || 0} community members`);

    // Return the community members
    return res.status(200).json({
      success: true,
      data: members || []
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred',
      details: error.message
    });
  }
}