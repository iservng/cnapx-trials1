import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { smallSpinner } from '../utils/small_spinner.js';
import { toastIt } from "../utils/toast_it.js";


class CheckCustomerMakePay
{
    #_mErrors;
    #mErrorMsg;
    #form;
    #sender;
    #amount;
    #recieverId;
    constructor(form)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#sender = ``;
        if(!form)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Invalid form!";
        }
        else 
        {
            this.#form = form;

            //Extract the sender information
            let sender;
            for (let i = 0; i < this.#form['sender'].length; i++)
            {
                if(this.#form['sender'][i].checked)
                {
                    sender = this.#form['sender'][i].value;
                    break;
                }
            }
            //Checking Sender.
            if(!sender) 
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Please select the your bank';
            }
            else 
                this.#sender = sender;
                
            


            //Checking Amount.
            if(!this.#form.amount.value)
            {
                this.#_mErrors++;
                this.#mErrorMsg = "Please enter anamount";
            }
            else 
                this.#amount = this.#form.amount.value.trim();


            
            //Checking Recipient ID
            if(!this.#form['recipient'].value.trim())
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The recipient is required!";

            }
            else 
            {
                this.#recieverId = this.#form['recipient'].value.trim();
            }
            // ---------------------


        }
    }




    processIt()
    {
        if(this.#_mErrors == 0)
        {
            let transactionData = {
                sender: this.#sender,
                amount: this.#amount,
                reciver: this.#recieverId
            }
            console.log(transactionData);
            /**
             * This is where the class calls the 
             * 1. payment successful ui
             * 2. error found ui
             */
            this.#hideFirstAndThirdBox();
            smallSpinner("Working...", "#secondBox");

            /**
             * Asumming that everthing went well so we sent successful-ui
             */
            this.#showSuccessUi();

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }





    /**
     * Utility function for managing the ui that this class checks-for validation
     * 1. #hideFirstAndThirdBox()
     * 2. #showSuccessUi()
     */
    #showSuccessUi()
    {
        let content = `
        <div class="row">
            <div class="col s12">
                <div class="card z-depth-0">
                    <div class="card-content green-text center-align" style="">
                        
                        <p class="center-align">
                            <h1 class="center-align green-text" 
                                style="border: 1px solid #4caf50; 
                                    height: 90px; 
                                    width: 90px; 
                                    margin: 0 auto; 
                                    border-radius: 50%;">
                                        <b>&checkmark;</b>
                            </h1>
                        </p>
                        <a href="#" class="green-text center-align">
                            <b>Successful</b>
                        </a>
                        <p>
                            <a href="#" class="green-text center-align">
                                <small>Payment Completed View</small>
                            </a>
                        </p>
                    </div>
                    <div class="card-action center-align">

                        <a href="#" class="btn-small green white-text" id="viewPaymentDetails">
                            view details
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('#secondBox', content);

        /**
         * Register Event handler for the view payment details button
         */
        if(document.querySelector('#viewPaymentDetails'))
        {
            document.querySelector('#viewPaymentDetails').addEventListener('click', e => {
                e.preventDefault();
                console.log("Ok");
            })
        }
    }








    /******************************************
     * Class utility for UI manipulation
     * *****************************************
     */
    

    #hideFirstAndThirdBox()
    {
        if(document.querySelector('#firstBox'))
        {
            document.querySelector('#firstBox').innerHTML = '&nbsp;';
        }

        if(document.querySelector('#thirdBox'))
        {
            document.querySelector('#thirdBox').innerHTML = '&nbsp;';
        }
    }




    
}
export { CheckCustomerMakePay };