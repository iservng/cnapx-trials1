
import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
import { progressLoader } from "../utils_src/progress_loader.js";
import { collection, 
    getDocsFromServer, 
    getFirestore, 
    query, 
    updateDoc, 
    where,
    doc
    } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

class CreateAccountWithSysPass 
{
    #_mErrors;
    #mErrorMsg;
    #email;
    #userData;
    #docId;
    #auth;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#auth = getAuth();
    }

    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
            
                <div class="row" style="margin-top: 3rem;">

                    <div class="col s12 center-align" style="margin-bottom: 2rem;">    
                        <h4>
                            <small>
                                <b class="purple-text text-darken-3">
                                    Create Account 
                                </b>
                            </small>
                        </h4>
                        <small>
                            Using the system 6-digit pass-code as the password create an account in the system.
                        </small>
                    </div>

                    <div class="col s12 m4 l4"></div>

                    
                    <div class="col s12 m4 l4" id="contentWrapper">
                        <form action="" id="createUserWithSystemPinForm">
                            <div class="card-panel lighten-4 z-depth-0" style="border: 1px solid white;">
                                <div class="white-text">

                                    <!-- Email  -->
                                    <div class="row">
                                        <div class="col s12">
                                                    
                                            <div class="input-field">
                                                <input id="email" type="email" class="validate" style="border-bottom: 1px solid purple;">

                                                <label for="email" class="purple-text">Email</label>
                                                        
                                                <span class="helper-text" data-error="wrong" data-success="right">Enter valid email only</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Password  -->
                                    <div class="row">
                                        <div class="col s12">
                                                    
                                            <div class="input-field">

                                                <input id="password" type="password" class="validate" style="border-bottom: 1px solid purple;">

                                                <label for="password" class="purple-text">System Pass Code</label>

                                                <span class="helper-text" data-error="wrong" data-success="right">Enter 6-digits Pass-Code 

                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                        
                                </div>
                            </div>

                            <div class="card-panel lighten-4 z-depth-0">
                                <div class="white-text createAccBtnDiv">

                                    <input type="submit" 
                                    class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Create Account">
                                        
                                </div>
                            </div>

                            <p><div class="divider"></div></p>
                            <p class="right-align">
                                <small>
                                    <i>You have an account already ?</i>
                                    <a href="#" class="get_login_ui">Login</a>
                                </small>

                            </p>
                        </form>
                    </div>
                    

                    <div class="col s12 m4 l4"></div>

                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text"> Powered by </small>
                        <b class="purple-text text-darken-3">iservng</b>
                    </div>

                </div>
                
            </div>
            `;
            insertIntoDOM('main', content);

            /**
             * Register event handler for the login
             */
            if(document.querySelector('.get_login_ui'))
            {
                document.querySelector('.get_login_ui').addEventListener('click', e => {
                    e.preventDefault();
                    import('./customer_login_interface.js')
                    .then(m => {
                        let loginUi = new m.CustomerLoginInterface();
                        loginUi.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load Login ui');
                    });
                }, false);
            }





            /**
             * Register event handler for the form submission
             */
            if(document.querySelector('#createUserWithSystemPinForm'))
            {
                document.querySelector('#createUserWithSystemPinForm').addEventListener('submit', e => {
                    e.preventDefault();
                    console.log(e.target);
                    this.#checkIfuserIsValid(e.target);
                }, false);
            }
            

        }
        else 
        {
            toastIt('red', 'Unexpected error! Unable to fetch login');
            console.log(this.#mErrorMsg);
        }
    }



    async #checkIfuserIsValid(form)
    {
        // console.log(form);
        progressLoader('Checking...', '.createAccBtnDiv');
        let email = form.email.value;
        let password = form.password.value;

        //We will use the supplied email and password to query the db
        let colRef = collection(getFirestore(), 'cnapx-customer');
        let q = query(colRef, where('email', '==', email), where('password', '==', password), where('activated', '==', false));

        //Ruen the query 
        let docsSnapshot = await getDocsFromServer(q);
        if(docsSnapshot.empty)
            toastIt('red', 'Invalid User');
        else if(docsSnapshot.size > 1)
            toastIt('red', 'This account contain invalid duplicate');
        else 
        {
            // let userData = docsSnapshot.docs[0].data();
            this.#userData = docsSnapshot.docs[0].data();
            this.#docId = docsSnapshot.docs[0].id;
            console.log('this.#docId =', this.#docId);

            this.#email = docsSnapshot.docs[0].data().email;
            //It been confirmed that this user is legit
            //1. show the user the interface to create custome password
            this.#createCustomePaswordUi(this.#email);



        }


    }




    #createCustomePaswordUi(email)
    {
        let content = `
        <form action="" id="createUserWithSystemPinForm">
            <div class="card-panel lighten-4 z-depth-0" style="border: 1px solid white;">
                <div class="white-text">

                    <!-- Email  -->
                    <div class="row">
                        <div class="col s12">    
                            <div class="input-field">
                                <input id="email" type="email" value="${email}" class="validate" style="border-bottom: 1px solid purple;" disabled>
                                    <!--
                                    <label for="email" class="purple-text">Email</label>
                                    -->
                                                        
                                <span class="helper-text" data-error="wrong" data-success="right">Enter valid email only</span>
                            </div>
                        </div>
                    </div>

                    <!-- Password  -->
                    <div class="row">
                        <div class="col s12">       
                            <div class="input-field">

                                <input id="password" type="password" class="validate" style="border-bottom: 1px solid purple;">

                                <label for="password" class="purple-text">
                                    Create Password
                                </label>

                                <span class="helper-text" data-error="wrong" data-success="right">
                                    Passwords should be 6-digits and above characters.
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Confirm Password  -->
                    <div class="row">
                        <div class="col s12">       
                            <div class="input-field">

                                <input id="confirmPassword" type="password" class="validate" style="border-bottom: 1px solid purple;">

                                <label for="confirmPassword" class="purple-text">
                                    Confirm Password
                                </label>

                                <span class="helper-text" data-error="wrong" data-success="right">
                                    Passwords should be 6-digits and above characters.
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div class="card-panel lighten-4 z-depth-0">
                <div class="white-text createAccBtnDiv">
                    <input type="submit" class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Create Account">
                </div>
            </div>
        </form>
        `;
        insertIntoDOM('#contentWrapper', content);

        //Register event handler for the 
        if(document.querySelector('#createUserWithSystemPinForm'))
        {
            document.querySelector('#createUserWithSystemPinForm').addEventListener('submit', e => {
                e.preventDefault();
                console.log(e.target);
                this.#exttractValueAndUpdateUsre(e.target);
            });
        }
    }



    #exttractValueAndUpdateUsre(form)
    {
        let password = form.password.value.trim();
        let cPassword = form.confirmPassword.value.trim(); 

        if(password === cPassword)
        {

        //Then start by putting this in the firebase-auth
            // const auth = getAuth();
            createUserWithEmailAndPassword(this.#auth, this.#email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                this.#showUserAuthAccountIsCreated();
                // this.#askUsreToLogin();
                
                //Then after creating the authen, the user information is also updated behind the.
                let userRef = doc(getFirestore(), "cnapx-customer", this.#docId);
                updateDoc(userRef, {
                    activated: true
                })
                .then(() => {
                    toastIt('green', 'Status Updated Successfully');
                })
                .catch(error => {
                    console.log(error.message);
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                // ..
                console.log(errorMessage);
                toastIt('red', 'Could not create user Profile');
            });
        }
        else 
            toastIt('red', 'The two password must match');

    }




    #showUserAuthAccountIsCreated()
    {
        let content = `
        <div class="row">
            <div class="col s12">
                <div class="card-panel" style="border: 1px solid #f3e5f5;">
                    <h5 class="green-text">
                        Account Created Successfully
                    </h5>
                    <p><div class="divider"></div></p>
                    <p>
                        <span class="black-text">
                            Please be informed that your account and a personal profile has been created, which allows you login only with the exect credential you supplied, use the button below to login, Thanks.
                        </span>
                    </p>
                    <p><div class="divider"></div></p>
                    <p>
                        <a href="#" class="btn green darken-3 click-to-sign-in">
                            Click to sign-in
                        </a>
                    </p>
                </div>
            </div>
        </div>`;
        insertIntoDOM('#contentWrapper', content);

        //Register event handle for the click-to-sign-in
        if(document.querySelector('.click-to-sign-in'))
        {
            document.querySelector('.click-to-sign-in').addEventListener('click', e => {
                e.preventDefault();
                this.#askUsreToLogin();
            }, false);
        }
    }






    
    #askUsreToLogin()
    {
        //First log user out
        signOut(this.#auth)
        .then(() => {
            this.#showLoginUi();
        })
        .catch(error => {
            console.log(error.message);
        });

    }


    #showLoginUi()
    {
        import('./customer_login_interface.js')
        .then(m => {
            let login = new m.CustomerLoginInterface();
            login.createUi();
        })
        .catch(error => {
            console.log(error.message);
        });

    }


}

export { CreateAccountWithSysPass };