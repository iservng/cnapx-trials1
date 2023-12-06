import { toastIt } from "../utils/toast_it.js";
import { insertIntoDOM } from '../utils/insert_into_DOM.js';

import { APP_NAME, DEFAILT_MENU } from '../config/app_constants.js';
import { smallSpinner } from "../utils/small_spinner.js";
import { removeSidenav } from "../utils/remove_side_nav.js";
/**
 * This class is responsible to taking information, then display the header part of this application using the specified information. This information in question is usually 
 * 1. The logo name of the Application
 * 2. The link names.
 */
class AppHeader 
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

            // console.log('ok', this.#menuLabels);
            let mainMenuOutput = ``;
            this.#menuLabels.forEach(label => {

                if(label == 'Signin')
                {

                }
                else 
                {
                    mainMenuOutput += `
                    <li>
                        <a href="sass.html" class="${this.#linksFontsColor}">
                            ${label}
                        </a>
                    </li>
                    `;

                }
                

            });
            
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
                                <small>Designed for your comfort</small>
                            </span>
                        </a>
                        
                    </div>
                </li>
                <div class="divider"></div>
                <li>
                    
                    <a href="#!" class="purple-text text-darken-2">
                        <b>About Cnapx</b>
                    </a>

                </li>
                <div class="divider"></div>
                <li>
                    <a href="#!" class="purple-text text-darken-2">
                        <b>Our Services</b>
                    </a>
                </li>
                <div class="divider"></div>
               
                
                <li>
                    
                    <a href="#!" class="purple-text text-darken-2 sign-in">
                        <b>Sign-In</b>
                    </a>
                </li>
                <div class="divider"></div>
                <li>
                   
                    <a href="#modal1" class="purple-text text-darken-2 modal-trigger">
                        <b>Sign Up</b>
                    </a>
                </li>
            </ul>
            <!-- SIDE NAVIGATION OF APPLICATION ENDS -->


            <!-- MAIN MENU OF APPLICATION -->
            <!-- 
                Dropdown Structure 
            -->

            <ul id="dropdown1" class="dropdown-content">
                <li><a href="#!" class="blue-text">one</a></li>
                <li><a href="#!" class="blue-text">two</a></li>
                <li class="divider"></li>
                <li><a href="#!" class="blue-text">three</a></li>
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
                                <li>
                                    <a href="#" class="${this.#linksFontsColor}">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="${this.#linksFontsColor}">
                                        Services
                                    </a>
                                </li>

                                <li>
                                    <a class="dropdown-trigger ${this.#linksFontsColor}" href="#!" data-target="dropdown1">
                                        Contact
                                    </a>
                                </li>

                                <li>
                                    <a class="waves-effect waves-light ${this.#linksFontsColor} modal-trigger" href="#modal1">
                                        Signup
                                    </a>
                                </li>

                                

                                <!-- Dropdown Trigger -->
                                
                                <li>
                                    <a class="purple white-text waves-effect waves-light btn sign-in" href="#">
                                        Sign In
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



            /**
             * This code registers event handler for the sign-in-button
             */
            if(document.querySelectorAll('.sign-in'))
            {
                // console.log("Yep!");
                let signinBtns = document.querySelectorAll('.sign-in');

                signinBtns.forEach(signinBtn => {
                    signinBtn.addEventListener('click', e => {
                        e.preventDefault();

                        console.log(e.target);



                        // ----------------------------

                        /**
                         * All the landing page items should be removed
                         */
                        if(document.querySelectorAll('.landing-page'))
                        {
                            let landingPageSections = document.querySelectorAll('.landing-page');
                            // console.log(landingPageSections);
                            landingPageSections.forEach(section => {
                                section.style.display = 'none';
                            });

                        }

                        /**
                         * Remove the header, also using css-property "display=none"
                         */
                        if(document.querySelector('header'))
                        {
                            let header = document.querySelector('header');
                            header.style.display = 'none';
                        }


                        smallSpinner('Working', 'main');
                        removeSidenav();
                        
                        // import and display the customer login interface
                        import('../main/customer_login_interface.js')
                        .then(m => {
                            let customerLoginUi = new m.CustomerLoginInterface();
                            customerLoginUi.createUi();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Error! Please try latter');
                        });
                        
                        // =========================
                        


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
export { AppHeader };