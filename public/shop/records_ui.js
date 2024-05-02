import { OfflineDB } from "../indexeddb/offlinedb.js";
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { convertDateFromMilliSecToDateString } from "../utils/date_4rm_milisec_to_humanReadable.js";
import { RecordDetailsUi } from "./records_details_ui.js";
import { EditProductUi } from "./edit_product_ui.js";
//import


class RecordsUi
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
        // ======================
        let nxtMonth = this.#currentMonth + 1;
        let dtsmp = new Date(dt.getFullYear(), nxtMonth, 1);
        let crttsmp = new Date(dt.getFullYear(), dt.getMonth(), 1);
        // ======================
        this.#lowerboundValue = crttsmp.getTime();
        this.#lowerOpen = false;
        // ======================
        this.#upperboundValue = dtsmp.getTime();
        this.#upperOpen = true;
        // ======================
        this.#nameOfCurrentMonth = this.#monthNames[dt.getMonth()];
        // ======================
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
                                Shop Inventory Records
                            </b>
                        </h6>
                        <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            <b>Menu</b>
                        </a>
                        <a href="#" class="btn-flat purple-text text-darken-4 dashboard">
                            Dashboard
                        </a>
                    </div>
                    
                    <!-- MONEY-IN -->
                    <div class="col s12 m6 l6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0" style="border: 1px solid #f3e5f5;">
                                    <div class="card-content purple-text purple lighten-5">
                                        <span class="card-title">Product Quantity in Inventory</span>
                                        <h4 class="gtotal_of_products">Total Balance</h4>
                                    </div>
                                    <div class="card-action">
                                        <b>Net Value: </b><b class="prodt_gtotal_by_Quantity">N 0.00</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- MONEY-OUT  -->
                    <div class="col s12 m6 l6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-content purple-text" style="border: 1px solid #f3e5f5;">
                                        <span class="card-title ">Total Products</span>
                                        <h4 class="product_count"></h4>
                                    </div>
                                    <div class="card-action purple lighten-5">
                                        <b>Total Number of Unique Products</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="row">
                    <!-- TABLE OF MONEY-IN RECORDS  -->
                    <div class="col s12">
                        <h5 class="purple-text text-darken-3" style="margin-bottom: 1.7rem; margin-top: 20px;">
                            <b><small>Inventory Current Summary</small></b>
                        </h5>
                        
                        <table class="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>QTY</th>
                                    <th>CP</th>
                                    <th>SP</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody id="products_inventory_records"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2"></td>
                                    <td>
                                        <b class="gtotal_of_products">Total</b>
                                    </td>
                                    <td>
                                        <b class="cost_price_gtotal">
                                            N 0.00
                                        </b>
                                    </td>
                                    <td>
                                        <b class="selling_price_gtotal">
                                            N 0.00
                                        </b>
                                    </td>
                                    
                                    <td>
                                        <b class="prodt_gtotal_by_Quantity">
                                            N 0.00
                                        </b>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="col s12" style="margin-top: 4rem;">
                        <div class="divider"></div>
                        <p> <small>Powered by</small> <b class="purple-text">iservng</b></p>
                    </div>

                </div>
            </div>
            `;
            insertIntoDOM('main', content);

            //Query the data-base for the current state of products inventory
            this.#loadCurrentProductsInventory();

            //Count the total number of product available
            this.#countInventoryProducts();


            


            /**
             * Register event handler for view_all_records//import
             */
            if(document.querySelector('.view_all_records'))
            {
                document.querySelector('.view_all_records').addEventListener('click', e => {
                    e.preventDefault();
                    
                    let recodsDetailsUi = new RecordDetailsUi();
                    recodsDetailsUi.createUi();
                    
                }, false);
            }

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }




    //The utility class
    #loadCurrentProductsInventory()
    {
        let sellingPriceGrandTotal = [];
        let costgPriceGrandTotal = [];
        let quantityOfProduct = [];
        let productGTotalValueByQuantity = [];

        this.#offlinedb.withDB(db => {
            let transaction = db.transaction('products');
            let objectStore = transaction.objectStore('products');
            objectStore.openCursor().onsuccess = event => {
                const cursor = event.target.result;
                if(cursor)
                {
                    //Pre computations
                    sellingPriceGrandTotal.push(Number(cursor.value.selling_price));

                    quantityOfProduct.push(Number(cursor.value.product_quantity));

                    costgPriceGrandTotal.push(Number(cursor.value.cost_price));
                    let dateCreated = convertDateFromMilliSecToDateString(cursor.value.createdOn);

                    let productValueByQuantity = (cursor.value.selling_price * cursor.value.product_quantity);

                    productGTotalValueByQuantity.push(productValueByQuantity);

                    document.querySelector('#products_inventory_records').innerHTML += `
                        <tr>
                            <td>${dateCreated}</td>
                            <td>
                                <a href="#" class="editables" id=${cursor.key}>${cursor.value.product_name}</a>
                            </td>
                            <td>${cursor.value.product_quantity}</td>
                            <td>
                                <span style="text-decoration: line-through;">
                                N</span> ${cursor.value.cost_price}.00
                            </td>
                            <td>
                                <span style="text-decoration: line-through;">N</span> ${cursor.value.selling_price}.00
                            </td>
                            <td>
                                <span style="text-decoration: line-through;">N</span> ${cursor.value.selling_price * cursor.value.product_quantity}.00
                            </td>
                        </tr>
                    `;


                    //register event handler for editables //import
                    let editables = document.querySelectorAll('.editables');
                    editables.forEach(elem => {
                        elem.addEventListener('click', e => {
                            e.preventDefault();
                                let productEditUi = new EditProductUi(e.target);
                                productEditUi.createUi();
                            
                        }, false);
                    });


                    let spGtotalContainers = document.querySelectorAll('.selling_price_gtotal');
                    spGtotalContainers.forEach(cElem => {
                        cElem.innerHTML = `<span style="text-decoration: line-through;">N</span> ${sellingPriceGrandTotal.reduce((x,y) => x+y,0)}.00`;
                    });

                    let qtOfProductContainers = document.querySelectorAll('.gtotal_of_products');
                    qtOfProductContainers.forEach(cElem => {
                        cElem.innerHTML = quantityOfProduct.reduce((x,y) => x+y,0);
                    });

                    let cpGtotalContainers = document.querySelectorAll('.cost_price_gtotal');
                    cpGtotalContainers.forEach(cElem => {
                        cElem.innerHTML = `<span style="text-decoration: line-through;">N</span> ${costgPriceGrandTotal.reduce((x,y) => x+y,0)}.00`;
                    });

                    // productGTotalValueByQuantity
                    let prodtGTotalByQtyContainers = document.querySelectorAll('.prodt_gtotal_by_Quantity');
                    prodtGTotalByQtyContainers.forEach(elem => {
                        elem.innerHTML = `<span style="text-decoration: line-through;">N</span> ${productGTotalValueByQuantity.reduce((x,y) => x+y,0)}.00`;
                    });

                    cursor.continue();
                }
            };
        });
    }




    #countInventoryProducts()
    {
        this.#offlinedb.withDB(db => {
            let transaction = db.transaction('products');
            let objectStore = transaction.objectStore('products');
            let request = objectStore.count();

            request.onsuccess = () => {
                let countContainers = document.querySelectorAll('.product_count');
                countContainers.forEach(elem => {
                    elem.innerHTML = request.result;
                });
            };
        });

    }

}

export { RecordsUi };