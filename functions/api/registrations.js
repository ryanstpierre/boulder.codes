/**
 * API endpoint for retrieving registration data from Supabase
 * Requires authentication via API key
 */
import { createClient } from '@supabase/supabase-js';

export async function onRequestGet(context) {
  try {
    // Get API key from request headers
    const authHeader = context.request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized' 
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const apiKey = authHeader.substring(7); // Remove "Bearer " prefix
    
    // Check if ADMIN_API_KEY exists in environment
    const adminKey = context.env.ADMIN_API_KEY || '7565488aab1fceabbf352454cee96b8e'; // Use hardcoded key as fallback
    
    // In production environment, check against secure key
    if (apiKey !== adminKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid API key' 
        }), 
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Get query parameters
    const url = new URL(context.request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const search = url.searchParams.get('search') || '';
    const sortField = url.searchParams.get('sort') || 'created_at';
    const sortOrder = url.searchParams.get('order') || 'desc';
    
    // Initialize Supabase client
    const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knttgwhefurhoktkcbig.supabase.co';
    const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // If no Supabase key is provided, return mock data
    if (!supabaseKey) {
      const mockResults = [
        {
          id: 1,
          first_name: "Jane",
          last_name: "Doe",
          email: "jane.doe@example.com",
          github_username: "janedoe",
          role: "developer",
          hackathon_experience: "few",
          past_attendance: false,
          has_team: false,
          team_size: null,
          project_idea: "An AI-powered code assistant",
          skills: "JavaScript, React, Node.js",
          interests: "AI, Web Development",
          dietary_restrictions: "Vegetarian",
          additional_notes: null,
          created_at: new Date().toISOString()
        }
      ];
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: mockResults,
          meta: {
            total: 1,
            limit,
            offset
          },
          dbStatus: 'fallback'
        }), 
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Build the query
    let query = supabase
      .from('registrations')
      .select('*', { count: 'exact' });
    
    // Add search if provided
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,github_username.ilike.%${search}%`);
    }
    
    // Add sorting
    query = query.order(sortField, { ascending: sortOrder === 'asc' });
    
    // Add pagination
    query = query.range(offset, offset + limit - 1);
    
    // Execute the query
    const { data: registrations, error: fetchError, count } = await query;
    
    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error while fetching registrations'
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      console.error('Supabase count error:', countError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: registrations || [],
        meta: {
          total: totalCount || count || (registrations ? registrations.length : 0),
          limit,
          offset,
          search: search || null,
          sort: sortField,
          order: sortOrder
        },
        dbStatus: 'connected'
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error fetching registrations:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch registrations'
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}