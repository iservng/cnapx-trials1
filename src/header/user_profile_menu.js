import { toastIt } from "../utils/toast_it.js";
import { insertIntoDOM } from '../utils/insert_into_DOM.js';

import { APP_NAME, DEFAILT_MENU } from '../config/app_constants.js';
import { removeSidenav } from "../utils/remove_side_nav.js";
/**
 * This class is responsible to taking information, then display the header part of this application using the specified information. This information in question is usually 
 * 1. The logo name of the Application
 * 2. The link names
 */
class UserProfileMenu 
{
    #_mErrors;
    #mErrorMsg;
    #logo;
    #menuLabels;
    #themeColor;
    #linksFontsColor;
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

            let customerName = `Undefined`;
            if(sessionStorage.getItem('btnAction'))
            {
                //If menu is being called from created account, then the user name is in the user session
                customerName = JSON.parse(sessionStorage.getItem('customerInfo')).name;
                console.log(customerName);
            }

          
            
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
                                <small>${customerName}</small>
                            </span>
                        </a>
                        
                    </div>
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
                                <a href="#!" class="add_product">
                                    Add Product
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="records">
                                    Records
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="transactions">
                                    Transactions
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
                    <a href="#!" class="blue-text">
                        <small>Link Acount</small>
                    </a>
                </li>
                <li>
                    <a href="#!" class="blue-text">
                        <small>Transactions</small>
                    </a>
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
                                
                                
                                <!-- Dropdown Trigger -->
                                <!-- class="waves-effect waves-light btn modal-trigger" href="#modal1" -->
                                <li>
                                    <a class="dropdown-trigger ${this.#linksFontsColor}" href="#!" data-target="dropdown1">
                                        ${customerName}
                                    </a>
                                </li>

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
              




            //Open Cart
            if(document.querySelectorAll('.cart-ui'))
            {
                let cartOpenBtns = document.querySelectorAll('.cart-ui');
                cartOpenBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();
                        // console.log("Open cart ok");
                        //Dynamically import and execute the cartUI class
                        import('../shoppingCart/cart_ui.js')
                        .then(m => {

                            let cartUI = new m.CartUI();
                            cartUI.createUi();

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
                        import('../shop/add_product_ui.js')
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


            /******************************************************
             * Register the Event handler for logout functionality
             */
            if(document.querySelectorAll('.logout'))
            {
                let logoutBtns = document.querySelectorAll('.logout');
                logoutBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.preventDefault();

                        // ----------
                        import('../utils/logout_class.js')
                        .then(m => {

                            let logout = new m.Logout();
                            logout.logUserOut();

                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Error: Try again letter!');
                        });
                        // -------------

                    });
                });
            }
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
        }
    }





}
export { UserProfileMenu };