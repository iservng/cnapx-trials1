import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";


class AdminDashboardUi
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;

    }


    createUi()
    {
        if(this.#_mErrors == 0)
        {
            
            let content = `
            <div class="container">
            

                <!-- FIRST HOLDS THE DASHBOARD MAIN CONTENT  -->
                <div class="row" style="margin-top: 3rem;">

                    <div class="col s12" style="margin-bottom: 2rem;">    
                        <h4>
                            <small>
                                <b class="grey-text" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                    CnapxAdmin
                                </b>
                            </small>
                        </h4>
                    </div>




                    <!-- WITHDRW AND TRANSFER DASHBOARD BUTTONS  -->
                    <div class="col s12">
                        <div class="row">
                                <div class="card z-depth-0">
                                    <div class="card-content grey-text ">
                                        <span class="card-title">
                                            <b>Dashboard</b>
                                        </span>
                                    </div>
                                    <div class="card-action white left-align">
                                        <a href="" class="btn-small">Withdraw</a>
                                        <a href="" class="btn-small blue darken-3">Tranfer</a>
                                    </div>
                                </div>
                        </div>
                    </div>





                    <!-- Dashboard box 1  -->
                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card blue-grey darken-1 z-depth-0">
                                    <div class="card-content white-text">
                                        <span class="card-title">Transactions</span>
                                    </div>
                                    <div class="card-action white">
                                        <a href="#">
                                            <h4><b class="grey-text">6738</b></h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dashboard box 2  -->
                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-content grey-text"  style="border: 1px solid #e0e0e0;">
                                        <span class="card-title">Accounts</span>
                                    </div>
                                    <div class="card-action white" style="border-bottom: 2px solid gray;">
                                        <a href="#">
                                            <h4><b class="grey-text">638</b></h4>
                                            <div class="grey-text">
                                                <b>March - </b><b>48</b> | <b>Indiv -  </b><b>48</b>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dashboard box 3  -->
                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-action blue-grey darken-1">
                                        <a href="#">
                                            <span class="card-title white-text">Customers</span>
                                            <h4><b class="grey-text text-lighten-4">382 </b></h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <!-- This box creates a new section in the main content side  -->
                    <div class="col s12">
                        <div class="row">
                        
                                <div class="card z-depth-0">
                                    <div class="card-content grey-text">
                                        <span class="card-title"><b>Daily Transaction</b></span>
                                    </div>
                                    <div class="card-action left-align">

                                        <a href="" class="btn white blue-text">
                                            Register Customer
                                        </a>
                                    </div>
                                </div>
                            
                        </div>
                    </div>





                    <div class="col s12">

                        <div class="row">
                            <div class="col s12">
                                <div class="card">
                                    <div class="card-content">
                                        <span class="card-title teal-text">
                                            <small class="grey-text text-darken-2">
                                                <b>Mon Feb 27, 2023</b>
                                            </small><br>
                                            <b>Manage Transactions</b>
                                            
                                        </span>
                                        <p style="margin-top: 2rem;">
                                            <div class="collection z-depth-0">
                                                <a href="#!" class="collection-item">
                                                    <span class="badge">1</span>
                                                    Alan
                                                </a>
                                                <a href="#!" class="collection-item">
                                                    <span class="new badge">4</span>
                                                    Alan
                                                </a>
                                                <a href="#!" class="collection-item">
                                                    Alan
                                                </a>
                                                <a href="#!" class="collection-item">
                                                    <span class="badge">14</span>Alan
                                                </a>
                                            </div>
                                        </p>
                                    </div>
                                    <div class="card-action">
                                        <a href="#" class="btn-small teal darken-1">This is a link</a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                

                    <!-- Dashboard main content  -->
                    <div class="col s12">
                        <div class="card-panel lighten-4 z-depth-0">
                            <div class="white-text">



                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <!-- ==================== -->



                <!-- ATTRIBUTION  -->
                <div class="row" style="margin-top: 3rem;">
                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text"> Powered by </small>
                        <b class="grey-text text-darken-3">iservng</b>
                    </div>
                </div>
                
                
            </div>
            `;
            insertIntoDOM('section#main', content);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { AdminDashboardUi };