/**
 * API endpoints for managing tags
 * GET: Fetch approved tags
 * POST: Create a new tag (admin only)
 * PUT: Update a tag (admin only)
 */
import { createClient } from '@supabase/supabase-js';

// Helper function to create a slug from a string
function createSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

// Helper function to initialize Supabase client
function initSupabase(context) {
  const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knttgwhefurhoktkcbig.supabase.co';
  
  // Try to use service role key first, fall back to anon key
  const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY || context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseKey) {
    throw new Error('Supabase key is required');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// GET: Fetch tags
export async function onRequestGet(context) {
  try {
    // Get query parameters
    const url = new URL(context.request.url);
    const category = url.searchParams.get('category');
    const approved = url.searchParams.get('approved') !== 'false'; // Default to approved only
    const hidden = url.searchParams.get('hidden') === 'true'; // Default to non-hidden only
    
    // Initialize Supabase client
    const supabase = initSupabase(context);
    
    // Build query
    let query = supabase
      .from('tags')
      .select('*');
    
    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    query = query.eq('approved', approved);
    
    if (!hidden) {
      query = query.eq('hidden', false);
    }
    
    // Order by usage count and name
    query = query.order('usage_count', { ascending: false }).order('name');
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching tags:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to fetch tags' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: data || [] 
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in tags API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

// POST: Create a new tag
export async function onRequestPost(context) {
  try {
    // Check admin authorization (simplified for example)
    const authHeader = context.request.headers.get('Authorization');
    const isAdmin = authHeader === `Bearer ${context.env.ADMIN_API_KEY}`;
    
    if (!isAdmin) {
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
    
    // Get request body
    const requestData = await context.request.json();
    
    // Validate request
    if (!requestData.name || !requestData.category) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Name and category are required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Create slug if not provided
    const slug = requestData.slug || createSlug(requestData.name);
    
    // Initialize Supabase client
    const supabase = initSupabase(context);
    
    // Check if tag already exists
    const { data: existingTag, error: checkError } = await supabase
      .from('tags')
      .select('id')
      .or(`name.eq.${requestData.name},slug.eq.${slug}`)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking for existing tag:', checkError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to check for existing tag' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    if (existingTag) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'A tag with this name or slug already exists' 
        }), 
        { 
          status: 409, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Insert new tag
    const { data: newTag, error: insertError } = await supabase
      .from('tags')
      .insert({
        name: requestData.name,
        slug: slug,
        category: requestData.category,
        approved: requestData.approved !== false, // Default to true
        hidden: requestData.hidden || false
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error creating tag:', insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to create tag' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: newTag 
      }), 
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in tags API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

// PUT: Update a tag
export async function onRequestPut(context) {
  try {
    // Check admin authorization
    const authHeader = context.request.headers.get('Authorization');
    const isAdmin = authHeader === `Bearer ${context.env.ADMIN_API_KEY}`;
    
    if (!isAdmin) {
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
    
    // Get URL parameters
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Tag ID is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Get request body
    const requestData = await context.request.json();
    
    // Validate request
    if (Object.keys(requestData).length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No update data provided' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Initialize Supabase client
    const supabase = initSupabase(context);
    
    // Update slug if name is changing
    let updateData = { ...requestData };
    if (requestData.name && !requestData.slug) {
      updateData.slug = createSlug(requestData.name);
    }
    
    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString();
    
    // Update tag
    const { data: updatedTag, error: updateError } = await supabase
      .from('tags')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating tag:', updateError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to update tag' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: updatedTag 
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in tags API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}