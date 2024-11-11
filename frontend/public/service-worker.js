const CACHE_NAME = "v3"; // Update cache version as needed
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html", // A simple offline page
  "/src/index.css", // CSS file (check final build output path)
  "/src/main.tsx", // JavaScript entry point (check final output path)
  '/admin',                      // Admin page
  '/login',                        // Login page
  '/register',                     // Register page
  '/placeorder',                   // Place order page
  '/products/:id',
  '/myadmin', 
  '/products', 

];

// Pre-fetch and cache critical API data during install
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

  // Handle API requests separately (network-first for APIs)
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Cache the network response for future offline use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If offline, return cached response if it exists
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html");
          });
        })
    );
  } else if (request.url.match(/\/products\/\d+/)) {
    // This matches URLs like /products/1, /products/2, etc.
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
