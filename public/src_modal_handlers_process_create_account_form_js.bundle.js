"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_modal_handlers_process_create_account_form_js"],{

/***/ "./src/modal/handlers/process_create_account_form.js":
/*!***********************************************************!*\
  !*** ./src/modal/handlers/process_create_account_form.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CreateUserAccount: () => (/* binding */ CreateUserAccount)\n/* harmony export */ });\n/* harmony import */ var _utils_src_small_spinner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils_src/small_spinner.js */ \"./src/utils_src/small_spinner.js\");\n/* harmony import */ var _utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils_src/toast_it.js */ \"./src/utils_src/toast_it.js\");\n/* harmony import */ var _utils_src_lower_remv_spaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils_src/lower_remv_spaces.js */ \"./src/utils_src/lower_remv_spaces.js\");\n/* harmony import */ var _utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils_src/insert_into_DOM.js */ \"./src/utils_src/insert_into_DOM.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n\r\n\r\n/**\r\n * THIS CLASS RECIEVE THE FORM OBJECT FOR CREATE-ACCOUNT\r\n * -------------------------------------------------------\r\n * Then user its internal methods for the processing of the form.\r\n * \r\n */\r\n\r\n\r\n\r\n\r\n// import { getEmailAndPassword } from \"../../test.js\";\r\n\r\n\r\n\r\n\r\n// import { generateShortPassword } from \"../../utils/random_pass.js\";\r\n\r\nclass CreateUserAccount \r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #form;\r\n    #auth;\r\n    #userData;\r\n\r\n    constructor(createAcctForm)\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = ``;\r\n        \r\n        if(!createAcctForm)\r\n        {\r\n            this.#_mErrors++;\r\n            this.#mErrorMsg = ``;\r\n            (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Invalid form submission');\r\n        }\r\n        else \r\n        {\r\n\r\n            let namePattern = /^([a-zA-Z]{3,20})(\\s)([a-zA-z]{3,20})(\\s)?([a-zA-Z]{3,20})?$/;\r\n            let phonePattern = /^(0)([7-9])([0-1])(\\d){8}$/;\r\n            let bvnPattern = /^[\\d]{11}$/;\r\n            let emailPatern = /^[a-zA-Z0-9@\\.-]{3,30}$/;\r\n            let passwordPatern = /^[a-zA-Z0-9@]{5,25}$/;\r\n\r\n\r\n            this.#form = createAcctForm;\r\n            if(!namePattern.test(this.#form.fullname.value.trim()))\r\n            {\r\n                \r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = \"Your full name is required!\";\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            }\r\n            else if(!phonePattern.test(this.#form.phone.value.trim()))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Phone number is required!';\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            }\r\n            else if(!bvnPattern.test(this.#form.bvn.value.trim()))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Your BVN number is required!';\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            }\r\n            else if(!emailPatern.test(this.#form.email.value.trim()))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = this.#form.email.value + ' is Invalid!';\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n\r\n            }\r\n            else if(!passwordPatern.test(this.#form.password.value.trim()))\r\n            {\r\n                this.#_mErrors++;\r\n                this.#mErrorMsg = 'Your password is Invalid!';\r\n                (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            }\r\n            else \r\n            {\r\n\r\n                this.#userData = {\r\n                    name: this.#form.fullname.value.trim().toUpperCase(),\r\n                    phone: this.#form.phone.value.trim(),\r\n                    bvn: this.#form.bvn.value.trim(),\r\n                    email: this.#form.email.value.trim(),\r\n                    password: this.#form.password.value.trim()\r\n                };\r\n                this.#auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_5__.getAuth)();\r\n\r\n                /**\r\n                 * Make it available in the user session..\r\n                 */\r\n                sessionStorage.setItem('customerInfo', JSON.stringify(this.#userData));\r\n\r\n            }\r\n\r\n        }\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n    //\r\n    async registerAgent(agent)\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Process the account of the aggent//checkCredentials\r\n            console.log(this.#userData);\r\n            let agentPassword = this.#userData.password.trim();\r\n            this.#userData['userType'] = agent;\r\n            this.#userData['createdOn'] = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.serverTimestamp)();\r\n            this.#userData['activated'] = false;\r\n\r\n\r\n            //Register the email and password to the authentication service of firebase.\r\n            // Signed up \r\n            // const user = userCredential.user;\r\n            // I have removed the code that add this user o the firebase-auth service. \r\n            // 2. it should be when the user check = checking-registration-status should be designe and implemented. \r\n            // 3. 16|03|2024\r\n            this.#addUserAgentsInfo(agent, agentPassword);\r\n            \r\n        }\r\n        else \r\n        {\r\n            (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n        }\r\n\r\n    } \r\n\r\n\r\n\r\n    async #addUserAgentsInfo(agent, agentPassword)\r\n    {\r\n\r\n        // just before we add this user, we want to check for the existance of this email. \r\n        //1. if exists exit and warn cause email is already registered\r\n        //2. If not exists then continue with the rest of the code.\r\n\r\n        let email = this.#userData.email;\r\n        let password = agentPassword;\r\n        let q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getFirestore)(), 'cnapx-customer'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)('email', '==', email), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)('activated', '==', false), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)('password', '==', password));\r\n\r\n        //If this query count return only one value then everything is ok\r\n        let docSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocsFromServer)(q);\r\n        if(docSnapshot.empty)\r\n        {\r\n            \r\n            // ==============================\r\n            //add the object to the database\r\n            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getFirestore)(), 'cnapx-customer'), this.#userData)\r\n            .then(docRef => {\r\n                //This is where the newly created user id is returned\r\n                let agentUniqueCode = docRef.id;\r\n                this.#displayAgentUserLoginCredentials(agentPassword, agentUniqueCode);\r\n\r\n                //Register event handler for. \r\n                if(document.querySelector('.got_it'))\r\n                {\r\n                    document.querySelector('.got_it').addEventListener('click', e => {\r\n                        e.preventDefault();\r\n                        this.#callBackRegisterUi(agent);\r\n                    });\r\n                }\r\n            })\r\n            .catch(error => {\r\n                console.log(error.message);\r\n            });\r\n        }\r\n        else if(docSnapshot.size > 1)\r\n        {\r\n            let title = `Account Already in Use!`;\r\n            let body = `The email already exists in our system. To start you application as a staff your email has to be unique, Thanks.`;\r\n            this.#reportIssues(title, body);\r\n        }\r\n        else \r\n            (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Invalid Request or Network Error');\r\n    }\r\n\r\n\r\n\r\n    #reportIssues(title, body)\r\n    {\r\n        let content = `\r\n            <div class=\"row\">\r\n                <div class=\"col s12\">\r\n                    <div class=\"card z-depth-0\">\r\n                        <div class=\"card-content black-text\">\r\n                            <span class=\"card-title red\">\r\n                                ${title}\r\n                            </span>\r\n                            <p>${body}</p>\r\n                        </div>\r\n                        <div class=\"card-action white\">\r\n                            <a href=\"#\" class=\"btn-small purple darken-3 dashboard\">understood ok</a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n            document.querySelector('#agentInfoDiv').innerHTML = ``;\r\n            (0,_utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_3__.insertIntoDOM)('#agentInfoDiv', content);\r\n\r\n            //Register event handler for dashboard\r\n            if(document.querySelector('.dashboard'))\r\n            {\r\n                document.querySelector('.dashboard').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.all(/*! import() */[__webpack_require__.e(\"src_main_admin_customer_profile_dashboard_js\"), __webpack_require__.e(\"src_utils_src_remove_landing_page_sections_js-src_utils_src_remove_modal_js-_d1e0-_da580\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../main/admin_customer_profile_dashboard.js */ \"./src/main/admin_customer_profile_dashboard.js\"))\r\n                    .then(m => {\r\n                        let dashboard = new m.AdminProfileDashboard();\r\n                        dashboard.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load dashboard');\r\n                    });\r\n                }, false);\r\n            }\r\n    }\r\n\r\n    #displayAgentUserLoginCredentials(agentPassword, agentUniqueCode)\r\n    {\r\n        let content = `\r\n            <div class=\"row\">\r\n                <div class=\"col s12\">\r\n                    <div class=\"card purple lighten-5 z-depth-0\">\r\n                        <div class=\"card-content black-text\">\r\n                            <span class=\"card-title\">\r\n                                Details for Login Credentials\r\n                            </span>\r\n                            <p>Email: <b>${this.#userData.email}</b></p>\r\n                            <p>Password: <b>${agentPassword}</b></p>\r\n                            <p>Agent Code: <b>${agentUniqueCode}</b></p>\r\n                        </div>\r\n                        <div class=\"card-action white\">\r\n                            <a href=\"#\" class=\"btn-small purple darken-3 got_it\">Got It ok</a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n            document.querySelector('#agentInfoDiv').innerHTML = ``;\r\n            (0,_utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_3__.insertIntoDOM)('#agentInfoDiv', content);\r\n\r\n\r\n    }\r\n\r\n\r\n    //This function is simple used to put a back the register ui after a registration is successfully confirmed, then to register another user\r\n    #callBackRegisterUi(agent)\r\n    {\r\n        switch (agent) {\r\n            case \"marketing\":\r\n                __webpack_require__.e(/*! import() */ \"src_main_admin_register_marketing_manager_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../main/admin_register_marketing_manager.js */ \"./src/main/admin_register_marketing_manager.js\"))\r\n                .then(m => {\r\n                    let ui = new m.AdminRegisterMarketingManagerUi();\r\n                    ui.createUi();\r\n                })\r\n                .catch(error => {\r\n                    console.log(error.message);\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', `Unable to load the ${agent} register ui`);\r\n                });\r\n                break;\r\n            case 'finance':\r\n                __webpack_require__.e(/*! import() */ \"src_main_admin_register_financial_officer_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../main/admin_register_financial_officer.js */ \"./src/main/admin_register_financial_officer.js\"))\r\n                .then(m => {\r\n                    let ui = new m.AdminRegisterFinancialOfficerUi();\r\n                    ui.createUi();\r\n                })\r\n                .catch(error => {\r\n                    console.log(error.message);\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', `Unable to load ${agent} register ui`);\r\n                });\r\n            default:\r\n                break;\r\n        }\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n    /***********************************\r\n     * *********************************\r\n     * Public API\r\n     * 704 x 371 modal dimenssion\r\n     */\r\n    checkCredentials()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            //Check if the account being register is an agent account this will check the session-variable..\r\n            if(document.querySelector('#createAcountDiv'))\r\n            {\r\n                (0,_utils_src_small_spinner_js__WEBPACK_IMPORTED_MODULE_0__.smallSpinner)('Working...', '#createAcountDiv');\r\n                __webpack_require__.e(/*! import() */ \"src_modal_handlers_customer_registration_type_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../modal/handlers/customer_registration_type.js */ \"./src/modal/handlers/customer_registration_type.js\"))\r\n                .then(m => {\r\n                    let customerType = new m.CustomerRegisterType();\r\n                    customerType.createUi();//\r\n                })\r\n                .catch(error => {\r\n                    console.log(error.message);\r\n                    (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', `Unexpected Customer type not found`);\r\n                });\r\n            }\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_src_toast_it_js__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', this.#mErrorMsg);\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n\r\n    }\r\n\r\n\r\n    #removeModal()\r\n    {\r\n        let modals = document.querySelectorAll('.modal');\r\n        modals.forEach(instance => {\r\n            let inst = M.Modal.getInstance(instance);\r\n            inst.close();\r\n        })\r\n    }\r\n\r\n\r\n    \r\n\r\n\r\n//.....................\r\n    #errorReport()\r\n    {\r\n        let content = `\r\n            <div class=\"row\">\r\n                <div class=\"col s12\">\r\n                    <div class=\"card pink lighten-5 z-depth-0\">\r\n                    <div class=\"card-content red-text\">\r\n                        <span class=\"card-title\">Error!</span>\r\n                        <p>\r\n                            It looks like your device does not have a proper network connection.\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"card-action\">\r\n                        <a href=\"#\" class=\"btn-small red darken-3 removeModal\">This is True</a>\r\n                    </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        `;\r\n        (0,_utils_src_insert_into_DOM_js__WEBPACK_IMPORTED_MODULE_3__.insertIntoDOM)('#createAcountDiv', content);\r\n\r\n\r\n\r\n        if(document.querySelector('.removeModal'))\r\n        {\r\n            document.querySelector('.removeModal').addEventListener('click', e => {\r\n                e.preventDefault();\r\n                this.#removeModal();\r\n            });\r\n        }\r\n        \r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/modal/handlers/process_create_account_form.js?");

/***/ }),

/***/ "./src/utils_src/lower_remv_spaces.js":
/*!********************************************!*\
  !*** ./src/utils_src/lower_remv_spaces.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   lowAndRemvSpce: () => (/* binding */ lowAndRemvSpce)\n/* harmony export */ });\n\r\nfunction lowAndRemvSpce(str) { \r\n    return str.replace(/\\s/g, '').toLowerCase(); \r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/utils_src/lower_remv_spaces.js?");

/***/ })

}]);