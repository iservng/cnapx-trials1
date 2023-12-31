"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_footer_footer_js"],{

/***/ "./src/footer/footer.js":
/*!******************************!*\
  !*** ./src/footer/footer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Footer: () => (/* binding */ Footer)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\nclass Footer \r\n{\r\n\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n    }\r\n\r\n    /**\r\n     * Public API\r\n     */\r\n    createUi()\r\n    {\r\n        \r\n        if (this.#_mErrors == 0)\r\n        {\r\n            let content = `\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col l6 s12\">\r\n                        <h5 class=\"white-text\">\r\n                            Cnapx Content\r\n                        </h5>\r\n                        <p class=\"grey-text text-lighten-4\">\r\n                            You can use rows and columns here to organize your footer content.\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"col l4 offset-l2 s12\">\r\n                        <h5 class=\"white-text\">Links</h5>\r\n                        <ul>\r\n                            <li>\r\n                                <a class=\"grey-text text-lighten-3\" href=\"#!\">\r\n                                    Facebook\r\n                                </a>\r\n                            </li>\r\n                            <li>\r\n                                <a class=\"grey-text text-lighten-3\" href=\"#!\">\r\n                                    Instagram\r\n                                </a>\r\n                            </li>\r\n                            <li>\r\n                                <a class=\"grey-text text-lighten-3\" href=\"#!\">\r\n                                    LinkedIn\r\n                                </a>\r\n                            </li>\r\n                            <li>\r\n                                <a class=\"grey-text text-lighten-3\" href=\"#!\">\r\n                                    Snapchat\r\n                                </a>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"footer-copyright\">\r\n                <div class=\"container\">\r\n                    © 2023 Copyright Text\r\n                    <a class=\"grey-text text-lighten-4 right\" href=\"#!\">\r\n                            <small>Powered by</small> <b>iservng</b>\r\n                    </a>\r\n                </div>\r\n            </div> \r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('footer#footerId', content);\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/footer/footer.js?");

/***/ }),

/***/ "./src/utils/insert_into_DOM.js":
/*!**************************************!*\
  !*** ./src/utils/insert_into_DOM.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   insertIntoDOM: () => (/* binding */ insertIntoDOM)\n/* harmony export */ });\nconst  insertIntoDOM = (classname, content) => {\r\n    \r\n    let main = document.querySelector(classname);\r\n    main.innerHTML = '';\r\n    main.innerHTML = content;\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/insert_into_DOM.js?");

/***/ })

}]);