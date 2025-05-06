// Admin proxy API for the tags management endpoint during local development
import { createClient } from '@supabase/supabase-js';

// Helper function to create a slug from a string
function createSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    // Check admin authorization
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
    
    if (!isAdmin) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in environment');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get request data
    const { action, tagData } = req.body;
    
    if (!action || !tagData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: action, tagData' 
      });
    }
    
    let response;
    
    switch (action) {
      case 'approve':
        // Approve a tag
        if (!tagData.id) {
          return res.status(400).json({ success: false, error: 'Tag ID is required' });
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
          return res.status(400).json({ success: false, error: 'Tag ID is required' });
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
          return res.status(400).json({ success: false, error: 'Tag ID is required' });
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
          return res.status(400).json({
            success: false, 
            error: 'Name and category are required for new tags'
          });
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
          return res.status(409).json({ 
            success: false, 
            error: 'A tag with this name or slug already exists' 
          });
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
          return res.status(400).json({ success: false, error: 'Tag ID is required' });
        }
        
        // First check if tag is in use
        const { data: usageCount, error: usageError } = await supabase
          .from('registration_tags')
          .select('tag_id', { count: 'exact' })
          .eq('tag_id', tagData.id);
        
        if (usageError) {
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to check tag usage' 
          });
        }
        
        if (usageCount && usageCount.length > 0) {
          return res.status(400).json({ 
            success: false, 
            error: 'Cannot delete a tag that is in use. Try hiding it instead.' 
          });
        }
        
        response = await supabase
          .from('tags')
          .delete()
          .eq('id', tagData.id);
        break;
        
      default:
        return res.status(400).json({ 
          success: false, 
          error: `Unknown action: ${action}` 
        });
    }
    
    if (response.error) {
      console.error(`Error performing tag action ${action}:`, response.error);
      return res.status(500).json({ 
        success: false, 
        error: `Failed to ${action} tag: ${response.error.message}` 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      action: action,
      data: response.data || { message: `Successfully performed ${action}` } 
    });
    
  } catch (error) {
    console.error('Error in admin tags API:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}