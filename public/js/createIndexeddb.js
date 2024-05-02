

//Using the sniffing method check if the user-agent support offline functionality then Dynamically call the offline setup class and execute it

if(window.indexedDB)//01
{
    import("../indexeddb/offlinedb.js")
    .then(m => {
        let offlinedb = new m.OfflineDB();
        offlinedb.withDB(() => console.log("Offline DB set completed"));
    })
    .catch(error => {
        console.log(error.message);
        toastIt('red', 'This browser is evidently old!');
    });
}
else 
{
    toastIt('red', 'Your browser need to be updated!');
}