import { insertIntoDOM } from "../utils_src/insert_into_DOM";
import { toastIt } from "../utils_src/toast_it";

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
                                    <a href="#" class="btn-small red cancel">Cancel!</a>
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
                    import('./transaction_reciept_ui')
                    .then(m => {
                        let reciept = new m.TransactionRecieptUi();
                        reciept.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the reciept ui');
                    });
                });
            }




            //Register event handler for cancel
            if(document.querySelector('.cancel'))
            {
                document.querySelector('.cancel').addEventListener('click', e => {
                    e.preventDefault();
                    import('../shoppingCart_src/shopping_cart_home_page.js')
                    .then(m => {
                        let shopfront = new m.ShoppingCartHomePage();
                        shopfront.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the shop front ui');
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
export { TransactionCompletedUi };