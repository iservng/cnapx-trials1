import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it";
import { OfflineDB } from "../indexeddb/offlinedb";
class TransactionRecieptUi
{
    #_mErrors;
    #mErrorMsg;
    #transactionId;
    #offlinedb;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#transactionId = sessionStorage.getItem('transaction_id');
        this.#offlinedb = new OfflineDB();
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
                <div class="row">
                    <div class="col s12"></div>
                    <div class="col s12 m2 l2 backToDiv">
                        &nbsp;
                    </div>
                    <div class="col s12 l6 m6 z-depth-0">
                        <div class="row">
                            <div class="col s12">
                            <div class="card z-depth-0">
                                <div class="card-content">
                                    <div>
                                        <div class="row">
                                            <p style="margin-bottom: 2rem;"><b>Cash Reciept</b></p>
                                            <div class="col s6">
                                                <p class="purple-text">
                                                    <b>Business Name</b>
                                                </p>
                                                <p>
                                                    <small>
                                                    No.45, street Address <br>
                                                    City, state Nigeria <br>
                                                    09034891247 <br>
                                                    iservng@gmail.com
                                                    </small>
                                                </p>
                                            </div>
                                            <div class="col s6 right-align">
                                                <p class="purple-text">
                                                    <b>Customer Name</b>
                                                </p>
                                                <p>
                                                    <small>
                                                    <span id="customer_name">No.45, street Address</span> <br>
                                                    <span id="customer_phone">09034891247</span> <br>
                                                    <span id="customer_address">iservng@gmail.com</span>
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="purple lighten-5">
                                        <div class="row">
                                            <div class="col s6">
                                                <small>Reciept No. <span id="reciept_id">reciept Id</span></small>
                                            </div>
                                            <div class="col s6 right-align">
                                                <small>Date: <span id="reciept_date">Reciep date</span></small>
                                            </div>
                                        </div>
                                    </div>

                                    <p>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th><small>Description</small></th>
                                                <th><small>Quantity</small></th>
                                                <th><small>Rate</small></th>
                                                <th><small>Amount</small></th>
                                            </tr>
                                            </thead>

                                            <tbody id="table_records">
                                                
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="2"></td>
                                                    <td><small><b>Total:</b></small></td>
                                                    <td>
                                                        <b>
                                                            <span style="text-decoration: line-through;">N</span><span id="grand_total">7</span>.00
                                                        </b>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </p>
                                    
                                </div>
                                <div style="margin-top: 1rem;">
                                    <small>The total amount specified has been paid by <b id="paid_by">[name]</b>. This reciept was printed on the <span id="current_date">Current Date</span></small>
                                </div>
                                <div style="margin-top: 1rem;" class="right-align">
                                    <small>
                                        <b>
                                            Thanks for your patronage!<br>
                                            Signed: Management.
                                        </b>
                                    </small>
                                </div>
                                <p>
                                    <p><div class="divider"></div></p>
                                    <small>Powered by </small><b class="purple-text">iservng</b>
                                </p>
                            </div>
                            </div>
                        </div>
            
