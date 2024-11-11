// public/service-worker.js

const CACHE_NAME = "v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/index.css", // CSS file (check final build output path)
  "/src/main.tsx", // JavaScript entry point (check final output path)
  // '/admin',                      // Admin page
  // '/login',                        // Login page
  // '/register',                     // Register page
  // '/placeorder',                   // Place order page
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Handle API requests separately (network-first for APIs)
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Optionally cache the network response for future offline use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If offline, return cached response if it exists
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || Promise.reject('No cache for API response');
          });
        })
    );
  } else if (request.mode === "navigate") {
    // Handle navigation requests (HTML)
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() =>
          caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html");
          })
        )
    );
  } else if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image"
  ) {
    // Handle static assets with cache-first strategy
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((networkResponse) => {
            // Cache the network response for future offline use
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  } else {
    // Fallback for other requests (e.g., font files)
    event.respondWith(fetch(request).catch(() => caches.match(request)));
  }
});


// Activate event
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log(`Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Activate the new service worker immediately
  );
});
