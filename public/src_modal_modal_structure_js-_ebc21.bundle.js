"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_modal_modal_structure_js-_ebc21"],{

/***/ "./src/modal/modal_structure.js":
/*!**************************************!*\
  !*** ./src/modal/modal_structure.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModalStructure: () => (/* binding */ ModalStructure)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/small_spinner.js */ \"./src/utils/small_spinner.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _views_create_account_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/create_account_form.js */ \"./src/views/create_account_form.js\");\n/**\r\n * The modal class is a utility class that takes  a \"content\" as its perameter, then uses that content as its own display. By default it will get content by calling the \"createAcountForm\".\r\n */\r\n\r\n\r\n\r\n\r\n\r\n;\r\n\r\n\r\nclass ModalStructure\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #action;\r\n    #modalContent;\r\n    constructor(action = 'createAcount')\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n        this.#action = action;\r\n        this.#modalContent = ``;\r\n\r\n        switch (this.#action) \r\n        {\r\n            case \"createAcount\":\r\n                this.#modalContent = (0,_views_create_account_form_js__WEBPACK_IMPORTED_MODULE_3__.getCreateAccountForm)();\r\n                break;\r\n\r\n            case \"getCustomerLoginForm\":\r\n                this.#modalContent = `<h2>Thank You</h2>`;\r\n                break;\r\n        \r\n            default:\r\n                this.#modalContent = (0,_views_create_account_form_js__WEBPACK_IMPORTED_MODULE_3__.getCreateAccountForm)();\r\n                break;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    /**\r\n     * Public API\r\n     */\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            let content = `\r\n            <div id=\"modal1\" class=\"modal grey lighten-4\">\r\n                <div class=\"modal-content\">\r\n                    <h5 id=\"modalMainTitle\" class=\"blue-text text-darken-4\">\r\n                        Create Account\r\n                    </h5>\r\n                    \r\n                    <p id=\"modalMainContent\">\r\n                         ${this.#modalContent}\r\n                    </p>\r\n                </div>\r\n                \r\n            </div>\r\n            `;\r\n\r\n            // var modals = document.querySelectorAll('.modal');\r\n            // modals.forEach(modal => {\r\n            //     let instance = M.Modal.getInstance(modal);\r\n            //     instance.close();\r\n            // });..\r\n            \r\n\r\n\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('div#modalStructure', content);\r\n            var modal = document.querySelectorAll('.modal');\r\n            M.Modal.init(modal, {\r\n                opacity: 0.2\r\n            });\r\n\r\n\r\n            /**\r\n             * REGISTER AN EVENT HANDLER FOR CREATE-ACCOUNT-FORM\r\n             */\r\n            if(document.querySelector('form#createAcount'))\r\n            {\r\n                document.querySelector('form#createAcount').addEventListener('submit', e => {\r\n                    e.preventDefault();\r\n                    /**\r\n                     * Since we have access to the form itself, then we can pass it to the class or function that will process it.\r\n                     */\r\n                    \r\n                    // ============================\r\n\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_firebase_firestore_dist_esm_index_esm_js\"), __webpack_require__.e(\"vendors-node_modules_firebase_auth_dist_esm_index_esm_js\"), __webpack_require__.e(\"src_modal_handlers_process_create_account_form_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../modal/handlers/process_create_account_form.js */ \"./src/modal/handlers/process_create_account_form.js\"))\r\n                    .then(m => {\r\n                        let accountForm = new m.CreateUserAccount(e.target);\r\n                        accountForm.checkCredentials();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_2__.toastIt)('red', 'Unexpected Error!');\r\n                    });\r\n\r\n                    // ------------------\r\n\r\n                });\r\n            }\r\n\r\n\r\n\r\n        }\r\n        else \r\n        {\r\n            console.log(this.#mErrorMsg);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_2__.toastIt)('red', this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/modal/modal_structure.js?");

/***/ }),

/***/ "./src/views/create_account_form.js":
/*!******************************************!*\
  !*** ./src/views/create_account_form.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCreateAccountForm: () => (/* binding */ getCreateAccountForm)\n/* harmony export */ });\n\r\nlet getCreateAccountForm = () => {\r\n    return `\r\n    <div class=\"row\"  id=\"createAcountDiv\">\r\n        <form class=\"col s12\" id=\"createAcount\">\r\n                            \r\n                                \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"fullname\" type=\"text\" class=\"validate\">\r\n                <label for=\"fullname\" class=\"blue-text text-darken-4\">Enter full-name</label>\r\n            </div>\r\n                                \r\n                                \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"phone\" type=\"text\" class=\"validate\">\r\n                <label for=\"phone\" class=\"blue-text text-darken-4\">Enter phone number</label>\r\n            </div>\r\n                                \r\n                                \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"bvn\" type=\"text\" class=\"validate\">\r\n                <label for=\"bvn\" class=\"blue-text text-darken-4\">Enter BVN number</label>\r\n            </div>\r\n\r\n            <div class=\"input-field col s12\">\r\n                <input id=\"email\" type=\"email\" class=\"validate\" required>\r\n                <label for=\"email\" class=\"blue-text text-darken-4\">Email Address</label>\r\n            </div>\r\n            <div class=\"input-field col s12\">\r\n                <input id=\"password\" type=\"password\" class=\"validate\" required>\r\n                <label for=\"password\" class=\"blue-text text-darken-4\">Password</label>\r\n            </div>\r\n                                \r\n                                \r\n            <div class=\"input-field col s12\">\r\n\r\n                <input type=\"submit\" id=\"btnAction\" class=\"btn-small blue blue text-darken-4-text text-darken-4\" value=\"Create Account\">\r\n                                    \r\n            </div>\r\n                                \r\n                            \r\n        </form>\r\n    </div>\r\n    `;\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/views/create_account_form.js?");

/***/ })

}]);