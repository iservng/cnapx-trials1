
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { removeSidenav } from "../utils/remove_side_nav.js";
import { removeModal } from "../utils/remove_modal.js";
import { removeLandingPageSections } from '../utils/remove_landing_page_sections.js';
import { COMPANY } from "../config/app_constants.js";
import { 
    query, 
    getCountFromServer, 
    getFirestore, 
    where, 
    collection 
} from "firebase/firestore";
import { smallSpinner } from "../utils/small_spinner.js";

class MarketingProfileDashboard
{
    #_mErrors;
    #mErrorMsg;
    #customerName;
    #db;
    #collName;
    #collRef;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;

        console.log('this.#customerName =', this.#customerName);
        this.#db = getFirestore();
        this.#collName = 'cnapx-customer';
        this.#collRef = collection(this.#db, this.#collName);
        
    }



    /*******************************
     * The public API of this Class
     */
    createUi()
    {
        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing
        if(this.#_mErrors == 0)
        {
            //Remove Modal
            removeModal();

            // Remove Side Navigation
            removeSidenav();

            //Remove landing page sections
            removeLandingPageSections();
            //Call user profile menu.
            
            
            // import('../header/agent_profile_menu.js')
            import('../header/marketing_profile_menu.js')
            .then(m => {
                let usermenu = new m.MarketingProfileMenu();
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
                                Marketing Manager Dashboard
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
                            <div class="col s12 purple lighten-5 center-align" style="margin-top: 3rem; margin-bottom: 2rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;">
                                <p>
                                    <b class="blue-text text-darken-1 agent_count">
                                        
                                    </b>
                                </p>
                                <p><div class="divider"></div></p>
                            </div>


                            <div class="col s12 m6 l6">
                                <div class="row">
                                    <div class="col s12">
                                        <div class="card white z-depth-1">
                                            <div class="card-content purple-text">
                                                <span class="card-title">
                                                    View Marketers
                                                </span>
                                                <p>
                                        
                                                    I am convenient because I require little effort to use effectively. Hit the buttom below to pop open the agents records.
                                                </p>
                                            </div>
                                            <div class="card-action">
                                                <a href="#" class="btn-large purple marketingAgents">
                                                    Open Records
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col s12 m6 l6"></div>


                        </div>        
                    </div>

                    

                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">Powered by </small>
                        <b class="purple-text text-darken-3">
                            ${COMPANY}
                        </b>
                    </div>
                    
                    
                </div>

            </div>
            `;
            insertIntoDOM('main', content);




            smallSpinner('Checking...', '.agent_count');
            // ===============
            const qAgent = query(this.#collRef, where("userType", "==", "agent"));
            // //Agent Count
            getCountFromServer(qAgent)
            .then(snapCount => {
                document.querySelector('.agent_count').innerHTML = snapCount.data().count + " Active Marketing Agents";
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Could not count the Marketing Agents');
            });
            // ==================


            // Register event handler for marketingAgents
            if(document.querySelector('.marketingAgents'))
            {
                document.querySelector('.marketingAgents').addEventListener('click', e => {
                    e.preventDefault();
                    this.#loadAgents();
                    console.log(e.target);
                }, false);
            }



            //1.
            /************************************
             * Logout Button Event Implementation.
             */
            // Stopped 12|03|2024.
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




    async #loadAgents()
    {
        import('./load_agents.js')
        .then(m => {
            let marchants = new m.LoadAgents();
            marchants.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the marchants');
        });

    }







}
export { MarketingProfileDashboard };