// No-op service worker that unregisters itself. Prevents 404s and removes old SWs.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      await self.registration.unregister();
    } catch {}
    // Optionally ensure controlled pages reload to drop old caches
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) {
      try { client.navigate(client.url); } catch {}
    }
  })());
});

// Ignore fetch to avoid any caching behavior
self.addEventListener('fetch', () => {});


