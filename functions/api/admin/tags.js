/**
 * Admin API for managing tags
 * Requires authentication with the admin API key
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

export async function onRequestPost(context) {
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
    
    // Initialize Supabase client
    const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knttgwhefurhoktkcbig.supabase.co';
    const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing Supabase credentials' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get request data
    const requestData = await context.request.json();
    const { action, tagData } = requestData;
    
    if (!action || !tagData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: action, tagData' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    let response;
    
    switch (action) {
      case 'approve':
        // Approve a tag
        if (!tagData.id) {
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
        
        response = await supabase
          .from('tags')
          .update({ approved: true, updated_at: new Date().toISOString() })
          .eq('id', tagData.id)
          .select()
          .single();
        break;
        
      case 'hide':
        // Hide/show a tag
        if (!tagData.id) {
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
        
        response = await supabase
          .from('tags')
          .update({ hidden: tagData.hidden, updated_at: new Date().toISOString() })
          .eq('id', tagData.id)
          .select()
          .single();
        break;
        
      case 'update':
        // Update tag details
        if (!tagData.id) {
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
        
        // Update slug if name is changing and slug isn't provided
        let updateData = { ...tagData };
        if (updateData.name && !updateData.slug) {
          updateData.slug = createSlug(updateData.name);
        }
        
        // Remove id from update data
        const { id, ...dataToUpdate } = updateData;
        
        // Add updated timestamp
        dataToUpdate.updated_at = new Date().toISOString();
        
        response = await supabase
          .from('tags')
          .update(dataToUpdate)
          .eq('id', id)
          .select()
          .single();
        break;
        
      case 'create':
        // Create a new tag
        if (!tagData.name || !tagData.category) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Name and category are required for new tags' 
            }), 
            { 
              status: 400, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
        
        // Create slug if not provided
        const slug = tagData.slug || createSlug(tagData.name);
        
        // Check if tag already exists
        const { data: existingTag } = await supabase
          .from('tags')
          .select('id')
          .or(`name.eq.${tagData.name},slug.eq.${slug}`)
          .maybeSingle();
        
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
        
        response = await supabase
          .from('tags')
          .insert({
            name: tagData.name,
            slug: slug,
            category: tagData.category,
            approved: tagData.approved !== false, // Default to approved
            hidden: tagData.hidden || false
          })
          .select()
          .single();
        break;
        
      case 'delete':
        // Delete a tag
        if (!tagData.id) {
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
        
        // First check if tag is in use
        const { data: usageCount, error: usageError } = await supabase
          .from('registration_tags')
          .select('tag_id', { count: 'exact' })
          .eq('tag_id', tagData.id);
        
        if (usageError) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Failed to check tag usage' 
            }), 
            { 
              status: 500, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
        
        if (usageCount && usageCount.length > 0) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Cannot delete a tag that is in use. Try hiding it instead.' 
            }), 
            { 
              status: 400, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
        
        response = await supabase
          .from('tags')
          .delete()
          .eq('id', tagData.id);
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Unknown action: ${action}` 
          }), 
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
    }
    
    if (response.error) {
      console.error(`Error performing tag action ${action}:`, response.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to ${action} tag: ${response.error.message}` 
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
        action: action,
        data: response.data || { message: `Successfully performed ${action}` } 
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in admin tags API:', error);
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