/**
 * API endpoint for retrieving registration data
 * Requires authentication via API key
 */

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
    
    // In production, you would check against a secure key in environment variables
    // For now, we'll use a placeholder check
    if (apiKey !== context.env.ADMIN_API_KEY) {
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
    
    // Get registrations from database
    const registrations = await context.env.DB.prepare(
      `SELECT * FROM registrations ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .bind(limit, offset)
    .all();
    
    // Get total count
    const countResult = await context.env.DB.prepare(
      `SELECT COUNT(*) as total FROM registrations`
    )
    .first();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: registrations.results,
        meta: {
          total: countResult.total,
          limit,
          offset
        }
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