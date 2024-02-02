


import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { removeSidenav } from "../utils/remove_side_nav.js";
import { removeModal } from "../utils/remove_modal.js";
import { removeLandingPageSections } from '../utils/remove_landing_page_sections.js';


class AddProductUi
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
    }





    /*******************************
     * The public API of this Class
     */
    createUi()
    {
        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing
        if(this.#_mErrors == 0)
        {
            // Remove Modal
            // removeModal();
            // Remove Side Navigation
            // removeSidenav();
            // Remove landing page sections
            // removeLandingPageSections();
            // Call user profile menu.
            
            // import('../header/user_profile_menu.js')
            // .then(m => {
            //     let usermenu = new m.UserProfileMenu();
            //     usermenu.createUi();
            // })
            // .catch(error => {
            //     console.log(error.message);
            //     toastIt('red', 'Error loading Menu!');
            // });


            let customerName = `Default Name`;
            // sessionStorage.
            if(sessionStorage.getItem('btnAction'))
            {
                //If menu is being called from created account, then the user name is in the user session
                customerName = JSON.parse(sessionStorage.getItem('customerInfo')).name;
            }

            //Display Content
            let content = `
            <div class="container" style="">

                <div class="row" style="margin-top: 3rem;">
                    
                    <!-- USER-PROFILE-AVARTAR  -->
                    <div class="col s12">
                        
                        <h4 class="purple-text">
                            <small>
                                <b>Add Product</b>
                            </small>
                        </h4>
                        <p>
                            <b>
                                <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                                    Menu
                                </a>
                            </b>
                        </p>
                    </div>



                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                        
                        <div class="row">
                            <form class="col s12" id="add_product_form">

                                <div class="file-field input-field">
                                    <div class="btn purple">
                                        <span>File</span>
                                        <input type="file" id="product_image">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text" placeholder="Product Image">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="product_name" type="text" class="validate">
                                        <label for="product_name">Product Name</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="cost_price" type="number" class="validate">
                                        <label for="cost_price">Cost Price</label>
                                    </div>

                                    <div class="input-field col s6">
                                        <input id="selling_price" type="number" class="validate">
                                        <label for="selling_price">Selling Price</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="product_quantity" type="number" class="validate">
                                        <label for="product_quantity">Quantity</label>
                                    </div>

                                    <div class="input-field col s6">
                                        <input id="quantity_price" type="number" class="validate">
                                        <label for="quantity_price">Quantity Price</label>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="product_unit" type="number" class="validate">
                                        <label for="product_unit">Product Unit</label>
                                    </div>

                                    <div class="input-field col s6">
                                        <input id="unit_price" type="number" class="validate">
                                        <label for="unit_price">Unit Price</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="unit_per_quantity" type="number" class="validate">
                                        <label for="unit_per_quantity">Unit Per Quantity</label>
                                    </div>
                                </div>


                                <p>

                                    <input type="submit" class="btn purple" id="add_product_btn" value="Add Product">
                                
                                </p>
                            

                                

                            </form>
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





            /**
             * Register form submit-event HANDLER
             * ==========================
             */
            if(document.querySelector('#add_product_form'))
            {
                document.querySelector('#add_product_form').addEventListener('submit', e => {
                    e.preventDefault();
                    //Dynamically load the code that handler the processing of the form and pass the form object to it.

                });
            }








            /**
             * LOGOUT
             * ===========
             */

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
                        // -----------------


                    });
                });
            }
            // =======================




        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

        
    }


}
export { AddProductUi };