import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things:
 * 1. We will skip caching on the edge, which makes it easier to debug
 * 2. We will return an error message on exception in your Response
 */
const DEBUG = false

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  let options = {}

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }

    const url = new URL(event.request.url)
    const page = url.pathname.split('/')[1]
    
    if (page === '' || ['about', 'register', 'schedule', 'sponsors'].includes(page)) {
      return await getAssetFromKV(event, options)
    }
    
    // Try to get the static asset
    let response = await getAssetFromKV(event, options)

    // If the asset wasn't found, SPA routing
    if (response.status === 404) {
      // If this is a page, try to serve the index.html
      response = await getAssetFromKV(event, {
        ...options,
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      })
    }

    // Set cache control headers
    if (response.status < 400) {
      const filename = url.pathname.split('/').pop()
      
      if (filename && (filename.includes('.js') || filename.includes('.css') || filename.includes('.png') || filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.svg') || filename.includes('.ico'))) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      } else {
        response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
      }
    }

    return response

  } catch (e) {
    if (DEBUG) {
      return new Response(e.message || e.toString(), {
        status: 500,
      })
    }
    
    // Serve the 404 page
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
      })

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404,
      })
    } catch (e) {
      return new Response('Page not found', {
        status: 404,
      })
    }
  }
}