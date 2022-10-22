const CACHE_STATIC_NAME = 'static-cache-v6';
const INMUTABLE_CACHE_NAME = 'innmutable-cache-v1'
const DINAMIC_CACHE_NAME = 'dinamic-cache-v1'

const cleanCache=(cacheName,maxSize)=>{
    caches.open(cacheName)
    .then((cache)=>{
        cache.keys().then((items)=>{
            
            if(items.length>=maxSize){
                cache.delete(items[0]).then(()=>{
                    cleanCache(cacheName,maxSize)
                })
            }
        })
    })
}
self.addEventListener('install', (event) => {

    
    const respCache = caches.open(CACHE_STATIC_NAME).then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './manifest.json',
            './js/app.js',
            './pages/offline.html',
            "./images/generic.jpg"



        ])
    });
    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',            
        ])
    })

    event.waitUntil(Promise.all([respCache, respCacheInmutable]));

})
self.addEventListener('activate',(event)=>{
    const promDelete = caches.keys().then(items => {
        items.forEach(element => {
            if(element!==CACHE_STATIC_NAME&& element.includes('static')){
                return caches.delete(element);
            }
        });
    })
    event.waitUntil(promDelete)
})
//Cache with network fallback then cache
self.addEventListener('fetch',(event)=>{
    const respCache=caches.match(event.request).then((respCache)=>{
        if(respCache){
            return respCache
        }
        //No esta en cache, entonces web
        return fetch(event.request).then((respWeb)=>{
            caches.open(DINAMIC_CACHE_NAME).then((cache)=>{
                cache.put(event.request,respWeb);
                cleanCache(DINAMIC_CACHE_NAME,5)
            })
            return respWeb.clone();
        }).catch(err=>{
            if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('./pages/offline.html');
            }
            if (event.request.headers.get('accept').includes('image/')) {
                return caches.match('./images/generic.jpg');
            }
            
        })
    });    
    event.respondWith(respCache);
})