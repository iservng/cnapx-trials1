import { doc } from "firebase/firestore";
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { progressLoader } from "../utils/progress_loader.js";

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
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b><a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">John Danfodio</a></b>
                        </small>
                        <p>
                            <b class="purple-text text-darken-3 pageTitle">
                                Payment Notifications
                            </b>
                        </p>
                    </div>
                    


                    <!-- 
                    FIRST SECTION OF DASHBOARD 
                     -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;" id="mainContentSection">
                        <div class="row">

                            <div class="col s12">
                                <p>
                                    <a href="#" class="btn-flat backToDashboard" >Dashboard</a>
                                </p>
                                <div class="card-panel z-depth-0 center-align">
                                    <span class="purple-text text-darken-3">
                                        <table class="highlight">
                                            <thead>
                                            <tr>
                                                <th>Acc.Id</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                    
                                            <tbody>
                                            <tr>
                                                    <td>
                                                        alvin@cnapxpay
                                                        <br>
                                                        <small class="grey-text text-darken-4">
                                                            Fed 23, 2023 05:20pm
                                                        </small>
                                                    </td>
                                                    <td>N30000</td>
                                                    <td>
                                                        <a href="#" class="collectId">
                                                            collect
                                                        </a>
                                                    </td>
                                            </tr>
                                            <tr>
                                                    <td>
                                                        Alan@cnapxpay
                                                        <br>
                                                        <small class="grey-text text-darken-4">
                                                            Fed 23, 2023 05:20pm
                                                        </small>
                                                    </td>
                                                    
                                                    <td>N72900</td>
                                                    <td>
                                                        <a href="#" class="collectId">
                                                            collect
                                                        </a>
                                                    </td>
                                            </tr>
                                            <tr>
                                                    <td>
                                                        Jonathan@cnapxpay
                                                        <br>
                                                        <small class="grey-text text-darken-4">
                                                            Fed 23, 2023 05:20pm
                                                        </small>
                                                    </td>
                                                    <td>N12000</td>
                                                    <td>
                                                        <a href="#" class="collectId">
                                                            collect
                                                        </a>
                                                    </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </span>

                                </div>


                                <div class="row">
                                    <div class="col s6">
                                        <a href="" class="btn-small blue">
                                            &#8592;
                                        </a>
                                        <a href="" class="btn-small purple darken-3">
                                            &#8594;
                                        </a>
                                    </div>
                                    <div class="col s6 right-align">
                                        <a href="" class="btn-small purple darken-3">Collect All</a>
                                    </div>
                                </div>

                            </div>
                        </div>        
                    </div>



                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">
                            Powered by 
                        </small>
                        <b class="purple-text text-darken-3">
                            iservng
                        </b>
                    </div>
                    
                </div>

            </div>
            `;
            insertIntoDOM('main', content);



            /**
             * Show the initial page title 
             */
            // this.#showPageTitle();

            
            /**#########################
             * Back to dashboard
             * ---------------------
             */
            if(document.querySelector('.backToDashboard'))
            {
                    document.querySelector('.backToDashboard').addEventListener('click', e => {
                    e.preventDefault();
                    import('./marchant_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.CustomerProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', "Unable to load Dashboar!");
                    })
                    // -----------------
                });
            }




            /**#################################
             * The code implements the collect for single collect
             */
            if(document.querySelectorAll('.collectId'))
            {
                let collectBtns = document.querySelectorAll('.collectId');
                collectBtns.forEach(collectBtn => {
                    collectBtn.addEventListener('click', e => {
                        e.preventDefault();
                        // console.log(e.target);
                        this.#selectBankToBeCredited();
                    });
                });
            }








        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }









    // ====================================================
    // CLASS UTILITY FUNCTION METHODS BELOW 
    // ====================================================



    /**
     * Class utility function for controlling the ui.
     */
    #showPageTitle(title = "Payment Notification")
    {
        
        this.#showPageTitle(title)
        {
            if(document.querySelector('.pageTitle'))
            {
                document.querySelector('.pageTitle').innerHTML = title;
            }
        }

    }




    #selectBankToBeCredited()
    {
        let content = `
        <div class="row">
            <div class="col s12 m4 l4">&nbsp;</div>
            <div class="col s12 m4 l4" id="boxTwo">
                <div class="card z-depth-0">
                    <div class="grey-text">
                        
                        <span class="card-title purple-text text-darken-3">
                            Select Bank
                        </span>
                        <p>
                            <small>
                                Please select the account you want to be credited and continue.
                            </small>
                        </p>
                        <p>
                        
                            <p>
                                <label>
                                    <input class="with-gap" name="bankToCollectInto" type="radio" value="gtBank" />
                                    <span>GT Bank</span>
                                </label>
                            </p>

                             <p><div class="divider"></div></p>

                            <p>
                                <label>
                                    <input class="with-gap" name="bankToCollectInto" type="radio" value="accessBank" />
                                    <span>Access Bank</span>
                                </label>
                            </p>

                             <p><div class="divider"></div></p>

                            <p>
                                <label>
                                    <input class="with-gap" name="bankToCollectInto" type="radio" value="ecoBank" />
                                    <span>Eco Bank</span>
                                </label>
                            </p>
                        </p>
                        
                    </div>
                    <div class="card-action">
                        <input type="submit" class="btn-small purple darken-3" value="Continue" id="accountToCollectIntoForm">
                    </div>
                
                </div>
            </div>

            <div class="col s12 m4 l4">&nbsp;</div>
        </div>
        `;
        insertIntoDOM('#mainContentSection', content);



        /****************************************
         * Register Event handler for the click of the bank to collect into
         * 
         */
        if(document.querySelector('#accountToCollectIntoForm'))
        {
            // console.log("OK");
            document.querySelector('#accountToCollectIntoForm').addEventListener('click', e => {

                document.querySelectorAll('input[type=radio]').forEach(account => {
                    if(account.checked)
                    {
                        console.log(account.value);
                        //The value can be passed to the class function that will then process it.
                        this.#processSeletedBankValue(account.value)

                    }
                    
                });
                
            });
        }
        // ---------------------------


    }





    #processSeletedBankValue(selectedBankInfo)
    {
        if(!selectedBankInfo)
        {
            toastIt('red', "Invalid Bank Selection");
        }
        else 
        {
            console.log("processSeletedBankValue", selectedBankInfo);
            /**
             * This is where you success message
             * 1. Insert the progress animation
             */

            progressLoader('Working...please wait', "#boxTwo");

            //Insert the success 
            // call class-report to Provide report 
            this.#classReport();



        }
        
    }


    #classReport()
    {
        let content = `
                <div class="card z-depth-0 center-align">
                    <div class="green-text text-darken-3">
                        
                        <span class="card-title green-text text-darken-3">
                            Successful
                        </span>
                        <p>
                            <small>
                                Transaction is successfull your selected account has been credited with the required amount.
                            </small>
                        </p>
                        <p><h1>&checkmark;</h1></p>
                        
                    </div>
                    <div class="card-action">
                        <input type="submit" class="btn-small green darken-3" value="Back" id="dashboardBackBtn">
                    </div>
                
                </div>
        `;
        insertIntoDOM('#boxTwo', content);




        //Register event handler for the back-to-dashboad btn
        if(document.querySelector('#dashboardBackBtn'))
        {
            document.querySelector("#dashboardBackBtn").addEventListener('click', e => {
                
                e.preventDefault();
                import('./marchant_customer_profile_dashboard.js')
                .then(m => {
                    let dashboad = new m.CustomerProfileDashboard();
                    dashboad.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                });

            })
        }
    }


}
export { CustomerCollectMoneyFromWallet };