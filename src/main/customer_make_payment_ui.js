import { toastIt } from "../utils_src/toast_it.js";
import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { progressLoader } from "../utils_src/progress_loader.js";


class CustomerMakePaymentUi
{
    #_mErrors;
    #mErrorMsg;
    #recipients;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';

    }

    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">

                <div class="row" style="margin-top: 3rem;">

                    <div class="col s12 hide-on-med-and-up center-align">
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b> <a href="#" class="sidenav-trigger" data-target="mobile-demo">John Danfodio</a></b>
                        </small>
                    </div>

                    <div class="col s12 hide-on-small-only">
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b><a href="#" class="sidenav-trigger" data-target="mobile-demo">John Danfodio</a></b>
                        </small>
                    </div>


                    

                    <!-- 
                        PAGE TITLE (MAKE PAYMENT) 
                    -->
                    <!--
                    <div class="col s12" style="margin-bottom: 2rem;">
                        <h5>
                            <p>
                                <small class="purple-text text-darken-3">
                                    <b>Make Payment</b>
                                </small>
                            </p>
                        </h5>
                        
                    </div>
                    -->
                    <div class="col s12 hide-on-med-and-up center-align">
                        <h5>
                            <p>
                                <small class="purple-text text-darken-3">
                                    <b>Make Payment</b>
                                </small>
                            </p>
                        </h5>
                        <a href="#" class="cancel">cancel</a>
                    </div>

                    <div class="col s12 hide-on-small-only">
                    <h5>
                        <p>
                            <small class="purple-text text-darken-3">
                                <b>Make Payment</b>
                            </small>
                        </p>
                    </h5>
                    <a href="#" class="cancel">cancel</a>
                    </div>
                    




                    <form id="customerMakePaymentForm">
                    <div class="col s12 m4 l4" id="firstBox">
                        <div class="row">
                                <div class="card-panel white z-depth-0">
                                    <span class="blue-text text-darken-3">

                                    <p>
                                        <label>
                                            <input name="sender" class="sender" type="radio" value="GTBank"/>
                                            <span class="purple-text">
                                                GT Bank
                                            </span>
                                        </label>
                                    </p>
                                    <div class="divider"></div>
                                    <p>
                                        <label>
                                            <input name="sender" class="sender" value="AccessBank" type="radio" />
                                            <span class="purple-text">
                                                Access Bank
                                            </span>
                                        </label>
                                    </p>
                                    <div class="divider"></div>
                                    <p>
                                        <label>
                                            <input name="sender" class="sender" value="EcoBank" type="radio" />
                                            <span class="purple-text">
                                                Eco Bank
                                            </span>
                                        </label>
                                    </p>

                                    </span>
                                </div>
                            
                        </div>
                    </div>



                    <div class="col s12 m4 l4" id="secondBox">

                        <div class="card-panel z-depth-0">
                                <div class="white-text">

                                    <p>
                                        <b class="purple-text text-darken-3">
                                            Enter Amount
                                        </b>
                                    </p>
                                    <p>
                                        <div class="row">
                                            <div class="col s12">

                                            
                                                <div class="input-field">
                                                    <input id="amount" type="number" class="validate">

                                                    <label for="amount">Amount</label>
                                                    <span class="helper-text" data-error="wrong" data-success="right">
                                                        Enter amount in figure
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </p>
                                
                                </div>
                            </div>
                    </div>

                    <div class="col s12 m4 l4" id="thirdBox">
                           
                    </div>
                    </form>
                        <div class="col s12 right-align" style="margin-top: 6rem;">
                            <p>
                                <div class="divider"></div>
                            </p>
                            <small class="grey-text"> Powered by </small>
                            <b class="purple-text text-darken-3">iservng</b>
                        </div>

                    
                </div>

            </div>
            `;
            insertIntoDOM('main', content);


            //Call the recipient function
            this.#showRecipientInputField();





            /**
             * 1. CANCEL
             * ----------
             * Register event handler for the cancel-button that returns user to the dashboard ui.
             */
            if(document.querySelector('.cancel'))
            {
                
                let cancelBtns = document.querySelectorAll('.cancel');
                cancelBtns.forEach(cancel => {
                    cancel.addEventListener('click', e => {
                        e.preventDefault();

                        import('./marchant_customer_profile_dashboard.js')
                        .then(m => {
                            let dashboard = new m.CustomerProfileDashboard();
                            dashboard.createUi();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Error! Unable to load UI.');
                        });
                        // -----------

                    });
                })
            }




            /**********************************************
             * Adds an event handler for the submission of the customer-make-payment-form
             */
            if(document.querySelector('#customerMakePaymentForm'))
            {
                document.querySelector('#customerMakePaymentForm').addEventListener('submit', e => {
                    e.preventDefault();
                    //Call the check customer payment form checker class
                    // console.log(e.target);..
                    import('./check_customer_make_payment_form.js')
                    .then(m => {
                        let checker = new m.CheckCustomerMakePay(e.target);
                        checker.processIt();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load payment form');
                    });
                    // ----------------------
                });
            }





            /*******************************************
             * Event handler for the click of the select recipient
             */
            if(document.querySelector('#browseRecipient'))
            {
                document.querySelector('#browseRecipient').addEventListener('click', e => {
                    e.preventDefault();
                    console.log();
                    /*******************************
                     * This where we call the class utility method for manupulating the recipient txt-input-tag to selcet-input-tag
                     * These recipients are people whom user had sent money priviously
                     */

                    this.#loadRecipients();


                });
            }







        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }



    





    /********************************************* *
        Class Utility methods for manipulating the the make-payment ui
    */
    #showRecipientInputField()
    {
        let content = `
        <div class="card-panel z-depth-0">
            <div class="purple-text text-darken-3">

                <p>
                    <b>Enter Recipient ID</b>
                </p>
                <p>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="recipient" type="text" class="validate">
                            <label for="recipient">example@cnapxpay</label>
                        </div>

                        <div class="right-align">
                            <a href="#" id="browseRecipient">Browse Recipient</a>
                        </div>
                    </div>
                </p>

                <p>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="submit" class="btn red accent-4" value="pay now">
                        </div>
                    </div>
                </p>
                                    
            </div>
        </div>
        `;
        insertIntoDOM('#thirdBox', content);
    }

    async #loadRecipients()
    {
        //1. Put the progress loader
        progressLoader('Working...', '#thirdBox');

        //2. Make some Asynchronouse request for the number of reciecipient whom this particular user had previously transacted with in the past.
        this.#recipients = [
            {id: '1', acountId: 'Hussain@cnapxpay'},
            {id: '2', acountId: 'Wasterhort@cnapxpay'},
            {id: '3', acountId: 'Edwardho@cnapxpay'},
        ];


        //3. Format the above values for display
        let recipientStr = ``;
        this.#recipients.forEach(recipient => {
            recipientStr += `
            <option value="${recipient.acountId}">
                <small>${recipient.acountId}</small>
            </option>
            `;
        });
        



        let content = `
        <div class="card-panel z-depth-0">
            <div class="purple-text text-darken-3">

                <p>
                    <b>Select Recipient ID</b>
                </p>
                <p>
                    <div class="row">

                        <div class="input-field col s12">
                            <select id="recipient">
                                <option value="" disabled selected>
                                    Select
                                </option>
                                ${recipientStr}
                            </select>
                            <label>example@cnapxpay</label>
                        </div>


                        <div class="right-align">
                            <a href="#" id="writeRecipient">
                                Enter Recipient
                            </a>
                        </div>

                    </div>
                </p>

                <p>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="submit" class="btn red accent-4" value="pay now">
                        </div>
                    </div>
                </p>
                
            </div>
        </div>
        `;
        insertIntoDOM('#thirdBox', content);

        //Activate the select tage
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);



        //Register an event handler for the enter-recipient click event
        if(document.querySelector('#writeRecipient'))
        {
            document.querySelector('#writeRecipient').addEventListener('click', e => {
                e.preventDefault();
                this.#showRecipientInputField();
            });
        }

    }
}

export { CustomerMakePaymentUi };