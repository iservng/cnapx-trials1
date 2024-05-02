"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_utils_src_logout_class_js"],{

/***/ "./src/utils_src/logout_class.js":
/*!***************************************!*\
  !*** ./src/utils_src/logout_class.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Logout: () => (/* binding */ Logout)\n/* harmony export */ });\n/* harmony import */ var _toast_it_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toast_it.js */ \"./src/utils_src/toast_it.js\");\n/* harmony import */ var _remove_side_nav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./remove_side_nav.js */ \"./src/utils_src/remove_side_nav.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Logout \r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n\r\n        /**\r\n         * Here is where we could grab the user authentication and destroy it using firebase, after which we can then process without error in the second function below\r\n         */\r\n\r\n    }\r\n\r\n    //Public API of this class\r\n    logUserOut()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //1. Dynamically Change back the menu-items\r\n            __webpack_require__.e(/*! import() */ \"src_header_app_header_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../header/app_header.js */ \"./src/header/app_header.js\"))\r\n            .then(m => {\r\n                let header = new m.AppHeader();\r\n                header.createUi();\r\n            })\r\n\r\n            //2. Dynamically Import and execute the main_content_class \r\n            __webpack_require__.e(/*! import() */ \"src_main_main_content_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../main/main_content.js */ \"./src/main/main_content.js\"))\r\n            .then(m => {\r\n                let main_content = new m.MainContent();\r\n                main_content.createUi();\r\n            })\r\n\r\n            if(document.querySelectorAll('.landing-page'))\r\n            {\r\n                \r\n                let landingPageSections = document.querySelectorAll('.landing-page');\r\n                landingPageSections.forEach(section => {\r\n                    section.style.display = 'block';\r\n                });\r\n\r\n                __webpack_require__.e(/*! import() */ \"src_modal_modal_structure_js-_ebc21\").then(__webpack_require__.bind(__webpack_require__, /*! ../modal/modal_structure.js */ \"./src/modal/modal_structure.js\"))\r\n                .then(m => {\r\n                    let modal = new m.ModalStructure();\r\n                    modal.createUi();\r\n                })\r\n                .catch(error => {\r\n                    console.log(error.message);\r\n                });\r\n            }\r\n\r\n            (0,_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_1__.removeSidenav)();\r\n            \r\n        }\r\n        else \r\n        {\r\n            (0,_toast_it_js__WEBPACK_IMPORTED_MODULE_0__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/logout_class.js?");

/***/ })

}]);