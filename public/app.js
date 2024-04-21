if('serviceWorker' in navigator)
{
    
    navigator.serviceWorker.register('./service-worker.js')
    .then((reg) => console.log("Service Worker Registered", reg))
    .catch((error) => console.log("Service Worker not Registered", error));
}