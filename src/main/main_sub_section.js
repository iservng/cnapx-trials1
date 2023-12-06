import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";


class MainSubSection 
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
    }

    /**
     * Public API
     */
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row">
                    <div class="col s12 center-align">
                        <h4 style="margin-top: 6rem; margin-bottom: 3rem;" class="blue-text text-darken-3">
                            
                            <b>Flexible Interest Rate</b>
                        </h4>
                    </div>

                    <div class="col s12 m4 l4">

                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel white z-depth-0 center-align">
                                    <span class="blue-text text-darken-3">
                                        <h3>5%</h3>
                                        <div class="divider"></div>
                                        <p>

                                            <b>Nigeria Stock Exchange</b> <br>
                                            Lorem ipsum dolor sit amet.

                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel white z-depth-0 center-align">
                                    <span class="blue-text text-darken-3">
                                        <h3>20%</h3>
                                        <div class="divider"></div>
                                        <p>
                                            <b>Internationa Monitory Fund</b><br>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel white z-depth-0 center-align">
                                    <span class="blue-text text-darken-3">
                                        <h3>30%</h3>
                                        <div class="divider"></div>
                                        <p>
                                            <b>National Credit Bureau</b> <br>
                                            I am a very simple card.
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `;
            insertIntoDOM('section#categories', content);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { MainSubSection };