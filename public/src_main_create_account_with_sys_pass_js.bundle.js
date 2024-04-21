"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcnapx_trials"] = self["webpackChunkcnapx_trials"] || []).push([["src_main_create_account_with_sys_pass_js"],{

/***/ "./src/main/create_account_with_sys_pass.js":
/*!**************************************************!*\
  !*** ./src/main/create_account_with_sys_pass.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CreateAccountWithSysPass: () => (/* binding */ CreateAccountWithSysPass)\n/* harmony export */ });\n/* harmony import */ var _utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/insert_into_DOM */ \"./src/utils/insert_into_DOM.js\");\n/* harmony import */ var _utils_toast_it__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast_it */ \"./src/utils/toast_it.js\");\n/* harmony import */ var _utils_progress_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/progress_loader.js */ \"./src/utils/progress_loader.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass CreateAccountWithSysPass \r\n{\r\n    #_mErrors;\r\n    #mErrorMsg;\r\n    #email;\r\n    #userData;\r\n    #docId;\r\n    #auth;\r\n    constructor()\r\n    {\r\n        this.#_mErrors = 0;\r\n        this.#mErrorMsg = '';\r\n        this.#auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.getAuth)();\r\n    }\r\n\r\n    createUi()\r\n    {\r\n        if(this.#_mErrors == 0)\r\n        {\r\n            let content = `\r\n            <div class=\"container\">\r\n            \r\n                <div class=\"row\" style=\"margin-top: 3rem;\">\r\n\r\n                    <div class=\"col s12 center-align\" style=\"margin-bottom: 2rem;\">    \r\n                        <h4>\r\n                            <small>\r\n                                <b class=\"purple-text text-darken-3\">\r\n                                    Create Account \r\n                                </b>\r\n                            </small>\r\n                        </h4>\r\n                        <small>\r\n                            Using the system 6-digit pass-code as the password create an account in the system.\r\n                        </small>\r\n                    </div>\r\n\r\n                    <div class=\"col s12 m4 l4\"></div>\r\n\r\n                    \r\n                    <div class=\"col s12 m4 l4\" id=\"contentWrapper\">\r\n                        <form action=\"\" id=\"createUserWithSystemPinForm\">\r\n                            <div class=\"card-panel lighten-4 z-depth-0\" style=\"border: 1px solid white;\">\r\n                                <div class=\"white-text\">\r\n\r\n                                    <!-- Email  -->\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col s12\">\r\n                                                    \r\n                                            <div class=\"input-field\">\r\n                                                <input id=\"email\" type=\"email\" class=\"validate\" style=\"border-bottom: 1px solid purple;\">\r\n\r\n                                                <label for=\"email\" class=\"purple-text\">Email</label>\r\n                                                        \r\n                                                <span class=\"helper-text\" data-error=\"wrong\" data-success=\"right\">Enter valid email only</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <!-- Password  -->\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col s12\">\r\n                                                    \r\n                                            <div class=\"input-field\">\r\n\r\n                                                <input id=\"password\" type=\"password\" class=\"validate\" style=\"border-bottom: 1px solid purple;\">\r\n\r\n                                                <label for=\"password\" class=\"purple-text\">System Pass Code</label>\r\n\r\n                                                <span class=\"helper-text\" data-error=\"wrong\" data-success=\"right\">Enter 6-digits Pass-Code \r\n\r\n                                                </span>\r\n\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                        \r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"card-panel lighten-4 z-depth-0\">\r\n                                <div class=\"white-text createAccBtnDiv\">\r\n\r\n                                    <input type=\"submit\" \r\n                                    class=\"btn white-text text-darken-3 purple darken-3 z-depth-1\" value=\"Create Account\">\r\n                                        \r\n                                </div>\r\n                            </div>\r\n\r\n                            <p><div class=\"divider\"></div></p>\r\n                            <p class=\"right-align\">\r\n                                <small>\r\n                                    <i>You have an account already ?</i>\r\n                                    <a href=\"#\" class=\"get_login_ui\">Login</a>\r\n                                </small>\r\n\r\n                            </p>\r\n                        </form>\r\n                    </div>\r\n                    \r\n\r\n                    <div class=\"col s12 m4 l4\"></div>\r\n\r\n                    <div class=\"col s12 right-align\" style=\"margin-top: 6rem;\">\r\n                        <p>\r\n                            <div class=\"divider\"></div>\r\n                        </p>\r\n                        <small class=\"grey-text\"> Powered by </small>\r\n                        <b class=\"purple-text text-darken-3\">iservng</b>\r\n                    </div>\r\n\r\n                </div>\r\n                \r\n            </div>\r\n            `;\r\n            (0,_utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('main', content);\r\n\r\n            /**\r\n             * Register event handler for the login\r\n             */\r\n            if(document.querySelector('.get_login_ui'))\r\n            {\r\n                document.querySelector('.get_login_ui').addEventListener('click', e => {\r\n                    e.preventDefault();\r\n                    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_login_interface.js */ \"./src/main/customer_login_interface.js\"))\r\n                    .then(m => {\r\n                        let loginUi = new m.CustomerLoginInterface();\r\n                        loginUi.createUi();\r\n                    })\r\n                    .catch(error => {\r\n                        console.log(error.message);\r\n                        (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unable to load Login ui');\r\n                    });\r\n                }, false);\r\n            }\r\n\r\n\r\n\r\n\r\n\r\n            /**\r\n             * Register event handler for the form submission\r\n             */\r\n            if(document.querySelector('#createUserWithSystemPinForm'))\r\n            {\r\n                document.querySelector('#createUserWithSystemPinForm').addEventListener('submit', e => {\r\n                    e.preventDefault();\r\n                    console.log(e.target);\r\n                    this.#checkIfuserIsValid(e.target);\r\n                }, false);\r\n            }\r\n            \r\n\r\n        }\r\n        else \r\n        {\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Unexpected error! Unable to fetch login');\r\n            console.log(this.#mErrorMsg);\r\n        }\r\n    }\r\n\r\n\r\n\r\n    async #checkIfuserIsValid(form)\r\n    {\r\n        // console.log(form);\r\n        (0,_utils_progress_loader_js__WEBPACK_IMPORTED_MODULE_2__.progressLoader)('Checking...', '.createAccBtnDiv');\r\n        let email = form.email.value;\r\n        let password = form.password.value;\r\n\r\n        //We will use the supplied email and password to query the db\r\n        let colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getFirestore)(), 'cnapx-customer');\r\n        let q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)('email', '==', email), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)('password', '==', password), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)('activated', '==', false));\r\n\r\n        //Ruen the query \r\n        let docsSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocsFromServer)(q);\r\n        if(docsSnapshot.empty)\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Invalid User');\r\n        else if(docsSnapshot.size > 1)\r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'This account contain invalid duplicate');\r\n        else \r\n        {\r\n            // let userData = docsSnapshot.docs[0].data();\r\n            this.#userData = docsSnapshot.docs[0].data();\r\n            this.#docId = docsSnapshot.docs[0].id;\r\n            console.log('this.#docId =', this.#docId);\r\n\r\n            this.#email = docsSnapshot.docs[0].data().email;\r\n            //It been confirmed that this user is legit\r\n            //1. show the user the interface to create custome password\r\n            this.#createCustomePaswordUi(this.#email);\r\n\r\n\r\n\r\n        }\r\n\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n    #createCustomePaswordUi(email)\r\n    {\r\n        let content = `\r\n        <form action=\"\" id=\"createUserWithSystemPinForm\">\r\n            <div class=\"card-panel lighten-4 z-depth-0\" style=\"border: 1px solid white;\">\r\n                <div class=\"white-text\">\r\n\r\n                    <!-- Email  -->\r\n                    <div class=\"row\">\r\n                        <div class=\"col s12\">    \r\n                            <div class=\"input-field\">\r\n                                <input id=\"email\" type=\"email\" value=\"${email}\" class=\"validate\" style=\"border-bottom: 1px solid purple;\" disabled>\r\n                                    <!--\r\n                                    <label for=\"email\" class=\"purple-text\">Email</label>\r\n                                    -->\r\n                                                        \r\n                                <span class=\"helper-text\" data-error=\"wrong\" data-success=\"right\">Enter valid email only</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Password  -->\r\n                    <div class=\"row\">\r\n                        <div class=\"col s12\">       \r\n                            <div class=\"input-field\">\r\n\r\n                                <input id=\"password\" type=\"password\" class=\"validate\" style=\"border-bottom: 1px solid purple;\">\r\n\r\n                                <label for=\"password\" class=\"purple-text\">\r\n                                    Create Password\r\n                                </label>\r\n\r\n                                <span class=\"helper-text\" data-error=\"wrong\" data-success=\"right\">\r\n                                    Passwords should be 6-digits and above characters.\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Confirm Password  -->\r\n                    <div class=\"row\">\r\n                        <div class=\"col s12\">       \r\n                            <div class=\"input-field\">\r\n\r\n                                <input id=\"confirmPassword\" type=\"password\" class=\"validate\" style=\"border-bottom: 1px solid purple;\">\r\n\r\n                                <label for=\"confirmPassword\" class=\"purple-text\">\r\n                                    Confirm Password\r\n                                </label>\r\n\r\n                                <span class=\"helper-text\" data-error=\"wrong\" data-success=\"right\">\r\n                                    Passwords should be 6-digits and above characters.\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"card-panel lighten-4 z-depth-0\">\r\n                <div class=\"white-text createAccBtnDiv\">\r\n                    <input type=\"submit\" class=\"btn white-text text-darken-3 purple darken-3 z-depth-1\" value=\"Create Account\">\r\n                </div>\r\n            </div>\r\n        </form>\r\n        `;\r\n        (0,_utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('#contentWrapper', content);\r\n\r\n        //Register event handler for the \r\n        if(document.querySelector('#createUserWithSystemPinForm'))\r\n        {\r\n            document.querySelector('#createUserWithSystemPinForm').addEventListener('submit', e => {\r\n                e.preventDefault();\r\n                console.log(e.target);\r\n                this.#exttractValueAndUpdateUsre(e.target);\r\n            });\r\n        }\r\n    }\r\n\r\n\r\n\r\n    #exttractValueAndUpdateUsre(form)\r\n    {\r\n        let password = form.password.value.trim();\r\n        let cPassword = form.confirmPassword.value.trim(); \r\n\r\n        if(password === cPassword)\r\n        {\r\n\r\n        //Then start by putting this in the firebase-auth\r\n            // const auth = getAuth();\r\n            (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.createUserWithEmailAndPassword)(this.#auth, this.#email, password)\r\n            .then((userCredential) => {\r\n                // Signed up \r\n                const user = userCredential.user;\r\n                this.#showUserAuthAccountIsCreated();\r\n                // this.#askUsreToLogin();\r\n                \r\n                //Then after creating the authen, the user information is also updated behind the.\r\n                let userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getFirestore)(), \"cnapx-customer\", this.#docId);\r\n                (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.updateDoc)(userRef, {\r\n                    activated: true\r\n                })\r\n                .then(() => {\r\n                    (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('green', 'Status Updated Successfully');\r\n                })\r\n                .catch(error => {\r\n                    console.log(error.message);\r\n                });\r\n\r\n            })\r\n            .catch((error) => {\r\n                const errorCode = error.code;\r\n                console.log(errorCode);\r\n                const errorMessage = error.message;\r\n                // ..\r\n                console.log(errorMessage);\r\n                (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'Could not create user Profile');\r\n            });\r\n        }\r\n        else \r\n            (0,_utils_toast_it__WEBPACK_IMPORTED_MODULE_1__.toastIt)('red', 'The two password must match');\r\n\r\n    }\r\n\r\n\r\n\r\n\r\n    #showUserAuthAccountIsCreated()\r\n    {\r\n        let content = `\r\n        <div class=\"row\">\r\n            <div class=\"col s12\">\r\n                <div class=\"card-panel\" style=\"border: 1px solid #f3e5f5;\">\r\n                    <h5 class=\"green-text\">\r\n                        Account Created Successfully\r\n                    </h5>\r\n                    <p><div class=\"divider\"></div></p>\r\n                    <p>\r\n                        <span class=\"black-text\">\r\n                            Please be informed that your account and a personal profile has been created, which allows you login only with the exect credential you supplied, use the button below to login, Thanks.\r\n                        </span>\r\n                    </p>\r\n                    <p><div class=\"divider\"></div></p>\r\n                    <p>\r\n                        <a href=\"#\" class=\"btn green darken-3 click-to-sign-in\">\r\n                            Click to sign-in\r\n                        </a>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>`;\r\n        (0,_utils_insert_into_DOM__WEBPACK_IMPORTED_MODULE_0__.insertIntoDOM)('#contentWrapper', content);\r\n\r\n        //Register event handle for the click-to-sign-in\r\n        if(document.querySelector('.click-to-sign-in'))\r\n        {\r\n            document.querySelector('.click-to-sign-in').addEventListener('click', e => {\r\n                e.preventDefault();\r\n                this.#askUsreToLogin();\r\n            }, false);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n\r\n    \r\n    #askUsreToLogin()\r\n    {\r\n        //First log user out\r\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.signOut)(this.#auth)\r\n        .then(() => {\r\n            this.#showLoginUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n        });\r\n\r\n    }\r\n\r\n\r\n    #showLoginUi()\r\n    {\r\n        Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./customer_login_interface.js */ \"./src/main/customer_login_interface.js\"))\r\n        .then(m => {\r\n            let login = new m.CustomerLoginInterface();\r\n            login.createUi();\r\n        })\r\n        .catch(error => {\r\n            console.log(error.message);\r\n        });\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://cnapx-trials/./src/main/create_account_with_sys_pass.js?");

/***/ })

}]);