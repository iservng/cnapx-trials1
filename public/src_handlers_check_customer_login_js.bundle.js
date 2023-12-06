"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_handlers_check_customer_login_js"],{

/***/ "./src/handlers/check_customer_login.js":
/*!**********************************************!*\
  !*** ./src/handlers/check_customer_login.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CheckCustomerLogin: () => (/* binding */ CheckCustomerLogin)\n/* harmony export */ });\n/* harmony import */ var _utils_toast_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/toast_it */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\nclass CheckCustomerLogin \r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #email;\r\n    #password;\r\n    constructor(form)\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        if(!form)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = 'Invalid Form Submission';\r\n        }\r\n        else \r\n        {\r\n            //Extract the email and the password\r\n            let email = form.email.value.trim();\r\n            let password = form.password.value.trim();\r\n\r\n            if(!email)\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Invalid Email!';\r\n            }\r\n            else if(!password)\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Invalid Password!';\r\n            }\r\n            else \r\n            {\r\n                this.#email = email;\r\n                this.#password = password;\r\n            }\r\n\r\n        }\r\n\r\n    }\r\n\r\n    validateOrWarn()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            console.log('Customer login checker!');\r\n            console.log(this.#email);\r\n            console.log(this.#password);\r\n\r\n            /**\r\n             * \r\n             * This is where this checker class calls the customer-profile-interface and displays it.\r\n             */\r\n            if(document.querySelector('header'))\r\n            {\r\n                let header = document.querySelector('header');\r\n                header.style.display = 'block';\r\n            }\r\n            Promise.all(/*! import() */[__webpack_require__.e(\"src_main_customer_profile_dashboard_js\"), __webpack_require__.e(\"src_utils_remove_landing_page_sections_js-src_utils_remove_modal_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../main/customer_profile_dashboard.js */ \"./src/main/customer_profile_dashboard.js\"))\r\n            .then(m => {\r\n                let customer_profile_dashboard = new m.CustomerProfileDashboard();\r\n                customer_profile_dashboard.createUi();\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n            });\r\n            // ------------------\r\n\r\n\r\n\r\n        }\r\n        else \r\n        {\r\n            console.log(this.#mErrorMsg);\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', this.#mErrorMsg);\r\n        }\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/handlers/check_customer_login.js?");

/***/ })

}]);