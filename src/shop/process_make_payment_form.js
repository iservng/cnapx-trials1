import { toastIt } from "../utils/toast_it";
import { generatePassword } from "../utils/random_pass.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";

class ProcessMakePaymentForm
{
    #_mErrors;
    #mErrorMsg;
    #form;
    #offlinedb;
    #dailyTransactionDB;
    #transactionDetailDB;
    constructor(form)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!form)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Invalid form submission";
        }
        else if(form.grandTotal.value == '')
        {
            this.#_mErrors++;
            this.#mErrorMsg = "The grand total not found";
        }
        else if(form['paymode'].value == '')
        {
            this.#_mErrors++;
            this.#mErrorMsg = "The payment method is required";
        }
        else 
        {
            this.#form = form;
            this.#offlinedb = new OfflineDB();
            this.#dailyTransactionDB = "daily-transactions";
            this.#transactionDetailDB = "cart";

        }
    }




    /**
     * PUBLIC API OF THIS CLASS
     * --------------------
     *      */

    validatePayment()
    {
        if(this.#_mErrors == 0)
        {
            console.log(this.#form);
            let transactionId = generatePassword();
            let time_stamp = Date.now();
            let amount = Number(this.#form.grandTotal.value);
            let paymentMethod = this.#form['paymode'].value;
            let cartItems = JSON.parse(localStorage.getItem('cartData'));

            //Transaction
            let transactionData = {
                transaction_id: transactionId,
                createdOn: time_stamp,
                transaction_amount: amount,
                payment_method: paymentMethod
            };

            this.#offlinedb.saveToDB(this.#dailyTransactionDB, this.#callBackFunc, transactionData);


            // Transaction details
            cartItems.forEach(cartItem => {
                cartItem['createdOn'] = time_stamp;
                cartItem['transaction_id'] = transactionId;
                this.#offlinedb.saveToDB(this.#transactionDetailDB, this.#callBackFunc, cartItem);
            });

            //Store the transaction id is session for reciept
            sessionStorage.setItem('transaction_id', transactionId);
            

            //After the above items are added to the DB, then show the success UI, that allows the user to either print reciept or cancel
            import('./transaction_completed_ui.js')
            .then(m => {
                let transactionCompletedUi = new m.TransactionCompletedUi();
                transactionCompletedUi.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load the transaction succesdful ui');
            });

            
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }



    #callBackFunc(id)
    {
        console.log(id);
        toastIt('green', 'Added success id '+id);
    }




}

export { ProcessMakePaymentForm };