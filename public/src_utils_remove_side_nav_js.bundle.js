"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_remove_side_nav_js"],{

/***/ "./src/utils/remove_side_nav.js":
/*!**************************************!*\
  !*** ./src/utils/remove_side_nav.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeSidenav: () => (/* binding */ removeSidenav)\n/* harmony export */ });\nconst removeSidenav = () => {\r\n    if(document.querySelectorAll('.sidenav'))\r\n    {\r\n        \r\n        let sideNavs = document.querySelectorAll('.sidenav');\r\n        sideNavs.forEach(sidenav => {\r\n            let inst = M.Sidenav.getInstance(sidenav);\r\n            inst.close();\r\n        });\r\n\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/remove_side_nav.js?");

/***/ })

}]);