                    </div>
                    <div class="col s12 m4 l4" id="printActivityBox">
                        <div style="margin-top: 2rem;" class="center-align initial_print_div">
                            <a href="#" class="btn-small green ask_for_customer_info">Print</a>
                            <a href="#" class="btn-small red">Cancel!</a>
                        </div>
                        <div id="customer_info_box"></div>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);

            if(sessionStorage.getItem('referer_id') && (sessionStorage.getItem('referer_id') == './transactions_ui.js'))
            {
                let folderUrl = sessionStorage.getItem('referer_id');
                // console.log(folderUrl);
                document.querySelector('.backToDiv').innerHTML = `
                <p>
                    <a href="#" class="btn-flat back_to_referer">Back</a>
                </p>
                `;
                // Register the event handler
                if(document.querySelector('.back_to_referer'))
                {
                    document.querySelector('.back_to_referer').addEventListener('click', e => {
                        e.preventDefault();
                        import("./transactions_ui.js")
                        .then(m => {
                            sessionStorage.removeItem('referer_id');
                            let transactionUi = new m.TransactionsUi();
                            transactionUi.createUi();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unable to get back to Transactions');
                        });
                    }, false);
                }
            }

            //Register event handler for the ask_for_customer_info
            if(document.querySelector('.ask_for_customer_info'))
            {
                document.querySelector('.ask_for_customer_info').addEventListener('click', e => {
                    e.preventDefault();
                    this.#askForCustomerInfo()
                });
            }

            /**
             * After the reciept UI has been succesfully painted on the DOM, then using the transaction-id we can query for the transaction fron the cart with specified transaction id
             */
            let objectStoreName = 'cart';
            let transactionId = this.#transactionId;
            let indexName = 'transaction_id';

            // call the function to
            this.#getTransactionDetailFromDB(objectStoreName, transactionId, indexName, this.#addOtherContent);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }










    #getTransactionDetailFromDB(objectStoreName, transactionId, indexName, callback)
    {
        let amount = [];
        let recieptCreatedOn = 0;
        let recieptNumber = ``;

        this.#offlinedb.withDB(db => {
            // Create a read-only transaction object for this
            let transaction = db.transaction([objectStoreName]);

            //Get the object-store from the transaction
            let objectStore = transaction.objectStore(objectStoreName);
            let index = objectStore.index(indexName);
            let keyRange = IDBKeyRange.only(transactionId);

            
            index.openCursor(keyRange).onsuccess = event => {
                const cursor = event.target.result;
                if(cursor)
                {
                    let specificItem = (cursor.value.key);
                    let itemQuantity = cursor.value.item;

                    recieptCreatedOn = cursor.value.createdOn;
                    recieptNumber = cursor.value.transaction_id;

                    //Start another transaction
                    this.#offlinedb.withDB(db => {
                        db.transaction('products')
                        .objectStore('products')
                        .get(specificItem).onsuccess = (event) => {
                            let product = event.target.result;
                            amount.push(product.selling_price * itemQuantity);
                            document.querySelector('#table_records').innerHTML += `
                            <tr>
                                <td><small>${product.product_name}</small></td>
                                <td><small>${itemQuantity}</small></td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${product.selling_price}.00</small>
                                </td>
                                <td>
                                    <small><span style="text-decoration: line-through;">N</span>${product.selling_price * itemQuantity}.00</small>
                                </td>
                            </tr>
                            `;
                            // sessionStorage.setItem('value', output);
                            document.querySelector('#grand_total').innerHTML = amount.reduce((x,y) => x+y);

                        };
                    });

                    cursor.continue();
                }
                
                callback(recieptCreatedOn, recieptNumber);
            };
            
        });
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












    #askForCustomerInfo()
    {
        let content = `
        
            <div class="row">
            <form class="col s12" id="customerInfoRecieptForm">
                <div class="col s12">
                    <p><b>Would you like to add the customer information on the reciept?</b></p>
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Enter Customer Info</span>
                            
                                <div class="row">
                                
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input id="name" type="text" class="validate">
                                            <label for="name">Name</label>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input id="phone" type="text" class="validate">
                                            <label for="phone">Phone</label>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input id="address" type="text" class="validate">
                                            <label for="phone">Address</label>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input type="submit" class="btn green darken-3" value="Add Customer">
                                        </div>
                                    </div>
                                    
                                </div>
                        </div>
                        
                    </div>
                </div>
                </form>
                <div class="right-align">
                    <a href="#" class="cancel red-text" id="cancel_now">
                        Cancel
                    </a>
                </div>
            </div>
            `;
        insertIntoDOM('#customer_info_box', content);

        //Remove the inital two buttons from the ui
        if(document.querySelector('.initial_print_div'))
            document.querySelector('.initial_print_div').style.display = 'none';

        //Register Event handler for the print-now btn
        if(document.querySelector('#customerInfoRecieptForm'))
        {
            document.querySelector('#customerInfoRecieptForm').addEventListener('submit', e => {
                e.preventDefault();
                this.#processAddCustomerInfoForm(e.target);
            });
        }

        //Register Event handler for the cancel_now btn
        if(document.querySelector('#cancel_now'))
        {
            document.querySelector('#cancel_now').addEventListener('click', e => {
                e.preventDefault();
                import('../shoppingCart/shopping_cart_home_page.js')
                .then(m => {
                    let shopFront = new m.ShoppingCartHomePage();
                    shopFront.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                });
            });
        }

    }



    #processAddCustomerInfoForm(form)
    {
        if(!form.name.value || form.name.value == '')
            //The user did not provide a customer name, therefore proceed by showing the print reciept-only button.
            this.#showPrintRecieptOnlyButton();
        else 
        {
            //Extract all its info
            let namePattern = /^[a-zA-Z0-9\s\.,-]{3,90}$/;
            let phonePattern = /^[0][7-9][0-1][\d]{8}$/;
            if(!namePattern.test(form.name.value))
                toastIt('red', 'Invalid character found!');
            else if(!phonePattern.test(form.phone.value.trim()))
                toastIt('red', 'Invalid phone number');
            else if(!namePattern.test(form.address.value.trim()))
                toastIt('red', 'Invalid character found in address');
            else
            {
                let name = form.name.value.trim();
                let phone = form.phone.value.trim();
                let address = form.address.value.trim();
                this.#addInfoBeforPrintReciept(name, phone, address);
            }
                
        }

    }

    #addInfoBeforPrintReciept(name, phone, address)
    {
        //1. structure info as object
        let customerDate = {
            reciept: sessionStorage.getItem('reciept_id'),
            name: name,
            phone: phone,
            address: address,
            createdOn: Date.now()
        };

        //2. Add the above data to the DB
        let storeName = "customer";
        this.#offlinedb.saveToDB(storeName, this.#logCustomerId, customerDate);

        //3. Add the customer infor to the reciept
        document.querySelector('#customer_name').innerHTML = name;
        document.querySelector('#paid_by').innerHTML = name;
        document.querySelector('#customer_phone').innerHTML = phone;
        document.querySelector('#customer_address').innerHTML = address;

        //4. call the display of print-reciept btn function
        this.#showPrintRecieptOnlyButton();
    }
    #logCustomerId(id)
    {
        toastIt('blue', id+' Customer Added');
    }

    #showPrintRecieptOnlyButton()
    {
        let content = `
        <div class="card z-depth-0">
            <p>
                <b>
                    Confirm Print
                </b>
            </p>
            <p><a href="#" class="btn blue generate_pdf">Print Now</a></p>
        </div>
        `;
        insertIntoDOM("#customer_info_box", content);
        if(document.querySelector('.generate_pdf'))
        {
            document.querySelector('.generate_pdf').addEventListener('click', e => {
                e.preventDefault();
                this.#printRecieptNow(); //printActivityBox
            }, false);
        }
    }



    #printRecieptNow()
    {
        //1. remove any element from reciept page
        if(document.querySelector('#printActivityBox'))
            document.querySelector('#printActivityBox').innerHTML = ``;

        window.print();
        //Register event handler for when the reciept is completed printing
        window.addEventListener("afterprint", (event) => {
            console.log("After print");
        });

    } //





    
}

export { TransactionRecieptUi };