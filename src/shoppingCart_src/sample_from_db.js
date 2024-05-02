
import { OfflineDB } from "../indexeddb_src/offlinedb";

async function getDataFromDB(objectStoreName)
{

    const offlinedb = new OfflineDB();
    let dataArr = [];

    offlinedb.withDB(db => {
        // Create a read-only transaction object for this
        let transaction = db.transaction([objectStoreName]);

        //Get the object-store from the transaction
        let objectStore = transaction.objectStore(objectStoreName);
        objectStore.openCursor().onsuccess = event => {
            const cursor = event.target.result;
            
            if(cursor)
            {
                // console.log(cursor.value.createdOn.getFullYear());
                // callback(cursor.key);
                dataArr.push({id:cursor.key, value:cursor.value});
                cursor.continue();
            }
            else 
            {
                console.log("No more entries");
                
            }

        };
    });
    return dataArr;
}


// async function getDataFromDB()
export { getDataFromDB };