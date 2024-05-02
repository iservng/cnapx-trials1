

/**
 * THIS CLASS RECIEVE THE FORM OBJECT FOR CREATE-ACCOUNT
 * -------------------------------------------------------
 * Then user its internal methods for the processing of the form.
 * 
 */

import { smallSpinner } from "../../utils_src/small_spinner.js";
import { toastIt } from "../../utils_src/toast_it.js";
import { lowAndRemvSpce } from "../../utils_src/lower_remv_spaces.js";
// import { getEmailAndPassword } from "../../test.js";

import { insertIntoDOM } from "../../utils_src/insert_into_DOM.js";
import { 
    serverTimestamp, 
    addDoc, 
    collection, 
    getFirestore, 
    query, 
    where, 
    getDocFromServer, 
    getDocsFromServer 
} from "firebase/firestore";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signOut 
} from "firebase/auth";
// import { generateShortPassword } from "../../utils/random_pass.js";

class CreateUserAccount 
{
    #_mErrors;
    #mErrorMsg;
    #form;
    #auth;
    #userData;

    constructor(createAcctForm)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        
        if(!createAcctForm)
        {
            this.#_mErrors++;
            this.#mErrorMsg = ``;
            toastIt('red', 'Invalid form submission');
        }
        else 
        {

            let namePattern = /^([a-zA-Z]{3,20})(\s)([a-zA-z]{3,20})(\s)?([a-zA-Z]{3,20})?$/;
            let phonePattern = /^(0)([7-9])([0-1])(\d){8}$/;
            let bvnPattern = /^[\d]{11}$/;
            let emailPatern = /^[a-zA-Z0-9@\.-]{3,30}$/;
            let passwordPatern = /^[a-zA-Z0-9@]{5,25}$/;


            this.#form = createAcctForm;
            if(!namePattern.test(this.#form.fullname.value.trim()))
            {
                
                this.#_mErrors++;
                this.#mErrorMsg = "Your full name is required!";
                toastIt('red', this.#mErrorMsg);
            }
            else if(!phonePattern.test(this.#form.phone.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Phone number is required!';
                toastIt('red', this.#mErrorMsg);
            }
            else if(!bvnPattern.test(this.#form.bvn.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Your BVN number is required!';
                toastIt('red', this.#mErrorMsg);
            }
            else if(!emailPatern.test(this.#form.email.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = this.#form.email.value + ' is Invalid!';
                toastIt('red', this.#mErrorMsg);

            }
            else if(!passwordPatern.test(this.#form.password.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Your password is Invalid!';
                toastIt('red', this.#mErrorMsg);
            }
            else 
            {

                this.#userData = {
                    name: this.#form.fullname.value.trim().toUpperCase(),
                    phone: this.#form.phone.value.trim(),
                    bvn: this.#form.bvn.value.trim(),
                    email: this.#form.email.value.trim(),
                    password: this.#form.password.value.trim()
                };
                this.#auth = getAuth();

                /**
                 * Make it available in the user session..
                 */
                sessionStorage.setItem('customerInfo', JSON.stringify(this.#userData));

            }

        }

    }





    //
    async registerAgent(agent)
    {
        if(this.#_mErrors == 0)
        {
            //Process the account of the aggent//checkCredentials
            console.log(this.#userData);
            let agentPassword = this.#userData.password.trim();
            this.#userData['userType'] = agent;
            this.#userData['createdOn'] = serverTimestamp();
            this.#userData['activated'] = false;


            //Register the email and password to the authentication service of firebase.
            // Signed up 
            // const user = userCredential.user;
            // I have removed the code that add this user o the firebase-auth service. 
            // 2. it should be when the user check = checking-registration-status should be designe and implemented. 
            // 3. 16|03|2024
            this.#addUserAgentsInfo(agent, agentPassword);
            
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
        }

    } 



    async #addUserAgentsInfo(agent, agentPassword)
    {

        // just before we add this user, we want to check for the existance of this email. 
        //1. if exists exit and warn cause email is already registered
        //2. If not exists then continue with the rest of the code.

        let email = this.#userData.email;
        let password = agentPassword;
        let q = query(collection(getFirestore(), 'cnapx-customer'), where('email', '==', email), where('activated', '==', false), where('password', '==', password));

        //If this query count return only one value then everything is ok
        let docSnapshot = await getDocsFromServer(q);
        if(docSnapshot.empty)
        {
            
            // ==============================
            //add the object to the database
            addDoc(collection(getFirestore(), 'cnapx-customer'), this.#userData)
            .then(docRef => {
                //This is where the newly created user id is returned
                let agentUniqueCode = docRef.id;
                this.#displayAgentUserLoginCredentials(agentPassword, agentUniqueCode);

                //Register event handler for. 
                if(document.querySelector('.got_it'))
                {
                    document.querySelector('.got_it').addEventListener('click', e => {
                        e.preventDefault();
                        this.#callBackRegisterUi(agent);
                    });
                }
            })
            .catch(error => {
                console.log(error.message);
            });
        }
        else if(docSnapshot.size > 1)
        {
            let title = `Account Already in Use!`;
            let body = `The email already exists in our system. To start you application as a staff your email has to be unique, Thanks.`;
            this.#reportIssues(title, body);
        }
        else 
            toastIt('red', 'Invalid Request or Network Error');
    }



    #reportIssues(title, body)
    {
        let content = `
            <div class="row">
                <div class="col s12">
                    <div class="card z-depth-0">
                        <div class="card-content black-text">
                            <span class="card-title red">
                                ${title}
                            </span>
                            <p>${body}</p>
                        </div>
                        <div class="card-action white">
                            <a href="#" class="btn-small purple darken-3 dashboard">understood ok</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('#agentInfoDiv').innerHTML = ``;
            insertIntoDOM('#agentInfoDiv', content);

            //Register event handler for dashboard
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
                        toastIt('red', 'Unable to load dashboard');
                    });
                }, false);
            }
    }

    #displayAgentUserLoginCredentials(agentPassword, agentUniqueCode)
    {
        let content = `
            <div class="row">
                <div class="col s12">
                    <div class="card purple lighten-5 z-depth-0">
                        <div class="card-content black-text">
                            <span class="card-title">
                                Details for Login Credentials
                            </span>
                            <p>Email: <b>${this.#userData.email}</b></p>
                            <p>Password: <b>${agentPassword}</b></p>
                            <p>Agent Code: <b>${agentUniqueCode}</b></p>
                        </div>
                        <div class="card-action white">
                            <a href="#" class="btn-small purple darken-3 got_it">Got It ok</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('#agentInfoDiv').innerHTML = ``;
            insertIntoDOM('#agentInfoDiv', content);


    }


    //This function is simple used to put a back the register ui after a registration is successfully confirmed, then to register another user
    #callBackRegisterUi(agent)
    {
        switch (agent) {
            case "marketing":
                import('../../main/admin_register_marketing_manager.js')
                .then(m => {
                    let ui = new m.AdminRegisterMarketingManagerUi();
                    ui.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', `Unable to load the ${agent} register ui`);
                });
                break;
            case 'finance':
                import('../../main/admin_register_financial_officer.js')
                .then(m => {
                    let ui = new m.AdminRegisterFinancialOfficerUi();
                    ui.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', `Unable to load ${agent} register ui`);
                });
            default:
                break;
        }

    }






    /***********************************
     * *********************************
     * Public API
     * 704 x 371 modal dimenssion
     */
    checkCredentials()
    {
        if(this.#_mErrors == 0)
        {
            //Check if the account being register is an agent account this will check the session-variable..
            if(document.querySelector('#createAcountDiv'))
            {
                smallSpinner('Working...', '#createAcountDiv');
                import('../../modal/handlers/customer_registration_type.js')
                .then(m => {
                    let customerType = new m.CustomerRegisterType();
                    customerType.createUi();//
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', `Unexpected Customer type not found`);
                });
            }
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }


    #removeModal()
    {
        let modals = document.querySelectorAll('.modal');
        modals.forEach(instance => {
            let inst = M.Modal.getInstance(instance);
            inst.close();
        })
    }


    


//.....................
    #errorReport()
    {
        let content = `
            <div class="row">
                <div class="col s12">
                    <div class="card pink lighten-5 z-depth-0">
                    <div class="card-content red-text">
                        <span class="card-title">Error!</span>
                        <p>
                            It looks like your device does not have a proper network connection.
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red darken-3 removeModal">This is True</a>
                    </div>
                    </div>
                </div>
            </div>
        `;
        insertIntoDOM('#createAcountDiv', content);



        if(document.querySelector('.removeModal'))
        {
            document.querySelector('.removeModal').addEventListener('click', e => {
                e.preventDefault();
                this.#removeModal();
            });
        }
        
    }
}
export { CreateUserAccount };