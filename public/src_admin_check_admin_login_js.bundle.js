"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_admin_check_admin_login_js"],{

/***/ "./src/admin/check_admin_login.js":
/*!****************************************!*\
  !*** ./src/admin/check_admin_login.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CheckAdminLogin: () => (/* binding */ CheckAdminLogin)\n/* harmony export */ });\n/* harmony import */ var _utils_toast_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/toast_it */ \"./src/utils/toast_it.js\");\n\r\n\r\n\r\nclass CheckAdminLogin\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #form;\r\n    #email;\r\n    #password;\r\n    constructor(adminLoginForm)\r\n    {\r\n        if(!adminLoginForm)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = \"Invalid Submission!\";\r\n        }\r\n        else \r\n        {\r\n            this.#form = adminLoginForm;\r\n\r\n            /**\r\n             * We can extract the content of this form here.\r\n             */\r\n            let email = this.#form.email.value.trim();\r\n            let password = this.#form.password.value.trim();\r\n            let emailPattern = /^[a-zA-Z0-9@\\.-]{3,26}$/;\r\n            let passwordPattern = /^[a-zA-Z0-9]{6,27}$/;\r\n\r\n            if(!emailPattern.test(email))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Please use accepted email format';\r\n            }\r\n            else if(!passwordPattern.test(password))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = \"Password format is wrong!\";\r\n            }\r\n            else \r\n            {\r\n                this.#email = email;\r\n                this.#password = password;\r\n\r\n            }\r\n\r\n        }\r\n\r\n    }\r\n\r\n\r\n    processLogin()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            /***************************\r\n             * Load the Admin Dashboard UI.\r\n             */\r\n            __webpack_require__.e(/*! import() */ \"src_admin_admin_dashboard_ui_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./admin_dashboard_ui.js */ \"./src/admin/admin_dashboard_ui.js\"))\r\n            .then(m => {\r\n\r\n                let adminDashboard = new m.AdminDashboardUi();\r\n                adminDashboard.createUi();\r\n                        \r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', 'Admin Dashboard unable to load');\r\n            });\r\n            // ==================\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/admin/check_admin_login.js?");

/***/ })

}]);