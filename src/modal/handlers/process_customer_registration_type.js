import { smallSpinner } from "../../utils/small_spinner.js";
import { toastIt } from "../../utils/toast_it.js";
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signOut
 } from 'firebase/auth';
import { insertIntoDOM } from "../../utils/insert_into_DOM.js";

class ProcessCustomerRegistrationType 
{
    #_mErrors;
    #mErrorMsg;
    #typeSelectBtn;
    #customerData;
    #auth;
    #db; 
    #customerType;
    #customerName;
    #colRef;
    constructor(typeSelected)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!typeSelected)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Please select type";
        }
        else 
        {
            this.#typeSelectBtn = typeSelected;
            this.#customerData = JSON.parse(sessionStorage.getItem('customerInfo'));
            this.#auth = getAuth();
            this.#db = getFirestore();
            this.#customerName = this.#customerData['name'].toUpperCase();
            this.#colRef = 'cnapx-customer';

        }
        
    }


    //Public API
    processType()
    {
        if(this.#_mErrors == 0)
        {
            this.#customerType = this.#typeSelectBtn.dataset.customertype;
            smallSpinner('Working...', 'main');

            /**************************************
             * Import and execute the customer profile interface dashboard
             * ------------------------------------------------------------
             */
            switch (this.#customerType) 
            {
                case "marchant":
                    this.#customerType = 'marchant';
                    this.#registerCustomerAsMarchant(this.#customerType);
                    break;

                case "individual": 
                    this.#customerType = "individual";
                    this.#registerCustomerAsMarchant(this.#customerType);
                    break;

                default:
                    toastIt('red', 'Could not determine registration type');
                    break;

            }
            
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }




    async #registerCustomerAsMarchant(userType)
    {

        this.#customerData['userType'] = userType;
        // sessionStorage.setItem('agentId', JSON.stringify(userId));
        //If this is signed in and is registering from his profile-page.
        if(sessionStorage.getItem('agentId'))
        {
            let agentId = sessionStorage.getItem('agentId');
            // console.log();
            this.#customerData['agentCode'] = agentId;
        }
        // if(sessionStorage.)

        /**
         * This user has 
         * 1. Provided his information
         * 2. Privided his customer type information
         * Now we need to create an authentication account with the provided credentials//processType
         */

        createUserWithEmailAndPassword(this.#auth, this.#customerData['email'], this.#customerData['password'])
        .then(userCredentials => {

            let user  = userCredentials.user;

            /**
             * This here is a prove that this user has successfully created an auth account, 
             * 1. we are gonna take his provided information an store it in the marchant-customer collection
             * 
             */
            this.#addUserToDB();
            /* 
             * 2. The call the class-function that gives him feed-back saying all is registered you can sign in using you email and pasword
             */

        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Error: Use a unique email and ensure device has connection');
            //Call the function that tell email-already-in-use
            this.#credentialsNotUnique(this.#customerData['email'], this.#customerData['password']);
        });

    }


    async #addUserToDB()
    {
        // Add a new document with a generated id.
        // Add the "createdOn" property.
        delete this.#customerData.password;
        this.#customerData['createdOn'] = serverTimestamp();
        this.#customerData['activated'] = true;
        const docRef = await addDoc(collection(this.#db, this.#colRef), this.#customerData);
        if(docRef.id)
        {
            //Automatically log user out
            signOut(this.#auth)
            .then(() => {
                /**
                * This user information has been added to the database, and signedOut then the user can now be shown the welcome ui
                */
                this.#showTheSignupWelcomeMsg(this.#customerType);
            })
            .catch(error => {
                toastIt('red', 'Could not sign user out');
                console.log(error.message);
            });

        }

    }

    #showTheSignupWelcomeMsg(userType)
    {
        let dashboard = `<p><a href="#" class="btn-flat dashboard">Dashboard</a></p>`;
        if(sessionStorage.getItem('agentId'))
            dashboard = `<p><a href="#" class="btn-flat agent_dashboard">Dashboard</a></p>`;
        

        let content = `
        <div class="container">
            <div class="row" style="margin-top: 3rem;">
                <div class="col s12 center-align" style="margin-bottom: 2rem;">    
                    <h4>
                        <small>
                            <b class="purple-text text-darken-3">
                                Congratulations
                            </b>
                        </small>
                    </h4>
                </div>

                <div class="col s12 m3 l3">
                    ${dashboard}

                    <p>
                        <a href="#" class="btn-flat sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            Menu
                        </a>
                    </p>
                </div>

                <form action="" id="signupCompletedForm">
                    <div class="col s12 m6 l6">

                        <div class="card-panel lighten-4 z-depth-1" style="border: 1px solid white;">
                            <div class="">
                                <p><b>Dear, </b></p>
                                <h5>
                                    <b>${this.#customerName}</b>
                                </h5>
                                
                            </div>
                            <p>
                                Welcome to CnapxPay!
                            </p>
                            <p>
                                We are thrilled to have you join our community of tech enthusiasts! Thank you for choosing us to be a part of your journey.
                            </p>
                            <p>
                                As a new ${userType} member, you now have access to a world of exciting opportunities, exclusive offers, and top-notch services. Whether you're here to explore new experiences, indulge in your passions, or simply connect with like-minded individuals, we're here to make every moment unforgettable.
                            </p>
                            <p>
                                Feel free to dive into our platform and discover all that we have to offer. Should you have any questions or need assistance along the way, our dedicated support team is here to help you every step of the way.
                            </p>
                            <p>
                                Once again, welcome aboard! We can't wait to embark on this adventure with you.
                            </p>
                            <p>
                                Best regards,</br>
                                <b>CnapxPay Team</b>
                            </p>
                        </div>

                        <div class="card-panel lighten-4 z-depth-0">
                            <div class="white-text center-align">
                                <input type="submit" 
                                    class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Login Now">
                            </div>
                        </div>

                        <p><div class="divider"></div></p>
                        <p class="right-align">
                            <small>
                                <i>forgot your password ?</i>
                                <a href="#">click Here</a>
                            </small>
                        </p>
                    </div>
                </form>

                <div class="col s12 m3 l3"></div>

                <div class="col s12 right-align" style="margin-top: 6rem;">
                    <p><div class="divider"></div></p>
                    <small class="grey-text"> Powered by </small>
                    <b class="purple-text text-darken-3">iservng</b>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);

        // Remove user infor "customerInfo" from session.
        sessionStorage.removeItem('customerInfo');

        //Register event handler for signupCompletedForm
        if(document.querySelector('#signupCompletedForm'))
        {
            document.querySelector('#signupCompletedForm').addEventListener('submit', e => {
                e.preventDefault();
                import('../../main/customer_login_interface.js')
                .then(m => {
                    let loginUi = new m.CustomerLoginInterface();
                    loginUi.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'Unable to load the login UI');
                });
            }, false);
        }


        //Register event handler for dashdashboard
        if(document.querySelector('.dashboard'))
        {
            document.querySelector('.dashboard').addEventListener('click', e => {
                e.preventDefault();
                import('../../main/admin_customer_profile_dashboard.js')
                .then(m => {
                    let dashboard = new m.AdminProfileDashboard();
                    dashboard.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'Unable to load the Dashboard');
                });
            }, false);
        }
        //agent_dashboard
        if(document.querySelector('.agent_dashboard'))
        {
            document.querySelector('.agent_dashboard').addEventListener('click', e => {
                e.preventDefault();
                // import('../../main/admin_customer_profile_dashboard.js')
                import('../../main/agent_customer_profile_dashboard.js')
                .then(m => {
                    let userId = sessionStorage.getItem('userId');
                    console.log('../../main/agent_customer_profile_dashboard.js', userId);
                    let dashboard = new m.AgentProfileDashboard(userId);
                    dashboard.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'Unable to load the Dashboard');
                });
            }, false);
        }
        // =============

    }


    #credentialsNotUnique(email, password)
    {
        let content = `
        <div class="container">
            <div class="row">
                <div class="col s12 red" style="margin-top: 3rem; margin-bottom: 2rem;"><h5>Error!</h5></div>
                <div class="col s12 m3 l3"></div>
                <div class="col s12 m6 l6">
                    This error could be atttributed to two issues as follows
                    <ol>
                        <li>
                            The device is not connected or has lost network connection.
                        </li>
                        <li>
                            The credential ${email} and ${password} are already in use, please create and use a unique email account for sign-up.
                        </li>
                    </ol>
                    
                    <p style="margin-top: 2rem;">
                        <a href="." class="btn purple darken-3 try_again">
                            Try Again
                        </a>
                    </p>

                </div>
                <div class="col s12 m3 l3"></div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);
    }
}
export { ProcessCustomerRegistrationType };