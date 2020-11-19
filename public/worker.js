var CACHE_NAME = 'Painel-Covid19-PWA'
var urlsToCache = [
    '/'
]

//Install a service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened Cache');
                return cache.addAll(urlsToCache)
            })
    )
})

//Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if(res) return res
                return fetch(event.request)
            })
    )
})

//Update a service worker
self.addEventListener('activate', event => {
    var cacheWhiteList = ['pwa-task-manager']
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1) return caches.delete(cacheName)
                })
            )
        })
    )
})