import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";

class CustomerCollectMoneyFromWallet
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
    }

    //Class Public API
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">

                    <!-- USER-PROFILE-AVARTAR  -->
                    <div class="col s12 center-align">
                        <h5 class="purple-text text-darken-3">
                            Payment Notifications
                        </h5>
                    </div>


                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                        <p>
                            <a href="" class="btn-flat">Dashboard</a>
                        </p>
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel center-align z-depth-0">
                            
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Acc.Id</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody class="purple-text text-darken-3">
                                            <tr>       
                                                <td>
                                                    <span>eclair@Cnapxpay</span>
                                                    <br>
                                                    <small class="grey-text">
                                                        21-09-2023 08:20pm
                                                    </small>
                                                </td>
                                                <td>$0.87</td>
                                                <td><a href="">Collect</a></td>
                                            </tr>
                                            <tr>
                                                        
                                                <td>
                                                    jellybean@cnapspay
                                                    <br>
                                                    <small class="grey-text">
                                                        21-09-2023 08:20pm
                                                    </small>
                                                </td>

                                                <td>$3.76</td>
                                                <td><a href="">Collect</a></td>
                                            </tr>
                                            <tr>
                                                        
                                                <td>
                                                    lollipop@cnapspay
                                                    <br>
                                                    <small class="grey-text">
                                                        21-09-2023 08:20pm
                                                    </small>
                                                </td>
                                                <td>$7.00</td>
                                                <td>
                                                    <a href="">Collect</a>    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>

                        <!-- Next/Previous Buttons  -->
                        <div class="row">
                            <div class="col s6">
                                
                                <a href="#" class="btn-flat" style="border: 1px solid grey;">&#10229;</a>
                                <a href="#" class="btn-flat purple darken-3 white-text waves-effect" style="border: 1px solid purple;">&#10230;</a>
                            </div>
                            <div class="col s6 right-align">
                                <a href="" class="btn purple darken-3">Collect All</a>
                            </div>
                        </div>
                    </div>


                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">Powered by </small>
                        <b class="purple-text text-darken-3">
                            iservng
                        </b>
                    </div>

                </div>
            </div>
            `;
            insertIntoDOM('main', content);
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { CustomerCollectMoneyFromWallet };