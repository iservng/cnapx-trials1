import { toastIt } from "../../utils/toast_it";
import { removeLandingPageSections } from "../../utils/remove_landing_page_sections.js";
import { removeModal } from "../../utils/remove_modal.js";
import { removeSidenav } from "../../utils/remove_side_nav.js";
import { insertIntoDOM } from "../../utils/insert_into_DOM.js";
//

class CustomerRegisterType 
{
    #_mErrors;
    #mErrorMsg;
    #userData;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';

        /**
         * Access the customer info from the user session
         */
        if(sessionStorage.getItem('customerInfo'))
        {
            this.#userData = JSON.parse(sessionStorage.getItem('customerInfo'));
            // console.log(this.#userData);

        }
        else 
        {
            this.#_mErrors++;
            this.#mErrorMsg = "User info not found!";
        }

    }


    createUi()
    {
        if(this.#_mErrors == 0)
        {

            // Remove Modal
            // cnapx-5a1c0
            removeModal();
            
            // Remove Side Navigation
            removeSidenav();

            // Remove landing page sections
            removeLandingPageSections();

            /**
             * Extract customer name
             */
            let customerName = this.#userData['name'];
            
            let content = `
            <div class="container">

                <div class="row" style="margin-top: 3rem;">



                    <!-- USER-PROFILE-AVARTAR  -->
                    <div class="col s12 center-align">
                        <small><b>&nbsp;</b></small>
                        <h4 class="purple-text text-darken-3">
                            <small>${customerName}</small>
                        </h4>
                        <div class="center-align">
                            <b class="purple-text text-accent-4">
                                How do you want to register? please select below.
                            </b>
                        </div>
                    </div>



                    


                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                        <div class="row">
                            <form id="customerTypeForm">
                            <div class="col s6 m6 l6">
                                <div class="card-panel grey lighten-4 center-align z-depth-0">
                                    <span class="purple-text text-darken-3">
                                    
                                        <img src="./images/individual.png" alt=""> 

                                        <br>
                                            
                                        <b>
                                            <a href="#" data-customertype="individual" class="customerType">
                                                Individual
                                            </a>
                                        </b>
                                        
                                    </span> 
                                </div>
                            </div>

                            

                            <div class="col s6 m6 l6">
                                <div class="card-panel grey lighten-4 center-align z-depth-0">
                                    <span class="purple-text text-darken-3">
                                        
                                        <img src="./images/marchant.png" alt="">
                                        <br>
                                        <b>
                                            <a href="" data-customertype="marchant" 
                                            class="customerType">
                                                Marchant
                                            </a>
                                        </b>
                                        
                                    </span>
                                
                                </div>
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
            </div>`;
            insertIntoDOM('main', content);


            /**
             * Register event handler for the customer-type selection
             */
            if(document.querySelectorAll('.customerType'))
            {
                let typeBtns = document.querySelectorAll('.customerType');
                typeBtns.forEach(typeBtn => {
                    typeBtn.addEventListener('click', e => {
                        e.preventDefault();
                        
                        
                        import('./process_customer_registration_type.js')
                        .then(m => {
                            let customer = new m.ProcessCustomerRegistrationType(e.target);
                            customer.processType();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to process register type');
                        });
                        // -----------------

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

}
export { CustomerRegisterType };