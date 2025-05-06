// API proxy for the tags endpoint during local development
import { createClient } from '@supabase/supabase-js';
import { config } from './exportConfig';

// Export the config for use in static export
export { config };

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in environment');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse query parameters
    const { category, approved = 'true', hidden = 'false' } = req.query;
    
    // Build query
    let query = supabase.from('tags').select('*');
    
    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    query = query.eq('approved', approved === 'true');
    query = query.eq('hidden', hidden === 'true');
    
    // Order by usage count and name
    query = query.order('usage_count', { ascending: false }).order('name');
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching tags:', error);
      throw new Error('Failed to fetch tags');
    }
    
    // Return successful response
    return res.status(200).json({ 
      success: true, 
      data: data || [] 
    });
    
  } catch (error) {
    console.error('Error in tags API:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}