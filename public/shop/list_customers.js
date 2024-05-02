import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";
import { toastIt } from "../utils/toast_it.js";
import { convertDateFromMilliSecToDateString } from "../utils/date_4rm_milisec_to_humanReadable.js";


class ListCustomers
{
    #_mErrors;
    #mErrorMsg;
    #offlinedb;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#offlinedb = new OfflineDB();
    }

    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    <div class="col s12">
                        <h4 class="purple-text center-align">My Customers</h4>
                        <b class="hide-on-small-only">
                            <a href="#" class="btn-small purple z-depth-0 sidenav-trigger white-text text-darken-4" data-target="mobile-demo">
                                Menu
                            </a>
                        </b>
                    </div>

                    <div class="col s12">
                        
                        <p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody id="customer_list_records">
                                    <tr>
                                        <td>Bangis Inc</td>
                                        <td>09012389812</td>
                                        <td>Ahmadu Bello Way Katsina</td>
                                        <td>14 Fed, 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                    </div>

                    <div class="col s12 m6 l6"></div>
                    <div class="col s12 m6 l6"></div>
                </div>

                <div class="row" style="margin-top: 4rem;">
                    <div class="col s12">
                        <small>Powered by </small><b class="purple-text">iservng</b>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);

            //Call the utility function that loads the customer list
            this.#loadCustomers();

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }


    #loadCustomers()
    {
        document.querySelector('#customer_list_records').innerHTML = ``;

        this.#offlinedb.withDB(db => {
            let transaction = db.transaction('customer');
            let objectStore = transaction.objectStore('customer');
            objectStore.openCursor().onsuccess = event => {
                let cursor = event.target.result;
                if(cursor)
                {
                    console.log('Created on input=', cursor.value.createdOn);
                    let createdOn = convertDateFromMilliSecToDateString(cursor.value.createdOn);
                    console.log('Create On output=', createdOn);

                    document.querySelector('#customer_list_records').innerHTML += `
                    <tr>
                        <td>${cursor.value.name}</td>
                        <td>${cursor.value.phone}</td>
                        <td>${cursor.value.address}</td>
                        <td>${createdOn}</td>
                    </tr>
                    `;
                    cursor.continue();
                }
            };
        });
    }

}
export { ListCustomers };