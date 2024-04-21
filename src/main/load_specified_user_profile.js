import { getFirestore, doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { convertDateFromMilliSecToDateString } from "../utils/date_4rm_milisec_to_humanReadable.js";
import { smallSpinner } from "../utils/small_spinner.js";


class LoadSpecifiedUserProfile
{

    #_mErrors;
    #mErrorMsg;
    #db;
    #colRef;
    #userId
    #agentCodeSecton;
    #docSnap;
    #isWithTaskMenu;
    #collName;
    constructor(userId)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#db = getFirestore();
        this.#collName = 'cnapx-customer';
        this.#colRef = collection(this.#db, this.#collName);
        this.#userId = userId;
        this.#isWithTaskMenu = true;
    }

    //Public API
    async createUi()
    {
        if(this.#_mErrors == 0)
        {
            
            let dashboardBtn = `
            <a href="#" class="btn-flat list_dasboard">
                List Dashboard
            </a>`;
            if(sessionStorage.getItem('agentId'))
            {
                let agentId = sessionStorage.getItem('agentId');
                dashboardBtn = `<a href="#" class="btn-flat agent_dasboard">
                List Dashboard</a>`;
            }
            else if(sessionStorage.getItem('marketingManagerId'))
            {
                let agentId = sessionStorage.getItem('marketingManagerId');
                dashboardBtn = `<a href="#" class="btn-flat marketingManager_dasboard">
                List Dashboard</a>`;
            }

            
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 4rem;">
                    <div class="col s12" style="margin-bottom: 2rem;">
                        <h5 class="purple-text">User Profile page</h5>
                    </div>

                    <div class="col s12 center-align" style="margin-bottom: 2rem;">
                        <p><div href="#" class="divider"></div></p>
                        ${dashboardBtn}
                        <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            MENU
                        </a>
                        <p><div href="#" class="divider"></div></p>
                    </div>

                    <div class="col s12 m4 l4">
                        
                        <div class="center-align">
                            <p>
                                <img src="./images/defaultpix.png" alt="Image Pic">
                            </p>
                            
                            <p><b class="purple-text profile_name">Profile Name</b></p>
                            <p><b>Profile Pic</b></p>
                        </div>
                        
                        <div class="center-align manageAccMenuDive">
                            <!--
                            -->
                        </div>

                    </div>

                    <div class="col s12 m8 l8">
                        <p>
                            <ul class="collection with-header info_container z-depth-1">
                                
                            </ul>
                        </p>
                    </div>

                    <div class="col s12" style="margin-top: 4.5rem;">
                        <p><div class="divider"></div></p>
                        <small>Powered by </small><b class="purple-text">iservng</b>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);






            

            // marketingManager_dasboard
            if(document.querySelector('.marketingManager_dasboard'))
            {
                document.querySelector('.marketingManager_dasboard').addEventListener('click', e => {
                    e.preventDefault();
                    import('./marketing_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.MarketingProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the Marchant List');
                    });
                }, false);
            }


            //agent_dasboard
            if(document.querySelector('.agent_dasboard'))
            {
                document.querySelector('.agent_dasboard').addEventListener('click', e => {
                    e.preventDefault();
                    import('./agent_customer_profile_dashboard.js')
                    .then(m => {
                        let agentId = sessionStorage.getItem('agentId');
                        let dashboard = new m.AgentProfileDashboard(agentId);
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the Marchant List');
                    });
                }, false);
            }

            //Register event handler for list_dasboard
            if(document.querySelector('.list_dasboard'))
            {
                document.querySelector('.list_dasboard').addEventListener('click', e => {
                    e.preventDefault();
                    import('./admin_customer_profile_dashboard.js')
                    .then(m => {
                        // let marchants = new m.LoadMarchantCustomers();
                        let dashboard = new m.AdminProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the Marchant List');
                    });
                }, false);
            }

            //Call for the specified user infor.
            const docRef = doc(this.#db, "cnapx-customer", this.#userId);
            this.#docSnap = await getDoc(docRef);

            if (this.#docSnap.exists()) 
                this.#displayUserProfileInfo(this.#docSnap);
            else 
            {
                toastIt('red', 'No user record found with the specified Id');
                console.log("No such document!");
            }


        }
        else{
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }










    #displayUserProfileInfo(docSnap)
    {
        smallSpinner('Loading...', '.info_container');
        smallSpinner('Getting menu...', '.manageAccMenuDive');

        if(docSnap.data().agentCode)
        {
            this.#agentCodeSecton = `
            <li class="collection-item">
                <div>
                    Phone
                    <a href="#!" class="secondary-content">
                        <b>${docSnap.data().agentCode}</b>
                    </a>
                </div>
            </li>
            `;
        }
        else 
            this.#agentCodeSecton = ``;

        let createdTime = convertDateFromMilliSecToDateString(docSnap.data().createdOn);
        let output = `
            <li class="collection-header">
                <h4><small>Profile Information</small></h4>
            </li>`;
                
        output += `
                    <li class="collection-item">
                        <div>
                            Name
                            <a href="#!" class="secondary-content">
                                <b>${docSnap.data().name}</b>
                            </a>
                        </div>
                    </li>
                    <li class="collection-item">
                        <div>
                            Phone
                            <a href="#!" class="secondary-content">
                                <b>${docSnap.data().phone}</b>
                            </a>
                        </div>
                    </li>
                    <li class="collection-item">
                        <div>
                            Email  Address
                            <a href="#!" class="secondary-content">
                                <b>${docSnap.data().email}</b>
                            </a>
                        </div>
                    </li>
                    <li class="collection-item">
                        <div>
                            Customer Type
                            <a href="#!" class="secondary-content">
                                <b>${docSnap.data().userType}</b>
                            </a>
                        </div>
                    </li>
                    <li class="collection-item">
                        <div>
                            BVN
                            <a href="#!" class="secondary-content">
                                <b>${docSnap.data().bvn}</b>
                            </a>
                        </div>
                    </li>
                    <li class="collection-item">
                        <div>
                            Date Registered
                            <a href="#!" class="secondary-content">
                                <b>${createdTime}</b>
                            </a>
                        </div>
                    </li>
                    ${this.#agentCodeSecton}
                    <li class="collection-item">
                        <div>
                            &nbsp;
                            <a href="#!" class="secondary-content">
                                <b>&nbsp;</b>
                            </a>
                        </div>
                    </li>
                `;
                
        insertIntoDOM('.info_container', output);
        insertIntoDOM('.profile_name', `${docSnap.data().name}`);

        if(this.#isWithTaskMenu)
            this.#displayTaskMenu();
    }









    #displayTaskMenu()
    {
        document.querySelector('.manageAccMenuDive').innerHTML = `
        <p><div class="divider"></div></p>
        <p>
            <a href="#" class="btn-flat manage_acc" data-action="activate" data-specifiedId="${this.#userId}">
                Activate Account
            </a>
        </p>
        <p><div class="divider"></div></p>
        <p>
            <a href="#" class="btn-flat manage_acc" data-action="deactivate" data-specifiedId="${this.#userId}">
                Deactivate Account
            </a>
        </p>
        <p><div class="divider"></div></p>`;


        ////////////
        //Manager Specified user Account
        //Register event handle for the manage account btns
        if(document.querySelectorAll('.manage_acc'))
        {
            let manageActionBtns = document.querySelectorAll('.manage_acc');
            manageActionBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    console.log(e.target);
                    this.#manageSpecifiedAccountAction(e.target);
                }, false);
            });
        }
        // ---------------------

    }






    //Class base ui mostly manipulation methods 
    
    #manageSpecifiedAccountAction(actionElem)
    {
        let action = actionElem.dataset.action;
        switch (action) {
            case "activate":
                this.#processActivateOrDeactivate(action);
                break;
            case "deactivate":
                this.#processActivateOrDeactivate(action);
                break;
            default:
                break;
        }

    }



    #processActivateOrDeactivate(action)
    {
        console.log(action);
        
        let content = `
        <div class="row">
            <div class="col s12">
                <div class="card z-depth-0">
                    <div class="card-content red-text">
                        <span class="card-title">Confirm Action</span>
                        <p>
                            Are you sure, you want to ${action} the agent?
                            Please use the buttons below to confirm your actions,
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn red cancel">Cancel</a>
                        <a href="#" class="btn green confirm">Confirm</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('.info_container', content);

        //Register event handlers for the two buttons
        if(document.querySelector('.cancel'))
        {
            document.querySelector('.cancel').addEventListener('click', e => {
                e.preventDefault();
                this.#displayUserProfileInfo(this.#docSnap);
            })
        }
         //Register event handlers for the two buttons
        if(document.querySelector('.confirm'))
        {
            document.querySelector('.confirm').addEventListener('click', e => {
                e.preventDefault();
                this.#activateUser(action);
            })
        }
    }


    async #activateUser(action)
    {
        const agent = doc(this.#db, this.#collName, this.#userId);

        // Set the "activated" field of the cnapx-customer to 'true'
        let value = (action == 'activate')? true : false ;

        updateDoc(agent, {
            activated: value
        })
        .then(() => {
            toastIt('green', 'Updated Successdfully');
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to activate');
        })
        .finally(() => {
            this.#displayUserProfileInfo(this.#docSnap);
        });

    }



}
export { LoadSpecifiedUserProfile };