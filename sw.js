self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('stock-pro-cache').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/manifest.json'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
