// API route for fetching public community member profiles
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch community members for public directory
 * This is a public endpoint that doesn't require authentication
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Query the community_members view
    let query = supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: members, error } = await query;

    if (error) {
      console.error('Error fetching community members:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch community members'
      });
    }

    // Return the community members
    return res.status(200).json({
      success: true,
      data: members || []
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred'
    });
  }
}