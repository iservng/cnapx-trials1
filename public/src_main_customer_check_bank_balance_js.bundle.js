"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_customer_check_bank_balance_js"],{

/***/ "./src/main/customer_check_bank_balance.js":
/*!*************************************************!*\
  !*** ./src/main/customer_check_bank_balance.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomerCheckBankBalance: () => (/* binding */ CustomerCheckBankBalance)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass CustomerCheckBankBalance \r\n{\r\n    #_mError;\r\n    #mErrorMsg;\r\n    constructor() \r\n    {\r\n        this.#_mError = 0;\r\n        this.#mErrorMsg = '';\r\n    }\r\n\r\n    createUi()\r\n    {\r\n        if(this.#_mError === 0)\r\n        {\r\n            \r\n            let content = `<h1>OK</h1>`;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/customer_check_bank_balance.js?");

/***/ })

}]);