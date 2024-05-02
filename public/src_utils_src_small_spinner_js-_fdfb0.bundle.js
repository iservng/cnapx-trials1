"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_src_small_spinner_js-_fdfb0"],{

/***/ "./src/utils_src/small_spinner.js":
/*!****************************************!*\
  !*** ./src/utils_src/small_spinner.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   smallSpinner: () => (/* binding */ smallSpinner)\n/* harmony export */ });\n//SPMALL SPINNER..\r\nlet smallSpinner = (msg = 'Checking...', classname = '.task_wrapper_div') => {\r\n\r\n\r\n\r\n    let content = `\r\n    <div class=\"center-align\" style=\"padding-top: 3rem; padding-bottom: 5rem;\">\r\n        <div class=\"preloader-wrapper small active\">\r\n            <div class=\"spinner-layer spinner-blue-only\">\r\n\r\n                  <div class=\"circle-clipper left\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n                  <div class=\"gap-patch\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n                  <div class=\"circle-clipper right\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div><small>${msg}</small></div>\r\n    </div>\r\n    `;\r\n    document.querySelector(classname).innerHTML = '';\r\n    document.querySelector(classname).innerHTML = content;\r\n};\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/small_spinner.js?");

/***/ })

}]);