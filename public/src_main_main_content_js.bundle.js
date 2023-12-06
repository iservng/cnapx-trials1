"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_main_content_js"],{

/***/ "./src/main/main_content.js":
/*!**********************************!*\
  !*** ./src/main/main_content.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MainContent: () => (/* binding */ MainContent)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\n\r\nclass MainContent \r\n{\r\n\r\n    #_mError;\r\n    #mErrorMsg;\r\n    #themeColor;\r\n\r\n    constructor()\r\n    {\r\n        this.#_mError = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#themeColor = 'purple darken-2';\r\n\r\n    }\r\n\r\n\r\n    /**\r\n     * Public API\r\n     */\r\n    createUi()\r\n    {\r\n\r\n        if(this.#_mError == 0)\r\n        {\r\n            let content = `\r\n            <div class=\"slider\">\r\n                <ul class=\"slides\">\r\n                    <li class=\"purple\">\r\n                        <!--\r\n                        <img src=\"https://lorempixel.com/580/250/nature/4\"> \r\n                        --> \r\n                        <!-- random image -->\r\n                        <div class=\"caption center-align\">\r\n\r\n                            <h2 class=\"white-text text-accent-4\"><b>Cnaps</b></h2>\r\n                            <h3><small>The Fastest Way to Pay!</small></h3>\r\n                            \r\n                            <p>\r\n                                <a href=\"#modal1\" class=\"btn-large white lighten-4 purple-text text-darken-4 modal-trigger\">GET STARTED</a>\r\n                            </p>\r\n\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"purple\">\r\n                        <!--\r\n                        <img src=\"https://lorempixel.com/580/250/nature/4\"> \r\n                        --> \r\n                        <!-- random image -->\r\n                        <div class=\"caption left-align\">\r\n                            <h2 class=\"white-text text-accent-4\"><b>Cnapx</b></h2>\r\n                            <h3><small>Secure Online Payment!</small></h3>\r\n                            \r\n                            <p>\r\n                                <a href=\"#modal1\" class=\"btn-large white lighten-4 purple-text text-darken-4 modal-trigger\">GET STARTED</a>\r\n                            </p>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"purple\">\r\n                        <!--\r\n                        <img src=\"https://lorempixel.com/580/250/nature/4\"> \r\n                        --> \r\n                        <!-- random image -->\r\n                        <div class=\"caption right-align\">\r\n                            <h2 class=\"white-text text-accent-4\"><b>Cnapx</b></h2>\r\n                            <h3><small>Payment Easier and Smooth!</small></h3>\r\n                            <p>\r\n                                <a href=\"#modal1\" class=\"btn-large white lighten-4 purple-text text-darken-4 modal-trigger\">GET STARTED</a>\r\n                            </p>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"purple\">\r\n                        <!--\r\n                        <img src=\"https://lorempixel.com/580/250/nature/4\"> \r\n                        -->\r\n                        <!-- random image -->\r\n                        <div class=\"caption center-align\">\r\n                            <h2 class=\"white-text text-accent-4\"><b>Cnapx</b></h2>\r\n                            <h3><small>For Snappy Payment!</small></h3>\r\n                            <p>\r\n                                <a href=\"#modal1\" class=\"btn-large white lighten-4 purple-text text-darken-4 modal-trigger\">GET STARTED</a>\r\n                            </p>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n            var slider = document.querySelectorAll('.slider');\r\n            M.Slider.init(slider, {\r\n                indicators: false,\r\n                height: 600\r\n            });\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/main_content.js?");

/***/ }),

/***/ "./src/utils/insert_into_DOM.js":
/*!**************************************!*\
  !*** ./src/utils/insert_into_DOM.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   insertIntoDOM: () => (/* binding */ insertIntoDOM)\n/* harmony export */ });\nconst  insertIntoDOM = (classname, content) => {\r\n    \r\n    let main = document.querySelector(classname);\r\n    main.innerHTML = '';\r\n    main.innerHTML = content;\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/insert_into_DOM.js?");

/***/ })

}]);