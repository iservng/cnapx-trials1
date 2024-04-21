"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_admin_customer_profile_dashboard_js"],{

/***/ "./src/main/admin_customer_profile_dashboard.js":
/*!******************************************************!*\
  !*** ./src/main/admin_customer_profile_dashboard.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AdminProfileDashboard: () => (/* binding */ AdminProfileDashboard)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM.js */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it.js */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/remove_side_nav.js */ \"./src/utils/remove_side_nav.js\");\n/* harmony import */ var _utils_remove_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/remove_modal.js */ \"./src/utils/remove_modal.js\");\n/* harmony import */ var _utils_remove_landing_page_sections_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/remove_landing_page_sections.js */ \"./src/utils/remove_landing_page_sections.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass AdminProfileDashboard\r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #customerName;\r\n    #totalMarchants;\r\n    #db;\r\n    #colname;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        let customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;\r\n\r\n        if(!customerName || customerName == null)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = \"Customer not found\";\r\n        }\r\n        else \r\n        {\r\n            this.#customerName = customerName;\r\n            this.#db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getFirestore)();\r\n            this.#colname = 'cnapx-customer';\r\n        }\r\n    }\r\n\r\n\r\n\r\n    /*******************************\r\n     * The public API of this Class\r\n     */\r\n    createUi()\r\n    {\r\n        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Remove Modal\r\n            (0,_utils_remove_modal_js__WEBPACK_IMPORTED_MODULE_3__.removeModal)();\r\n\r\n            // Remove Side Navigation\r\n            (0,_utils_remove_side_nav_js__WEBPACK_IMPORTED_MODULE_2__.removeSidenav)();\r\n\r\n            //Remove landing page sections\r\n            (0,_utils_remove_landing_page_sections_js__WEBPACK_IMPORTED_MODULE_4__.removeLandingPageSections)();\r\n            //Call user profile menu.\r\n            \r\n            __webpack_require__.e(/*! import() */ \"src_header_admin_profile_menu_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../header/admin_profile_menu.js */ \"./src/header/admin_profile_menu.js\"))\r\n            .then(m => {\r\n                let usermenu = new m.AdminProfileMenu();\r\n                usermenu.createUi();\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Error loading Menu!');\r\n            });\r\n\r\n\r\n            //Display Content\r\n            let content = `\r\n            <div class=\"container\" style=\"\">\r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n                    \r\n                    <!-- USER-PROFILE-AVARTAR  -->\r\n                    <div class=\"col s12 center-align\">\r\n                        <img src=\"./images/userprofile.png\" alt=\"\">\r\n                        <br>\r\n                        <small class=\"blue-text text-darken-3\">\r\n                            <b>\r\n                                <a href=\"#\" class=\"sidenav-trigger purple-text text-darken-4\" data-target=\"mobile-demo\">\r\n                                    ${this.#customerName}\r\n                                </a>\r\n                            </b>\r\n                        </small>\r\n                        <p>\r\n                            <b class=\"purple-text text-darken-3\">\r\n                                Account Dashboard\r\n                            </b>\r\n                        </p>\r\n                    </div>\r\n\r\n\r\n\r\n                    <!-- FIRST SECTION OF DASHBOARD  -->\r\n                    <div class=\"col s12\" style=\"margin-bottom: 2rem; margin-top: 3rem;\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col s12 center-align\" style=\"margin-bottom: 3rem; border-bottom: 1px solid #f3e5f5; padding-bottom: 2rem;\">\r\n\r\n                                <a href=\"#\">\r\n                                    <img src=\"./images/bell.png\" alt=\"\">\r\n                                </a>\r\n                                <a href=\"#\" class=\"btn-flat\">\r\n                                    <b class=\"green-text text-darken-3\">\r\n                                        3 Notifications \r\n                                    </b>\r\n                                </a>\r\n\r\n                                <a href=\"#\" class=\"btn-flat\">\r\n                                    <b class=\"purple-text text-darken-3 records\">\r\n                                        Records\r\n                                    </b>\r\n                                </a>\r\n\r\n                                <a href=\"#\" class=\"btn-flat\">\r\n                                    <b class=\"purple-text text-darken-3 bookKeeping\">\r\n                                        Shop\r\n                                    </b>\r\n                                </a>\r\n                                \r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\">\r\n                                <img src=\"./images/pay.png\" alt=\"\">\r\n                                <p>\r\n                                    <a href=\"\" class=\"purple-text text-darken-3 btn-flat makePayment\">\r\n                                        Pay\r\n                                    </a>\r\n                                </p>\r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\" style=\"border-left: 1px solid #f3e5f5; border-right: 1px solid #f3e5f5;\">\r\n                                <img src=\"./images/qrcode.png\" alt=\"\">\r\n                                <p>\r\n                                    <a href=\"\" class=\"purple-text text-darken-3 btn-flat scan\" data-action=\"scan\">\r\n                                        Scan\r\n                                    </a>\r\n                                </p>\r\n                            </div>\r\n\r\n                            <div class=\"col s4 center-align\">\r\n                                <img src=\"./images/withdraw.png\" alt=\"\">\r\n                                    <p>\r\n                                        <a href=\"#\" class=\"purple-text text-darken-3 btn-flat collectFromWallet\">\r\n                                            Collect\r\n                                        </a>\r\n                                    </p>\r\n                            </div>\r\n\r\n\r\n\r\n                            <!-- SUB-COLLECTIONS  -->\r\n                            <div class=\"col s12 purple lighten-5\" style=\"margin-top: 3rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;\">\r\n                            \r\n                                <p>\r\n                                    <b class=\"blue-text text-darken-1\">\r\n                                        Recent Transactions\r\n                                    </b>\r\n                                </p>\r\n                                <p><div class=\"divider\"></div></p>\r\n                                \r\n                                <small>\r\n                                    <ul class=\"collection z-depth-3\" style=\"border: 1px solid #f3e5f5 ;\">\r\n                                        <li class=\"collection-item avatar\">\r\n                                            \r\n                                            <i class=\"material-icons circle white green-text\">\r\n                                                &checkmark;\r\n                                            </i>\r\n                                            <b class=\"title\">\r\n                                                <small class=\"green-text text-darken-3\">\r\n                                                    <a href=\"#\" class=\"Total numberMarchantCustomers\">Total Number Marchant Customers</a>\r\n                                                </small>\r\n                                            </b>\r\n                                            <p>\r\n                                                Marchant Customer Details\r\n                                            </p>\r\n                                            <a href=\"#!\" class=\"secondary-content marchant_cust_count\">0</a>\r\n\r\n                                        </li>\r\n\r\n                                        <li class=\"collection-item avatar\">\r\n                                            <i class=\"material-icons circle white green-text\">\r\n                                                &checkmark;\r\n                                            </i>\r\n                                            <b class=\"title\">\r\n                                                <small class=\"grey-text text-darken-3\">\r\n                                                    <a href=\"#\" class=\"individualCustomers\">    Total Individual Customers\r\n                                                    </a>\r\n                                                </small>\r\n                                            </b>\r\n                                            <p>\r\n                                                Open individual-Customer Details\r\n                                            </p>\r\n                                            <a href=\"#!\" class=\"secondary-content individual_cust_count\">0</a>\r\n\r\n                                        </li>\r\n\r\n                                        <li class=\"collection-item avatar\">\r\n                                            <i class=\"material-icons circle white green-text\">&check;</i>\r\n                                            <b class=\"title\">\r\n                                                <small class=\"green-text text-darken-3\">\r\n                                                    <a href=\"#\" class=\"marketingAgents\">\r\n                                                        Total Number Marketing Agents\r\n                                                    </a>\r\n                                                    \r\n                                                </small>\r\n                                            </b>\r\n                                            <p>\r\n                                                View Marketing Agents Details\r\n                                            </p>\r\n                                            <a href=\"#!\" class=\"secondary-content agent_count\">0</a>\r\n\r\n                                        </li>\r\n                                        <li class=\"collection-item avatar\">\r\n                                            <i class=\"material-icons circle white green-text\">&cross;</i>\r\n\r\n                                            <b class=\"title\">\r\n                                                <small class=\"red-text text-accent-4\">\r\n                                                    <a href=\"#\" class=\"adminUser\">Total Number of Admin Users</a>\r\n                                                </small>\r\n                                            </b>\r\n                                            <p class=\"purple-text text-darken-4\">\r\n                                                View Admin User Details\r\n                                            </p>\r\n                                            <a href=\"#!\" class=\"secondary-content admin_count\">0</a>\r\n\r\n                                        </li>\r\n                                    </ul>\r\n                                </small>\r\n                            </div>\r\n\r\n\r\n                        </div>        \r\n                    </div>\r\n\r\n                    \r\n\r\n                    <div class=\"col s12 right-align\" style=\"margin-top: 6rem;\">\r\n                        <p>\r\n                            <div class=\"divider\"></div>\r\n                        </p>\r\n                        <small class=\"grey-text\">Powered by </small>\r\n                        <b class=\"purple-text text-darken-3\">\r\n                            iservng\r\n                        </b>\r\n                    </div>\r\n                    \r\n                    \r\n                </div>\r\n\r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n\r\n\r\n            //Register event handler for  numberMarchantCustomers\r\n            if(document.querySelector('.numberMarchantCustomers'))\r\n            {\r\n                document.querySelector('.numberMarchantCustomers').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#loadMarchantCustomers();\r\n                });\r\n            }\r\n\r\n            //Register event handler for individualCustomers\r\n            if(document.querySelector('.individualCustomers'))\r\n            {\r\n                document.querySelector('.individualCustomers').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#loadIndividualCustomers();\r\n                }, false);\r\n            }\r\n\r\n\r\n            //Register event handler for marketingAgents\r\n            if(document.querySelector('.marketingAgents'))\r\n            {\r\n                document.querySelector('.marketingAgents').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    this.#loadAgents();\r\n                }, false);\r\n            }\r\n\r\n\r\n            //Register event handler for the adminUser\r\n            if(document.querySelector('.adminUser'))\r\n            {\r\n                document.querySelector('.adminUser').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    // this.#loadIndividualCustomers();\r\n                    // this.#loadAgents();\r\n                    this.#loadAdmins();\r\n                }, false);\r\n            }\r\n\r\n\r\n\r\n\r\n\r\n\r\n            //Implementing Dashboard Metrix\r\n            const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(this.#db, this.#colname);\r\n\r\n            // Create a query against the collection.\r\n            const qMarchant = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)(\"userType\", \"==\", \"marchant\"));\r\n            const qIndividual = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)(\"userType\", \"==\", \"individual\"));\r\n            const qAgent = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)(\"userType\", \"==\", \"agent\"));\r\n            const qAdmin = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)(\"userType\", \"==\", \"admin\"));\r\n\r\n            //Marchant Count\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getCountFromServer)(qMarchant)\r\n            .then(snapCount => {\r\n                document.querySelector('.marchant_cust_count').innerHTML = snapCount.data().count;\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not count the Marchant Customers');\r\n            });\r\n\r\n            //Individual Count\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getCountFromServer)(qIndividual)\r\n            .then(snapCount => {\r\n                document.querySelector('.individual_cust_count').innerHTML = snapCount.data().count;\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not count the Individual Customers');\r\n            });\r\n\r\n\r\n\r\n            //Agent Count\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getCountFromServer)(qAgent)\r\n            .then(snapCount => {\r\n                document.querySelector('.agent_count').innerHTML = snapCount.data().count;\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not count the Marketing Agents');\r\n            });\r\n\r\n\r\n            //Admin Count\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getCountFromServer)(qAdmin)\r\n            .then(snapCount => {\r\n                document.querySelector('.admin_count').innerHTML = snapCount.data().count;\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n                (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not count the Admin Users');\r\n            });\r\n\r\n\r\n\r\n\r\n\r\n\r\n            //1.\r\n            /**************************************\r\n             *  Logout Button Event Implementation\r\n             * ************************************\r\n             */\r\n\r\n            if(document.querySelector('.records'))\r\n            {\r\n                document.querySelector('.records').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    // console.log(\"ok Fanta.\");\r\n                    __webpack_require__.e(/*! import() */ \"src_shop_records_ui_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../shop/records_ui.js */ \"./src/shop/records_ui.js\"))\r\n                    .then(m => {\r\n\r\n                        let recordUi = new m.RecordsUi();\r\n                        recordUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the record UI');\r\n                    });\r\n                    // this.#\r\n                })\r\n\r\n            }\r\n\r\n\r\n\r\n\r\n\r\n            if(document.querySelectorAll('.logout'))\r\n            {\r\n                let logoutButtons = document.querySelectorAll('.logout');\r\n                logoutButtons.forEach(logoutBtn => {\r\n                    logoutBtn.addEventListener('click', e => {\r\n                        e.preventDefault();\r\n\r\n                        \r\n                        //Dynamically import and Execute the logout class\r\n                        // ---- \r\n                        __webpack_require__.e(/*! import() */ \"src_utils_logout_class_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../utils/logout_class.js */ \"./src/utils/logout_class.js\"))\r\n                        .then(m => {\r\n                            let logout = new m.Logout();\r\n                            logout.logUserOut();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unexpected network issue, try again!');\r\n                        });\r\n                    });\r\n                });\r\n            }\r\n            // =======================\r\n\r\n\r\n\r\n            //Make Payment\r\n            /**\r\n             * Register An event handler \r\n             */\r\n            if(document.querySelector('.makePayment'))\r\n            {\r\n                document.querySelector('.makePayment').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"src_main_customer_make_payment_ui_js\"), __webpack_require__.e(\"src_utils_progress_loader_js-_16b40\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_make_payment_ui.js */ \"./src/main/customer_make_payment_ui.js\"))\r\n                    .then(m => {\r\n                        let makePaymentUi = new m.CustomerMakePaymentUi();\r\n                        makePaymentUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load pay UI.');\r\n                    });\r\n                    // ----------------\r\n                });\r\n            }\r\n\r\n            // ===================\r\n\r\n\r\n            // SCAN QR CODE \r\n            if(document.querySelector('.scan'))\r\n            {\r\n                // console.log(\"Scan\");\r\n                document.querySelector('.scan').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    /**\r\n                     * Call and load the class responsible for the generation and or scan of qr code.\r\n                     */\r\n                    __webpack_require__.e(/*! import() */ \"src_main_qr_code_payment_ui_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./qr_code_payment_ui.js */ \"./src/main/qr_code_payment_ui.js\"))\r\n                    .then(m => {\r\n                        let qrUi = new m.QRCodePaymentUi();\r\n                        qrUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Error! Unable to load QR Code UI.');\r\n                        console.log(error.message);\r\n                    });\r\n                });\r\n            }\r\n            // ====================\r\n\r\n\r\n            //COLLECT MONEY PAID (NOTIFIED) TO OUR INTERNAL WALLET\r\n            if(document.querySelector('.collectFromWallet'))\r\n            {\r\n                document.querySelector('.collectFromWallet').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    /**\r\n                     * Dynamically call and execute the class responsible for collecting payment from user wallet to the user account\r\n                     */\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"src_main_customer_collect_money_from_wallet_ui_js\"), __webpack_require__.e(\"src_utils_progress_loader_js-_16b41\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_collect_money_from_wallet_ui.js */ \"./src/main/customer_collect_money_from_wallet_ui.js\"))\r\n                    .then(m => {\r\n                        let walletCollect = new m.CustomerCollectMoneyFromWallet();\r\n                        walletCollect.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load collect money ui');\r\n                    });\r\n                });\r\n            }\r\n            // ====================\r\n\r\n            /**\r\n             * BOOK KEEPING TRIGER CODE\r\n             * *************************\r\n             */\r\n            if(document.querySelectorAll('.bookKeeping'))\r\n            {\r\n                let bookKeepingBtns = document.querySelectorAll('.bookKeeping');\r\n                bookKeepingBtns.forEach(btn => {\r\n                    btn.addEventListener('click', e => {\r\n                        e.preventDefault();\r\n                        /**\r\n                         * Dynamically import and execute the shopping-cart class\r\n                         */\r\n                        Promise.all(/*! import() */[__webpack_require__.e(\"src_shoppingCart_shopping_cart_home_page_js\"), __webpack_require__.e(\"src_indexeddb_offlinedb_js-src_shoppingCart_sample_data_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../shoppingCart/shopping_cart_home_page.js */ \"./src/shoppingCart/shopping_cart_home_page.js\"))\r\n                        .then(m => {\r\n                            let shoppingCart = new m.ShoppingCartHomePage();\r\n                            shoppingCart.createUi();\r\n                        })\r\n                        .catch(error => {\r\n                            console.log(error.message);\r\n                            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', \"Unable to load Shopping Cart!\");\r\n                        });\r\n                    });\r\n                });\r\n            }\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n//\r\n    async #loadMarchantCustomers()\r\n    {\r\n        __webpack_require__.e(/*! import() */ \"src_main_load_marchant_customers_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./load_marchant_customers.js */ \"./src/main/load_marchant_customers.js\"))\r\n        .then(m => {\r\n            let marchants = new m.LoadMarchantCustomers();\r\n            marchants.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the marchants');\r\n        });\r\n\r\n    }\r\n\r\n    async #loadIndividualCustomers()\r\n    {\r\n        __webpack_require__.e(/*! import() */ \"src_main_load_individual_customers_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./load_individual_customers.js */ \"./src/main/load_individual_customers.js\"))\r\n        .then(m => {\r\n            let marchants = new m.LoadIndividualCustomers();\r\n            marchants.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the marchants');\r\n        });\r\n\r\n    }\r\n\r\n    //\r\n    async #loadAgents()//LoadAgents\r\n    {\r\n        __webpack_require__.e(/*! import() */ \"src_main_load_agents_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./load_agents.js */ \"./src/main/load_agents.js\"))\r\n        .then(m => {\r\n            let marchants = new m.LoadAgents();\r\n            marchants.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the marchants');\r\n        });\r\n\r\n    }\r\n\r\n    //this.#loadAdmins();\r\n    async #loadAdmins()//LoadAgents\r\n    {\r\n        __webpack_require__.e(/*! import() */ \"src_main_load_admins_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./load_admins.js */ \"./src/main/load_admins.js\"))\r\n        .then(m => {\r\n            let admins = new m.LoadAdmins();\r\n            admins.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n            (0,_utils_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load the admins');\r\n        });\r\n\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/admin_customer_profile_dashboard.js?");

/***/ })

}]);