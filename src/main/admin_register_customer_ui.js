import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
import { getCreateAccountForm } from "../views/create_account_form.js";
import { progressLoader } from "../utils_src/progress_loader.js";
class AdminRegisterCustomerUi 
{

    #_mErrors;
    #mErrorMsg;
    #createAccountForm;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#createAccountForm = getCreateAccountForm();

    }

    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
                <div class="container">
                    <div class="row">
                        <div class="col s12" style="margin-top: 3rem;">
                            <h5 class="purple-text">
                                Admin Customer Registration
                            </h5>
                            <small>
                                This section is used by the Admin to add or register a new customer in the system. The fullname of the customer is implied and all fields are requeird.
                            </small>
                        </div>

                        <div class="col s12 m3 l3">
                            <p>
                                <a href="#" class="btn-flat dashboard">
                                    Dashboard
                                </a>
                            </p>
                            <p>
                                <a href="#" class="btn-flat sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                                    Menu
                                </a>
                            </p>
                            
                        </div>

                        <div class="col s12 m6 l6">

                            <p><b>Enter Customer Details</b></p>
                            ${this.#createAccountForm}
                        </div>

                        <div class="col s12 m3 l3">&nbsp;</div>

                        <div class="col s12" style="margin-top: 5rem;">
                            <small>Powered by </small>
                            <b class="purple-text">iservng</b>
                        </div>
                    </div>
                </div>
            `;
            insertIntoDOM('main', content);


            //Register event handler for Dasboard
            if(document.querySelector('.dashboard'))
            {
                document.querySelector('.dashboard').addEventListener('click', e => {
                    e.preventDefault();
                    progressLoader('Working...!', '.createAccountBtn');
                    //Dynamical import the admin dasboard
                    import('../main/admin_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.AdminProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the admin dasboard');

                        document.querySelector('.createAccountBtn').innerHTML = `<input type="submit" id="btnAction" class="btn-small blue blue text-darken-4-text text-darken-4" value="Create Account">`;
                        
                    });
                }, false);
            }



            //Register event handler for when admin submits createAcount-form.
            if(document.querySelector('#createAcount'))
            {

                document.querySelector('#createAcount').addEventListener('submit', e => {
                    e.preventDefault();
                    import('../modal/handlers/process_create_account_form.js')
                    .then(m => {
                        let processor = new m.CreateUserAccount(e.target);
                        processor.checkCredentials();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the processor for create account');
                    });
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
export { AdminRegisterCustomerUi };