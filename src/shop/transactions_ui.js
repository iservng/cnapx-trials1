import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";
import { OfflineDB } from "../indexeddb/offlinedb.js";
import { smallSpinner } from '../utils/small_spinner.js';

class TransactionsUi
{
    #_mErrors;
    #mErrorMsg;
    #offlinedb;
    #monthNames;
    #weekDayNames;
    #nameOfCurrentMonth;
    #currentMonth;
    #nextMonth;
    #upperboundValue;
    #lowerboundValue;

    #lowerOpen;
    #upperOpen;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#offlinedb = new OfflineDB();
        this.#monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        this.#weekDayNames = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thusday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        let dt = new Date();
        this.#currentMonth = dt.getMonth();

        let nxtMonth = this.#currentMonth + 1;
        let dtsmp = new Date(dt.getFullYear(), nxtMonth, 1);
        let crttsmp = new Date(dt.getFullYear(), dt.getMonth(), 1);

    
        this.#lowerboundValue = crttsmp.getTime();
        this.#lowerOpen = false;

        this.#upperboundValue = dtsmp.getTime();
        this.#upperOpen = true;

        this.#nameOfCurrentMonth = this.#monthNames[dt.getMonth()];

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
                                Cart Transactions
                            </b>
                        </h6>
                        <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            <b>Menu</b>
                        </a>
                        <p>To view other transactions please use the box below then specify a range.</p>
                    </div>

                    
                    <!-- MONEY-IN -->
                    <form id="transaction_range">
                    <div class="col s6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-content purple-text">
                                        <span class="card-title">
                                            From Date:
                                        </span>
                                    </div>
                                    <div class="card-action">
                                        <div class="row">
                                            <div class="input-field col s12">
                                                <input id="date1" type="date" class="validate">
                                                <label for="date1">Start Date</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- MONEY-OUT  -->
                    <div class="col s6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-content purple-text">
                                        <span class="card-title">
                                            To Date:
                                        </span>
                                    </div>
                                    <div class="card-action">
                                        <div class="row">
                                            <div class="input-field col s12">
                                                <input id="date2" type="date" class="validate">
                                                <label for="date2">
                                                    End Date
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>


