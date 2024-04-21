
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { removeSidenav } from "../utils/remove_side_nav.js";
import { removeModal } from "../utils/remove_modal.js";
import { removeLandingPageSections } from '../utils/remove_landing_page_sections.js';
import { collection, getCountFromServer, getFirestore, query, where } from "firebase/firestore";

class AdminProfileDashboard
{
    #_mErrors;
    #mErrorMsg;
    #customerName;
    #totalMarchants;
    #db;
    #colname;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        let customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;

        if(!customerName || customerName == null)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Customer not found";
        }
        else 
        {
            this.#customerName = customerName;
            this.#db = getFirestore();
            this.#colname = 'cnapx-customer';
        }
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
            
            import('../header/admin_profile_menu.js')
            .then(m => {
                let usermenu = new m.AdminProfileMenu();
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

                                <a href="#" class="btn-flat">
                                    <b class="purple-text text-darken-3 records">
                                        Records
                                    </b>
                                </a>

                                <a href="#" class="btn-flat">
                                    <b class="purple-text text-darken-3 bookKeeping">
                                        Shop
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
                                        Recent Transactions
                                    </b>
                                </p>
                                <p><div class="divider"></div></p>
                                
                                <small>
                                    <ul class="collection z-depth-3" style="border: 1px solid #f3e5f5 ;">
                                        <li class="collection-item avatar">
                                            
                                            <i class="material-icons circle white green-text">
                                                &checkmark;
                                            </i>
                                            <b class="title">
                                                <small class="green-text text-darken-3">
                                                    <a href="#" class="Total numberMarchantCustomers">Total Number Marchant Customers</a>
                                                </small>
                                            </b>
                                            <p>
                                                Marchant Customer Details
                                            </p>
                                            <a href="#!" class="secondary-content marchant_cust_count">0</a>

                                        </li>

                                        <li class="collection-item avatar">
                                            <i class="material-icons circle white green-text">
                                                &checkmark;
                                            </i>
                                            <b class="title">
                                                <small class="grey-text text-darken-3">
                                                    <a href="#" class="individualCustomers">    Total Individual Customers
                                                    </a>
                                                </small>
                                            </b>
                                            <p>
                                                Open individual-Customer Details
                                            </p>
                                            <a href="#!" class="secondary-content individual_cust_count">0</a>

                                        </li>

                                        <li class="collection-item avatar">
                                            <i class="material-icons circle white green-text">&check;</i>
                                            <b class="title">
                                                <small class="green-text text-darken-3">
                                                    <a href="#" class="marketingAgents">
                                                        Total Number Marketing Agents
                                                    </a>
                                                    
                                                </small>
                                            </b>
                                            <p>
                                                View Marketing Agents Details
                                            </p>
                                            <a href="#!" class="secondary-content agent_count">0</a>

                                        </li>
                                        <li class="collection-item avatar">
                                            <i class="material-icons circle white green-text">&cross;</i>

                                            <b class="title">
                                                <small class="red-text text-accent-4">
                                                    <a href="#" class="adminUser">Total Number of Admin Users</a>
                                                </small>
                                            </b>
                                            <p class="purple-text text-darken-4">
                                                View Admin User Details
                                            </p>
                                            <a href="#!" class="secondary-content admin_count">0</a>

                                        </li>
                                    </ul>
                                </small>
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



            //Register event handler for  numberMarchantCustomers
            if(document.querySelector('.numberMarchantCustomers'))
            {
                document.querySelector('.numberMarchantCustomers').addEventListener('click', e => {
                    e.preventDefault();
                    this.#loadMarchantCustomers();
                });
            }

            //Register event handler for individualCustomers
            if(document.querySelector('.individualCustomers'))
            {
                document.querySelector('.individualCustomers').addEventListener('click', e => {
                    e.preventDefault();
                    this.#loadIndividualCustomers();
                }, false);
            }


            //Register event handler for marketingAgents
            if(document.querySelector('.marketingAgents'))
            {
                document.querySelector('.marketingAgents').addEventListener('click', e => {
                    e.preventDefault();
                    this.#loadAgents();
                }, false);
            }


            //Register event handler for the adminUser
            if(document.querySelector('.adminUser'))
            {
                document.querySelector('.adminUser').addEventListener('click', e => {
                    e.preventDefault();
                    // this.#loadIndividualCustomers();
                    // this.#loadAgents();
                    this.#loadAdmins();
                }, false);
            }






            //Implementing Dashboard Metrix
            const colRef = collection(this.#db, this.#colname);

            // Create a query against the collection.
            const qMarchant = query(colRef, where("userType", "==", "marchant"));
            const qIndividual = query(colRef, where("userType", "==", "individual"));
            const qAgent = query(colRef, where("userType", "==", "agent"));
            const qAdmin = query(colRef, where("userType", "==", "admin"));

            //Marchant Count
            getCountFromServer(qMarchant)
            .then(snapCount => {
                document.querySelector('.marchant_cust_count').innerHTML = snapCount.data().count;
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Could not count the Marchant Customers');
            });

            //Individual Count
            getCountFromServer(qIndividual)
            .then(snapCount => {
                document.querySelector('.individual_cust_count').innerHTML = snapCount.data().count;
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Could not count the Individual Customers');
            });



            //Agent Count
            getCountFromServer(qAgent)
            .then(snapCount => {
                document.querySelector('.agent_count').innerHTML = snapCount.data().count;
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Could not count the Marketing Agents');
            });


            //Admin Count
            getCountFromServer(qAdmin)
            .then(snapCount => {
                document.querySelector('.admin_count').innerHTML = snapCount.data().count;
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Could not count the Admin Users');
            });






            //1.
            /**************************************
             *  Logout Button Event Implementation
             * ************************************
             */

            if(document.querySelector('.records'))
            {
                document.querySelector('.records').addEventListener('click', e => {
                    e.preventDefault();
                    // console.log("ok Fanta.");
                    import('../shop/records_ui.js')
                    .then(m => {

                        let recordUi = new m.RecordsUi();
                        recordUi.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the record UI');
                    });
                    // this.#
                })

            }





            if(document.querySelectorAll('.logout'))
            {
                let logoutButtons = document.querySelectorAll('.logout');
                logoutButtons.forEach(logoutBtn => {
                    logoutBtn.addEventListener('click', e => {
                        e.preventDefault();

                        
                        //Dynamically import and Execute the logout class
                        // ---- 
                        import('../utils/logout_class.js')
                        .then(m => {
                            let logout = new m.Logout();
                            logout.logUserOut();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unexpected network issue, try again!');
                        });
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
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load collect money ui');
                    });
                });
            }
            // ====================

            /**
             * BOOK KEEPING TRIGER CODE
             * *************************
             */
            if(document.querySelectorAll('.bookKeeping'))
            {
                let bookKeepingBtns = document.querySelectorAll('.bookKeeping');
                bookKeepingBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        /**
                         * Dynamically import and execute the shopping-cart class
                         */
                        import('../shoppingCart/shopping_cart_home_page.js')
                        .then(m => {
                            let shoppingCart = new m.ShoppingCartHomePage();
                            shoppingCart.createUi();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', "Unable to load Shopping Cart!");
                        });
                    });
                });
            }
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }



//
    async #loadMarchantCustomers()
    {
        import('./load_marchant_customers.js')
        .then(m => {
            let marchants = new m.LoadMarchantCustomers();
            marchants.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the marchants');
        });

    }

    async #loadIndividualCustomers()
    {
        import('./load_individual_customers.js')
        .then(m => {
            let marchants = new m.LoadIndividualCustomers();
            marchants.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the marchants');
        });

    }

    //
    async #loadAgents()//LoadAgents
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

    //this.#loadAdmins();
    async #loadAdmins()//LoadAgents
    {
        import('./load_admins.js')
        .then(m => {
            let admins = new m.LoadAdmins();
            admins.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the admins');
        });

    }

}
export { AdminProfileDashboard };