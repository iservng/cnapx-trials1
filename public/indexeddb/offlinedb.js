

/**
 * The "Offline" database class is responsible for setting up the databases used for offline store POS calculations. The class class is loaded and executed after a user has onboard ie have registered in the application.
 */
class OfflineDB 
{

    constructor() {}


    /**
     * This function as the public api of this class, when its called on the object-instance, the onupgradeneeded-event handler is what gets executed and also executes the callback.
     * 
     * @param {string} callback 
     */
    withDB(callback) 
    {
        //Request v1 of the database
        let openRequest = window.indexedDB.open('cnapx', 1);

        //Log any error
        openRequest.onerror = console.error;

        //Or call this when done
        openRequest.onsuccess = event => {
            //The result of the request is the database.
            let db = event.target.result;
            //Invoke the callback with the database
            callback(db);
        };

        /**
         * If version 1 of the database does not yet exist, then this event handler will be triggered. This is used to create and initialize object-stores and indexes when the DB is first created or to modify then when we switch from one version of the database schema to the other.
         */
        openRequest.onupgradeneeded = event => {
            let db = event.target.result;
            this.#initdb(db, callback);
        };
    }



















    /**
     * 2. THE initdb(db, callback) FUNCTION
     * -------------------------------------
     * withDB() calls this function if the database has not been initialized yet. We set up the database, then pass the database to the callback function.
     * 
     * Our cnapx database include object-store that holds objects like this
     * {
            zipcode: "01234",
            city: "Alston",
            state: "MA"
        }
    */

    #initdb(db, callback) 
    {
        /**
         * Creates the object-store, specifying a name for the store and an options-object that include the key-path specifying the property name of the key field for this store.
         */
        // let products = db.createObjectStore('products', {keyPath: "createdOn"});
        let products = db.createObjectStore('products', {autoIncrement: true});
        products.createIndex('cost_price', 'cost_price', {unique:false});
        products.createIndex('selling_price', 'selling_price', {unique:false});
        products.createIndex('product_name', 'product_name', {unique:true});
        products.createIndex('product_quantity', 'product_quantity', {unique:false});

        let moneyIn = db.createObjectStore('money-in', {autoIncrement: true});
        moneyIn.createIndex('createdOn', 'createdOn', {unique:true});

        let moneyOut = db.createObjectStore('money-out', {autoIncrement: true});
        moneyOut.createIndex('createdOn', 'createdOn', {unique:true});


        /**
         * CHECKS TODOS
         * 1. Each products enter as sold into the cart must be entered with the selling price as at when the product was sold
         * 
         */
        let cart = db.createObjectStore('cart', {autoIncrement: true});
        cart.createIndex('createdOn', 'createdOn', {unique:false});
        cart.createIndex('transaction_id', 'transaction_id', {unique:false});

        let marchant = db.createObjectStore('marchant', {autoIncrement: true});
        marchant.createIndex('createdOn', 'createdOn', {unique:true});

        let customer = db.createObjectStore('customer', {autoIncrement: true});
        customer.createIndex('createdOn', 'createdOn', {unique:true});
        customer.createIndex('phone', 'phone', {unique:true});


        let cnapxClient = db.createObjectStore('cnapxClient', {autoIncrement: true});
        cnapxClient.createIndex('createdOn', 'createdOn', {unique:true});
        cnapxClient.createIndex('phone', 'phone', {unique:true});

        let dailyTransaction = db.createObjectStore('daily-transactions', {autoIncrement: true});
        dailyTransaction.createIndex('createdOn', 'createdOn', {unique:true});
        dailyTransaction.createIndex('transaction_id', 'transaction_id', {unique:true});
        
        
        //Execute the callback
        callback();
    
    }









    // =========================================
    
    saveToDB(objectStoreName, callback, data) {
        this.withDB(db => {
            // Create a read-only transaction object for this
            let transaction = db.transaction([objectStoreName], 'readwrite');

            //Get the object-store from the transaction
            let objectStore = transaction.objectStore(objectStoreName);
            const request = objectStore.add(data);

            request.onsuccess = (event) => {
                let productId = event.target.result;
                callback(productId);
            };
        
        });
    }
    // =========================================

    getTransactionDetailFromDB(objectStoreName, transactionId, indexName, callback) {
        
        
    }
    // =========================================








}
export { OfflineDB };