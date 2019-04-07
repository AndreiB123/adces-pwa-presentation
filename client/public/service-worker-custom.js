this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('cache-v1').then(function (cache) {
            return cache.addAll(
                [
                    '/index.html',
                    '/static/js/2.3a242ecf.chunk.js',
                    '/static/js/main.517f0c37.chunk.js'
                ]
            );
        })
    );
});

this.addEventListener('fetch', function (event) {
    var ordersUrl = 'https://us-central1-ixia-le-lunch.cloudfunctions.net/app/orders';

    if (event.request.url.indexOf(ordersUrl) > -1) {
        event.respondWith(
            caches.open('cache-data-v1').then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                }).catch(error => {
                    console.log(error);
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});