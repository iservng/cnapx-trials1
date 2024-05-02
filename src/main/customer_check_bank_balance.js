import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";





class CustomerCheckBankBalance 
{
    #_mError;
    #mErrorMsg;
    constructor() 
    {
        this.#_mError = 0;
        this.#mErrorMsg = '';
    }

    createUi()
    {
        if(this.#_mError === 0)
        {
            
            let content = `<h1>OK</h1>`;
            insertIntoDOM('main', content);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);

        }

    }

}
export { CustomerCheckBankBalance };