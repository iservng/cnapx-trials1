import { insertIntoDOM } from "../utils_src/insert_into_DOM";
import { toastIt } from "../utils_src/toast_it";



class ProcessMoneyOutForm
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
            // --------------------
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
        import('../indexeddb_src/offlinedb.js')
        .then(m => {

            let objectStoreName = 'money-out';
            let data = {

                item_name: form.item_name.value.trim().toUpperCase(),
                item_amount: Number(form.item_amount.value),
                narration: form.narration.value.trim(),
                money_in_date: form.money_in_date.value,
                money_in_time: form.money_in_time.value,
                createdOn: Date.now(),
                
            };
            let offlinedb = new m.OfflineDB();
            offlinedb.saveToDB(objectStoreName, this.#addSuccessful, data);

        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to connect with the database');
        });

    }




    #addSuccessful()
    {
        let content = `
        <div class="container">
            <div class="center-align" style="margin-top: 5rem;"> 
                <h1>&checkmark;</h1>
                <h6><b class="green-text">Done!</b></h6>
                <p style="margin-top: 3rem;">
                    <a href="#" class="btn-small purle add_money_out">
                        Record Money Out
                    </a>
                    <a href="#" class="btn-small red cancel">
                        Cancel
                    </a>
                </p>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);


        //Register Event handler for the add_money_in
        if(document.querySelectorAll('.add_money_out'))
        {
            let addMoneyInBtn = document.querySelectorAll('.add_money_out');
            addMoneyInBtn.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    import('./add_money_out_ui.js')
                    .then(m => {
                        let moneyOutUi = new m.AddMoneyOutUi();
                        moneyOutUi.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to connect with money-Out UI');
                    });
                });
            });
        }




        //Register event handler for the cancel
        if(document.querySelector('.cancel'))
        {
            document.querySelector('.cancel').addEventListener('click', e => {
                e.preventDefault();
                import('../shoppingCart_src/shopping_cart_home_page.js')
                .then(m => {
                    let shopHome = new m.ShoppingCartHomePage();
                    shopHome.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'Unable to load the shop home');
                });
            });
        }

    }
}
export { ProcessMoneyOutForm };