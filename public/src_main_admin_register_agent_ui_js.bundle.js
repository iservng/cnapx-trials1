"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_admin_register_agent_ui_js"],{

/***/ "./src/main/admin_register_agent_ui.js":
/*!*********************************************!*\
  !*** ./src/main/admin_register_agent_ui.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AdminRegisterAgentUi: () => (/* binding */ AdminRegisterAgentUi)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _views_create_account_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/create_account_form.js */ \"./src/views/create_account_form.js\");\n/* harmony import */ var _utils_random_pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/random_pass.js */ \"./src/utils/random_pass.js\");\n/* harmony import */ var _utils_progress_loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/progress_loader.js */ \"./src/utils/progress_loader.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass AdminRegisterAgentUi\r\n{\r\n\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #createAccountForm;\r\n    #agentPassword;\r\n    #agentUniqueCode;\r\n\r\n    constructor()\r\n    {\r\n\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n        this.#createAccountForm = (0,_views_create_account_form_js__WEBPACK_IMPORTED_MODULE_2__.getCreateAccountForm)();\r\n\r\n    }\r\n\r\n    //Class Public API\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            let content = `\r\n            <div class=\"container\">\r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                    <div class=\"col s12\" style=\"margin-bottom: 2rem;\">\r\n                        <h5>Register An Agent</h5>\r\n                        <small>\r\n                            The agent registration form should be filled carfully as details willl be used to generate a unique code specific to the particular agent.\r\n                        </small> <br>\r\n                        <b class=\"red-text\">Please note that the password field is auto-generated and should not be tempered with.</b>\r\n                    </div>\r\n\r\n                    <div class=\"col s12 m3 l3\">\r\n                        <a href=\"#\" class=\"btn-flat back-dashboard\">\r\n                            Dashboard\r\n                        </a>\r\n                        <a href=\"#\" class=\"btn-flat sidenav-trigger purple-text text-darken-4\" data-target=\"mobile-demo\">\r\n                            menu\r\n                        </a>\r\n                    </div>\r\n\r\n                    <div class=\"col s12 m6 l6\" id=\"agentInfoDiv\">\r\n                        <p><b class=\"agentTitle\">Enter Agent's Information</b></p>\r\n                        <p class=\"fields-wrapper agentContent\">\r\n                            ${this.#createAccountForm}\r\n                        </p>\r\n                    </div>\r\n\r\n                    <div class=\"col s12 m3 l3\">&nbsp;</div>\r\n\r\n                </div>\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n\r\n            //Back to dashboard\r\n            if(document.querySelector('.back-dashboard'))\r\n            {\r\n                document.querySelector('.back-dashboard').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./admin_customer_profile_dashboard.js */ \"./src/main/admin_customer_profile_dashboard.js\"))\r\n                    .then(m => {\r\n                        let dashboard = new m.AdminProfileDashboard();\r\n                        dashboard.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the dashboard');\r\n                    });\r\n                });\r\n            }\r\n\r\n            //Automatically genrate password\r\n            if(document.querySelector('#password'))\r\n            {\r\n                let passfield = document.querySelector('#password');\r\n                passfield.value = (0,_utils_random_pass_js__WEBPACK_IMPORTED_MODULE_3__.generateShortPassword)();\r\n                passfield.disabled = true;\r\n            }\r\n\r\n            //Register event handler for the form submit..\r\n            if(document.querySelector('#createAcount'))\r\n            {\r\n                document.querySelector('#createAcount').addEventListener('submit', e => {\r\n                    e.preventDefault();\r\n                    (0,_utils_progress_loader_js__WEBPACK_IMPORTED_MODULE_4__.progressLoader)('Working...!', '.createAccountBtn');\r\n                    let form = e.target;\r\n                    __webpack_require__.e(/*! import() */ \"src_modal_handlers_process_create_account_form_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../modal/handlers/process_create_account_form.js */ \"./src/modal/handlers/process_create_account_form.js\"))\r\n                    .then(m => {\r\n                        let agentType = 'agent';\r\n                        let processor = new m.CreateUserAccount(form);\r\n                        processor.registerAgent(agentType);\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load account processor');\r\n                        document.querySelector('.createAccountBtn').innerHTML = `<input type=\"submit\" id=\"btnAction\" class=\"btn-small blue blue text-darken-4-text text-darken-4\" value=\"Create Account\">`;\r\n                    });\r\n                }, false);\r\n            }\r\n        }\r\n        else \r\n        {\r\n            console.log(this.#mErrorMsg);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/admin_register_agent_ui.js?");

/***/ }),

/***/ "./src/utils/progress_loader.js":
/*!**************************************!*\
  !*** ./src/utils/progress_loader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   progressLoader: () => (/* binding */ progressLoader)\n/* harmony export */ });\n//SPMALL SPINNER..\r\nlet progressLoader = (msg = 'Checking...', classname = '.task_wrapper_div') => {\r\n    let content = `\r\n        <div class=\"center-align\" style=\"padding-top: 3rem; padding-bottom: 5rem;\">\r\n            <progress></progress>\r\n            <div><small class=\"black-text\">${msg}</small></div>\r\n        </div>\r\n    `;\r\n    document.querySelector(classname).innerHTML = '';\r\n    document.querySelector(classname).innerHTML = content;\r\n};\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/progress_loader.js?");

