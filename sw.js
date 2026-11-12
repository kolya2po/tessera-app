const KEPT = 'tessera-1';
self.addEventListener('install', (event) => event.waitUntil(caches.open(KEPT).then((cache) => cache.addAll(['./', 'manifest.webmanifest', 'icon-192.png'])).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(fetch(event.request).then((fresh) => { const copy = fresh.clone(); caches.open(KEPT).then((cache) => cache.put(event.request, copy)); return fresh; }, () => caches.match(event.request, { ignoreSearch: true })));
});
