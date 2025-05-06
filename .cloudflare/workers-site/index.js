/**
 * Cloudflare Worker for redirecting API requests to Functions
 */
const apiPathPattern = /^\/api\/.*/;

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Check if the request is for an API route
  if (apiPathPattern.test(url.pathname)) {
    // Redirect API requests to Cloudflare Functions
    return new Response(null, {
      status: 302,
      headers: {
        'Location': url.toString(),
        'Cache-Control': 'no-cache'
      }
    });
  }
  
  // For all other requests, pass through to the static site
  return fetch(request);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});