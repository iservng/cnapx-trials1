
import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
import { removeSidenav } from "../utils_src/remove_side_nav.js";
import { removeModal } from "../utils_src/remove_modal.js";
import { removeLandingPageSections } from '../utils_src/remove_landing_page_sections.js';

class FinanceProfileDashboard //Finance
{
    #_mErrors;
    #mErrorMsg;
    #customerName;
    
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;
        
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
            import('../header/finance_profile_menu.js')
            .then(m => {
                let usermenu = new m.FinanceProfileMenu();
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
                            <div class="col s12 purple lighten-5" style="margin-top: 3rem; border-bottom: 2px solid #aa00ff; border-top: 2px solid #aa00ff;">
                            
                                <p>
                                    <b class="blue-text text-darken-1">
                                        Activity Tool Bar
                                    </b>
                                </p>
                                <p><div class="divider"></div></p>
                                
                                
                            </div>


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
                        import('../utils_src/logout_class.js')
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


}
export { FinanceProfileDashboard };