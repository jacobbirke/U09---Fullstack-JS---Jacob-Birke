const CACHE_NAME = "4"; 
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html", 
  "/src/index.css",
  "/src/main.tsx",
  '/admin',
  '/login',
  '/register',
  '/placeorder',
  '/products',
];

const apiUrlsToCache = [
  "/api/products",
  "/api/users",
  "/api/orders",
  "/api/config/paypal",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and pre-caching files");
      // Cache static files
      return cache.addAll(urlsToCache).then(() => {
        // Pre-fetch and cache critical API responses
        return Promise.all(
          apiUrlsToCache.map((url) => {
            return fetch(url)
              .then((response) => {
                if (response.ok) {
                  // Clone the response to cache it and use it in the future
                  return cache.put(url, response.clone());
                }
              })
              .catch((err) => {
                console.error(`Failed to pre-cache ${url}:`, err);
              });
          })
        );
      });
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Handle API requests
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If offline, return cached response or fallback to offline page
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html");
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
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Activate the new service worker immediately
  );
});
