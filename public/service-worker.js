
/**
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',

    'https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet',
    
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
 */

const siteDynamic = "cnapx-dynamic-v1";
const staticCacheName = 'cnapx-static-v1';
const asssets = [
    './',
    './bookkeeper.html',
    './js/materialize.min.js',
    './js/createIndexeddb.js',
    './js/bookkeeping.js',
    './register_sw.js',
    './manifest.json',

    './css/materialize.min.css',
    './shop/add_money_in_ui.js',
    './shop/add_money_out_ui.js',
    './shop/add_product_ui.js',
    './shop/checks_and_balances.js',
    './shop/edit_product_ui.js',
    './shop/list_customers.js',
    './shop/process_add_product_form.js',
    './shop/process_make_payment_form.js',
    './shop/process_money_in_form.js',
    './shop/process_money_out_form.js',
    './shop/records_details_ui.js',
    './shop/records_ui.js',
    './shop/transaction_completed_ui.js',
    './shop/transaction_reciept_ui.js',
    './shop/transactions_ui.js',
    './shoppingCart/cart_ui.js',
    './shoppingCart/sample_data.js',
    './shoppingCart/sample_from_db.js',
    './shoppingCart/shopping_cart_home_page.js',
    './indexeddb/offlinedb.js',
    './utils/date_4rm_milisec_to_humanReadable.js',
    './utils/insert_into_DOM.js',
    './utils/lower_remv_spaces.js',
    './utils/month_names.js',
    './utils/random_pass.js',
    './utils/remove_landing_page_sections.js',
    './utils/remove_side_nav.js',
    './utils/small_spinner.js',
    './utils/toast_it.js',
    './images/lp01.jpg',
    './images/lp02.jpg',
    './images/lp03.jpg',
    './images/cart-images/cart2.png',
    './config/app_constants.js',
];

// cache size limit  
const limitCacheSize = (name, size) => {
    caches.open(name)
    .then(cache => {
        cache.keys()
        .then(keys => {
            if(keys.length > size) 
            {
                cache.delete(keys[0])
                .then(limitCacheSize(name, size))
            }
        })
    })
};



// 1. Install event of the service worker  
self.addEventListener('install', e => {
    // console.log("Service worker has been installed ", e);
    e.waitUntil(caches.open(staticCacheName)
    .then(cache => {
        cache.addAll(asssets);
    })
    .catch(error => {
        let errcode = error.code;
        let errmsg = error.message;
        console.log(errmsg);
        console.log(errcode);
    }));

});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
        .then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== siteDynamic)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', e => {
    // console.log("Fetch event ", e);

    //1. Respond with cached data
    e.respondWith(
        //2. By checking in our caches if the responds for the specified request
        caches.match(e.request)
        .then(cacheResponse => {
            return cacheResponse || fetch(e.request).then(fetchRespond => {
                return caches.open(siteDynamic).then(cache => {
                    cache.put(e.request.url, fetchRespond.clone());
                    limitCacheSize(siteDynamic, 20)
                    return fetchRespond;
                })
            })
        })
        .catch(() => {
            if(e.request.url.indexOf('.html') > -1)
                return caches.match('./fallback.html');
        })
    )
});