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
    const tasks = Promise.all(
        caches
          .keys()
          .then(cacheNames => cacheNames.map(name => {
            if (name !== cacheStorageKey) return caches.delete(name)
          })
        )
      )
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
