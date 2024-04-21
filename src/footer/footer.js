import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";

class Footer 
{

    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
    }

    /**
     * Public API
     */
    createUi()
    {
        
        if (this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row">
                <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Company </h5>
                <ul>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            Our Services
                        </a>
                    </li>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            Our Team
                        </a>
                    </li>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a class="grey-text text-lighten-3" href="#!">
                            Connect with us
                        </a>
                    </li>
                    <p>
                        Icons here
                    </p>
                </ul>
            </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Business</h5>
                        <ul>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Business Account
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Point of Sales Terminal
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    CnapxPay Card Reader
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © 2023 Copyright Text
                    <a class="grey-text text-lighten-4 right" href="#!">
                            <small>Powered by</small> <b>iservng</b>
                    </a>
                </div>
            </div> 
            `;
            insertIntoDOM('footer#footerId', content);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { Footer };