/***/ }),

/***/ "./src/utils/random_pass.js":
/*!**********************************!*\
  !*** ./src/utils/random_pass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generatePassword: () => (/* binding */ generatePassword),\n/* harmony export */   generateShortPassword: () => (/* binding */ generateShortPassword)\n/* harmony export */ });\n\r\nfunction generatePassword()\r\n{\r\n    const passwordLength = 12;\r\n    const includeLowerCase = true;\r\n    const includeUpperCase = true;\r\n    const includeSymbols = true;\r\n    const includeNumbers = true;\r\n\r\n    const lowerCaseChars = `abcdefgjijklmnopqrstuvwxyz`;\r\n    const upperCaseChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;\r\n    const numberChars = `0123456789`;\r\n    const symbolChars = `'@#$%^&*()|?_=+-`;\r\n\r\n    let allowedChars = ``;\r\n    let password = ``;\r\n\r\n    allowedChars += includeLowerCase ? lowerCaseChars : ``;\r\n    allowedChars += includeUpperCase ? upperCaseChars : ``;\r\n    allowedChars += includeSymbols ? symbolChars : ``;\r\n    allowedChars += includeNumbers ? numberChars : ``;\r\n\r\n    if(passwordLength <= 0)\r\n        return `(Password length must be at least one)`;\r\n    \r\n\r\n    if(allowedChars.length === 0)\r\n        return `(At least one set of characters need to be selected)`;\r\n    \r\n\r\n    for(let i = 0; i < passwordLength; i++)\r\n    {\r\n        const randomIndex = Math.floor(Math.random() * allowedChars.length);\r\n        password += allowedChars[randomIndex];\r\n    }\r\n    \r\n    return `${password}`;\r\n}\r\n\r\n\r\n\r\nfunction generateShortPassword()\r\n{\r\n    const passwordLength = 6;\r\n    const includeLowerCase = true;\r\n    const includeUpperCase = true;\r\n    const includeNumbers = true;\r\n\r\n    const lowerCaseChars = `abcdefgjijklmnopqrstuvwxyz`;\r\n    const upperCaseChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;\r\n    const numberChars = `0123456789`;\r\n\r\n    let allowedChars = ``;\r\n    let password = ``;\r\n\r\n    allowedChars += includeLowerCase ? lowerCaseChars : ``;\r\n    allowedChars += includeUpperCase ? upperCaseChars : ``;\r\n    allowedChars += includeNumbers ? numberChars : ``;\r\n\r\n    if(passwordLength <= 0)\r\n        return `(Password length must be at least one)`;\r\n    \r\n\r\n    if(allowedChars.length === 0)\r\n        return `(At least one set of characters need to be selected)`;\r\n    \r\n\r\n    for(let i = 0; i < passwordLength; i++)\r\n    {\r\n        const randomIndex = Math.floor(Math.random() * allowedChars.length);\r\n        password += allowedChars[randomIndex];\r\n    }\r\n    \r\n    return `${password}`;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils/random_pass.js?");

/***/ }),

/***/ "./src/views/create_account_form.js":
/*!******************************************!*\
  !*** ./src/views/create_account_form.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCreateAccountForm: () => (/* binding */ getCreateAccountForm)\n/* harmony export */ });\n\r\nlet getCreateAccountForm = () => {\r\n    return `\r\n    <div class=\"row\"  id=\"createAcountDiv\">\r\n        <form class=\"col s12\" id=\"createAcount\">\r\n                            \r\n                                \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"fullname\" type=\"text\" class=\"validate\">\r\n                <label for=\"fullname\" class=\"blue-text text-darken-4\">\r\n                    Enter full-name\r\n                </label>\r\n            </div>\r\n                        \r\n                        \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"phone\" type=\"text\" class=\"validate\">\r\n                <label for=\"phone\" class=\"blue-text text-darken-4\">Enter phone number</label>\r\n            </div>\r\n                    \r\n                    \r\n            <div class=\"input-field col s12\">\r\n                <input id=\"bvn\" type=\"text\" class=\"validate\">\r\n                <label for=\"bvn\" class=\"blue-text text-darken-4\">Enter BVN number</label>\r\n            </div>\r\n\r\n            <div class=\"input-field col s12\">\r\n                <input id=\"email\" type=\"email\" class=\"validate\" required>\r\n                <label for=\"email\" class=\"blue-text text-darken-4\">Email Address</label>\r\n            </div>\r\n\r\n            <div class=\"input-field col s12\">\r\n                <input id=\"password\" type=\"password\" class=\"validate\" required>\r\n                <label for=\"password\" class=\"blue-text text-darken-4\">Password</label>\r\n            </div>\r\n                            \r\n                            \r\n            <div class=\"input-field col s12 createAccountBtn\">\r\n                <input type=\"submit\" id=\"btnAction\" class=\"btn-small blue blue text-darken-4-text text-darken-4\" value=\"Create Account\">           \r\n            </div>\r\n                            \r\n                            \r\n        </form>\r\n    </div>\r\n    `;\r\n};\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/views/create_account_form.js?");

/***/ })

}]);