import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { COMPANY } from "../config/app_constants.js";
import { smallSpinner } from "../utils/small_spinner.js";
import { collection, getCountFromServer, getDocs, getFirestore, query, where } from "firebase/firestore";

class OpenAgentsIndivualRecords 
{
    #_mErrors;
    #mErrorMsg;
    #agentsId;
    #collName;
    #db;
    #collRef;
    constructor(agentsId)
    {
        //XrkwbnLDKdY1HYz50aeV
        //XrkwbnLDKdY1HYz50aeV
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#collName = 'cnapx-customer';
        this.#db = getFirestore();
        this.#collRef = collection(this.#db, this.#collName);

        if(!agentsId)
        {
            this.#_mErrors++;
            this.#mErrorMsg = `Agents ID not found`;
        }
        else 
        {
            this.#agentsId = agentsId.trim();
        }
    }


    //Class Public API
    // ==================
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            console.log(this.#agentsId);

            smallSpinner('Loading...', 'main');
            let content = `
            <div class="container">
                <div class="row">
                    <div class="col s12" style="margin-top: 4rem;">
                        <b class="purple-text">Individual Customer</b>
                    </div>
                    <div class="col s12" style="margin-top: 2rem;">
                        This is a comprehensive list of all customers currently registered as individual-user by agents.
                    </div>
                    <div class="col s12" style="margin-top: 2rem;">
                        <b class="totalCount"></b>
                    </div>
                    <div class="col s12 recordsDiv" style="margin-top: 2rem;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyRecords">
                                <tr>
                                    <td>Sunday Gombe</td>
                                    <td>09023789812</td>
                                    <td>sunaday@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col s12" style="margin-top: 4rem;">
                        <P>
                            <small>Powered by </small><b>${COMPANY}</b>
                        </P>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);


            //Query the database
            smallSpinner('Checking...', '#tbodyRecords');
            let q = query(this.#collRef, 
                where('agentCode', '==', `${this.#agentsId}`), 
                where('userType', '==', 'individual'));

            getCountFromServer(q)
            .then(snapShot => {

                
                document.querySelector('.totalCount').innerHTML = `To number individual customer is <a href="#" class="btn-flat white z-depth-0">${snapShot.data().count}</a>`;

            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to count records');
            });

            getDocs(q)
            .then(snapShot => {

                if(snapShot.empty)
                {
                    console.log("Empty Records");
                }
                else 
                {
                    let output = ``;
                    snapShot.forEach(docs => {
                        console.log(docs);
                        output += `
                            <tr>
                                <td>
                                    <a href="#" class="open_specified_customer_details" data-id="${docs.id}">
                                        ${docs.data().name}
                                    </a>
                                </td>
                                <td>${docs.data().phone}</td>
                                <td>${docs.data().email}</td>
                            </tr>
                        `;
                    });
                    document.querySelector('#tbodyRecords').innerHTML = output;
                    if(document.querySelectorAll('.open_specified_customer_details'))
                    {
                        let allBtbs = document.querySelectorAll('.open_specified_customer_details');
                        allBtbs.forEach((btn, index) => {
                            btn.addEventListener('click', e => {
                                this.#openSpecifiedCustomerDetails(e.target);
                            }, false);
                        });
                    }
                }
                
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Error, please check network strength and try again');
            });

        




        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }





    //Class based utility function 
    #openSpecifiedCustomerDetails(elemtarget)
    {
        let specifiedCustomerId = elemtarget.dataset.id;
        import('./load_specified_user_profile.js')
        .then(m => {
            let specified = new m.LoadSpecifiedUserProfile(specifiedCustomerId);
            specified.createUi();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load specified profile');
        });
    }
}
export { OpenAgentsIndivualRecords };