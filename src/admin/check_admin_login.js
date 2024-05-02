import { toastIt } from "../utils_src/toast_it.js";


class CheckAdminLogin
{
    #_mErrors;
    #mErrorMsg;
    #form;
    #email;
    #password;
    constructor(adminLoginForm)
    {
        if(!adminLoginForm)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Invalid Submission!";
        }
        else 
        {
            this.#form = adminLoginForm;

            /**
             * We can extract the content of this form here.
             */
            let email = this.#form.email.value.trim();
            let password = this.#form.password.value.trim();
            let emailPattern = /^[a-zA-Z0-9@\.-]{3,26}$/;
            let passwordPattern = /^[a-zA-Z0-9]{6,27}$/;

            if(!emailPattern.test(email))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Please use accepted email format';
            }
            else if(!passwordPattern.test(password))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "Password format is wrong!";
            }
            else 
            {
                this.#email = email;
                this.#password = password;

            }

        }

    }


    processLogin()
    {
        if(this.#_mErrors == 0)
        {
            /***************************
             * Load the Admin Dashboard UI.
             */
            import('./admin_dashboard_ui.js')
            .then(m => {

                let adminDashboard = new m.AdminDashboardUi();
                adminDashboard.createUi();
                        
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Admin Dashboard unable to load');
            });
            // ==================

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { CheckAdminLogin }