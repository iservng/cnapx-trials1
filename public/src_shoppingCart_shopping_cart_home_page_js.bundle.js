"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_shoppingCart_shopping_cart_home_page_js"],{

/***/ "./src/shoppingCart/shopping_cart_home_page.js":
/*!*****************************************************!*\
  !*** ./src/shoppingCart/shopping_cart_home_page.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ShoppingCartHomePage: () => (/* binding */ ShoppingCartHomePage)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _sample_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sample_data.js */ \"./src/shoppingCart/sample_data.js\");\n/* harmony import */ var _indexeddb_offlinedb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../indexeddb/offlinedb.js */ \"./src/indexeddb/offlinedb.js\");\n/* harmony import */ var _utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/small_spinner.js */ \"./src/utils/small_spinner.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass ShoppingCartHomePage\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #basket;\r\n    #sampleProductData;\r\n    #offlinedb;\r\n\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#basket = JSON.parse(localStorage.getItem('cartData')) || [];\r\n        this.#sampleProductData = _sample_data_js__WEBPACK_IMPORTED_MODULE_2__.sampleProductData;\r\n        this.#offlinedb = new _indexeddb_offlinedb_js__WEBPACK_IMPORTED_MODULE_3__.OfflineDB();\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n    /*******************************\r\n     * The public API of this Class\r\n     */\r\n    async createUi()\r\n    {\r\n        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Display Content\r\n            let content = `\r\n            <div class=\"container\">\r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                    \r\n                    <!-- USER-PROFILE-AVARTAR  -->\r\n                    <div class=\"col s12\">\r\n                        <div class=\"center-align\">\r\n                            <h4><b><small class=\"purple-text\">\r\n                                Marchants Business Name</small></b>\r\n                            </h4>\r\n                            <small>\r\n                                Known for best quality products, and seemless across all platforms with cloud based technology\r\n                            </small>\r\n                        </div>\r\n                        <b class=\"hide-on-small-only\">\r\n                            <a href=\"#\" class=\"btn-small purple z-depth-0 sidenav-trigger white-text text-darken-4\" data-target=\"mobile-demo\">\r\n                                Menu\r\n                            </a>\r\n                        </b>\r\n                    </div>\r\n\r\n                    \r\n                    <!-- FIRST SECTION OF DASHBOARD  -->\r\n                    <div class=\"col s12\" style=\"margin-bottom: 2rem; margin-top: 3rem;\">\r\n                    <p class=\"right-align\"><b>Search products</b></p>\r\n                    <nav class=\"purple lighten-5\">\r\n                        <div class=\"nav-wrapper\">\r\n                            <form>\r\n                                <div class=\"input-field\">\r\n                                    \r\n                                    <input id=\"search\" type=\"search\" required>\r\n                                        <label class=\"label-icon\" for=\"search\">\r\n                                            <i class=\"material-icons\">\r\n                                                search\r\n                                            </i>\r\n                                            \r\n                                        </label>\r\n                                        <i class=\"material-icons\">close</i>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </nav>\r\n\r\n\r\n                    <p><b>Popular products</b></p>\r\n                        <!-- products structure layout  -->\r\n                        <div class=\"row shop\"></div>\r\n                        <!-- products structure layout  -->\r\n                    </div>\r\n\r\n                    <div class=\"col s12 right-align\" style=\"margin-top: 6rem;\">\r\n                        <p>\r\n                            <div class=\"divider\"></div>\r\n                        </p>\r\n                        <small class=\"grey-text\">Powered by </small>\r\n                        <b class=\"purple-text text-darken-3\">\r\n                            iservng\r\n                        </b>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n            /**\r\n             * TO DISPLAY THE SAMPLE PRODUCTS IN THE FRONT-PAGE\r\n             * -------------------------------------------------\r\n             */\r\n            if(document.querySelector('.shop'))\r\n            {\r\n                let shop = document.querySelector('.shop');\r\n                this.#displaySampleProducts(shop);\r\n                this.#cartTotal();\r\n                this.#registerHandlerForSearch();\r\n            }\r\n\r\n\r\n\r\n\r\n            //1.\r\n            /************************************\r\n             *  Logout Button Event Implementation\r\n             */\r\n            if(document.querySelectorAll('.logout'))\r\n            {\r\n                let logoutButtons = document.querySelectorAll('.logout');\r\n                logoutButtons.forEach(logoutBtn => {\r\n                    logoutBtn.addEventListener('click', e => {\r\n                        e.preventDefault();\r\n                        //Dynamically import and Execute the logout class\r\n                        // ---- \r\n                        __webpack_require__.e(/*! import() */ \"src_utils_logout_class_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../utils/logout_class.js */ \"./src/utils/logout_class.js\"))\r\n                        .then(m => {\r\n                            let logout = new m.Logout();\r\n                            logout.logUserOut();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unexpected network issue, try again!');\r\n                        });\r\n                    });\r\n                });\r\n            }\r\n            // =======================\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    /**\r\n     * UTILITY FUNCTIONS FOR UI MANIPULATION\r\n     * =======================================\r\n     */\r\n    #displaySampleProducts(shop)\r\n    {   \r\n        // Start \r\n        let objectStoreName = \"products\";\r\n        this.#offlinedb.withDB(db => {\r\n            // Create a read-only transaction object for this\r\n            let transaction = db.transaction([objectStoreName]);\r\n\r\n            //Get the object-store from the transaction\r\n            let objectStore = transaction.objectStore(objectStoreName);\r\n            let boundKeyRange = IDBKeyRange.bound(1, 4);\r\n            let productOutput = ``;\r\n            (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_4__.smallSpinner)('Loading...', '.shop');\r\n            objectStore.openCursor(boundKeyRange).onsuccess = event => {\r\n                const cursor = event.target.result;\r\n                \r\n                if(cursor)\r\n                {\r\n                    let search = this.#basket.find(x => x.id === cursor.value.createdOn) || [];\r\n\r\n                    let prodQty = (Number(cursor.value.product_quantity) > 0)?'':\"disabled\";\r\n\r\n                        productOutput += `\r\n                        <div class=\"col s12 m3 l3\" id=product-id-${cursor.value.createdOn}>\r\n                            <div class=\"card z-depth-0\">\r\n\r\n                                <div class=\"card-image\">\r\n                                    <img src=${cursor.value.product_image}>\r\n                                    <span class=\"card-title\"></span>\r\n                                </div>\r\n\r\n                                <div class=\"card-content grey lighten-5\">\r\n                                    <p>\r\n                                        <small id=\"productQt-${cursor.value.createdOn}\">\r\n                                            ${cursor.value.product_quantity}\r\n                                        </small>\r\n                                        <span>|</span>\r\n                                        <small>${cursor.value.product_name}</small>\r\n                                    </p>\r\n                                    <div>\r\n                                        <small class=\"grey-text\">\r\n                                            <span style=\"text-decoration: line-through;\">N</span> ${cursor.value.selling_price}.00\r\n                                        </small>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"card-action grey lighten-5\" style=\"border-bottom: 1px solid grey;\">\r\n\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col s12 center-align\">\r\n\r\n                                            <a href=\"#\" ${prodQty} class=\"btn-small purple decrement z-depth-0\" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-decrementidkey=${cursor.key} data-decrementid=${cursor.value.createdOn}>\r\n                                                &minus;\r\n                                            </a>\r\n\r\n                                            <a href=\"#\" class=\"btn-small white grey-text z-depth-0\" id=${cursor.value.createdOn}>\r\n                                                ${search.item === undefined? 0 : search.item}\r\n                                            </a>\r\n\r\n                                            <a href=\"#\" ${prodQty} class=\"btn-small purple increment z-depth-0\" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-incrementidkey=${cursor.key} data-incrementid=${cursor.value.createdOn}>\r\n                                                +\r\n                                            </a>\r\n                                            \r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>`;\r\n\r\n                    \r\n                    \r\n                    cursor.continue();\r\n                    // cursor.advance(2);\r\n                }\r\n                shop.innerHTML = productOutput;\r\n                // ======================\r\n                // Increment\r\n                this.#registerIncrementHandler();\r\n                // ====================\r\n                //Register Event-Handlers for decrement and Increment\r\n                this.#registerDecrementHandler();\r\n            };\r\n        });\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    #searchForProduct(productName)\r\n    {\r\n        this.#offlinedb.withDB(db => {\r\n            let transaction = db.transaction('products');\r\n            let objectStore = transaction.objectStore('products');\r\n            let productOutput = ``;\r\n            (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_4__.smallSpinner)('Searching...', '.shop');\r\n            let isLoopedWithValue = 0;\r\n            objectStore.openCursor().onsuccess = event => {\r\n                const cursor = event.target.result;\r\n                \r\n                if(cursor)\r\n                {  \r\n                    if(cursor.value.product_name === productName)\r\n                    {\r\n                        let prodQty = (Number(cursor.value.product_quantity) > 0)?'':\"disabled\";\r\n\r\n                        isLoopedWithValue++;\r\n                        let search = this.#basket.find(x => x.id === cursor.value.createdOn) || [];\r\n                        \r\n                        productOutput += `\r\n                        <div class=\"col s12 m3 l3\" id=product-id-${cursor.value.createdOn}>\r\n                            <div class=\"card z-depth-0\">\r\n                                <div class=\"card-image\">\r\n                                    <img src=${cursor.value.product_image}>\r\n                                    <span class=\"card-title\"></span>\r\n                                </div>\r\n\r\n                                <div class=\"card-content grey lighten-5\">\r\n                                    <p>\r\n                                        <b id=\"productQt-${cursor.value.createdOn}\">\r\n                                            ${cursor.value.product_quantity}\r\n                                        </b>\r\n                                        <span>&nbsp;</span>\r\n                                        <span>|</span>\r\n                                        <span>&nbsp;</span>\r\n                                        <b>${cursor.value.product_name}</b>\r\n                                    </p>\r\n                                    <div>\r\n                                        <b class=\"grey-text\"><span style=\"text-decoration: line-through;\">N</span> ${cursor.value.selling_price}.00</b>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"card-action grey lighten-5\" style=\"border-bottom: 1px solid grey;\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col s12 center-align\">\r\n\r\n                                            <a href=\"#\" ${prodQty} class=\"btn-small purple decrement z-depth-0\" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-decrementidkey=${cursor.key} data-decrementid=${cursor.value.createdOn}>\r\n                                                &minus;\r\n                                            </a>\r\n\r\n                                            <a href=\"#\" class=\"btn-small white grey-text z-depth-0\" id=${cursor.value.createdOn}>\r\n                                                ${search.item === undefined? 0 : search.item}\r\n                                            </a>\r\n\r\n                                            <a href=\"#\" ${prodQty} class=\"btn-small purple increment z-depth-0\" data-costprice=${cursor.value.cost_price} data-sellingprice=${cursor.value.selling_price} data-incrementidkey=${cursor.key} data-incrementid=${cursor.value.createdOn}>\r\n                                                +\r\n                                            </a>\r\n                                            \r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>`;\r\n                        \r\n                        document.querySelector('.shop').innerHTML = productOutput;\r\n                        // Increment\r\n                        this.#registerIncrementHandler();\r\n                        // ====================\r\n                        //Register Event-Handlers for decrement and Increment\r\n                        this.#registerDecrementHandler();\r\n                    }\r\n                    else \r\n                    {\r\n                        (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_4__.smallSpinner)('Searching...', '.shop');\r\n                    }\r\n\r\n\r\n                    if(isLoopedWithValue == 0)\r\n                    {\r\n                        cursor.continue();\r\n                    }\r\n\r\n                }\r\n                else if(!cursor)\r\n                {\r\n                    \r\n                    if(isLoopedWithValue === 0)\r\n                    {\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('blue', productName+' not found!');\r\n                        let shop = document.querySelector('.shop');\r\n                        this.#displaySampleProducts(shop);\r\n                    }\r\n\r\n                }\r\n            };\r\n        });\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    #registerIncrementHandler()\r\n    {\r\n        if(document.querySelectorAll('.increment'))\r\n        {\r\n            let incrementBtns = document.querySelectorAll('.increment');\r\n            incrementBtns.forEach(btn => {\r\n                btn.addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#incrementQuantity(e);\r\n                });\r\n            });\r\n        }\r\n    }\r\n\r\n\r\n\r\n    // Decrement.\r\n    #registerDecrementHandler()\r\n    {\r\n        if(document.querySelectorAll('.decrement'))\r\n        {\r\n            let decrementBtns = document.querySelectorAll('.decrement');\r\n            decrementBtns.forEach(btn => {\r\n                btn.addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#decrimentQuantity(e);\r\n                });\r\n            });\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    #registerHandlerForSearch()\r\n    {\r\n        if(document.querySelector('#search'))\r\n        {\r\n            document.querySelector('#search').addEventListener('blur', e => {\r\n                e.preventDefault();\r\n                if(/^[a-zA-Z0-9\\s,-]{2,}$/.test(e.target.value))\r\n                    this.#searchForProduct(e.target.value.trim().toUpperCase());\r\n                else \r\n                    (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Invalid search character '+e.target.value);\r\n            });\r\n        }\r\n    }\r\n\r\n\r\n\r\n    #incrementQuantity(e)\r\n    {\r\n        e.preventDefault();\r\n        let id = Number(e.target.dataset.incrementid);\r\n        console.log(id);\r\n\r\n        let realkey = Number(e.target.dataset.incrementidkey);\r\n        console.log(realkey);\r\n\r\n        let selling_price = Number(e.target.dataset.sellingprice);\r\n        let cost_price = Number(e.target.dataset.costprice);\r\n\r\n        let search = this.#basket.find((x) => x.id === id);\r\n        if(search === undefined)\r\n            this.#basket.push({\r\n                    id: id, \r\n                    item: 1, \r\n                    key: realkey, \r\n                    selling_price: selling_price,\r\n                    cost_price: cost_price\r\n                });\r\n        else\r\n            search.item += 1;\r\n        \r\n        this.#updateQuantity(id);\r\n        localStorage.setItem('cartData', JSON.stringify(this.#basket));\r\n        this.#decrementQuantityInDB(realkey);\r\n    }\r\n\r\n    #decrimentQuantity(e)\r\n    {\r\n        e.preventDefault();\r\n        let id = Number(e.target.dataset.decrementid);\r\n        console.log(id);\r\n\r\n        let realkey = Number(e.target.dataset.decrementidkey);\r\n        console.log(realkey);\r\n\r\n        let search = this.#basket.find((x) => x.id === id);\r\n        if(search === undefined || search.item === 0)\r\n            return;\r\n        else \r\n        {\r\n            search.item -= 1;\r\n            console.log(search);\r\n            this.#incrementQuantityInDB(search.key);\r\n        }\r\n            \r\n\r\n        this.#updateQuantity(id);\r\n        this.#basket = this.#basket.filter(product => product.item !== 0);\r\n        localStorage.setItem('cartData', JSON.stringify(this.#basket));  \r\n    }\r\n\r\n    #updateQuantity(id)\r\n    {\r\n        let search = this.#basket.find(x => x.id === id);\r\n        document.getElementById(id).innerHTML = search.item;\r\n        this.#cartTotal();\r\n    }\r\n\r\n\r\n    #cartTotal()\r\n    {  \r\n        if(document.querySelectorAll('.cartAmount'))\r\n        {\r\n            let cartAmountTags = document.querySelectorAll('.cartAmount');\r\n            cartAmountTags.forEach(elem => {\r\n                elem.innerHTML = this.#basket.map((product) => product.item).reduce((x,y) => x+y,0);\r\n            });\r\n        }\r\n    }\r\n\r\n\r\n\r\n    #decrementQuantityInDB(productId)\r\n    {\r\n        /**\r\n         * 1. Retrieve the product from DB\r\n         * 2. check the value of its \"product_quantity\" property\r\n         * 3. if \"product_quantity\" is Zero, then remove its card from the UI\r\n         * 4. else decrement \"product_quantity\" by 1, and update the DB with the new value.\r\n         * 5. Update the \"product_quantity\" element of the UI with the new value of step-4 also.\r\n         */\r\n\r\n        this.#offlinedb.withDB(db => {\r\n            const objectStore = db.transaction('products', 'readwrite')\r\n            .objectStore('products');\r\n            const request = objectStore.get(productId);\r\n            request.onerror = event => {\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to process quantity update');\r\n            };\r\n            request.onsuccess = event => {\r\n                let product = event.target.result;\r\n\r\n                if (product.product_quantity < 1)\r\n                {\r\n                    //This means that product_quantity is zero or even below\r\n                    //Get the id of the card-col-div\r\n                    let divId = `product-id-${product.createdOn}`;\r\n                    document.querySelector(`#${divId}`).style.display = 'none';\r\n                }\r\n                else \r\n                {\r\n                    //Decrement the product quantity\r\n                    let qt = product.product_quantity -= 1;\r\n                    //Update the database\r\n                    const requestUpdate = objectStore.put(product, productId);\r\n                    requestUpdate.onerror = event => {\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to update the quantity');\r\n                    };\r\n                    requestUpdate.onsuccess = event => {\r\n                        //Update the ui\r\n                        document.querySelector(`#productQt-${product.createdOn}`).innerHTML = qt; \r\n                    };\r\n                }\r\n            };\r\n        });\r\n    }\r\n\r\n\r\n    #incrementQuantityInDB(productId)\r\n    {\r\n        this.#offlinedb.withDB(db => {\r\n            let objectStore = db.transaction('products', 'readwrite').objectStore('products');\r\n            let request = objectStore.get(productId);\r\n\r\n            request.onerror = event => {\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to process increment');\r\n            };\r\n\r\n            request.onsuccess = event => {\r\n                let product = event.target.result;\r\n                //Decrement the product quantity\r\n                let qt = product.product_quantity += 1;\r\n                //Update the database\r\n                const requestUpdate = objectStore.put(product, productId);\r\n                requestUpdate.onerror = event => {\r\n                    (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to update the quantity');\r\n                };\r\n                requestUpdate.onsuccess = event => {\r\n                    //Update the ui\r\n                    document.querySelector(`#productQt-${product.createdOn}`).innerHTML = qt; \r\n                };\r\n                // ------------\r\n            };\r\n            // --------------------\r\n\r\n        });\r\n\r\n    }\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/shoppingCart/shopping_cart_home_page.js?");

/***/ })

}]);