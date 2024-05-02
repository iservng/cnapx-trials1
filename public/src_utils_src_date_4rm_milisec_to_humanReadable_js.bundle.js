"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_src_date_4rm_milisec_to_humanReadable_js"],{

/***/ "./src/utils_src/date_4rm_milisec_to_humanReadable.js":
/*!************************************************************!*\
  !*** ./src/utils_src/date_4rm_milisec_to_humanReadable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convertDateFromMilliSecToDateString: () => (/* binding */ convertDateFromMilliSecToDateString)\n/* harmony export */ });\n/* harmony import */ var _month_names_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./month_names.js */ \"./src/utils_src/month_names.js\");\n\r\nconst convertDateFromMilliSecToDateString = (value) => {\r\n    if(value)\r\n    {\r\n        console.log(value);\r\n        const ts = (value.seconds+value.nanoseconds/1000000000)*1000;\r\n\r\n        // nanoseconds\r\n        let dt = new Date(Number(ts));\r\n        let y = dt.getFullYear();\r\n        let m = _month_names_js__WEBPACK_IMPORTED_MODULE_0__.monthNames[dt.getMonth()];\r\n        let d = dt.getDate();\r\n        return `${d} ${m}, ${y}`;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/date_4rm_milisec_to_humanReadable.js?");

/***/ }),

/***/ "./src/utils_src/month_names.js":
/*!**************************************!*\
  !*** ./src/utils_src/month_names.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   monthNames: () => (/* binding */ monthNames)\n/* harmony export */ });\n\r\n\r\nconst monthNames = [\r\n    'January',\r\n    'February',\r\n    'March',\r\n    'April',\r\n    'May',\r\n    'June',\r\n    'July',\r\n    'August',\r\n    'September',\r\n    'October',\r\n    'November',\r\n    'December',\r\n];\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/month_names.js?");

/***/ })

}]);