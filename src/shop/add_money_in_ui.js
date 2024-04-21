


import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";


class AddMoneyInUi
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
                                <b>Add Money In</b>
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
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem; border: 1px solid #f3e5f5;">


                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                <div class="card-content">
                                    <span class="card-title">Enter values</span>
                                    <p>
                                        <div class="row">
                                        <form class="col s12" id="add_money_in_form">
            
                                            <div class="row">
                                                <div class="input-field col s12">
                                                    <input id="item_name" type="text" class="validate">
                                                    <label for="item_name">Item Name</label>
                                                </div>
                                            </div>
            
                                            <div class="row">
                                                <div class="input-field col s12">
                                                    <input id="item_amount" type="number" class="validate">
                                                    <label for="item_amount">Amount</label>
                                                </div>
                                            </div>
            
                                            <div class="row">
                                                <div class="input-field col s12">
                                                    <input id="narration" type="text" class="validate">
                                                    <label for="narration">Narration</label>
                                                </div>
                                            </div>
            
                                            <div class="row">
                                                <div class="input-field col s6">
                                                    <input id="money_in_date" type="date" class="validate">
                                                    <label for="money_in_date">Date</label>
                                                </div>
            
                                                <div class="input-field col s6">
                                                    <input id="money_in_time" type="time" class="validate">
                                                    <label for="money_in_time">Time</label>
                                                </div>
                                            </div>
            
            
            
                                            <p>
            
                                                <input type="submit" class="btn purple" id="add_money_in_btn" value="Save">
                                            
                                            </p>
                                        </form>
                                    </div>
                                    </p>
                                </div>
                                
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

            </div>
            `;
            insertIntoDOM('main', content);





            /**
             * Register form submit-event HANDLER
             * ==========================
             */
            if(document.querySelector('#add_money_in_form'))
            {
                document.querySelector('#add_money_in_form').addEventListener('submit', e => {
                    e.preventDefault();
                    //Dynamically load the code that handler the processing of the form and pass the form object to it.
                    import('./process_money_in_form.js')
                    .then(m => {
                        let moneyInUi = new m.ProcessMoneyInForm(e.target);
                        moneyInUi.processFormContent();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load form processor');
                    });
                    
                    // -------------------------

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
export { AddMoneyInUi };