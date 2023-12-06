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
                    <div class="col l6 s12">
                        <h5 class="white-text">
                            Cnapx Content
                        </h5>
                        <p class="grey-text text-lighten-4">
                            You can use rows and columns here to organize your footer content.
                        </p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Snapchat
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