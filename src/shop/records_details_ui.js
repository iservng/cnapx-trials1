import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";


class RecordDetailsUi
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
    }

    //PUBLIC API
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content  = `
            <div class="container">
                <div class="row" style="margin-top: 4rem;">

                    <div class="col s12" style="margin-bottom: 4rem;">
                        <h6>
                            <b class="purple-text text-darken-3">
                            Records Details
                            </b>
                        </h6>
                        <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            <b>Menu</b>
                        </a>
                    </div>

                    
                    <!-- MONEY-IN -->
                    <div class="col s12 m6 l6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0" style="border: 1px solid green;">
                                    <div class="card-content green-text">
                                        <span class="card-title">Money In</span>
                                    </div>
                                    <div class="card-action">
                                        <b class="green-text">N 0.00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- MONEY-OUT  -->
                    <div class="col s12 m6 l6">
                    
                    
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0" style="border: 1px solid #ff8a80;"> 
                                    <div class="card-content red-text">
                                        <span class="card-title">Money Out</span>
                                    </div>
                                    <div class="card-action">
                                        <b class="red-text">N 0.00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div class="col s12 m6 l6">
                    
                        <div class="row">
                            <form class="col s12">
                                <div class="input-field col s12">
                                    <select>
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="1">All Entries</option>
                                        <option value="2">This Month</option>
                                        <option value="3">Last Week</option>
                                        <option value="4">Last Month</option>
                                        <option value="5">Single Day</option>
                                        <option value="6">Date Range</option>
                                    </select>
                                    <label>View records by date</label>
                                </div>
                            </form>
                        </div>
      
                    </div>



                    <!-- TABLE OF TRANSACTION  -->
                    <div class="col s12 purple lighten-5">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-content white-text">
                                        <span class="card-title purple-text">Recent Records</span>
                                    </div>
                                    <div class="card-action">
                                        
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Narration</th>
                                                <th>Out</th>
                                                <th>In</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr>
                                                <td>09/08/2024</td>
                                                <td>Show narration</td>
                                                <td>N 0.00</td>
                                                <td>N 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>09/08/2024</td>
                                                <td>Show narration</td>
                                                <td>N 0.00</td>
                                                <td>N 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>09/08/2024</td>
                                                <td>Show narration</td>
                                                <td>N 0.00</td>
                                                <td>N 0.00</td>
                                            </tr>
                                            </tbody>
                                        </table>
                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col s12" style="margin-top: 4rem;">
                        <div class="divider"></div>
                        <p> <small>Powered by</small> <b class="purple-text">iservng</b></p>
                    </div>

                </div>
            </div>
            `;
            insertIntoDOM('main', content);

            if(document.querySelectorAll('select'))
            {
                var elems = document.querySelectorAll('select');
                M.FormSelect.init(elems);
            }
            


            /**
             * Register event handler for view_all_records
             */
            // if(document.querySelector('.view_all_records'))
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}

export { RecordDetailsUi };