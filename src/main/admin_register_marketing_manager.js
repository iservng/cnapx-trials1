import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";
import { generateShortPassword } from "../utils/random_pass.js";
import { getCreateAccountForm } from "../views/create_account_form";
import { progressLoader } from "../utils/progress_loader.js";
class AdminRegisterMarketingManagerUi
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
                    <div class="row" style="margin-top: 3rem;">
                        <div class="col s12">
                            <h5 class="purple-text">
                                Admin Add Marketing Manager
                            </h5>
                            <small>
                                The Marketing Manager Register widget enables and admin to add or register a new officer for the above mentioned role. 
                            </small>
                            <br>
                            <p>
                                <b class="red-text">
                                    <small>It should be noted that the user password is auto generated by the system, so the field should not be altered.</small>
                                </b>
                            </p>
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

                        <div class="col s12 m6 l6" id="agentInfoDiv">
                            <p>
                                <b>
                                    Enter Marketing Manager Details
                                </b>
                            </p>
                            ${this.#createAccountForm}
                        </div>

                        <div class="col s12 m3 l3">&nbsp;</div>

                        <div class="col s12" style="margin-top: 4rem;">
                            <p>
                                <small>Powered by </small><b class="purple-text">iservng</b>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            insertIntoDOM('main', content);


            if(document.querySelector('#password'))
            {
                let passfield = document.querySelector('#password');
                let passGen = generateShortPassword();
                passfield.setAttribute('value', passGen);

                console.log(passGen);
                passfield.readOnly = true;
            }

            //Register event handler for the dashboard-btn//
            if(document.querySelector('.dashboard'))
            {
                document.querySelector('.dashboard').addEventListener('click', e => {
                    e.preventDefault();

                    //Dynamical import the admin dasboard
                    import('../main/admin_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.AdminProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the admin dasboard');
                        
                    });
                }, false);
            }




            /*
                Event handle for the submit of form
                1. Register event handle for the form submition
            */
            this.#registerHandlerForForm();

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }



    #registerHandlerForForm()
    {
        if(document.querySelector('#createAcount'))
        {
            document.querySelector('#createAcount').addEventListener('submit', e => {

                e.preventDefault();
                console.log(document.querySelector('.createAccountBtn'));
                progressLoader('Working...!', '.createAccountBtn');

                import('../modal/handlers/process_create_account_form.js')
                .then(m => {
                        let agentType = 'marketing';
                        console.log('e.target = ', e.target);
                        let processor = new m.CreateUserAccount(e.target);
                        processor.registerAgent(agentType);
                })
                .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the processor for create account');

                        document.querySelector('.createAccountBtn').innerHTML = `<input type="submit" id="btnAction" class="btn-small blue blue text-darken-4-text text-darken-4" value="Create Account">`;
                });
            }, false);
        }
    }
}
export { AdminRegisterMarketingManagerUi };