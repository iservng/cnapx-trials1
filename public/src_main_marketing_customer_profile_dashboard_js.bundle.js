"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_marketing_customer_profile_dashboard_js"],{

/***/ "./src/config/app_constants.js":
/*!*************************************!*\
  !*** ./src/config/app_constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   APP_NAME: () => (/* binding */ APP_NAME),\n/* harmony export */   COMPANY: () => (/* binding */ COMPANY),\n/* harmony export */   DEFAILT_MENU: () => (/* binding */ DEFAILT_MENU)\n/* harmony export */ });\n\r\nconst APP_NAME = 'cnapx';\r\nconst COMPANY = 'iservng';\r\nconst DEFAILT_MENU = [\r\n    `About`,\r\n    `Services`,\r\n    `Signup`,\r\n    `Signin`\r\n];\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/config/app_constants.js?");

/***/ }),

/***/ "./src/main/marketing_customer_profile_dashboard.js":
/*!**********************************************************!*\
  !*** ./src/main/marketing_customer_profile_dashboard.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MarketingProfileDashboard: () => (/* binding */ MarketingProfileDashboard)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/remove_side_nav.js */ \"./src/utils/remove_side_nav.js\");\n/* harmony import */ var _utils_remove_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/remove_modal.js */ \"./src/utils/remove_modal.js\");\n/* harmony import */ var _utils_remove_landing_page_sections_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/remove_landing_page_sections.js */ \"./src/utils/remove_landing_page_sections.js\");\n/* harmony import */ var _config_app_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/app_constants.js */ \"./src/config/app_constants.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/small_spinner.js */ \"./src/utils/small_spinner.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass MarketingProfileDashboard\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #customerName;\r\n    #db;\r\n    #collName;\r\n    #collRef;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;\r\n\r\n        console.log('this.#customerName =', this.#customerName);\r\n        this.#db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getFirestore)();\r\n        this.#collName = 'cnapx-customer';\r\n        this.#collRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.collection)(this.#db, this.#collName);\r\n        \r\n    }\r\n\r\n\r\n\r\n    /*******************************\r\n     * The public API of this Class\r\n     */\r\n    createUi()\r\n    {\r\n        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Remove Modal\r\n            (0,_utils_remove_modal_js__WEBPACK_IMPORTED_MODULE_3__.removeModal)();\r\n\r\n            // Remove Side Navigation\r\n            (0,_utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_2__.removeSidenav)();\r\n\r\n            //Remove landing page sections\r\n            (0,_utils_remove_landing_page_sections_js__WEBPACK_IMPORTED_MODULE_4__.removeLandingPageSections)();\r\n            //Call user profile menu.\r\n            \r\n            \r\n            // import('../header/agent_profile_menu.js')\r\n            __webpack_require__.e(/*! import() */ \"src_header_marketing_profile_menu_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../header/marketing_profile_menu.js */ \"./src/header/marketing_profile_menu.js\"))\r\n            .then(m => {\r\n                let usermenu = new m.MarketingProfileMenu();\r\n                usermenu.createUi();\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Error loading Menu!');\r\n            });\r\n            \r\n            //Display Content\r\n            let content = `\r\n            <div class=\"container\" style=\"\">\r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                    \r\n                    <!-- USER-PROFILE-AVARTAR  -->\r\n                    <div class=\"col s12 center-align\">\r\n                        <img src=\"./images/userprofile.png\" alt=\"\">\r\n                        <br>\r\n                        <small class=\"blue-text text-darken-3\">\r\n                            <b>\r\n                                <a href=\"#\" class=\"sidenav-trigger purple-text text-darken-4\" data-target=\"mobile-demo\">\r\n                                    ${this.#customerName}\r\n                                </a>\r\n                            </b>\r\n                        </small>\r\n                        <p>\r\n                            <b class=\"purple-text text-darken-3\">\r\n                                Marketing Manager Dashboard\r\n                            </b>\r\n                        </p>\r\n                    </div>\r\n\r\n\r\n\r\n                    <!-- FIRST SECTION OF DASHBOARD  -->\r\n                    <div class=\"col s12\" style=\"margin-bottom: 2rem; margin-top: 3rem;\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col s12 center-align\" style=\"margin-bottom: 3rem; border-bottom: 1px solid #f3e5f5; padding-bottom: 2rem;\">\r\n\r\n                                <a href=\"#\">\r\n                                    <img src=\"./images/bell.png\" alt=\"\">\r\n                                </a>\r\n                                <a href=\"#\" class=\"btn-flat\">\r\n                                    <b class=\"green-text text-darken-3\">\r\n                                        3 Notifications \r\n                                    </b>\r\n                                </a>\r\n                                \r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\">\r\n                                <img src=\"./images/pay.png\" alt=\"\">\r\n                                <p>\r\n                                    <a href=\"\" class=\"purple-text text-darken-3 btn-flat makePayment\">\r\n                                        Pay\r\n                                    </a>\r\n                                </p>\r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\" style=\"border-left: 1px solid #f3e5f5; border-right: 1px solid #f3e5f5;\">\r\n                                <img src=\"./images/qrcode.png\" alt=\"\">\r\n                                <p>\r\n                                    <a href=\"\" class=\"purple-text text-darken-3 btn-flat scan\" data-action=\"scan\">\r\n                                        Scan\r\n                                    </a>\r\n                                </p>\r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\">\r\n                                <img src=\"./images/withdraw.png\" alt=\"\">\r\n                                    <p>\r\n                                        <a href=\"#\" class=\"purple-text text-darken-3 btn-flat collectFromWallet\">\r\n                                            Collect\r\n                                        </a>\r\n                                    </p>\r\n                            </div>\r\n\r\n\r\n\r\n                            <!-- SUB-COLLECTIONS  -->\r\n                            <div class=\"col s12 purple lighten-5 center-align\" style=\"margin-top: 3rem; margin-bottom: 2rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;\">\r\n                                <p>\r\n                                    <b class=\"blue-text text-darken-1 agent_count\">\r\n                                        \r\n                                    </b>\r\n                                </p>\r\n                                <p><div class=\"divider\"></div></p>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"col s12 m6 l6\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col s12\">\r\n                                        <div class=\"card white z-depth-1\">\r\n                                            <div class=\"card-content purple-text\">\r\n                                                <span class=\"card-title\">\r\n                                                    View Marketers\r\n                                                </span>\r\n                                                <p>\r\n                                        \r\n                                                    I am convenient because I require little effort to use effectively. Hit the buttom below to pop open the agents records.\r\n                                                </p>\r\n                                            </div>\r\n                                            <div class=\"card-action\">\r\n                                                <a href=\"#\" class=\"btn-large purple marketingAgents\">\r\n                                                    Open Records\r\n                                                </a>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"col s12 m6 l6\"></div>\r\n\r\n\r\n                        </div>        \r\n                    </div>\r\n\r\n                    \r\n\r\n                    <div class=\"col s12 right-align\" style=\"margin-top: 6rem;\">\r\n                        <p>\r\n                            <div class=\"divider\"></div>\r\n                        </p>\r\n                        <small class=\"grey-text\">Powered by </small>\r\n                        <b class=\"purple-text text-darken-3\">\r\n                            ${_config_app_constants_js__WEBPACK_IMPORTED_MODULE_5__.COMPANY}\r\n                        </b>\r\n                    </div>\r\n                    \r\n                    \r\n                </div>\r\n\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n\r\n\r\n            (0,_utils_small_spinner_js__WEBPACK_IMPORTED_MODULE_7__.smallSpinner)('Checking...', '.agent_count');\r\n            // ===============\r\n            const qAgent = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.query)(this.#collRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.where)(\"userType\", \"==\", \"agent\"));\r\n            // //Agent Count\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getCountFromServer)(qAgent)\r\n            .then(snapCount => {\r\n                document.querySelector('.agent_count').innerHTML = snapCount.data().count + \" Active Marketing Agents\";\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not count the Marketing Agents');\r\n            });\r\n            // ==================\r\n\r\n\r\n            // Register event handler for marketingAgents\r\n            if(document.querySelector('.marketingAgents'))\r\n            {\r\n                document.querySelector('.marketingAgents').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#loadAgents();\r\n                    console.log(e.target);\r\n                }, false);\r\n            }\r\n\r\n\r\n\r\n            //1.\r\n            /************************************\r\n             * Logout Button Event Implementation.\r\n             */\r\n            // Stopped 12|03|2024.\r\n            if(document.querySelectorAll('.logout'))\r\n            {\r\n                let logoutButtons = document.querySelectorAll('.logout');\r\n                logoutButtons.forEach(logoutBtn => {\r\n                    logoutBtn.addEventListener('click', e => {\r\n\r\n                        e.preventDefault();\r\n                        //Dynamically import and Execute the logout class\r\n                        __webpack_require__.e(/*! import() */ \"src_utils_logout_class_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../utils/logout_class.js */ \"./src/utils/logout_class.js\"))\r\n                        .then(m => {\r\n                            let logout = new m.Logout();\r\n                            logout.logUserOut();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unexpected network issue, try again!');\r\n                        });\r\n                        // -----------------\r\n\r\n                    });\r\n                });\r\n            }\r\n            // =======================\r\n\r\n\r\n\r\n            //Make Payment\r\n            /**\r\n             * Register An event handler \r\n             */\r\n            if(document.querySelector('.makePayment'))\r\n            {\r\n                document.querySelector('.makePayment').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"src_main_customer_make_payment_ui_js\"), __webpack_require__.e(\"src_utils_progress_loader_js-_16b40\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_make_payment_ui.js */ \"./src/main/customer_make_payment_ui.js\"))\r\n                    .then(m => {\r\n                        let makePaymentUi = new m.CustomerMakePaymentUi();\r\n                        makePaymentUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load pay UI.');\r\n                    });\r\n                    // ----------------\r\n                });\r\n            }\r\n\r\n            // ===================\r\n\r\n\r\n            // SCAN QR CODE \r\n            if(document.querySelector('.scan'))\r\n            {\r\n                // console.log(\"Scan\");\r\n                document.querySelector('.scan').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    /**\r\n                     * Call and load the class responsible for the generation and or scan of qr code.\r\n                     */\r\n                    __webpack_require__.e(/*! import() */ \"src_main_qr_code_payment_ui_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./qr_code_payment_ui.js */ \"./src/main/qr_code_payment_ui.js\"))\r\n                    .then(m => {\r\n                        let qrUi = new m.QRCodePaymentUi();\r\n                        qrUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Error! Unable to load QR Code UI.');\r\n                        console.log(error.message);\r\n                    });\r\n                });\r\n            }\r\n            // ====================\r\n\r\n\r\n            //COLLECT MONEY PAID (NOTIFIED) TO OUR INTERNAL WALLET\r\n            if(document.querySelector('.collectFromWallet'))\r\n            {\r\n                document.querySelector('.collectFromWallet').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    /**\r\n                     * Dynamically call and execute the class responsible for collecting payment from user wallet to the user account\r\n                     */\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"src_main_customer_collect_money_from_wallet_ui_js\"), __webpack_require__.e(\"src_utils_progress_loader_js-_16b41\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_collect_money_from_wallet_ui.js */ \"./src/main/customer_collect_money_from_wallet_ui.js\"))\r\n                    .then(m => {\r\n                        let walletCollect = new m.CustomerCollectMoneyFromWallet();\r\n                        walletCollect.createUi();\r\n                    })\r\n                    // -------------------\r\n                });\r\n            }\r\n            // ====================\r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    async #loadAgents()\r\n    {\r\n        __webpack_require__.e(/*! import() */ \"src_main_load_agents_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./load_agents.js */ \"./src/main/load_agents.js\"))\r\n        .then(m => {\r\n            let marchants = new m.LoadAgents();\r\n            marchants.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the marchants');\r\n        });\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/marketing_customer_profile_dashboard.js?");

/***/ })

}]);