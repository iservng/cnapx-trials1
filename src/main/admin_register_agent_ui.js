
import { insertIntoDOM } from "../utils_src/insert_into_DOM";
import { toastIt } from "../utils_src/toast_it.js";
import { getCreateAccountForm } from "../views/create_account_form.js";
import { generateShortPassword } from "../utils_src/random_pass.js";
import { progressLoader } from "../utils_src/progress_loader.js";

class AdminRegisterAgentUi
{

    #_mErrors;
    #mErrorMsg;
    #createAccountForm;
    #agentPassword;
    #agentUniqueCode;

    constructor()
    {

        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#createAccountForm = getCreateAccountForm();

    }

    //Class Public API
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    <div class="col s12" style="margin-bottom: 2rem;">
                        <h5>Register An Agent</h5>
                        <small>
                            The agent registration form should be filled carfully as details willl be used to generate a unique code specific to the particular agent.
                        </small> <br>
                        <b class="red-text">Please note that the password field is auto-generated and should not be tempered with.</b>
                    </div>

                    <div class="col s12 m3 l3">
                        <a href="#" class="btn-flat back-dashboard">
                            Dashboard
                        </a>
                        <a href="#" class="btn-flat sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            menu
                        </a>
                    </div>

                    <div class="col s12 m6 l6" id="agentInfoDiv">
                        <p><b class="agentTitle">Enter Agent's Information</b></p>
                        <p class="fields-wrapper agentContent">
                            ${this.#createAccountForm}
                        </p>
                    </div>

                    <div class="col s12 m3 l3">&nbsp;</div>

                </div>
            </div>
            `;
            insertIntoDOM('main', content);



            //Back to dashboard
            if(document.querySelector('.back-dashboard'))
            {
                document.querySelector('.back-dashboard').addEventListener('click', e => {
                    e.preventDefault();
                    import('./admin_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.AdminProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the dashboard');
                    });
                });
            }

            //Automatically genrate password
            if(document.querySelector('#password'))
            {
                let passfield = document.querySelector('#password');
                passfield.value = generateShortPassword();
                passfield.disabled = true;
            }

            //Register event handler for the form submit..
            if(document.querySelector('#createAcount'))
            {
                document.querySelector('#createAcount').addEventListener('submit', e => {
                    e.preventDefault();
                    progressLoader('Working...!', '.createAccountBtn');
                    let form = e.target;
                    import('../modal/handlers/process_create_account_form.js')
                    .then(m => {
                        let agentType = 'agent';
                        let processor = new m.CreateUserAccount(form);
                        processor.registerAgent(agentType);
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load account processor');
                        document.querySelector('.createAccountBtn').innerHTML = `<input type="submit" id="btnAction" class="btn-small blue blue text-darken-4-text text-darken-4" value="Create Account">`;
                    });
                }, false);
            }
        }
        else 
        {
            console.log(this.#mErrorMsg);
            toastIt('red', this.#mErrorMsg);
        }
    }

}
export { AdminRegisterAgentUi };