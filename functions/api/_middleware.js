/**
 * API Middleware for Cloudflare Functions
 * Handles CORS and adds security headers
 */
export async function onRequest(context) {
  const request = context.request;
  const method = request.method;
  const origin = request.headers.get('Origin') || '*';
  
  // Allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'https://buildersroom.boulder.codes',
    'https://boulder.codes'
  ];
  
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  // Handle preflight requests
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  
  // Process the request
  const response = await context.next();
  const newResponse = new Response(response.body, response);
  
  // Add CORS and security headers
  newResponse.headers.set('Access-Control-Allow-Origin', corsOrigin);
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'DENY');
  
  return newResponse;
}