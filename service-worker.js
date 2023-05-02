let cacheVersion = 1
let cacheName = "web-workr-cache-"+cacheVersion
const pageToSave = "index.html"
const pageToSave2 = "add.html"
const imgToSave = "Aadhar-Color.svg"
const imgToSave2 = "add-symbol-svgrepo-com.svg"
const imgToSave3 = "copy.svg"
const imgToSave4 = "deleteicon.svg"
const imgToSave5 = "Electionlogo.svg"
const imgToSave6 = "Income-Tax-Department-Color.svg"
const imgToSave7 = "link.svg"
const imgToSave8 = "qrcardslogo.png"
const imgToSave9 = "UPI-Color.svg"

// Installing service worker
this.addEventListener('install', event => {
    console.log("Installing service worker");
  
    event.waitUntil(caches.open(cacheName)
    .then((openCache) => {
        return openCache.add(pageToSave)
        return openCache.add(pageToSave2)
    })
    .catch(err => console.log(err)))
})
self.addEventListener('activate', e => {
    console.log('Activation!');
    });
    this.addEventListener('fetch', event => {
        console.log("Fetching with service worker");
        if(event.request.mode === 'navigate'){
            event.respondWith(
                fetch(event.request.url)
                .catch(_ => {
                    return caches.match(pageToSave)
                })
            )
        }
    })