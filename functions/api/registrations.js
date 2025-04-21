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
    
    // Check if D1 database is available
    let registrations = { results: [] };
    let totalCount = 0;
    
    if (context.env.DB) {
      try {
        // Get registrations from database
        registrations = await context.env.DB.prepare(
          `SELECT * FROM registrations ORDER BY created_at DESC LIMIT ? OFFSET ?`
        )
        .bind(limit, offset)
        .all();
        
        // Get total count
        const countResult = await context.env.DB.prepare(
          `SELECT COUNT(*) as total FROM registrations`
        )
        .first();
        
        totalCount = countResult.total;
      } catch (dbError) {
        console.error('D1 database error:', dbError);
        // Continue with empty results
      }
    } else {
      // Mock data when DB is not available
      registrations.results = [
        {
          id: 1,
          name: "Sample User",
          email: "sample@example.com",
          role: "developer",
          experience: "few",
          team_preference: "form",
          created_at: new Date().toISOString()
        }
      ];
      totalCount = 1;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: registrations.results,
        meta: {
          total: totalCount,
          limit,
          offset
        },
        dbStatus: context.env.DB ? 'connected' : 'fallback'
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