export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method not allowed' 
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Query the community_members view
    const response = await env.SUPABASE.from('community_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (response.error) {
      console.error('Error fetching community members:', response.error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch community members'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return the community members
    return new Response(JSON.stringify({
      success: true,
      data: response.data || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}