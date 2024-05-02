


import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
import { sampleProductData } from "./sample_data.js";
import { OfflineDB } from "../indexeddb_src/offlinedb.js";
import { smallSpinner } from "../utils_src/small_spinner.js";

class ShoppingCartHomePage
{
    #_mErrors;
    #mErrorMsg;
    #basket;
    #sampleProductData;
    #offlinedb;

    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#basket = JSON.parse(localStorage.getItem('cartData')) || [];
        this.#sampleProductData = sampleProductData;
        this.#offlinedb = new OfflineDB();
    }





    /*******************************
     * The public API of this Class
     */
    async createUi()
    {
        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing
        if(this.#_mErrors == 0)
        {
            //Display Content
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    
                    <!-- USER-PROFILE-AVARTAR  -->
                    <div class="col s12">
                        <div class="center-align">
                            <h4><b><small class="purple-text">
                                Marchants Business Name</small></b>
                            </h4>
                            <small>
                                Known for best quality products, and seemless across all platforms with cloud based technology
                            </small>
                        </div>
                        <b class="hide-on-small-only">
                            <a href="#" class="btn-small purple z-depth-0 sidenav-trigger white-text text-darken-4" data-target="mobile-demo">
                                Menu
                            </a>
                        </b>
                    </div>

                    
                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                    <p class="right-align"><b>Search products</b></p>
                    <nav class="purple lighten-5">
                        <div class="nav-wrapper">
                            <form>
                                <div class="input-field">
                                    
                                    <input id="search" type="search" required>
                                        <label class="label-icon" for="search">
                                            <i class="material-icons">
                                                search
                                            </i>
                                            
                                        </label>
                                        <i class="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>


                    <p><b>Popular products</b></p>
                        <!-- products structure layout  -->
                        <div class="row shop"></div>
                        <!-- products structure layout  -->
                    </div>

                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">Powered by </small>
                        <b class="purple-text text-darken-3">
                            iservng
                        </b>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);

            /**
             * TO DISPLAY THE SAMPLE PRODUCTS IN THE FRONT-PAGE
             * -------------------------------------------------
             */
            if(document.querySelector('.shop'))
            {
                let shop = document.querySelector('.shop');
                this.#displaySampleProducts(shop);
                this.#cartTotal();
                this.#registerHandlerForSearch();
            }




            //1.
            /************************************
             *  Logout Button Event Implementation
             */
            if(document.querySelectorAll('.logout'))
            {
                let logoutButtons = document.querySelectorAll('.logout');
                logoutButtons.forEach(logoutBtn => {
                    logoutBtn.addEventListener('click', e => {
                        e.preventDefault();
                        //Dynamically import and Execute the logout class
                        // ---- 
                        import('../utils_src/logout_class.js')
                        .then(m => {
                            let logout = new m.Logout();
                            logout.logUserOut();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unexpected network issue, try again!');
                        });
                    });
                });
            }
            // =======================
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }







    /**
     * UTILITY FUNCTIONS FOR UI MANIPULATION
     * =======================================
     */
    #displaySampleProducts(shop)
    {   
        // Start 
        let objectStoreName = "products";
        this.#offlinedb.withDB(db => {
            // Create a read-only transaction object for this
            let transaction = db.transaction([objectStoreName]);

            //Get the object-store from the transaction
            let objectStore = transaction.objectStore(objectStoreName);
            let boundKeyRange = IDBKeyRange.bound(1, 4);
            let productOutput = ``;
            smallSpinner('Loading...', '.shop');
            objectStore.openCursor(boundKeyRange).onsuccess = event => {
                const cursor = event.target.result;
                
                if(cursor)
                {
                    let search = this.#basket.find(x => x.id === cursor.value.createdOn) || [];

                    let prodQty = (Number(cursor.value.product_quantity) > 0)?'':"disabled";

                        productOutput += `
                        <div class="col s12 m3 l3" id=product-id-${cursor.value.createdOn}>
                            <div class="card z-depth-0">

                                <div class="card-image">
                                    <img src=${cursor.value.product_image}>
                                    <span class="card-title"></span>
                                </div>

                                <div class="card-content grey lighten-5">
                                    <p>
                                        <small id="productQt-${cursor.value.createdOn}">
                                            ${cursor.value.product_quantity}
                                        </small>
                                        <span>|</span>
                                        <small>${cursor.value.product_name}</small>
                                    </p>
                                    <div>
                                        <small class="grey-text">
                                            <span style="text-decoration: line-through;">N</span> ${cursor.value.selling_price}.00
                                        </small>
                                    </div>
                                </div>

                                <div class="card-action grey lighten-5" style="border-bottom: 1px solid grey;">

                                    <div class="row">
                                        <div class="col s12 center-align">

                                            <a href="#" ${prodQty} class="btn-small purple decrement z-depth-0" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-decrementidkey=${cursor.key} data-decrementid=${cursor.value.createdOn}>
                                                &minus;
                                            </a>

                                            <a href="#" class="btn-small white grey-text z-depth-0" id=${cursor.value.createdOn}>
                                                ${search.item === undefined? 0 : search.item}
                                            </a>

                                            <a href="#" ${prodQty} class="btn-small purple increment z-depth-0" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-incrementidkey=${cursor.key} data-incrementid=${cursor.value.createdOn}>
                                                +
                                            </a>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    
                    
                    cursor.continue();
                    // cursor.advance(2);
                }
                shop.innerHTML = productOutput;
                // ======================
                // Increment
                this.#registerIncrementHandler();
                // ====================
                //Register Event-Handlers for decrement and Increment
                this.#registerDecrementHandler();
            };
        });
    }







    #searchForProduct(productName)
    {
        this.#offlinedb.withDB(db => {
            let transaction = db.transaction('products');
            let objectStore = transaction.objectStore('products');
            let productOutput = ``;
            smallSpinner('Searching...', '.shop');
            let isLoopedWithValue = 0;
            objectStore.openCursor().onsuccess = event => {
                const cursor = event.target.result;
                
                if(cursor)
                {  
                    if(cursor.value.product_name === productName)
                    {
                        let prodQty = (Number(cursor.value.product_quantity) > 0)?'':"disabled";

                        isLoopedWithValue++;
                        let search = this.#basket.find(x => x.id === cursor.value.createdOn) || [];
                        
                        productOutput += `
                        <div class="col s12 m3 l3" id=product-id-${cursor.value.createdOn}>
                            <div class="card z-depth-0">
                                <div class="card-image">
                                    <img src=${cursor.value.product_image}>
                                    <span class="card-title"></span>
                                </div>

                                <div class="card-content grey lighten-5">
                                    <p>
                                        <b id="productQt-${cursor.value.createdOn}">
                                            ${cursor.value.product_quantity}
                                        </b>
                                        <span>&nbsp;</span>
                                        <span>|</span>
                                        <span>&nbsp;</span>
                                        <b>${cursor.value.product_name}</b>
                                    </p>
                                    <div>
                                        <b class="grey-text"><span style="text-decoration: line-through;">N</span> ${cursor.value.selling_price}.00</b>
                                    </div>
                                </div>

                                <div class="card-action grey lighten-5" style="border-bottom: 1px solid grey;">
                                    <div class="row">
                                        <div class="col s12 center-align">

                                            <a href="#" ${prodQty} class="btn-small purple decrement z-depth-0" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-decrementidkey=${cursor.key} data-decrementid=${cursor.value.createdOn}>
                                                &minus;
                                            </a>

                                            <a href="#" class="btn-small white grey-text z-depth-0" id=${cursor.value.createdOn}>
                                                ${search.item === undefined? 0 : search.item}
                                            </a>

                                            <a href="#" ${prodQty} class="btn-small purple increment z-depth-0" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-incrementidkey=${cursor.key} data-incrementid=${cursor.value.createdOn}>
                                                +
                                            </a>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        
                        document.querySelector('.shop').innerHTML = productOutput;
                        // Increment
                        this.#registerIncrementHandler();
                        // ====================
                        //Register Event-Handlers for decrement and Increment
                        this.#registerDecrementHandler();
                    }
                    else 
                    {
                        smallSpinner('Searching...', '.shop');
                    }


                    if(isLoopedWithValue == 0)
                    {
                        cursor.continue();
                    }

                }
                else if(!cursor)
                {
                    
                    if(isLoopedWithValue === 0)
                    {
                        toastIt('blue', productName+' not found!');
                        let shop = document.querySelector('.shop');
                        this.#displaySampleProducts(shop);
                    }

                }
            };
        });

    }







    







    #registerIncrementHandler()
    {
        if(document.querySelectorAll('.increment'))
        {
            let incrementBtns = document.querySelectorAll('.increment');
            incrementBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    this.#incrementQuantity(e);
                });
            });
        }
    }



    // Decrement.
    #registerDecrementHandler()
    {
        if(document.querySelectorAll('.decrement'))
        {
            let decrementBtns = document.querySelectorAll('.decrement');
            decrementBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    this.#decrimentQuantity(e);
                });
            });
        }
    }




    #registerHandlerForSearch()
    {
        if(document.querySelector('#search'))
        {
            document.querySelector('#search').addEventListener('blur', e => {
                e.preventDefault();
                if(/^[a-zA-Z0-9\s,-]{2,}$/.test(e.target.value))
                    this.#searchForProduct(e.target.value.trim().toUpperCase());
                else 
                    toastIt('red', 'Invalid search character '+e.target.value);
            });
        }
    }



    #incrementQuantity(e)
    {
        e.preventDefault();
        let id = Number(e.target.dataset.incrementid);
        console.log(id);

        let realkey = Number(e.target.dataset.incrementidkey);
        console.log(realkey);

        let selling_price = Number(e.target.dataset.sellingprice);
        let cost_price = Number(e.target.dataset.costprice);

        let search = this.#basket.find((x) => x.id === id);
        if(search === undefined)
            this.#basket.push({
                    id: id, 
                    item: 1, 
                    key: realkey, 
                    selling_price: selling_price,
                    cost_price: cost_price
                });
        else
            search.item += 1;
        
        this.#updateQuantity(id);
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        this.#decrementQuantityInDB(realkey);
    }

    #decrimentQuantity(e)
    {
        e.preventDefault();
        let id = Number(e.target.dataset.decrementid);
        console.log(id);

        let realkey = Number(e.target.dataset.decrementidkey);
        console.log(realkey);

        let search = this.#basket.find((x) => x.id === id);
        if(search === undefined || search.item === 0)
            return;
        else 
        {
            search.item -= 1;
            console.log(search);
            this.#incrementQuantityInDB(search.key);
        }
            

        this.#updateQuantity(id);
        this.#basket = this.#basket.filter(product => product.item !== 0);
        localStorage.setItem('cartData', JSON.stringify(this.#basket));  
    }

    #updateQuantity(id)
    {
        let search = this.#basket.find(x => x.id === id);
        document.getElementById(id).innerHTML = search.item;
        this.#cartTotal();
    }


    #cartTotal()
    {  
        if(document.querySelectorAll('.cartAmount'))
        {
            let cartAmountTags = document.querySelectorAll('.cartAmount');
            cartAmountTags.forEach(elem => {
                elem.innerHTML = this.#basket.map((product) => product.item).reduce((x,y) => x+y,0);
            });
        }
    }



    #decrementQuantityInDB(productId)
    {
        /**
         * 1. Retrieve the product from DB
         * 2. check the value of its "product_quantity" property
         * 3. if "product_quantity" is Zero, then remove its card from the UI
         * 4. else decrement "product_quantity" by 1, and update the DB with the new value.
         * 5. Update the "product_quantity" element of the UI with the new value of step-4 also.
         */

        this.#offlinedb.withDB(db => {
            const objectStore = db.transaction('products', 'readwrite')
            .objectStore('products');
            const request = objectStore.get(productId);
            request.onerror = event => {
                toastIt('red', 'Unable to process quantity update');
            };
            request.onsuccess = event => {
                let product = event.target.result;

                if (product.product_quantity < 1)
                {
                    //This means that product_quantity is zero or even below
                    //Get the id of the card-col-div
                    let divId = `product-id-${product.createdOn}`;
                    document.querySelector(`#${divId}`).style.display = 'none';
                }
                else 
                {
                    //Decrement the product quantity
                    let qt = product.product_quantity -= 1;
                    //Update the database
                    const requestUpdate = objectStore.put(product, productId);
                    requestUpdate.onerror = event => {
                        toastIt('red', 'Unable to update the quantity');
                    };
                    requestUpdate.onsuccess = event => {
                        //Update the ui
                        document.querySelector(`#productQt-${product.createdOn}`).innerHTML = qt; 
                    };
                }
            };
        });
    }


    #incrementQuantityInDB(productId)
    {
        this.#offlinedb.withDB(db => {
            let objectStore = db.transaction('products', 'readwrite').objectStore('products');
            let request = objectStore.get(productId);

            request.onerror = event => {
                toastIt('red', 'Unable to process increment');
            };

            request.onsuccess = event => {
                let product = event.target.result;
                //Decrement the product quantity
                let qt = product.product_quantity += 1;
                //Update the database
                const requestUpdate = objectStore.put(product, productId);
                requestUpdate.onerror = event => {
                    toastIt('red', 'Unable to update the quantity');
                };
                requestUpdate.onsuccess = event => {
                    //Update the ui
                    document.querySelector(`#productQt-${product.createdOn}`).innerHTML = qt; 
                };
                // ------------
            };
            // --------------------

        });

    }


}
export { ShoppingCartHomePage };