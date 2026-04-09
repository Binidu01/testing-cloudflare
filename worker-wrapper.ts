// worker-wrapper.ts
import app from './worker';

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // 1. Handle API routes FIRST
    if (url.pathname.startsWith('/api') || url.pathname === '/hello') {
      return app.fetch(request, env, ctx);
    }

    // 2. For all other routes, try serving static assets from your dist folder
    const assetResponse = await env.ASSETS.fetch(request);

    // 3. If asset is found (status 200), return it
    if (assetResponse.status === 200) {
      return assetResponse;
    }

    // 4. Fallback to index.html for SPA routing
    const indexPath = new URL('/index.html', request.url);
    return env.ASSETS.fetch(indexPath);
  },
};