"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_shoppingCart_shopping_cart_home_page_js-_1cad1"],{

/***/ "./src/shoppingCart/shopping_cart_home_page.js":
/*!*****************************************************!*\
  !*** ./src/shoppingCart/shopping_cart_home_page.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ShoppingCartHomePage: () => (/* binding */ ShoppingCartHomePage)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _sample_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sample_data.js */ \"./src/shoppingCart/sample_data.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass ShoppingCartHomePage\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #basket;\r\n    #sampleProductData;\r\n\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#basket = JSON.parse(localStorage.getItem('cartData')) || [];\r\n        this.#sampleProductData = _sample_data_js__WEBPACK_IMPORTED_MODULE_2__.sampleProductData;\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n    /*******************************\r\n     * The public API of this Class\r\n     */\r\n    createUi()\r\n    {\r\n        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Display Content\r\n            let content = `\r\n            <div class=\"container\">\r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                    \r\n                    <!-- USER-PROFILE-AVARTAR  -->\r\n\r\n                    <div class=\"col s12\">\r\n                        <h5>Marchants Business Name</h5>\r\n                        <b>\r\n                            <a href=\"#\" class=\"sidenav-trigger purple-text text-darken-4\" data-target=\"mobile-demo\">\r\n                                Menu\r\n                            </a>\r\n                            \r\n                        </b>\r\n                    </div>\r\n\r\n\r\n                    <!-- FIRST SECTION OF DASHBOARD  -->\r\n                    <div class=\"col s12\" style=\"margin-bottom: 2rem; margin-top: 3rem;\">\r\n                        <!-- products structure layout  -->\r\n                        <div class=\"row shop\"></div>\r\n                        <!-- products structure layout  -->\r\n                    </div>\r\n                    \r\n\r\n                    <div class=\"col s12 right-align\" style=\"margin-top: 6rem;\">\r\n                        <p>\r\n                            <div class=\"divider\"></div>\r\n                        </p>\r\n                        <small class=\"grey-text\">Powered by </small>\r\n                        <b class=\"purple-text text-darken-3\">\r\n                            iservng\r\n                        </b>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n\r\n            //CODE: open cart ui\r\n           \r\n\r\n\r\n\r\n\r\n            /**\r\n             * TO DISPLAY THE SAMPLE PRODUCTS IN THE FRONT-PAGE\r\n             */\r\n            if(document.querySelector('.shop'))\r\n            {\r\n                let shop = document.querySelector('.shop');\r\n                this.#displaySampleProducts(shop);\r\n                this.#cartTotal();\r\n            }\r\n\r\n\r\n\r\n            //1.\r\n            /************************************\r\n             *  Logout Button Event Implementation\r\n             */\r\n            if(document.querySelectorAll('.logout'))\r\n            {\r\n                let logoutButtons = document.querySelectorAll('.logout');\r\n                logoutButtons.forEach(logoutBtn => {\r\n                    logoutBtn.addEventListener('click', e => {\r\n                        e.preventDefault();\r\n                        //Dynamically import and Execute the logout class\r\n                        // ---- \r\n                        __webpack_require__.e(/*! import() */ \"src_utils_logout_class_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../utils/logout_class.js */ \"./src/utils/logout_class.js\"))\r\n                        .then(m => {\r\n                            let logout = new m.Logout();\r\n                            logout.logUserOut();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unexpected network issue, try again!');\r\n                        });\r\n                    });\r\n                });\r\n            }\r\n            // =======================\r\n\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n\r\n        \r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n    /**\r\n     * UTILITY FUNCTIONS FOR UI MANIPULATION\r\n     * =======================================\r\n     */\r\n    #displaySampleProducts(shop)\r\n    {\r\n        \r\n        // Start\r\n       let productOutput = ``;\r\n       this.#sampleProductData.forEach(product => {\r\n            let {id, name, price, img} = product;\r\n            let search = this.#basket.find(product => product.id === id) || []; \r\n            productOutput += `\r\n            <div class=\"col s12 m3 l3\" id=product-id-${id}>\r\n                    <div class=\"card z-depth-0\">\r\n                        <div class=\"card-image\">\r\n                            <img src=${img}>\r\n                            <span class=\"card-title\">New Arrivals</span>\r\n                        </div>\r\n                        <div class=\"card-content grey lighten-5\">\r\n                            <p>\r\n                                <b class=\"grey-text\">${name}</b>\r\n                            </p>\r\n                            <div> N ${price} </div>\r\n                        </div>\r\n                        <div class=\"card-action grey lighten-5\" style=\"border-bottom: 1px solid grey;\">\r\n\r\n                            <div class=\"row\">\r\n                                <div class=\"col s12 center-align\">\r\n\r\n                                    <a href=\"#\" class=\"btn-small purple decrement z-depth-0\" data-decrementid=${id}>\r\n                                        &minus;\r\n                                    </a>\r\n\r\n                                    <a href=\"#\" class=\"btn-small white grey-text z-depth-0\" id=${id}>\r\n                                         ${search.item === undefined? 0 : search.item}\r\n                                    </a>\r\n\r\n                                    <a href=\"#\" class=\"btn-small purple increment z-depth-0\" data-incrementid=${id}>\r\n                                        +\r\n                                    </a>\r\n                                    \r\n                                </div>\r\n                                \r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            `;\r\n        });\r\n\r\n        shop.innerHTML = productOutput;\r\n\r\n        // Increment\r\n        if(document.querySelectorAll('.increment'))\r\n        {\r\n            let incrementBtns = document.querySelectorAll('.increment');\r\n            incrementBtns.forEach(btn => {\r\n                btn.addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#incrementQuantity(e);\r\n                });\r\n            });\r\n        }\r\n\r\n        //Register Event-Handlers for decrement and Increment\r\n        if(document.querySelectorAll('.decrement'))\r\n        {\r\n            let decrementBtns = document.querySelectorAll('.decrement');\r\n            decrementBtns.forEach(btn => {\r\n                btn.addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#decrimentQuantity(e);\r\n                });\r\n            });\r\n        }\r\n\r\n        \r\n    }\r\n\r\n\r\n\r\n\r\n    #incrementQuantity(e)\r\n    {\r\n        e.preventDefault();\r\n        let id = (e.target.dataset.incrementid);\r\n\r\n        let search = this.#basket.find((x) => x.id === id);\r\n        if(search === undefined)\r\n            this.#basket.push({id: id, item: 1});\r\n        else\r\n            search.item += 1;\r\n\r\n        \r\n        this.#updateQuantity(id);\r\n        localStorage.setItem('cartData', JSON.stringify(this.#basket));\r\n        \r\n    }\r\n\r\n    #decrimentQuantity(e)\r\n    {\r\n        e.preventDefault();\r\n        let id = (e.target.dataset.decrementid);\r\n\r\n        let search = this.#basket.find((x) => x.id === id);\r\n        if(search === undefined || search.item === 0)\r\n            return;\r\n        else \r\n            search.item -= 1;\r\n        \r\n\r\n        this.#updateQuantity(id);\r\n        this.#basket = this.#basket.filter(product => product.item !== 0);\r\n        \r\n        localStorage.setItem('cartData', JSON.stringify(this.#basket));\r\n        \r\n    }\r\n\r\n    #updateQuantity(id)\r\n    {\r\n        let search = this.#basket.find(x => x.id === id);\r\n        // console.log(search.item);\r\n        document.getElementById(id).innerHTML = search.item;\r\n        this.#cartTotal();\r\n    }\r\n\r\n\r\n    #cartTotal()\r\n    {\r\n        \r\n        if(document.querySelectorAll('.cartAmount'))\r\n        {\r\n            let cartAmountTags = document.querySelectorAll('.cartAmount');\r\n            cartAmountTags.forEach(elem => {\r\n                elem.innerHTML = this.#basket.map((product) => product.item).reduce((x,y) => x+y,0);\r\n            });\r\n\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/shoppingCart/shopping_cart_home_page.js?");

/***/ })

}]);