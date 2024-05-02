import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { TransactionRecieptUi } from "./transaction_reciept_ui.js";
import { ShoppingCartHomePage } from "../shoppingCart/shopping_cart_home_page.js";



class TransactionCompletedUi
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
    }

    /**
     * CLASS PUBLI API
     * ---------------
     */
    createUi()
    {
        if(this.#_mErrors == 0)
        {

            /**
             * Since the transaction has successfully completed, then it will be removed from the local storage
             */
            localStorage.removeItem('cartData');

            let content = `
            <div class="container" style="margin-top: 4rem;">
                <div class="row">
                    <div class="col s12 l4 m4">
                        &nbsp;
                    </div>
                    <div class="col s12 l4 m4">
                        <div class="row">
                            <div class="col s12">
                            <div class="card z-depth-0">
                                <div class="card-content white-text center-align">
                                    <h1 class="green-text">
                                        <b>&checkmark;</b>
                                    </h>
                                    <span class="card-title green-text">
                                        Transaction Completed!
                                    </span>
                                </div>
                                <div class="card-action center-align">
                                    <a href="#" class="btn-small green generateReciept">Generate Reciept</a>
                                    <a href="#" class="btn-flat red cancel">Cancel!</a>
                                </div>
                                
                            </div>
                            </div>
                        </div>
            
                    </div>
                    <div class="col s12 l4 m4">
                        &nbsp;
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);


            /**
             * Register event handlers for the generateReciept
             * ---------------------------------------------
             */
            if(document.querySelector('.generateReciept'))
            {
                document.querySelector('.generateReciept').addEventListener('click', e => {
                    e.preventDefault();
                    //Dynamically import the print-reciept ui
                    //import
                    let reciept = new TransactionRecieptUi();
                    reciept.createUi();
                    
                });
            }




            //Register event handler for cancel
            if(document.querySelector('.cancel'))
            {
                document.querySelector('.cancel').addEventListener('click', e => {
                    e.preventDefault();
                    
                    let shopfront = new ShoppingCartHomePage();
                    shopfront.createUi();
                    
                }, false);
            }

        }
        else
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { TransactionCompletedUi };