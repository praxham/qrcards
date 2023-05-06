const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    'index.html',
    'add.html',
    'manifest.json',
    'qrcardslogo.png',
    'html5qrcodelib.js',
    'jqueryimgcaching.js',
    'Sortable.js',
    'toastify.js'
]
async function preCache() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}
self.addEventListener('install',event => {
    console.log('installed');
    self.skipWaiting()
    event.waitUntil(preCache())
})
async function cleanupCache() {
    const keys = await caches.keys()
    const keysToDelete = keys.map(key => {
        if(key !== CACHE_NAME) {
            return caches.delete(key)
        }
    })
    return Promise.all(keysToDelete)
}
self.addEventListener('activate',event => {
    console.log('installed');
    event.waitUntil(cleanupCache())
})
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request)
        return response
    } catch (err) {
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.request)
    }
}   
self.addEventListener('fetch',event => {
    console.log('fetched');
    event.respondWith(fetchAssets(event))
})
