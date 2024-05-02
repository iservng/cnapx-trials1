import { toastIt } from "../utils_src/toast_it.js";
import { insertIntoDOM } from '../utils_src/insert_into_DOM.js';

import { APP_NAME, DEFAILT_MENU } from '../config_src/app_constants.js';
import { removeSidenav } from "../utils_src/remove_side_nav.js";
/**
 * This class is responsible to taking information, then display the header part of this application using the specified information. This information in question is usually 
 * 1. The logo name of the Application
 * 2. The link names
 */
class AppHeader 
{
    #_mErrors;
    #mErrorMsg;
    #logo;
    #menuLabels;
    #themeColor;
    #linksFontsColor;
    #customerName;
    constructor(logoName, menuLabels)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#logo = '';
        this.#menuLabels = [];
        this.#themeColor = 'purple';
        this.#linksFontsColor = 'purple-text';

        if(!logoName)
            this.#logo = APP_NAME;
        else
            this.#logo = logoName;


        if(!menuLabels)
            this.#menuLabels = DEFAILT_MENU;
        else 
            this.#menuLabels = menuLabels;


        // this.#customerName = JSON.parse(sessionStorage.getItem('marchantInfo')).name;
        if(!this.#customerName)
            this.#customerName = "Cnapx Pay";


    }






    /**
    *   Public Api
    */
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            /**
             * We can from here after its been confirmed error free, begin to use the above list-items array to set up the main-menu display-looks
             */
            this.content = `
            <!-- SIDE NAVIGATION OF APPLICATION -->
            <!-- SideNav Structure -->
            <!-- SideNav Structure class="blue lighten-1"-->

            <ul id="mobile-demo" class="sidenav grey lighten-3">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <!-- <img src="images/office.jpg"> -->
                        </div>
                        <a href="#user">
                        
                            <img class="circle" src="images/logo.jpg" style="margin-left: 2rem; margin-top: 2rem;">
                            
                        </a>
                        <a href="#name">
                            <span class="purple-text text-darken-4 name">
                                <h5><b>Cnapx</b><b class="purple-text text-darken-2" style="font-family: tahoma;">Pay</b></h5>
                            </span>
                        </a>
                        <a href="#email">
                            <span class="purple-text text-darken-2 email">
                                <small>${this.#customerName}</small>
                            </span>
                        </a>
                        
                    </div>
                </li>

                <div class="divider"></div>
                <li>
                    <a href="#!" class="purple-text text-darken-2 dashboard_ui" style="font-weight: bolder;">
                        Dashboard
                    </a>
                </li>

                <div class="divider"></div>
                <li>
                    <a class="cart-ui" href="#">
                        <b class="black-text cartAmount">0</b>
                        <img class="responsive-img" src="./images/cart-images/cart2.png">
                    </a>
                </li>

                <div class="divider"></div>
                

                <!--DROP-DOWN-->
                <li class="no-padding">
                    <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header purple-text text-darken-2">
                            <b>Manage Shop</b>
                        </a>
                        <div class="collapsible-body">
                        <ul>
                            <li>
                                <a href="#!" class="go_to_shop">
                                    Shop Front
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="add_product">
                                    Add Product
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="records">
                                    Inventory Records
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="transactions">
                                    Transactions
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="checks_and_balances">
                                    Checks and Balances
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="record_money_in">
                                    Record Money-in
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="record_money_out">
                                    Record Money-out
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="list_customers">
                                    Customers
                                </a>
                            </li>

                        </ul>
                        </div>
                    </li>
                    </ul>
                </li>
                <!--DROP-DOWN-->

                
                <div class="divider"></div>
                <li>
                    
                    <a href="#!" class="purple-text text-darken-2">
                        <b>Scan QR-code</b>
                    </a>

                </li>
                <div class="divider"></div>
                <li>
                    <a href="#!" class="purple-text text-darken-2">
                        <b>Check Balance</b>
                    </a>
                </li>
                <div class="divider"></div>
               
                <li>
                    
                    <a href="#!" class="purple-text text-darken-2">
                        <b>Link Account</b>
                    </a>
                </li>
                <div class="divider"></div>
                
                <li>
                
                    <a href="#" class="purple-text text-darken-2 logout">
                        <b>Logout</b>
                    </a>
                </li>
            </ul>
            <!-- SIDE NAVIGATION OF APPLICATION ENDS -->


            <!-- MAIN MENU OF APPLICATION -->
            <!-- 
                Dropdown Structure 
            -->

            <ul id="dropdown1" class="dropdown-content">
                <li>
                    <a href="#!" class="blue-text dashboard_ui">
                        <small>Dashboard</small>
                    </a>
                </li>
                <li>
                    <small>
                        <a href="#!" class="blue-text admin_manage_profile">
                            Manage Profile
                        </a>
                    </small>
                </li>
                
                <li class="divider"></li>
                <li>
                    <a href="#!" class="blue-text">
                        <small>View Profile</small>
                    </a>
                </li>
            </ul>

            <div class="navbar-fixed">
                <nav class="grey lighten-3 z-depth-0">
                    <div class="container">
                        <div class="nav-wrapper">

                            <a href="#" data-target="mobile-demo" class="sidenav-trigger purple-text">
                                <i class="material-icons">menu</i>
                            </a>

                            <a href="#!" class="brand-logo">
                                <small>
                                    <b class="purple-text text-darken-2">Cnapx</b><b class="purple-text text-accent-1" style="font-family: tahoma;">Pay</b>
                                </small>
                            </a>

                            <!--The Main-menu starts here -->
                            <ul class="right hide-on-med-and-down">
                                
                                
                                <!-- Dropdown Trigger//Soma -->
                                <!-- class="waves-effect waves-light btn modal-trigger" href="#modal1" -->

                                <!--
                                <li>
                                    <a class="dropdown-trigger ${this.#linksFontsColor}" href="#!" data-target="dropdown1">
                                        ${this.#customerName}
                                    </a>
                                </li>
                                -->

                                <li>
                                    <a class="purple darken-3 white-text waves-effect waves-light btn-small logout" href="#">
                                        Logout
                                    </a>
                                </li>

                                <li>
                                    <a class="cart-ui" href="#">
                                        <b class="black-text cartAmount">0</b>
                                        <img class="responsive-img" src="./images/cart-images/cart2.png">
                                    </a>
                                </li>
                                
                            </ul>
                            <!--The Main-menu stops here -->
                        </div>
                    </div>
                </nav>
            </div>`;
            insertIntoDOM('header', this.content);
            /**
             * The Header-part of the application technically consists of two parts
             * 1. the main-header.
             * 2. the side navigation.
             */


