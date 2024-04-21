
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { removeSidenav } from "../utils/remove_side_nav.js";
import { removeModal } from "../utils/remove_modal.js";
import { removeLandingPageSections } from '../utils/remove_landing_page_sections.js';
import { collection, getFirestore, where, query, getCountFromServer} from "firebase/firestore";
// import { doc } from "firebase/firestore";

class AgentProfileDashboard
{
    #_mErrors;
    #mErrorMsg;
    #customerName;
    #userId;
    #collName;
    #collRef;
    #db;
    constructor(userId)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#customerName = JSON.parse(sessionStorage.getItem('agentData')).name;
        this.#userId = userId;
        this.#collName = 'cnapx-customer';
        this.#db = getFirestore();
        this.#collRef = collection(this.#db, this.#collName);

        console.log('AgentProfileDashboard userid =', this.#userId);
        
    }



    /*******************************
     * The public API of this Class
     */
    createUi()
    {
        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing
        if(this.#_mErrors == 0)
        {
            //Remove Modal.
            removeModal();

            // Remove Side Navigation.
            removeSidenav();

            //Remove landing page sections...
            removeLandingPageSections();
            
            import('../header/agent_profile_menu.js')
            .then(m => {
                let usermenu = new m.AgentProfileMenu();
                usermenu.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Error loading Menu!');
            });
            
            //Display Content
            let content = `
            <div class="container" style="">
                <div class="row" style="margin-top: 3rem;">
                    
                    <!-- USER-PROFILE-AVARTAR  -->
                    <div class="col s12 center-align">
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b>
                                <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                                    ${this.#customerName}
                                </a>
                            </b>
                        </small>
                        <p>
                            <b class="purple-text text-darken-3">
                                Account Dashboard
                            </b>
                        </p>
                    </div>



                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                        <div class="row">
                            <div class="col s12 center-align" style="margin-bottom: 3rem; border-bottom: 1px solid #f3e5f5; padding-bottom: 2rem;">

                                <a href="#">
                                    <img src="./images/bell.png" alt="">
                                </a>
                                <a href="#" class="btn-flat">
                                    <b class="green-text text-darken-3">
                                        3 Notifications 
                                    </b>
                                </a>
                            </div>

                            <div class="col s4 center-align">
                                <img src="./images/pay.png" alt="">
                                <p>
                                    <a href="" class="purple-text text-darken-3 btn-flat makePayment">
                                        Pay
                                    </a>
                                </p>
                            </div>

                            <div class="col s4 center-align" style="border-left: 1px solid #f3e5f5; border-right: 1px solid #f3e5f5;">
                                <img src="./images/qrcode.png" alt="">
                                <p>
                                    <a href="" class="purple-text text-darken-3 btn-flat scan" data-action="scan">
                                        Scan
                                    </a>
                                </p>
                            </div>

                            <div class="col s4 center-align">
                                <img src="./images/withdraw.png" alt="">
                                    <p>
                                        <a href="#" class="purple-text text-darken-3 btn-flat collectFromWallet">
                                            Collect
                                        </a>
                                    </p>
                            </div>



                            <!-- SUB-COLLECTIONS  -->
                            <div class="col s12 purple lighten-5 center-align" style="margin-top: 3rem;">
                            
                                <p>
                                    <b class="purple-text text-darken-3">
                                        Registered Customers 
                                        <a class="btn-flat purple lighten-5 black-text allCustomerCount">
                                            0.0
                                        </a>
                                    </b>
                                </p>
                                
                                
                            </div>


                            

                            <!--1 Redisigning Agent dashboard-->
                            <div class="col s12 m4 l4 purple lighten-5" style="margin-top: 3rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;">
                                <div class="row">
                                    <div class="col s12">
                                        <div class="card purple darken-3">
                                            <div class="card-content white-text">
                                                <span class="card-title">
                                                    Register Customer
                                                </span>
                                                <p>
                                                    I am very widget. I am good at allowing the agent collect information then register customers.
                                                </p>
                                            </div>
                                            <div class="card-action">
                                                <a href="#" class="agent_register_customer">
                                                    Get Started
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <!--1 Agent register customer-->


                            <!--2 Total Individual Customer-->
                            <div class="col s12 m4 l4 purple lighten-5" style="margin-top: 3rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;">
                                <div class="row">
                                    <div class="col s12">
                                        <div class="card purple darken-3">
                                            <div class="card-content white-text">
                                                <span class="card-title">
                                                    Total Individual Customer
                                                </span>
                                                    <h3 class="individualtotalCount">0.0</h3>
                                                <p>
                                                    register by Agent.
                                                </p>
                                            </div>
                                            <div class="card-action open_agent_individual_records">
                                                <a href="#">Open Records</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <!--2 Total Individual Customer//.individualtotalCount-->


                            
                            <!--3 Redisigning Agent dashboard-->
                            <div class="col s12 m4 l4 purple lighten-5" style="margin-top: 3rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;">
                                <div class="row">
                                    <div class="col s12">
                                        <div class="card purple darken-3">
                                            <div class="card-content white-text">
                                                <span class="card-title">
                                                    Total Marchant Customer
                                                </span>
                                                <h3 class="marchanttotalCount">0.0</h3>
                                                <p>
                                                    register by Agent.
                                                </p>
                                            </div>
                                            <div class="card-action open_agent_marchant_records">
                                                <a href="#">View Records</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <!--3 Redisigning Agent dashboard//open_agent_individual_records-->


                        </div>        
                    </div>

                    

                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">Powered by </small>
                        <b class="purple-text text-darken-3">
                            iservng
                        </b>
                    </div>
                    
                    
                </div>

            </div>
            `;
            insertIntoDOM('main', content);


            // ========================//
            //query for all customers register by agents
            let allAgtCustomerQ = query(this.#collRef, 
                where('agentCode', '==', `${this.#userId}`));

            getCountFromServer(allAgtCustomerQ)
            .then(snapShot => {

                document.querySelector('.allCustomerCount').innerHTML = `${snapShot.data().count}`;

            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to count records');
            });

            // ========================//marchanttotalCount
            //query for the count of only the marchant customers register by agents
            let qmarchants = query(this.#collRef, 
                where('agentCode', '==', `${this.#userId}`), 
                where('userType', '==', 'marchant'));

            getCountFromServer(qmarchants)
            .then(snapShot => {

                document.querySelector('.marchanttotalCount').innerHTML = `${snapShot.data().count}`;

            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to count records');
            });
            // ========================//marchanttotalCount




            // ========================//
            //query for only the count of Individual customers register by agents
            let q = query(this.#collRef, 
                where('agentCode', '==', `${this.#userId}`), 
                where('userType', '==', 'individual'));

            getCountFromServer(q)
            .then(snapShot => {

                document.querySelector('.individualtotalCount').innerHTML = `${snapShot.data().count}`;

            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to count records');
            });
            // ========================


            //
            
            /*
            1. Register event handler for the ".open_agent_marchant_records" class btn.
            2. Call the database for the total number of individual customers registered by this agent as at the moment.
             */ 
            if(document.querySelector('.open_agent_marchant_records'))
            {
                document.querySelector('.open_agent_marchant_records').addEventListener('click', e => {
                    e.preventDefault();
                    this.#openAgentsMarchantsRecords(this.#userId);
                    // this.#openAgentsIndividualRecords(this.#userId);
                }, false);
            }



            /*
            1. Register event handler for the ".open_agent_individual_records" class btn.
            2. Call the database for the total number of individual customers registered by this agent as at the moment.
             */ 
            if(document.querySelector('.open_agent_individual_records'))
            {
                document.querySelector('.open_agent_individual_records').addEventListener('click', e => {
                    e.preventDefault();
                    this.#openAgentsIndividualRecords(this.#userId);
                }, false);
            }




            //Register event handler for the agent_register_customer
            if(document.querySelector('.agent_register_customer'))
            {
                
                document.querySelector('.agent_register_customer').addEventListener('click', e => {
                    e.preventDefault();
                    this.#agentRegisterCustomer();
                }, false);
            }






            //Register event handler for open_register_customer_records
            if(document.querySelector('.open_register_customer_records'))
            {
                document.querySelector('.open_register_customer_records').addEventListener('click', e => {
                    e.preventDefault();
                    this.#selectCustomer();
                }, false);
            }



            //1.
            /************************************
             *  Logout Button Event Implementation
             */
            if(document.querySelectorAll('.logout'))
            {
                let logoutButtons = document.querySelectorAll('.logout');
                logoutButtons.forEach(logoutBtn => {
                    logoutBtn.addEventListener('click', e => {
                        e.preventDefault();
                        //Dynamically import and Execute the logout class
                        import('../utils/logout_class.js')
                        .then(m => {
                            let logout = new m.Logout();
                            logout.logUserOut();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unexpected network issue, try again!');
                        });
                        // -----------------
                    });
                });
            }
            // =======================



            //Make Payment
            /**
             * Register An event handler 
             */
            if(document.querySelector('.makePayment'))
            {
                document.querySelector('.makePayment').addEventListener('click', e => {
                    e.preventDefault();
                    import('./customer_make_payment_ui.js')
                    .then(m => {
                        let makePaymentUi = new m.CustomerMakePaymentUi();
                        makePaymentUi.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load pay UI.');
                    });
                    // ----------------
                });
            }

            // ===================


            // SCAN QR CODE 
            if(document.querySelector('.scan'))
            {
                // console.log("Scan");
                document.querySelector('.scan').addEventListener('click', e => {
                    e.preventDefault();
                    /**
                     * Call and load the class responsible for the generation and or scan of qr code.
                     */
                    import('./qr_code_payment_ui.js')
                    .then(m => {
                        let qrUi = new m.QRCodePaymentUi();
                        qrUi.createUi();
                    })
                    .catch(error => {
                        toastIt('red', 'Error! Unable to load QR Code UI.');
                        console.log(error.message);
                    });
                });
            }
            // ====================


            //COLLECT MONEY PAID (NOTIFIED) TO OUR INTERNAL WALLET
            if(document.querySelector('.collectFromWallet'))
            {
                document.querySelector('.collectFromWallet').addEventListener('click', e => {
                    e.preventDefault();
                    /**
                     * Dynamically call and execute the class responsible for collecting payment from user wallet to the user account
                     */
                    import('./customer_collect_money_from_wallet_ui.js')
                    .then(m => {
                        let walletCollect = new m.CustomerCollectMoneyFromWallet();
                        walletCollect.createUi();
                    })
                    // -------------------
                });
            }
            // ====================

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
















    /*******************************************
     * Class based utility methods mostly for UI manupulation
     */
    //this.#openAgentsMarchantsRecords(this.#userId);
    async #openAgentsMarchantsRecords(agentUserId)
    {
        import('./open_agents_marchants_records.js')
        .then(m => {
            // let records = new m.OpenAgentsIndivualRecords(agentUserId);
            let records = new m.OpenAgentsMarchantRecords(agentUserId);
            records.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the agent records');
        });

    }

    async #openAgentsIndividualRecords(agentUserId)
    {
        import('./open_agents_individual_records.js')
        .then(m => {
            let records = new m.OpenAgentsIndivualRecords(agentUserId);
            records.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the agent records');
        });

    }


    //this.#agentRegisterCustomer();
    #agentRegisterCustomer()
    {
        //We need the docId of this user-agent.
        // ====================================
        let content = `
        <div class="container">
            <div class="row">
                <div class="col s12" style="margin-top: 4rem;">
                    <h5>Register Customer</h5>
                </div>
                <div class="col s12">
                    <p>
                        Please ensure that all information collected are clear and acurate.
                    </p>
                </div>
                <div class="col s12" style="margin-bottom: 3rem;">
                    <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                        MENU
                    </a>

                    <a href="#" class="btn-flat dashboard">Dashboard</a>
                </div>

                <div class="col s12 formDivWrapper" style="margin-top: 2rem;">
                
                </div>

                <div class="col s12 m6 l6" style="margin-top: 2rem;">
                    
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);
        // =======================
        import('../views/create_account_form.js')
        .then(m => {

            let accountForm = m.getCreateAccountForm();
            insertIntoDOM('.formDivWrapper', accountForm);
            //Register event handler for the submit of the form
            if(document.querySelector('#createAcount'))
            {
                document.querySelector('#createAcount').addEventListener('submit', e => {
                    e.preventDefault();
                    // ===========================
                    import('../modal/handlers/process_create_account_form.js')
                    .then(m => {    
                        let accountForm = new m.CreateUserAccount(e.target);
                        accountForm.checkCredentials();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unexpected Error!');
                    });
                    // ===========================
                }, false);
            }

        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load create account form');
        });


        //Register event handler for dashboard
        if(document.querySelector('.dashboard'))
        {
            document.querySelector('.dashboard').addEventListener('click', e => {
                e.preventDefault();
                import('./agent_customer_profile_dashboard.js')
                .then(m => {
                    let dash = new m.AgentProfileDashboard(this.#userId);
                    dash.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                });
            }, false);
        }


    }





    







    #selectCustomer()
    {
        let content = `
        <div class="container">
            <div class="row">
                <div class="col s12" style="margin-top: 4rem;">
                    <h5>Selct Customer Type</h5>
                </div>
                <div class="col s12">
                    <p>Please select the customer using the specified buttons below.</p>
                </div>
                <div class="col s12" style="margin-bottom: 3rem;">
                    
                    <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">Menu</a>

                    <a href="#" class="btn-flat">Dashboard</a>
                </div>


                <div class="col s12 m6 l6" style="margin-top: 2rem;">
                
                    <p>
                        <b> Select Marchant</b>
                    </p>
                    <p><small>Register customer as an individual user, to do that click the bbutton below</small></p>
                    <a href="#" data-customerType="Marchant" class="btn-large purple darken-3 customerType">
                        Marchant Customer
                    </a>
                </div>

                <div class="col s12 m6 l6" style="margin-top: 2rem;">
                    <p>
                        <b> Select Individual</b>
                    </p>
                    <p><small>Register customer as an individual user, to do that click the bbutton below</small></p>
                    <a href="#" data-custmerType="Individual" class="btn-large purple darken-3 customerType">
                        Individual Customer
                    </a>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);

        //Register event handler for .customerType
        if(document.querySelectorAll('.customerType'))
        {
            let customerTypes = document.querySelectorAll('.customerType');
            customerTypes.forEach((ctype, index) => {
                ctype.addEventListener('click', e => {

                    e.preventDefault();
                    //Extract the customertype infor
                    let custmerType = e.target.dataset.custmerType;
                    if(custmerType == 'Individual')
                        this.#openIndividualAcconts()
                    else if(customerTypes == 'Marchant')
                        this.#openMarchantAccount();

                }, false);

            });
        }

    }



    #openIndividualAcconts()
    {
        console.log("Individual open");
    }

    #openMarchantAccount()
    {
        console.log("Marchant open");

    }


}
export { AgentProfileDashboard };