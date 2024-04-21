"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_header_app_header_js"],{

/***/ "./src/config/app_constants.js":
/*!*************************************!*\
  !*** ./src/config/app_constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   APP_NAME: () => (/* binding */ APP_NAME),\n/* harmony export */   COMPANY: () => (/* binding */ COMPANY),\n/* harmony export */   DEFAILT_MENU: () => (/* binding */ DEFAILT_MENU)\n/* harmony export */ });\n\r\nconst APP_NAME = 'cnapx';\r\nconst COMPANY = 'iservng';\r\nconst DEFAILT_MENU = [\r\n    `About`,\r\n    `Services`,\r\n    `Signup`,\r\n    `Signin`\r\n];\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/config/app_constants.js?");

/***/ }),

/***/ "./src/header/app_header.js":
/*!**********************************!*\
  !*** ./src/header/app_header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppHeader: () => (/* binding */ AppHeader)\n/* harmony export */ });\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _config_app_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/app_constants.js */ \"./src/config/app_constants.js\");\n/* harmony import */ var _utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/small_spinner.js */ \"./src/utils/small_spinner.js\");\n/* harmony import */ var _utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/remove_side_nav.js */ \"./src/utils/remove_side_nav.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * This class is responsible to taking information, then display the header part of this application using the specified information. This information in question is usually \r\n * 1. The logo name of the Application\r\n * 2. The link names.\r\n */\r\nclass AppHeader \r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #logo;\r\n    #menuLabels;\r\n    #themeColor;\r\n    #linksFontsColor;\r\n    \r\n    constructor(logoName, menuLabels)\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#logo = '';\r\n        this.#menuLabels = [];\r\n        this.#themeColor = 'purple';\r\n        this.#linksFontsColor = 'purple-text';\r\n\r\n        if(!logoName)\r\n            this.#logo = _config_app_constants_js__WEBPACK_IMPORTED_MODULE_2__.APP_NAME;\r\n        else\r\n            this.#logo = logoName;\r\n\r\n\r\n        if(!menuLabels)\r\n            this.#menuLabels = _config_app_constants_js__WEBPACK_IMPORTED_MODULE_2__.DEFAILT_MENU;\r\n        else \r\n            this.#menuLabels = menuLabels;\r\n\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n    /**\r\n    *   Public Api\r\n    */\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            /**\r\n             * We can from here after its been confirmed error free, begin to use the above list-items array to set up the main-menu display-looks\r\n             */\r\n\r\n            // console.log('ok', this.#menuLabels);\r\n            let mainMenuOutput = ``;\r\n            this.#menuLabels.forEach(label => {\r\n\r\n                if(label == 'Signin')\r\n                {\r\n\r\n                }\r\n                else \r\n                {\r\n                    mainMenuOutput += `\r\n                    <li>\r\n                        <a href=\"sass.html\" class=\"${this.#linksFontsColor}\">\r\n                            ${label}\r\n                        </a>\r\n                    </li>\r\n                    `;\r\n\r\n                }\r\n                \r\n\r\n            });\r\n            \r\n            this.content = `\r\n            <!-- SIDE NAVIGATION OF APPLICATION -->\r\n            <!-- SideNav Structure -->\r\n            <!-- SideNav Structure class=\"blue lighten-1\"-->\r\n\r\n            <ul id=\"mobile-demo\" class=\"sidenav grey lighten-3\">\r\n                <li>\r\n                    <div class=\"user-view\">\r\n                        <div class=\"background\">\r\n                            <!-- <img src=\"images/office.jpg\"> -->\r\n                        </div>\r\n                        <a href=\"#user\">\r\n                        \r\n                            <img class=\"circle\" src=\"images/logo.jpg\" style=\"margin-left: 2rem; margin-top: 2rem;\">\r\n                            \r\n                        </a>\r\n                        <a href=\"#name\">\r\n                            <span class=\"purple-text text-darken-4 name\">\r\n                                <h5><b>Cnapx</b><b class=\"purple-text text-darken-2\" style=\"font-family: tahoma;\">Pay</b></h5>\r\n                            </span>\r\n                        </a>\r\n                        <a href=\"#email\">\r\n                            <span class=\"purple-text text-darken-2 email\">\r\n                                <small>Designed for your comfort</small>\r\n                            </span>\r\n                        </a>\r\n                        \r\n                    </div>\r\n                </li>\r\n                <div class=\"divider\"></div>\r\n                <li>\r\n                    \r\n                    <a href=\"#!\" class=\"purple-text text-darken-2\">\r\n                        <b>About Cnapx</b>\r\n                    </a>\r\n\r\n                </li>\r\n                <div class=\"divider\"></div>\r\n                <li>\r\n                    <a href=\"#!\" class=\"purple-text text-darken-2\">\r\n                        <b>Our Services</b>\r\n                    </a>\r\n                </li>\r\n                <div class=\"divider\"></div>\r\n               \r\n                \r\n                <li>\r\n                    \r\n                    <a href=\"#!\" class=\"purple-text text-darken-2 sign-in\">\r\n                        <b>Sign-In</b>\r\n                    </a>\r\n                </li>\r\n                <div class=\"divider\"></div>\r\n                <li>\r\n                   \r\n                    <a href=\"#modal1\" class=\"purple-text text-darken-2 modal-trigger\">\r\n                        <b>Sign Up</b>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <!-- SIDE NAVIGATION OF APPLICATION ENDS -->\r\n\r\n\r\n            <!-- MAIN MENU OF APPLICATION -->\r\n            <!-- \r\n                Dropdown Structure \r\n            -->\r\n\r\n            <ul id=\"dropdown1\" class=\"dropdown-content\">\r\n                <li><a href=\"#!\" class=\"blue-text\">one</a></li>\r\n                <li><a href=\"#!\" class=\"blue-text\">two</a></li>\r\n                <li class=\"divider\"></li>\r\n                <li><a href=\"#!\" class=\"blue-text\">three</a></li>\r\n            </ul>\r\n\r\n            <div class=\"navbar-fixed\">\r\n                <nav class=\"grey lighten-3 z-depth-0\">\r\n                    <div class=\"container\">\r\n                        <div class=\"nav-wrapper\">\r\n\r\n                            <a href=\"#\" data-target=\"mobile-demo\" class=\"sidenav-trigger purple-text\">\r\n                                <i class=\"material-icons\">menu</i>\r\n                            </a>\r\n\r\n                            <a href=\"#!\" class=\"brand-logo\">\r\n                                <small>\r\n                                    <b class=\"purple-text text-darken-2\">Cnapx</b><b class=\"purple-text text-accent-1\" style=\"font-family: tahoma;\">Pay</b>\r\n                                </small>\r\n                            </a>\r\n\r\n                            <!--The Main-menu starts here -->\r\n                            <ul class=\"right hide-on-med-and-down\">\r\n                                <li>\r\n                                    <a href=\"#\" class=\"${this.#linksFontsColor}\">\r\n                                        About\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href=\"#\" class=\"${this.#linksFontsColor}\">\r\n                                        Services\r\n                                    </a>\r\n                                </li>\r\n\r\n                                <li>\r\n                                    <a class=\"dropdown-trigger ${this.#linksFontsColor}\" href=\"#!\" data-target=\"dropdown1\">\r\n                                        Contact\r\n                                    </a>\r\n                                </li>\r\n\r\n                                <li>\r\n                                    <a class=\"waves-effect waves-light ${this.#linksFontsColor} modal-trigger\" href=\"#modal1\">\r\n                                        Register\r\n                                    </a>\r\n                                </li>\r\n\r\n                                \r\n\r\n                                <!-- Dropdown Trigger -->\r\n                                \r\n                                <li>\r\n                                    <a class=\"purple white-text waves-effect waves-light btn sign-in\" href=\"#\">\r\n                                        Login\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                            <!--The Main-menu stops here -->\r\n                        </div>\r\n                    </div>\r\n                </nav>\r\n            </div>`;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_1__.insertIntoDOM)('header', this.content);\r\n            /**\r\n             * The Header-part of the application technically consists of two parts\r\n             * 1. the main-header.\r\n             * 2. the side navigation.\r\n             */\r\n\r\n\r\n            var sidenav = document.querySelectorAll('.sidenav');\r\n            M.Sidenav.init(sidenav);\r\n            var dropdown = document.querySelectorAll('.dropdown-trigger');\r\n            M.Dropdown.init(dropdown);\r\n\r\n\r\n\r\n            /**\r\n             * This code registers event handler for the sign-in-button\r\n             */\r\n            if(document.querySelectorAll('.sign-in'))\r\n            {\r\n                // console.log(\"Yep!\");\r\n                let signinBtns = document.querySelectorAll('.sign-in');\r\n\r\n                signinBtns.forEach(signinBtn => {\r\n                    signinBtn.addEventListener('click', e => {\r\n                        e.preventDefault();\r\n\r\n                        console.log(e.target);\r\n\r\n\r\n\r\n                        // ----------------------------\r\n\r\n                        /**\r\n                         * All the landing page items should be removed\r\n                         */\r\n                        if(document.querySelectorAll('.landing-page'))\r\n                        {\r\n                            let landingPageSections = document.querySelectorAll('.landing-page');\r\n                            // console.log(landingPageSections);\r\n                            landingPageSections.forEach(section => {\r\n                                section.style.display = 'none';\r\n                            });\r\n\r\n                        }\r\n\r\n                        /**\r\n                         * Remove the header, also using css-property \"display=none\"\r\n                         */\r\n                        if(document.querySelector('header'))\r\n                        {\r\n                            let header = document.querySelector('header');\r\n                            header.style.display = 'none';\r\n                        }\r\n\r\n\r\n                        (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_3__.smallSpinner)('Working', 'main');\r\n                        (0,_utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_4__.removeSidenav)();\r\n                        \r\n                        // import and display the customer login interface\r\n                        __webpack_require__.e(/*! import() */ \"src_main_customer_login_interface_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../main/customer_login_interface.js */ \"./src/main/customer_login_interface.js\"))\r\n                        .then(m => {\r\n                            let customerLoginUi = new m.CustomerLoginInterface();\r\n                            customerLoginUi.createUi();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', 'Error! Please try latter');\r\n                        });\r\n                        \r\n                        // =========================\r\n                        \r\n\r\n\r\n                    });\r\n                });\r\n\r\n            }\r\n            \r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/header/app_header.js?");

/***/ })

}]);