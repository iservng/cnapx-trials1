"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_remove_landing_page_sections_js-src_utils_remove_modal_js-_7e42-_ce261"],{

/***/ "./src/utils/remove_landing_page_sections.js":
/*!***************************************************!*\
  !*** ./src/utils/remove_landing_page_sections.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeLandingPageSections: () => (/* binding */ removeLandingPageSections)\n/* harmony export */ });\n\r\nconst removeLandingPageSections = () => {\r\n    if(document.querySelectorAll('.landing-page'))\r\n    {\r\n        let sections = document.querySelectorAll('.landing-page');\r\n        sections.forEach(section => {\r\n            section.style.display = 'none';\r\n        });\r\n\r\n    }\r\n    \r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/remove_landing_page_sections.js?");

/***/ }),

/***/ "./src/utils/remove_modal.js":
/*!***********************************!*\
  !*** ./src/utils/remove_modal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeModal: () => (/* binding */ removeModal)\n/* harmony export */ });\n\r\nconst removeModal = () => {\r\n    if(document.querySelectorAll('.modal'))\r\n    {\r\n        let modals = document.querySelectorAll('.modal');\r\n        modals.forEach(instance => {\r\n            let inst = M.Modal.getInstance(instance);\r\n            inst.close();\r\n        });\r\n    }\r\n    \r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/remove_modal.js?");

/***/ })

}]);