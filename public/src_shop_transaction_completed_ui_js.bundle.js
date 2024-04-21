"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_shop_transaction_completed_ui_js"],{

/***/ "./src/shop/transaction_completed_ui.js":
/*!**********************************************!*\
  !*** ./src/shop/transaction_completed_ui.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TransactionCompletedUi: () => (/* binding */ TransactionCompletedUi)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\nclass TransactionCompletedUi\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n    }\r\n\r\n    /**\r\n     * CLASS PUBLI API\r\n     * ---------------\r\n     */\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n\r\n            /**\r\n             * Since the transaction has successfully completed, then it will be removed from the local storage\r\n             */\r\n            localStorage.removeItem('cartData');\r\n\r\n            let content = `\r\n            <div class=\"container\" style=\"margin-top: 4rem;\">\r\n                <div class=\"row\">\r\n                    <div class=\"col s12 l4 m4\">\r\n                        &nbsp;\r\n                    </div>\r\n                    <div class=\"col s12 l4 m4\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col s12\">\r\n                            <div class=\"card z-depth-0\">\r\n                                <div class=\"card-content white-text center-align\">\r\n                                    <h1 class=\"green-text\">\r\n                                        <b>&checkmark;</b>\r\n                                    </h>\r\n                                    <span class=\"card-title green-text\">\r\n                                        Transaction Completed!\r\n                                    </span>\r\n                                </div>\r\n                                <div class=\"card-action center-align\">\r\n                                    <a href=\"#\" class=\"btn-small green generateReciept\">Generate Reciept</a>\r\n                                    <a href=\"#\" class=\"btn-small red cancel\">Cancel!</a>\r\n                                </div>\r\n                            </div>\r\n                            </div>\r\n                        </div>\r\n            \r\n                    </div>\r\n                    <div class=\"col s12 l4 m4\">\r\n                        &nbsp;\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n            /**\r\n             * Register event handlers for the generateReciept\r\n             * ---------------------------------------------\r\n             */\r\n            if(document.querySelector('.generateReciept'))\r\n            {\r\n                document.querySelector('.generateReciept').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    //Dynamically import the print-reciept ui\r\n                    __webpack_require__.e(/*! import() */ \"src_shop_transaction_reciept_ui_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./transaction_reciept_ui */ \"./src/shop/transaction_reciept_ui.js\"))\r\n                    .then(m => {\r\n                        let reciept = new m.TransactionRecieptUi();\r\n                        reciept.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the reciept ui');\r\n                    });\r\n                });\r\n            }\r\n\r\n\r\n\r\n\r\n            //Register event handler for cancel\r\n            if(document.querySelector('.cancel'))\r\n            {\r\n                document.querySelector('.cancel').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    __webpack_require__.e(/*! import() */ \"src_shoppingCart_shopping_cart_home_page_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../shoppingCart/shopping_cart_home_page.js */ \"./src/shoppingCart/shopping_cart_home_page.js\"))\r\n                    .then(m => {\r\n                        let shopfront = new m.ShoppingCartHomePage();\r\n                        shopfront.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the shop front ui');\r\n                    });\r\n                });\r\n            }\r\n\r\n\r\n\r\n\r\n\r\n        }\r\n        else\r\n        {\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/shop/transaction_completed_ui.js?");

/***/ })

}]);