                    <!-- TABLE OF TRANSACTION  -->
                    <div class="col s12" style="margin-top: 0rem;">
                        <h4 class="purple-text">
                            <small id="name_of_month"> 
                                ${this.#nameOfCurrentMonth} Transactions 
                            </small>
                        </h4>
                        <p>
                            <small>Tabulated list of all the transaction within the current month, to view any of the detail please click on the transacton-ID.</small>
                        </p>
                            
                        <table class="highlight">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>ID</th>
                                    <th>MOP</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody id="records_container"></tbody>
                            <tfoot id="tr_gtotal"></tfoot>
                        </table>
                    </div>


                    <div class="col s12" style="margin-top: 5rem;">
                        <p> <small>Powered by</small> <b class="purple-text">iservng</b></p>
                    </div>

                </div>
            </div>`;
            insertIntoDOM('main', content);

            /**
             * Call for the recent transactions records from the DB
             * -----------------------------------------------------
             */
            if(document.querySelector('#records_container'))
            {
                /**
                 * (elem, lowerBound, upperBound, includeLowerValue, includeUpperValue)
                 */
                let elem = document.querySelector('#records_container');
                this.#showRecentTransactionRecords(elem, this.#lowerboundValue, this.#upperboundValue, this.#lowerOpen, this.#upperOpen);
            }


            //Register the onchange handler for date2
            if(document.querySelector('#date2'))
            {
                document.querySelector('#date2').addEventListener('change', e => {
                    e.preventDefault();
                    this.#loadTransactionByDateRange(e.target);
                });
            }


        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }





    //Utility functions
    #showRecentTransactionRecords(elem, lowerBound, upperBound, lowerOpen, upperOpen)
    {
        
        this.#offlinedb.withDB(db => {
            let transaction = db.transaction('daily-transactions');
            let objectStore = transaction.objectStore('daily-transactions');

            //Get the index
            let index = objectStore.index('createdOn');

            //Get the IDB-KEY-Range
            // let boundKeyRange = IDBKeyRange.bound(1, 4);
            // let boundKeyRange = IDBKeyRange.bound(this.#lowerboundValue, this.#upperboundValue, false, true);
            let boundKeyRange = IDBKeyRange.bound(lowerBound, upperBound, lowerOpen, upperOpen);

            //Use index to open cursor
            let grandTotal = 0;
            index.openCursor(boundKeyRange).onsuccess = event => {
                const cursor = event.target.result;
                if(cursor)
                {
                    //Date
                    let d = new Date(cursor.value.createdOn);
                    let transactionDate = d.getDate() +' '+ this.#monthNames[d.getMonth()] + ', '+d.getFullYear();

                    //Amount
                    grandTotal += Number(cursor.value.transaction_amount);

                    elem.innerHTML += `
                    <tr>
                        <td>
                            <small>${transactionDate}</small>
                        </td>
                        <td>
                            <small>
                                <a href="#" class="transactionLink" data-transactionId="${cursor.value.transaction_id}">
                                    ${cursor.value.transaction_id}
                                </a>
                            </small>
                        </td>
                        <td>
                            <small>${cursor.value.payment_method}</small>
                        </td>
                        <td>
                            <small>
                                <span style="text-decoration: line-through;">N</span> ${cursor.value.transaction_amount}.00
                            </small>
                        </td>
                        
                    </tr>
                    `;
                    document.querySelector('#tr_gtotal').innerHTML = `
                    <tr>
                        <td colspan="2"></td>
                        <td><b>Total</b></td>
                        <td><b style="text-decoration: line-through;">N</b> <b>${grandTotal}.00</b></td>
                    </tr>`;
                    // ======================
                    //Register event handle for the transactionid-links
                    if(document.querySelectorAll('.transactionLink'))
                    {
                        let transactionBtns = (document.querySelectorAll('.transactionLink'));
                        transactionBtns.forEach(btn => {
                            btn.addEventListener('click', e => {
                                e.preventDefault();
                                this.#processTransactionDetails(e.target);
                            }, false);
                        });
                    }
                    // ======================
                    cursor.continue();
                }
                
            };
            
            // --------------------
        });

    }


    #processTransactionDetails(elemBtn)
    {
        let transactionId = elemBtn.dataset.transactionid;
        // transaction_id
        sessionStorage.setItem('transaction_id', transactionId);

        //This is used for telling the "transaction_reciept_ui.js", the specific class that called it, so that it can get back to it if needed.
        sessionStorage.setItem('referer_id', './transactions_ui.js');

        import('./transaction_reciept_ui.js')
        .then(m => {
            let detaileUi = new m.TransactionRecieptUi();
            detaileUi.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the transaction details ui');
        });

    }





    #loadTransactionByDateRange(date2)
    {
        let date1 = document.querySelector('#date1');
        if(!date1.value || date1.value == '')
            toastIt('red', 'Start date is required');
        else if(!date2.value || date2.value == '')
            toastIt('red', 'The End date is required');
        else 
        {
            let startDate = new Date(date1.value).getTime();
            let endDate = new Date(date2.value).getTime();

            if(endDate < startDate)
            {
                toastIt('red', 'The End date cannot be less than the start date');
            }
            else 
            {
            
                // Clean up the elem records holder
                let elem = document.querySelector('#records_container');
                elem.innerHTML = ``;

                let lowerBound = startDate;
                let openLower = false;
                let upperBound = endDate;
                let openUpper = false;

                this.#showRecentTransactionRecords(elem, lowerBound, upperBound, openLower, openUpper);

                // document.querySelector('#name_of_month').innerHTML = ``;

            }
            
        }

    }






}

export { TransactionsUi };