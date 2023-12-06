import { toastIt } from "../utils/toast_it.js";


class CheckCustomerLogin 
{
    #_mErrors;
    #mErrorMsg;
    #email;
    #password;
    constructor(form)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!form)
        {
            this.#_mErrors++;
            this.#mErrorMsg = 'Invalid Form Submission';
        }
        else 
        {
            //Extract the email and the password
            let email = form.email.value.trim();
            let password = form.password.value.trim();

            if(!email)
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Invalid Email!';
            }
            else if(!password)
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Invalid Password!';
            }
            else 
            {
                this.#email = email;
                this.#password = password;
            }

        }

    }

    validateOrWarn()
    {
        if(this.#_mErrors == 0)
        {
            // console.log('Customer login checker!');
            // console.log(this.#email);
            // console.log(this.#password);

            /**
             * 
             * This is where this checker class calls the customer-profile-interface and displays it.
             */
            if(document.querySelector('header'))
            {
                let header = document.querySelector('header');
                header.style.display = 'block';
            }
            import('./customer_profile_dashboard.js')
            .then(m => {
                let customer_profile_dashboard = new m.CustomerProfileDashboard();
                customer_profile_dashboard.createUi();
            })
            .catch(error => {
                console.log(error.message);
            });
            // ------------------



        }
        else 
        {
            console.log(this.#mErrorMsg);
            toastIt('red', this.#mErrorMsg);
        }

    }
}
export { CheckCustomerLogin };