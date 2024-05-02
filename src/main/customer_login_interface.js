import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
import { progressLoader } from "../utils_src/progress_loader.js";

class CustomerLoginInterface 
{
    #_mErrors;
    #mErrorMsg;
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

                    <div class="col s12 center-align" style="margin-bottom: 2rem;">    
                        <h4>
                            <small>
                                <b class="purple-text text-darken-3">Login</b>
                            </small>
                        </h4>
                        
                    </div>

                    <div class="col s12 m4 l4"></div>

                    <form action="" id="customerLoginForm">
                        <div class="col s12 m4 l4">

                            <div class="card-panel lighten-4 z-depth-1" style="border: 1px solid white;">
                                <div class="white-text">

                                    <!-- Email  -->
                                    <div class="row">
                                        <div class="col s12">
                                                    
                                            <div class="input-field">
                                                <input id="email" type="email" class="validate" style="border-bottom: 1px solid purple;">

                                                <label for="email" class="purple-text">Email</label>
                                                        
                                                <span class="helper-text" data-error="wrong" data-success="right">Enter valid email only</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Password  -->
                                    <div class="row">
                                        <div class="col s12">
                                                    
                                            <div class="input-field">

                                                <input id="password" type="password" class="validate" style="border-bottom: 1px solid purple;">

                                                <label for="password" class="purple-text">Password</label>

                                                <span class="helper-text" data-error="wrong" data-success="right">password 6-digits and above

                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                        
                                </div>
                            </div>

                            <div class="card-panel lighten-4 z-depth-0">
                                <div class="white-text center-align loginBtnDiv">

                                    <input type="submit" 
                                    class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Validate User">
                                        
                                </div>
                            </div>

                            <p><div class="divider"></div></p>
                            <p class="right-align">
                                <small>
                                    <i>Dont have an account ?</i>
                                    <a href="#" class="create_account_with_sys_pin">
                                        Create Account
                                    </a>
                                </small>
                            </p>
                        </div>
                    </form>

                    <div class="col s12 m4 l4"></div>

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





            /*****************************************
             * Register event handle for the create_account_with_sys_pin
             */
            if(document.querySelector('.create_account_with_sys_pin'))
            {
                document.querySelector('.create_account_with_sys_pin').addEventListener('click', e => {
                    e.preventDefault();
                    import('./create_account_with_sys_pass.js')
                    .then(m => {
                        let createAccUi = new m.CreateAccountWithSysPass();
                        createAccUi.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load create Account Ui');
                    })
                }, false);
            }




            /****************************
             * Register event handler for the submit of the customer login form ..
             */
            if(document.querySelector('#customerLoginForm'));
            {
                
                let custLoginForm = document.querySelector('#customerLoginForm');
                custLoginForm.addEventListener('submit', e => {

                    e.preventDefault();
                    progressLoader('Checking...', '.loginBtnDiv');
                    import('./check_customer_login.js')
                    .then(m => {
                        
                        let checker = new m.CheckCustomerLogin(e.target);
                        checker.validateOrWarn();

                    })
                    .catch(error => {
                        console.log(error.message);
                    });
                    // --------------

                });
            }

        }
        else 
        {
            toastIt('red', 'Unexpected error! Unable to fetch login');
            console.log(this.#mErrorMsg);
        }
    }
}

export { CustomerLoginInterface };