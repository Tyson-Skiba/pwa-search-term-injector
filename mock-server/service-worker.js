var cacheStorageKey = 'minimal-pwa-8'

var cacheList = [
  '/',
  "index.html",
]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches
        .open(cacheStorageKey)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', evt => {
    const cacheTasks = caches
        .keys()
        .then(cacheNames => cacheNames && cacheNames.length
            ? cacheNames.map(name => name !== cacheStorageKey ? caches.delete(name) : null)
            : []
        )

    const tasks = Promise
      .all(cacheTasks)
      .then(() => self.clients.claim())
    
    evt.waitUntil(tasks)
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches
        .match(evt.request)
        .then(response => response ? response : fetch(evt.request.url))
  )
})
