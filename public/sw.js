// Service Worker for AI Flow Application
// Provides caching strategies for better performance

const CACHE_NAME = 'ai-flow-v1.0.0';
const STATIC_CACHE_NAME = 'ai-flow-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'ai-flow-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add critical CSS and JS files here
];

// Assets to cache on first request
const DYNAMIC_ASSETS_PATTERNS = [
  /^\/assets\//,
  /^\/api\//,
  /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2)$/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip Vite development resources (HMR, client, etc.)
  if (isViteDevelopmentResource(request)) {
    console.log('[SW] Skipping Vite development resource:', request.url);
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isDynamicAsset(request)) {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE_NAME));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache strategies
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('[SW] Fetching and caching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    console.log('[SW] Network first for:', request.url);
    const networkResponse = await fetch(request);

    // Only cache complete responses (not partial content)
    if (networkResponse.ok && networkResponse.status !== 206) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    // Only cache complete responses (not partial content)
    if (networkResponse.ok && networkResponse.status !== 206) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return STATIC_ASSETS.includes(url.pathname) ||
         url.pathname.match(/\.(css|js|png|jpg|jpeg|svg|gif|webp|woff|woff2|ico)$/);
}

function isDynamicAsset(request) {
  const url = new URL(request.url);
  return DYNAMIC_ASSETS_PATTERNS.some(pattern => pattern.test(url.pathname));
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') ||
         url.hostname.includes('supabase') ||
         url.hostname.includes('openai');
}

function isViteDevelopmentResource(request) {
  const url = new URL(request.url);
  return url.pathname.includes('@vite/') ||
         url.pathname.includes('@react-refresh') ||
         url.pathname.includes('/@fs/') ||
         url.pathname.includes('/node_modules/') ||
         url.search.includes('import') ||
         url.search.includes('t=') ||
         url.pathname.endsWith('.ts') ||
         url.pathname.endsWith('.tsx') ||
         url.pathname.endsWith('.jsx');
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
      cache.addAll(urls);
    });
  }
});

console.log('[SW] Service worker script loaded');
