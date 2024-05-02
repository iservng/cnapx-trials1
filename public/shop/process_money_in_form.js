import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";
import { AddMoneyInUi } from "./add_money_in_ui.js";
import { ShoppingCartHomePage } from "../shoppingCart/shopping_cart_home_page.js";


class ProcessMoneyInForm
{
    #_mError;
    #mErrorMsg;
    #form;
    constructor(form)
    {
        this.#_mError = 0;
        this.#mErrorMsg = '';

        if(!form)
        {
            this.#_mError++;
            this.#mErrorMsg ="Invalid form submission";
        }
        else 
        {
            let namePattern = /^[a-zA-Z0-9\s-]{3,30}$/;
            let amountPattern = /^[0-9]{1,}$/;
            if(!namePattern.test(form.item_name.value))
            {
                this.#_mError++;
                this.#mErrorMsg = "Item name is required";
            }
            else if(!amountPattern.test(form.item_amount.value))
            {
                this.#_mError++;
                this.#mErrorMsg = "The amount is required";

            }
            else if(!namePattern.test(form.narration.value))
            {
                this.#_mError++;
                this.#mErrorMsg = "The narration is required";
            }
            else if (form.money_in_date.value == '')
            {
                this.#_mError++;
                this.#mErrorMsg = "The date is required";
            }
            else if(form.money_in_time.value == '')
            {
                this.#_mError++;
                this.#mErrorMsg = "The time is required";
            }
            else 
            {
                this.#form = form;
            }
        }

    }


    /**
     * Class public API
     * -----------------
     */
    processFormContent()
    {
        if(this.#_mError == 0)
        {
            console.log(this.#form);
            
            // -------------------
            this.#addMoneyIn(this.#form);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }





    //Utility function 
    #addMoneyIn(form)
    {
        

        let objectStoreName = 'money-in';
        let data = {

            item_name: form.item_name.value.trim().toUpperCase(),
            item_amount: Number(form.item_amount.value),
            narration: form.narration.value.trim(),
            money_in_date: form.money_in_date.value,
            money_in_time: form.money_in_time.value,
            createdOn: Date.now()
                
        };
        let offlinedb = new OfflineDB();
        offlinedb.saveToDB(objectStoreName, this.#addSuccessful, data);

        

    }




    #addSuccessful()
    {
        let content = `
        <div class="container">
            <div class="center-align" style="margin-top: 5rem;"> 
                <h1>&checkmark;</h1>
                <h6><b class="green-text">Done!</b></h6>
                <p style="margin-top: 2rem;">
                    <a href="#" class="btn-small purle add_money_in">
                        Record Money In
                    </a>
                    <a href="#" class="btn-small red cancel">
                        Cancel
                    </a>
                </p>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);


        //Register Event handler for the add_money_in//
        if(document.querySelectorAll('.add_money_in'))
        {
            let addMoneyInBtn = document.querySelectorAll('.add_money_in');
            addMoneyInBtn.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    
                    let moneyInUi = new AddMoneyInUi();
                    moneyInUi.createUi();
                    //import
                }, false);
            });
        }




        //Register event handler for the cancel
        if(document.querySelector('.cancel'))
        {
            document.querySelector('.cancel').addEventListener('click', e => {
                e.preventDefault();
                
                let shopHome = new ShoppingCartHomePage();
                shopHome.createUi();
                
            }, false);
        }

    }
}
export { ProcessMoneyInForm };