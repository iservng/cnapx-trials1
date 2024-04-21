import { 
    collection, 
    getDocsFromServer, 
    query, 
    where, 
    getFirestore, 
    startAfter,
    limit,
    limitToLast,
    orderBy,
    getCountFromServer,
    endBefore
} from "firebase/firestore";
import { toastIt } from "../utils/toast_it.js";
import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { convertDateFromMilliSecToDateString } from "../utils/date_4rm_milisec_to_humanReadable.js";

import { smallSpinner } from "../utils/small_spinner.js";

class LoadAgents 
{
    #_mErrors;
    #mErrorMsg;
    #collectionName;
    #db;
    #colRef;
    #query;
    #orderByField;
    #lastDoc;
    #limitNumber;
    #data;
    #rowsOfData;
    #firstDoc;

    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#db = getFirestore();
        this.#collectionName = "cnapx-customer";//cnapx-customer
        this.#colRef = collection(this.#db, this.#collectionName);
        this.#orderByField = 'createdOn';
        this.#limitNumber = 2;

    }

    createUi(){
        if(this.#_mErrors == 0)
        {
            let dashboardBtn = `
                <a href="#" class="btn-flat dashboard">
                    Dashboard
                </a>`;
        if(sessionStorage.getItem('marketingManagerId'))
        {
            dashboardBtn = `
                <a href="#" class="btn-flat agent_dashboard">
                    Dashboard
                </a>`;
            console.log(sessionStorage.getItem('marketingManagerId'));
        }

            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    <div class="col s12">
                        <h5>Cnapx Marketing Agents</h5>
                        <small>
                            Tabulated list of marketing agents actively using the embedded POS/Book-keeping application.
                        </small>
                    </div>

                    <div class="col s12">
                        ${dashboardBtn}

                        <a href="#" class="btn-flat sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            Menu
                        </a>
                    </div>

                    <div class="col s12" style="margin-top: 2rem;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>BVN</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="records"></tbody>
                        </table>
                        <p>
                            <a href="#" class="btn-small blue previous">
                                Previous
                            </a>
                            <a href="#" class="btn-small green next">
                                Next
                            </a>
                        </p>
                    </div>

                    <div class="col s12">
                        <p class="" style="margin-top: 4rem;">
                            <small>Powered by </small><b class="purple-text">iservng</b>
                        </p>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);
            // ------------------



            if(document.querySelector('.agent_dashboard'))
            {
                document.querySelector('.agent_dashboard').addEventListener('click', e => {
                    e.preventDefault();
                    // src\main\marketing_customer_profile_dashboard.js
                    import('./marketing_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.MarketingProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load dashboard');
                    });
                }, false);
            }


            //Register event handler for the dashboard
            if(document.querySelector('.dashboard'))
            {
                document.querySelector('.dashboard').addEventListener('click', e => {
                    e.preventDefault();
                    // import('./admin_customer_profile_dashboard.js')
                    import('./admin_customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.AdminProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load dashboard');
                    });
                }, false);
            }



            // ===================
            //Call for the first-list of marchants to be loaded
            //This first list is load by default.
            // this.#loadFirstListOfAgents();
            this.#loadFirstListOfAgents();


            // =====================
            //Register event handler for when the next-button is clicked
            if(document.querySelector('.next'))
            {
                document.querySelector('.next').addEventListener('click', e => {
                    e.preventDefault();
                    this.#query = query(
                        this.#colRef,
                        where('userType', '==', 'agent'),
                        where('activated', '==', true),
                        orderBy(this.#orderByField),
                        startAfter(this.#lastDoc || 0),
                        limit(this.#limitNumber)
                    );
                    
                    //Extract the data form DB
                    getDocsFromServer(this.#query)
                    .then(snapshot => {
                    
                        if(snapshot.empty)
                            document.querySelector('#records').innerHTML = `<b class="red-text">End of Records Found!</b>`;
                        else
                        {
                            smallSpinner('Loading...', '#records');
                            this.#displayRecordRows(snapshot);
                        }
                            
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
                }, false);
            }
            // ------Next-Button --------------






            // ===============PREVIOUS==========
            if(document.querySelector('.previous'))
            {
                document.querySelector('.previous').addEventListener('click', e => {
                    e.preventDefault();
                    this.#query = query(
                        this.#colRef,
                        where('userType', '==', 'agent'),
                        where('activated', '==', true),
                        orderBy(this.#orderByField),
                        endBefore(this.#firstDoc || 0),
                        limitToLast(this.#limitNumber)
                    );
        
        
                    //Extract the data form DB
                    getDocsFromServer(this.#query)
                    .then(snapshot => {

                        

                        if(!snapshot.empty)
                        {
                            smallSpinner('Loading...', '#records');
                            this.#displayRecordRows(snapshot);
                        }
                        else 
                            toastIt('green', 'At the start of the record already!');
                    })
                    .catch(error => {
                        toastIt('red', 'Unexpected Error: Could not load previous record');
                        console.log(error.message);
                    });
                }, false);
            }
            // ===============PREVIOUS==========


        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }


    //Class utility function that load the first list of marchant
    async #loadFirstListOfAgents()
    {
        // ------------------------
        this.#query = query(
            this.#colRef,
            where('userType', '==', 'agent'),
            where('activated', '==', true),
            orderBy(this.#orderByField),
            startAfter(this.#lastDoc || 0),
            limit(this.#limitNumber)
        );

        this.#data = await getDocsFromServer(this.#query);
        
        if(this.#data.empty)
            document.querySelector('#records').innerHTML = `<b class="red-text">No Records Found!</b>`;
        else
        {
            smallSpinner('Loading...', '#records');
            this.#displayRecordRows(this.#data);
        }
            

    }

    #displayRecordRows(data)
    {
        
        let output = ``;
        data.forEach(doc => {

            let dateCreated = convertDateFromMilliSecToDateString(doc.data().createdOn);
            output += `
                <tr>
                    <td>
                        <a href="#" class="userDetail" data-id="${doc.id}">
                            ${doc.data().name}
                        </a>
                    </td>
                    <td>${doc.data().phone}</td>
                    <td>${doc.data().email}</td>
                    <td>${doc.data().bvn}</td>
                    <td>${dateCreated}</td>
                </tr>
            `;
            document.querySelector('#records').innerHTML = `${output}`;
        });

        //Register event handler for the click of user details
        if(document.querySelectorAll('.userDetail'))
        {
            let alluserDetailBtns = document.querySelectorAll('.userDetail');
            alluserDetailBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    console.log(e.target);
                    this.#loadSpecifiedAgentDetail(e.target);
                }, false);
            });

        }


        //Update the class variables 
        this.#firstDoc = data.docs[0];
        this.#lastDoc = data.docs[data.docs.length - 1];

    }



    
    #loadSpecifiedAgentDetail(elem)
    {
        
        let marchantId = elem.dataset.id;
        import('./load_specified_user_profile.js')
        .then(m => {
            let ui = new m.LoadSpecifiedUserProfile(marchantId);
            ui.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load user profile');
        });



    }




}
export { LoadAgents }