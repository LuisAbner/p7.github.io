
if (navigator.serviceWorker) {
    //¿identificar si estoy en local o github?
    let URLactual = window.location;
    //alert(URLactual)
    //if (URLactual.includes('localhost')) {
        navigator.serviceWorker.register('./sw.js');    
    //}
    
}
/*if(window.caches){
    console.log("Sopoerta caches")
    caches.open('cache1');
    caches.open('cache2');

    caches.delete("cache2");

    caches.keys().then((keys)=>{
        console.log(keys)
    })
    caches.has('cache1').then((resp)=>{
        console.log('has',resp)
    })
    caches.open('cache1').then((cache)=>{
        //cache.add('/index.html')
        cache.addAll(
            [
                '/index.html',
                '/css/style.css',
                '/js/app.js',
                '/images/img1.jpg'
            ]
        ).then(()=>{
            cache.delete('/css/style.css')
        });
        cache.match('/index.html').then((resp)=>{
            resp.text().then((text)=>{
                console.log(text)
            })
        })
        
    })
}*/
