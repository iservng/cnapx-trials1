"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_src_remove_landing_page_sections_js-src_utils_src_remove_modal_js-src_utils_src_rem-b76704"],{

/***/ "./src/utils_src/remove_landing_page_sections.js":
/*!*******************************************************!*\
  !*** ./src/utils_src/remove_landing_page_sections.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeLandingPageSections: () => (/* binding */ removeLandingPageSections)\n/* harmony export */ });\n\r\nconst removeLandingPageSections = () => {\r\n    if(document.querySelectorAll('.landing-page'))\r\n    {\r\n        let sections = document.querySelectorAll('.landing-page');\r\n        sections.forEach(section => {\r\n            section.style.display = 'none';\r\n        });\r\n\r\n    }\r\n    \r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/remove_landing_page_sections.js?");

/***/ }),

/***/ "./src/utils_src/remove_modal.js":
/*!***************************************!*\
  !*** ./src/utils_src/remove_modal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeModal: () => (/* binding */ removeModal)\n/* harmony export */ });\n\r\nconst removeModal = () => {\r\n    if(document.querySelectorAll('.modal'))\r\n    {\r\n        let modals = document.querySelectorAll('.modal');\r\n        modals.forEach(instance => {\r\n            let inst = M.Modal.getInstance(instance);\r\n            inst.close();\r\n        });\r\n    }\r\n    \r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/remove_modal.js?");

/***/ }),

/***/ "./src/utils_src/remove_side_nav.js":
/*!******************************************!*\
  !*** ./src/utils_src/remove_side_nav.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeSidenav: () => (/* binding */ removeSidenav)\n/* harmony export */ });\nconst removeSidenav = () => {\r\n    if(document.querySelectorAll('.sidenav'))\r\n    {\r\n        \r\n        let sideNavs = document.querySelectorAll('.sidenav');\r\n        sideNavs.forEach(sidenav => {\r\n            let inst = M.Sidenav.getInstance(sidenav);\r\n            inst.close();\r\n        });\r\n\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/remove_side_nav.js?");

/***/ }),

/***/ "./src/utils_src/small_spinner.js":
/*!****************************************!*\
  !*** ./src/utils_src/small_spinner.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   smallSpinner: () => (/* binding */ smallSpinner)\n/* harmony export */ });\n//SPMALL SPINNER..\r\nlet smallSpinner = (msg = 'Checking...', classname = '.task_wrapper_div') => {\r\n\r\n\r\n\r\n    let content = `\r\n    <div class=\"center-align\" style=\"padding-top: 3rem; padding-bottom: 5rem;\">\r\n        <div class=\"preloader-wrapper small active\">\r\n            <div class=\"spinner-layer spinner-blue-only\">\r\n\r\n                  <div class=\"circle-clipper left\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n                  <div class=\"gap-patch\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n                  <div class=\"circle-clipper right\">\r\n                    <div class=\"circle\"></div>\r\n                  </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div><small>${msg}</small></div>\r\n    </div>\r\n    `;\r\n    document.querySelector(classname).innerHTML = '';\r\n    document.querySelector(classname).innerHTML = content;\r\n};\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/small_spinner.js?");

/***/ })

}]);