/**
 * The modal class is a utility class that takes  a "content" as its perameter, then uses that content as its own display. By default it will get content by calling the "createAcountForm".
 */


import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { smallSpinner } from "../utils/small_spinner.js";
import { toastIt } from "../utils/toast_it.js";
import { getCreateAccountForm } from "../views/create_account_form.js";;


class ModalStructure
{
    #_mErrors;
    #mErrorMsg;
    #action;
    #modalContent;
    constructor(action = 'createAcount')
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#action = action;
        this.#modalContent = ``;

        switch (this.#action) 
        {
            case "createAcount":
                this.#modalContent = getCreateAccountForm();
                break;

            case "getCustomerLoginForm":
                this.#modalContent = `<h2>Thank You</h2>`;
                break;
        
            default:
                this.#modalContent = getCreateAccountForm();
                break;
        }

    }


    /**
     * Public API
     */
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div id="modal1" class="modal grey lighten-4">
                <div class="modal-content">
                    <h5 id="modalMainTitle" class="blue-text text-darken-4">
                        Create Account
                    </h5>
                    
                    <p id="modalMainContent">
                         ${this.#modalContent}
                    </p>
                </div>
                
            </div>
            `;

            // var modals = document.querySelectorAll('.modal');
            // modals.forEach(modal => {
            //     let instance = M.Modal.getInstance(modal);
            //     instance.close();
            // });..
            


            insertIntoDOM('div#modalStructure', content);
            var modal = document.querySelectorAll('.modal');
            M.Modal.init(modal, {
                opacity: 0.2
            });


            /**
             * REGISTER AN EVENT HANDLER FOR CREATE-ACCOUNT-FORM
             */
            if(document.querySelector('form#createAcount'))
            {
                document.querySelector('form#createAcount').addEventListener('submit', e => {
                    e.preventDefault();
                    /**
                     * Since we have access to the form itself, then we can pass it to the class or function that will process it.
                     */
                    
                    // ============================

                    import('../modal/handlers/process_create_account_form.js')
                    .then(m => {
                        let accountForm = new m.CreateUserAccount(e.target);
                        accountForm.checkCredentials();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unexpected Error!');
                    });

                    // ------------------

                });
            }



        }
        else 
        {
            console.log(this.#mErrorMsg);
            toastIt('red', this.#mErrorMsg);
        }
    }
}
export { ModalStructure };