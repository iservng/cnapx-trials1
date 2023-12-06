import { smallSpinner } from "../../utils/small_spinner.js";
import { toastIt } from "../../utils/toast_it.js";

class ProcessCustomerRegistrationType 
{

    #_mErrors;
    #mErrorMsg;
    #typeSelectBtn;
    constructor(typeSelected)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!typeSelected)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "Please select type";
        }
        else 
        {
            this.#typeSelectBtn = typeSelected;
        }
        

    }

    processType()
    {
        if(this.#_mErrors == 0)
        {
            let customerType = this.#typeSelectBtn.dataset.customertype;
            smallSpinner('Working...', 'main');

            /**
             * Import and execute the customer profile interface dashboard
             */
            import('../../main/customer_profile_dashboard.js')
            .then(m => {
                let customerDashboard = new m.CustomerProfileDashboard();
                customerDashboard.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load customer dashboard!');
            });


        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }
}
export { ProcessCustomerRegistrationType };