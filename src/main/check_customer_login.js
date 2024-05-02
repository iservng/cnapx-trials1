import { toastIt } from "../utils_src/toast_it.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, getFirestore, getDocsFromServer, where } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";}

class CheckCustomerLogin 
{
    #_mErrors;
    #mErrorMsg;
    #email;
    #password;
    #auth;
    #db;

    constructor(form)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!form)
        {
            this.#_mErrors++;
            this.#mErrorMsg = 'Invalid Form Submission';
        }
        else 
        {
            //Extract the email and the password
            let email = form.email.value.trim();
            let password = form.password.value.trim();

            if(!email)
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Invalid Email!';
            }
            else if(!password)
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Invalid Password!';
            }
            else 
            {
                this.#email = email;
                this.#password = password;
                this.#auth = getAuth();
                this.#db = getFirestore();
            }

        }

    }

    validateOrWarn()
    {
        if(this.#_mErrors == 0)
        {
            /**
             * First the authenticator is used to sign this user in
             */
            signInWithEmailAndPassword(this.#auth, this.#email, this.#password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                this.#getUserToDashboard(user);

            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                toastIt('red', 'Invalid Login or Network Connection Error');
                document.querySelector('.loginBtnDiv').innerHTML = `
                <input type="submit" class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Validate User">`;
                
            });

        }
        else 
        {
            console.log(this.#mErrorMsg);
            toastIt('red', this.#mErrorMsg);
        }

    }





    async #getUserToDashboard(user)
    {
        let colref = collection(getFirestore(), 'cnapx-customer');
        const q = query(colref, where('email', '==', user.email), where('activated', '==', true));

        const querySnapshot = await getDocsFromServer(q);

        console.log('querySnapshot =', querySnapshot);
        
            /**************************
             * Using a switch-statement we determine the type of user and call for the appropriate dashboard.
             */
            switch (querySnapshot.docs[0].data().userType) 
            {
                case 'marchant':
                    this.#directToMarchantDashboard(querySnapshot.docs[0].data());
                    break;

                case 'individual':
                    this.#directToIndividualDashboard(querySnapshot.docs[0].data());
                    break;

                case 'agent':
                    let agentData = querySnapshot.docs[0].data();
                    let agentId = querySnapshot.docs[0].id;
                    this.#directToAgentDashboard(agentData, agentId);
                    break;

                    case 'admin':
                    this.#directToAdminDashboard(querySnapshot.docs[0].data());
                    break;

                case 'marketing':
                    //marketingManagerId
                    let marketingManagerData = querySnapshot.docs[0].data();
                    let marketingManagerId = querySnapshot.docs[0].id;
                    this.#directToMarketingDashboard(querySnapshot.docs[0].data(), marketingManagerId);
                    break;

                case 'financial':
                    this.#directToFinanceDashboard(querySnapshot.docs[0].data());
                    break;
                    
                default:
                    break;
            }

        

        
        


    }




    // MARCHANT DASHBOARD
    // ---------------------
    #directToMarchantDashboard(userdata)
    {
        /**
        * This is where this checker class calls the customer-profile-interface and displays it.
        * save marchant information to session
        */
        sessionStorage.setItem('marchantInfo', JSON.stringify(userdata));
        
        if(document.querySelector('header'))
        {
            let header = document.querySelector('header');
            header.style.display = 'block';
        }

        import('./marchant_customer_profile_dashboard.js')
        .then(m => {
            let customer_profile_dashboard = new m.CustomerProfileDashboard();
            customer_profile_dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
        });
    }






    // INDIVIDUAL DASHBOARD
    // ---------------------
    #directToIndividualDashboard(userdata)
    {
        sessionStorage.setItem('marchantInfo', JSON.stringify(userdata));
        if(document.querySelector('header'))
            document.querySelector('header').style.display = 'block';
        
        
        //Import the individual class profiler
        import('./individual_customer_profile_dashboard.js')
        .then(m => {
            let dashboard = new m.IndividualProfileDashboard();
            dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the individual profile');
        });

    }





    // AGENT DASHBOARD
    // ---------------------#directToAgentDashboard(agentData, agentId)
    #directToAgentDashboard(userdata, userId)
    {
        sessionStorage.setItem('agentData', JSON.stringify(userdata));
        sessionStorage.setItem('agentId', userId);

        if(document.querySelector('header'))
            document.querySelector('header').style.display = 'block';
        
        //Import the individual class profiler.
        import('./agent_customer_profile_dashboard.js')
        .then(m => {
            let dashboard = new m.AgentProfileDashboard(userId);
            dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the individual profile');
        });

    }//




    #directToAdminDashboard(userdata)
    {
        sessionStorage.setItem('marchantInfo', JSON.stringify(userdata));
        if(document.querySelector('header'))
            document.querySelector('header').style.display = 'block';
        
        
        //Import the individual class profiler
        import('./admin_customer_profile_dashboard.js')
        .then(m => {
            let dashboard = new m.AdminProfileDashboard();
            dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the Admin profile');
        });
    }


    #directToMarketingDashboard(userdata, id)
    {
        // console.log(userdata);
        sessionStorage.setItem('marchantInfo', JSON.stringify(userdata));
        sessionStorage.setItem('marketingManagerId', id);
        if(document.querySelector('header'))
            document.querySelector('header').style.display = 'block';
        
        
        //Import the individual class profiler..
        import('./marketing_customer_profile_dashboard.js')
        .then(m => {
            let dashboard = new m.MarketingProfileDashboard();
            dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the Marketing profile');
        });

    }


    #directToFinanceDashboard(userdata)
    {
        // console.log(userdata);
        sessionStorage.setItem('marchantInfo', JSON.stringify(userdata));
        if(document.querySelector('header'))
            document.querySelector('header').style.display = 'block';
        
        
        //Import the individual class profiler//FinanceProfileDashboard
        import('./finance_customer_profile_dashboard.js')
        .then(m => {
            let dashboard = new m.FinanceProfileDashboard();
            dashboard.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the Finance profile');
        });

    }






}
export { CheckCustomerLogin };