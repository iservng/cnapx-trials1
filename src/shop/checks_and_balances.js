import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";
import { OfflineDB } from "../indexeddb/offlinedb";
// import { smallSpinner } from "../utils/small_spinner";
import { convertDateFromMilliSecToDateString } from '../utils/date_4rm_milisec_to_humanReadable.js';
class ChecksAndBalances
{
    #_mErrors;
    #mErrorMsg;
    #objectStoreName;
    #offlinedb;
    #currentMonth;
    #lowerboundValue;
    #lowerOpen;

    #upperboundValue;
    #upperOpen;

    #nameOfCurrentMonth;
    #monthNames;
    #weekDayNames;
    #indexName;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#offlinedb = new OfflineDB();
        this.#indexName = 'createdOn';
        this.#objectStoreName = 'cart';
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
        // =======================
        let dt = new Date();
        this.#currentMonth = dt.getMonth();
        // ========================
        let nxtMonth = this.#currentMonth + 1;
        let dtsmp = new Date(dt.getFullYear(), nxtMonth, 1);
        let crttsmp = new Date(dt.getFullYear(), dt.getMonth(), 1);
        // ========================
        this.#lowerboundValue = crttsmp.getTime();
        this.#lowerOpen = false;
        // ========================
        this.#upperboundValue = dtsmp.getTime();
        this.#upperOpen = true;
        // ========================
        this.#nameOfCurrentMonth = this.#monthNames[dt.getMonth()];
        // =======================
    }


    /**
     * CLASS PUBLIC API
     */
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container" style="margin-top: 4rem;">
                <div class="row" style="margin-bottom: 2rem;">
                    <div class="col s12" style="margin-bottom: 1rem;">
                        <h5>
                            <span class="date_title_elem">${this.#nameOfCurrentMonth}</span> Sales Dashboard.
                        </h5>
                        <a href="#" class="sidenav-trigger show-on-large purple-text text-darken-4" data-target="mobile-demo">
                            menu
                        </a>
                    </div>
                </div>

                <!--THE dATE RANGE-->
                <div class="row" style="margin-bottom: 2rem;">
                    <div class="col s12">
                        <b class="purple-text">
                            Select Date Range to view summary
                        </b>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="date1" type="date" class="validate">
                                <label for="date1">Start Date</label>
                            </div>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="date2" type="date" class="validate">
                                <label for="date2">End Date</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-bottom: 2rem;">
                    <div class="col s12" style="margin-bottom: 0.8rem;">
                        <b class="purple-text">
                            Quick Sales Summary in <span class="date_title_elem">${this.#nameOfCurrentMonth}</span>
                        </b>
                    </div>
                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel purple">
                                    <span class="white-text">
                                        <h4><span style="text-decoration: line-through;">N</span> <span class="grand_total">0</span>.00</h4>
                                        <b>Total Amount Made in <span class="date_title_elem">${this.#nameOfCurrentMonth}</span></b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel purple">
                                    <span class="white-text">
                                        <h4><span style="text-decoration: line-through;">N</span> <span class="profit_total">0</span>.00</h4>
                                        <b>Total profit Made in <span class="date_title_elem">${this.#nameOfCurrentMonth}</span></b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m4 l4">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel purple">
                                    <span class="white-text">
                                        <h4 class="totalQTofSoldProducts">0.00</h4>
                                        <b>
                                            Total Product Sold in <span class="date_title_elem">${this.#nameOfCurrentMonth}</span>
                                        </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12">
                        <h6 class="Paget_title purple-text">
                            Tabulated <span class="date_title_elem">${this.#nameOfCurrentMonth}</span> Sales Details
                        </h6>
                    </div>
                    <div class="col s12 z-depth-0">
                        <table class="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th><small>Description</small></th>
                                    <th><small>Cost Price</small></th>
                                    <th><small>Rate</small></th>
                                    <th><small>Quantity</small></th>
                                    <th><small>Amount</small></th>
                                    <th><small>QT/CP</small></th>
                                    <th><small>Profit</small></th>
                                    <th><small>Date</small></th>
                                </tr>
                            </thead>
                            <tbody id="table_records"></tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <b class="totalQTofSoldProducts">Total:
                                        </b>
                                    </td>
                                    <td>
                                        <b>
                                            <span style="text-decoration: line-through;">N</span><span class="grand_total">7</span>.00
                                        </b>
                                    </td>
                                    <td></td>
                                    <td>
                                        <b>
                                            <span style="text-decoration: line-through;">N</span><span class="profit_total">0</span>.00
                                        </b>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <!--ATRIBUTION ROW-->
                <div class="row">
                    <div class="col s12" style="margin-top: 4rem;">
                        <p>
                            <small>Powered by </small><b class="purple-text">iservng</b>
                        </p>
                    </div>
                </div>
            </div>`;
            insertIntoDOM('main', content);


            /**
             * After the reciept UI has been succesfully painted on the DOM, then using the transaction-id we can query for the transaction fron the cart with specified transaction id
             */
            // let objectStoreName = 'cart';
            // let transactionId = this.#transactionId;
            // let indexName = 'createdOn';
            // =======================
            this.#getCartRecordDetailsFromDB(this.#objectStoreName, this.#indexName, this.#lowerboundValue, this.#upperboundValue, this.#lowerOpen, this.#upperOpen);


            //Register Event handler for the change of date2
            if(document.querySelector('#date2'))
            {
                document.querySelector('#date2').addEventListener('change', e => {
                    e.preventDefault();
                    this.#processDateRangeOfSales(e.target);
                });
            }

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }


    #getCartRecordDetailsFromDB(objectStoreName, indexName, lowerBound, upperBound, lowerOpen, upperOpen)
    {
        document.querySelector('#table_records').innerHTML  = ``;

        let amount = [];
        let totalQTofSoldProducts = [];
        let totalAmountofProfitMade = [];
        // let recieptCreatedOn = 0;
        let recieptNumber = ``;

        this.#offlinedb.withDB(db => {
            // Create a read-only transaction object for this
            let transaction = db.transaction([objectStoreName]);
            let objectStore = transaction.objectStore(objectStoreName);
            let index = objectStore.index(indexName);

            let boundKeyRange = IDBKeyRange.bound(lowerBound, upperBound, lowerOpen, upperOpen);

            index.openCursor(boundKeyRange).onsuccess = event => {
                const cursor = event.target.result;
                if(cursor)
                {
                    let specificItem = Number(cursor.value.key);
                    let itemQuantity = Number(cursor.value.item);
                    let sellingprice = Number(cursor.value.selling_price);
                    let amountMadeWithQt = Number(sellingprice * itemQuantity);
                    let costprice = Number(cursor.value.cost_price);
                    let quantityAndCostPrice = Number(itemQuantity * costprice);
                    let profitPerItemSoldWithQt = Number(amountMadeWithQt - quantityAndCostPrice);

                    // ------------------------
                    // let dt = new Date(Number(cursor.value.createdOn));
                    // let y = dt.getFullYear();
                    // let m = this.#monthNames[dt.getMonth()];
                    // let d = dt.getDate();
                    // let recieptCreatedOn = `${d} ${m}, ${y}`;
                    let recieptCreatedOn = convertDateFromMilliSecToDateString(cursor.value.createdOn);

                    //Start another transaction
                    this.#offlinedb.withDB(db => {
                        db.transaction('products')
                        .objectStore('products')
                        .get(specificItem).onsuccess = (event) => {
                            let product = event.target.result;
                            
                            amount.push(sellingprice * itemQuantity);
                            totalQTofSoldProducts.push(itemQuantity);
                            totalAmountofProfitMade.push(profitPerItemSoldWithQt);

                            document.querySelector('#table_records').innerHTML += `
                            <tr>
                                <td><small>${product.product_name}</small></td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${costprice}.00</small>
                                </td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${sellingprice}.00</small>
                                </td>
                                <td><small>${itemQuantity}</small></td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${amountMadeWithQt}.00</small>
                                </td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${quantityAndCostPrice}.00</small>
                                </td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${profitPerItemSoldWithQt}.00</small>
                                </td>
                                <td>
                                    <small>
                                        ${recieptCreatedOn}
                                    </small>
                                </td>
                            </tr>
                            `;

                            // Grand Total
                            let grandTotalWrapper = document.querySelectorAll('.grand_total');
                            grandTotalWrapper.forEach(wrapper => {
                                wrapper.innerHTML = amount.reduce((x,y) => x+y);
                            });

                            //Total Quantity of Product Sold
                            let totalQTofSoldProductsWrappers = document.querySelectorAll('.totalQTofSoldProducts');
                            totalQTofSoldProductsWrappers.forEach(wrapper => {
                                wrapper.innerHTML = totalQTofSoldProducts.reduce((x,y) => x+y) + '.00';
                            });
                            
                            //Total Profit Made//totalAmountofProfitMade
                            let totalProfitMadeWrapper = document.querySelectorAll('.profit_total');
                            totalProfitMadeWrapper.forEach(wrapper => {
                                wrapper.innerHTML = totalAmountofProfitMade.reduce((x,y) => x+y,0);
                            });


                        };
                    });

                    cursor.continue();
                }
                
                // callback(recieptCreatedOn, recieptNumber);
            };
            
        });
    }





    //this.#processDateRangeOfSales(e.target);
    #processDateRangeOfSales(date2Elem)
    {
        let date1 = document.querySelector('#date1');
        if(!date1.value)
            toastIt('red', 'Start Date is required!');
        else if(!date2Elem.value)
            toastIt('red', 'End Date is required!')
        else
        {
            let startDate = new Date(date1.value).getTime();
            let endDate = new Date(date2Elem.value).getTime();

            if(endDate < startDate)
                toastIt('red', 'You should use correct date format');
            else 
            {
                
                this.#getCartRecordDetailsFromDB(
                    this.#objectStoreName, 
                    this.#indexName, 
                    startDate, 
                    endDate, 
                    this.#lowerOpen, 
                    this.#upperOpen);

                //Add the range as title.
                let fromDate = convertDateFromMilliSecToDateString(startDate);
                let toDate = convertDateFromMilliSecToDateString(endDate);
                let dateTitle = `${fromDate} to ${toDate}`;

                //Insert it into every title element innerHTML
                let dateTileElems = document.querySelectorAll('.date_title_elem');
                dateTileElems.forEach(elem => {
                    elem.innerHTML = `${dateTitle}`;
                });


            }
        }
    }


    


    #addOtherContent(recieptDate, recieptNumber)
    {
        // console.log(output);
        let d = new Date(recieptDate);
        let recieptCreatedOn = (d.getDate()+ '-'+(d.getMonth()+1)+ '-'+d.getFullYear());

        // console.log(recieptNumber);
        document.querySelector('#reciept_id').innerHTML = recieptNumber;
        document.querySelector('#reciept_date').innerHTML = recieptCreatedOn;
        sessionStorage.setItem('reciept_id', recieptNumber);

        //This date is used for when the reciept was currently printed ie the current date at which the reciept was printed or reprinted
        let currentD = new Date();
        let recieptPrintDate = (currentD.getDate()+ '-'+(currentD.getMonth()+1)+ '-'+currentD.getFullYear());
        document.querySelector('#current_date').innerHTML = recieptPrintDate;
        
    }

}

export { ChecksAndBalances };