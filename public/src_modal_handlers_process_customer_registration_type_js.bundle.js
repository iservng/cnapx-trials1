"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_modal_handlers_process_customer_registration_type_js"],{

/***/ "./src/modal/handlers/process_customer_registration_type.js":
/*!******************************************************************!*\
  !*** ./src/modal/handlers/process_customer_registration_type.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProcessCustomerRegistrationType: () => (/* binding */ ProcessCustomerRegistrationType)\n/* harmony export */ });\n/* harmony import */ var _utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/small_spinner.js */ \"./src/utils/small_spinner.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\nclass ProcessCustomerRegistrationType \r\n{\r\n\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #typeSelectBtn;\r\n    constructor(typeSelected)\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        if(!typeSelected)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = \"Please select type\";\r\n        }\r\n        else \r\n        {\r\n            this.#typeSelectBtn = typeSelected;\r\n        }\r\n        \r\n\r\n    }\r\n\r\n    processType()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            let customerType = this.#typeSelectBtn.dataset.customertype;\r\n            (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_0__.smallSpinner)('Working...', 'main');\r\n\r\n            /**\r\n             * Import and execute the customer profile interface dashboard\r\n             */\r\n            __webpack_require__.e(/*! import() */ \"src_main_customer_profile_dashboard_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../main/customer_profile_dashboard.js */ \"./src/main/customer_profile_dashboard.js\"))\r\n            .then(m => {\r\n                let customerDashboard = new m.CustomerProfileDashboard();\r\n                customerDashboard.createUi();\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load customer dashboard!');\r\n            });\r\n\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/modal/handlers/process_customer_registration_type.js?");

/***/ })

}]);