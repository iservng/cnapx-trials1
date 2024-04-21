"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_progress_loader_js-_16b41"],{

/***/ "./src/utils/progress_loader.js":
/*!**************************************!*\
  !*** ./src/utils/progress_loader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   progressLoader: () => (/* binding */ progressLoader)\n/* harmony export */ });\n//SPMALL SPINNER..\r\nlet progressLoader = (msg = 'Checking...', classname = '.task_wrapper_div') => {\r\n    let content = `\r\n        <div class=\"center-align\" style=\"padding-top: 3rem; padding-bottom: 5rem;\">\r\n            <progress></progress>\r\n            <div><small class=\"black-text\">${msg}</small></div>\r\n        </div>\r\n    `;\r\n    document.querySelector(classname).innerHTML = '';\r\n    document.querySelector(classname).innerHTML = content;\r\n};\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/progress_loader.js?");

/***/ })

}]);