            var sidenav = document.querySelectorAll('.sidenav');
            M.Sidenav.init(sidenav);
            var dropdown = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(dropdown);

            var collapsible = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapsible);
// ========================================

            //Open Cart
            if(document.querySelectorAll('.cart-ui'))
            {
                let cartOpenBtns = document.querySelectorAll('.cart-ui');
                cartOpenBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        //Dynamically import and execute the cartUI class
                        import('../shoppingCart_src/cart_ui.js')
                        .then(m => {
                            let cartUI = new m.CartUI();
                            cartUI.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to load Cart UI');
                        });
                    });
                });
            }






            /**
             * The event handler for a"add_product"
             * --------------------------------------
             */
            if(document.querySelectorAll('.add_product'))
            {
                let addProductBtns = document.querySelectorAll('.add_product');
                addProductBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        // Dynamically load and execute the class responsible for showing the ui used for collecting product information and processing it
                        import('../shop_src/add_product_ui.js')
                        .then(m => {
                            let addProductUi = new m.AddProductUi();
                            addProductUi.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to load the add-product UI');
                        });

                    });
                });
            }






            /**
             * go_to_shop
             */
            if(document.querySelectorAll('.go_to_shop'))
            {
                let goToShopBtns = document.querySelectorAll('.go_to_shop');
                goToShopBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../shoppingCart_src/shopping_cart_home_page.js')
                        .then(m => {
                            let shopfront = new m.ShoppingCartHomePage();
                            shopfront.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                    });
                });
            }




            //Register event handler for list_customers
            if(document.querySelector('.list_customers'))
            {
                document.querySelector('.list_customers').addEventListener('click', e => {
                    e.preventDefault();
                    //Load the class responsible for displaying customers list
                    import('../shop_src/list_customers.js')
                    .then(m => {
                        let customerList = new m.ListCustomers();
                        customerList.createUi();
                        removeSidenav();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load customer List');
                    });
                });
            }





            /**
             * Register event handler for the record_money_in
             * --------------------------------------------
             */
            if(document.querySelectorAll('.record_money_in'))
            {
                let recordMoneyInBtns = document.querySelectorAll('.record_money_in');
                recordMoneyInBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../shop_src/add_money_in_ui.js')
                        .then(m => {
                            let moneyInUi = new m.AddMoneyInUi();
                            moneyInUi.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable load the add Money In UI');
                        });
                    });
                });

            }





            //Register event handler for the record_money_out
            // =================
            if(document.querySelectorAll('.record_money_out'))
            {
                let recordMoneyOutBtns = document.querySelectorAll('.record_money_out');
                recordMoneyOutBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../shop_src/add_money_out_ui.js')
                        .then(m => {
                            let moneyOutUi = new m.AddMoneyOutUi();
                            moneyOutUi.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to load the money out UI');
                        });
                    });
                });

            }





            /**
             * Register event handler for handler 
             * -------------------------
             */
            if(document.querySelectorAll('.transactions'))
            {
                let transactionsBtns = document.querySelectorAll('.transactions');
                transactionsBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../shop_src/transactions_ui.js')
                        .then(m => {
                            let transactionsUi = new m.TransactionsUi();
                            transactionsUi.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to load transactions UI');
                        });
                        
                    }, false);
                })
            }





            //Register event handler for checks_and_balances
            if(document.querySelector('.checks_and_balances'))
            {
                document.querySelector('.checks_and_balances').addEventListener('click', e => {
                    e.preventDefault();
                    //Dynamically import and execute the class responsible
                    import('../shop_src/checks_and_balances.js')
                    .then(m => {
                        let checks_and_balances = new m.ChecksAndBalances();
                        checks_and_balances.createUi();
                        removeSidenav();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the checks and balances!');
                    });
                }, false);
            }





            //REGISTER EVENT HANDLER FOR records
            if(document.querySelectorAll('.records'))
            {
                let recordsBtns = document.querySelectorAll('.records');
                recordsBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../shop_src/records_ui.js')
                        .then(m => {
                            let recodsUi = new m.RecordsUi();
                            recodsUi.createUi();
                            removeSidenav();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to load the recods UI');
                        });
                    }, false);
                });
            }


            /******************************************************
             * Register the Event handler for logout functionality
             */
            if(document.querySelectorAll('.logout'))
            {
                let logoutBtns = document.querySelectorAll('.logout');
                logoutBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        import('../utils_src/logout_class.js')
                        .then(m => {
                            let logout = new m.Logout();
                            logout.logUserOut();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Error: Try again letter!');
                        });
                    }, false);
                });
            }
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
        }
    }





}
export { AppHeader };