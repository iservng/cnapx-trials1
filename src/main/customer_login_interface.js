import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";

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
                                <div class="white-text center-align">

                                    <input type="submit" 
                                    class="btn white-text text-darken-3 purple darken-3 z-depth-1" value="Validate User">
                                        
                                </div>
                            </div>

                            <p><div class="divider"></div></p>
                            <p class="right-align">
                                <small>
                                    <i>forgot your password ?</i>
                                    <a href="#">click Here</a>
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

            /**
             * Register event handler for the submit of the customer login form 
             */
            if(document.querySelector('#customerLoginForm'));
            {
                
                let custLoginForm = document.querySelector('#customerLoginForm');
                custLoginForm.addEventListener('submit', e => {

                    e.preventDefault();
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