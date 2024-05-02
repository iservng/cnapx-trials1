"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_shop_src_edit_product_ui_js"],{

/***/ "./src/shop_src/edit_product_ui.js":
/*!*****************************************!*\
  !*** ./src/shop_src/edit_product_ui.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EditProductUi: () => (/* binding */ EditProductUi)\n/* harmony export */ });\n/* harmony import */ var _utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils_src/insert_into_DOM.js */ \"./src/utils_src/insert_into_DOM.js\");\n/* harmony import */ var _utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils_src/toast_it.js */ \"./src/utils_src/toast_it.js\");\n/* harmony import */ var _indexeddb_src_offlinedb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../indexeddb_src/offlinedb.js */ \"./src/indexeddb_src/offlinedb.js\");\n\r\n\r\n\r\n\r\nclass EditProductUi\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #productId;\r\n    #offlinedb;\r\n    #product;\r\n    #transaction;\r\n    constructor(productIdElem)\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n        this.#offlinedb = new _indexeddb_src_offlinedb_js__WEBPACK_IMPORTED_MODULE_2__.OfflineDB();\r\n\r\n        // this.#productId\r\n        if(!productIdElem)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = `The product element is invalid!`;\r\n        }\r\n        else if(!productIdElem.id)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = `The prodict ID not found!`;\r\n        }\r\n        else \r\n        {\r\n            this.#productId = Number(productIdElem.id);\r\n            console.log(this.#productId);\r\n        }\r\n    }\r\n\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            let content = `\r\n                <div class=\"container\">\r\n                    <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                        <div class=\"col s12\" style=\"margin-bottom: 1rem;\">\r\n                            <h5 class=\"purple-text center-align\">Edit Product</h5>\r\n                            <b class=\"hide-on-small-only\">\r\n                                <a href=\"#\" class=\"btn-small purple z-depth-0 sidenav-trigger white-text text-darken-4\" data-target=\"mobile-demo\">\r\n                                    Menu\r\n                                </a>\r\n                            </b>\r\n                            <p><a href=\"#\" class=\"backToInventory btn-flat\">Back To Inventory</a></p>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <form id=\"editProductForm\">\r\n                        <div class=\"row\" id=\"editDivContainer\">\r\n                        </div>\r\n                    </form>\r\n                </div>`;\r\n            (0,_utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n\r\n            //Register event handler for the editProductForm\r\n            if(document.querySelector('#editProductForm'))\r\n            {\r\n                document.querySelector('#editProductForm').addEventListener('submit', e => {\r\n                    e.preventDefault();\r\n                    console.log(e.target);\r\n                    this.#checkAndSaveEditedProduct(e.target);\r\n                });\r\n            }\r\n\r\n            //Register event handler for the backToInventory\r\n            if(document.querySelector('.backToInventory'))\r\n            {\r\n                document.querySelector('.backToInventory').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./records_ui.js */ \"./src/shop_src/records_ui.js\"))\r\n                    .then(m => {\r\n                        let recordsui = new m.RecordsUi();\r\n                        recordsui.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the records ui');\r\n                    });\r\n                });\r\n            }\r\n\r\n            //Call for the product\r\n            this.#getProductForEditing(this.#productId);\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n    #getProductForEditing(productId)\r\n    {\r\n        this.#offlinedb.withDB(db => {\r\n\r\n            this.#transaction = db.transaction('products');\r\n            let objectStore = this.#transaction.objectStore('products');\r\n\r\n            objectStore.get(this.#productId).onsuccess = event => {\r\n                this.#product = event.target.result;\r\n                if(this.#product)\r\n                {\r\n                    // console.log(this.#product);\r\n                    document.querySelector('#editDivContainer').innerHTML = `\r\n                    <div class=\"col s12 m6 l6\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col s12\">\r\n                                <div class=\"card z-depth-0\">\r\n                                    <div class=\"card-image\">\r\n                                        <div id=\"imgContainer\"><img src=${this.#product.product_image}></div>\r\n                                        <span class=\"card-title\">\r\n                                            Edit Mode\r\n                                        </span>\r\n                                    </div>\r\n                                    <p>\r\n                                        <div class=\"file-field input-field\">\r\n                                            <div class=\"btn\">\r\n                                                <span>File</span>\r\n                                                <input type=\"file\" id=\"product_image\">\r\n                                            </div>\r\n                                            <div class=\"file-path-wrapper\">\r\n                                                <input class=\"file-path validate\" type=\"text\" placeholder=\"Change Product Image\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!--PRODUCT INFORMATION-->\r\n                    <div class=\"col s12 m6 l6\">\r\n                        <h5>\r\n                            Other product Information\r\n                        </h5>\r\n                        <p>\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s12\">\r\n                                    <input id=\"product_name\" type=\"text\" value=\"${this.#product.product_name}\">\r\n                                    <label for=\"product_name\">Product Name</label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s6\">\r\n                                    <input placeholder=\"Placeholder\" id=\"cost_price\" type=\"number\" class=\"validate\" value=\"${this.#product.cost_price}\">\r\n                                    <label for=\"cost_price\">Cost Price</label>\r\n                                </div>\r\n                                <div class=\"input-field col s6\">\r\n                                    <input id=\"selling_price\" type=\"number\" class=\"validate\" value=\"${this.#product.selling_price}\" >\r\n                                    <label for=\"selling_price\">Selling Price</label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s6\">\r\n                                    <input placeholder=\"Placeholder\" id=\"product_quantity\" type=\"number\" class=\"validate\" value=\"${this.#product.product_quantity}\">\r\n                                    <label for=\"product_quantity\">\r\n                                        Product Quantity\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"input-field col s6\">\r\n                                    <input id=\"quantity_price\" type=\"number\" class=\"validate\" value=\"${this.#product.quantity_price}\" >\r\n                                    <label for=\"quantity_price\">\r\n                                        Quantity Price\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s6\">\r\n                                    <input placeholder=\"Placeholder\" id=\"product_unit\" type=\"number\" class=\"validate\" value=\"${this.#product.product_unit}\">\r\n                                    <label for=\"product_unit\">\r\n                                        Product Unit\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"input-field col s6\">\r\n                                    <input id=\"unit_price\" type=\"number\" class=\"validate\" value=\"${this.#product.unit_price}\" >\r\n                                    <label for=\"unit_price\">\r\n                                        Unit Price\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s6\">\r\n                                    <input placeholder=\"Placeholder\" id=\"unit_per_quantity\" type=\"number\" class=\"validate\" value=\"${this.#product.unit_per_quantity}\">\r\n                                    <label for=\"unit_per_quantity\">\r\n                                        Unit Per Quantity\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"input-field col s6\">\r\n                                    <input id=\"createdOn\" type=\"date\" class=\"validate\" value=\"${this.#product.createdOn}\" >\r\n                                    <label for=\"createdOn\">\r\n                                        Unit Price\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"input-field col s6\">\r\n                                    <input type=\"submit\" class=\"btn validate\" value=\"Save Changes\">\r\n                                </div>\r\n                            </div>\r\n                        </p>\r\n                    </div>\r\n                    `;\r\n\r\n                }\r\n                else \r\n                {\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load data');\r\n                }\r\n            };\r\n        });\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n    #checkAndSaveEditedProduct(form)\r\n    {\r\n        let namePattern = /^[a-zA-Z0-9\\s-]{3,30}$/;\r\n        let digitPattern = /^[\\d]{1,}$/;\r\n\r\n        let product_name = form.product_name.value.trim().toUpperCase();\r\n        if(namePattern.test(product_name))\r\n            this.#product.product_name = product_name;\r\n        \r\n        // let cost_price = ``;\r\n        if(digitPattern.test(form.cost_price.value))\r\n            this.#product.cost_price = Number(form.cost_price.value);\r\n\r\n        // let selling_price = '';\r\n        if(digitPattern.test(form.selling_price.value))\r\n            this.#product.selling_price = Number(form.selling_price.value);\r\n\r\n        // let product_quantity = '';\r\n        if(digitPattern.test(form.product_quantity.value))\r\n            this.#product.product_quantity = Number(form.product_quantity.value);\r\n\r\n        // let quantity_price = '';\r\n        if(digitPattern.test(form.quantity_price.value))\r\n            this.#product.quantity_price = Number(form.quantity_price.value);\r\n\r\n        // let product_unit = '';\r\n        if(digitPattern.test(form.product_unit.value))\r\n            this.#product.product_unit = Number(form.product_unit.value);\r\n\r\n        // let unit_price = '';\r\n        if(digitPattern.test(form.unit_price.value))\r\n            this.#product.unit_price = Number(form.unit_price.value);\r\n\r\n        // let unit_per_quantity = ''\r\n        if(digitPattern.test(form.unit_per_quantity.value))\r\n            this.#product.unit_per_quantity = Number(form.unit_per_quantity.value);\r\n\r\n\r\n        if(form.product_image.files[0])\r\n        {\r\n            // In the asurance that a file has been selected, then we should start the filereader.\r\n            let reader = new FileReader();\r\n            reader.addEventListener('error', e => {\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'The file can not be read');\r\n            });\r\n\r\n            reader.addEventListener('load', e => {\r\n                let img = document.createElement('img');\r\n                img.src = e.target.result;\r\n                let imgWraper = document.querySelector('#imgContainer');\r\n                imgWraper.innerHTML = ``;\r\n                imgWraper.append(img);\r\n                //Call the function that put the whole data in the database.\r\n                this.#product.product_image = e.target.result;\r\n\r\n                // -----------------\r\n                //Product Image has been changed.\r\n                this.#offlinedb.withDB(db => {\r\n                    let transaction = db.transaction('products', 'readwrite');\r\n                    let objectStore = transaction.objectStore('products');\r\n                    let request = objectStore.put(this.#product, this.#productId);\r\n                    request.onerror = event => {\r\n                        (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not update product');\r\n                    };\r\n                    request.onsuccess = event => {\r\n                        (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('green', 'Product Updated');\r\n                    };\r\n                });\r\n                // -----------------\r\n\r\n            });\r\n            reader.readAsDataURL(form.product_image.files[0]);\r\n        }\r\n        else \r\n        {\r\n            //Product image was not selected to be adited.\r\n            this.#offlinedb.withDB(db => {\r\n                let transaction = db.transaction('products', 'readwrite');\r\n                let objectStore = transaction.objectStore('products');\r\n                let request = objectStore.put(this.#product, this.#productId);\r\n                request.onerror = event => {\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not update product');\r\n                };\r\n                request.onsuccess = event => {\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('green', 'Product Updated');\r\n                };\r\n            });\r\n\r\n        }\r\n\r\n        \r\n\r\n        \r\n\r\n    }\r\n\r\n\r\n    // ==============================\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/shop_src/edit_product_ui.js?");

/***/ })

}]);