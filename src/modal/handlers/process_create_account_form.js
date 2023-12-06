

/**
 * THIS CLASS RECIEVE THE FORM OBJECT FOR CREATE-ACCOUNT
 * -------------------------------------------------------
 * Then user its internal methods for the processing of the form.
 * 
 */

import { smallSpinner } from "../../utils/small_spinner.js";
import { toastIt } from "../../utils/toast_it.js";
import { lowAndRemvSpce } from "../../utils/lower_remv_spaces.js";
import { getEmailAndPassword } from "../../test.js";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword,
    getAuth
    
 } from 'firebase/auth';
import { insertIntoDOM } from "../../utils/insert_into_DOM.js";

class CreateUserAccount 
{
    #_mErrors;
    #mErrorMsg;
    #form;
    #userData;
    constructor(createAcctForm)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
    
        if(!createAcctForm)
        {
            this.#_mErrors++;
            this.#mErrorMsg = ``;
            toastIt('red', 'Invalid form submission');
        }
        else 
        {
            let namePattern = /^([a-zA-Z]{3,20})(\s)([a-zA-z]{3,20})(\s)?([a-zA-Z]{3,20})?$/;
            let phonePattern = /^(0)([7-9])([0-1])(\d){8}$/;
            let bvnPattern = /^[\d]{11}$/;
            let emailPatern = /^[a-zA-Z0-9@\.-]{3,30}$/;
            let passwordPatern = /^[a-zA-Z0-9@]{6,25}$/;

            this.#form = createAcctForm;
            if(!namePattern.test(this.#form.fullname.value.trim()))
            {
                
                this.#_mErrors++;
                this.#mErrorMsg = "Your full name is required!";
                toastIt('red', this.#mErrorMsg);
                return;
            }
            else if(!phonePattern.test(this.#form.phone.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Phone number is required!';
                toastIt('red', this.#mErrorMsg);
            }
            else if(!bvnPattern.test(this.#form.bvn.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Your BVN number is required!';
                toastIt('red', this.#mErrorMsg);
            }
            else if(!emailPatern.test(this.#form.email.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = this.#form.email.value + ' is Invalid!';
                toastIt('red', this.#mErrorMsg);

            }
            else if(!passwordPatern.test(this.#form.password.value.trim()))
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Your password is Invalid!';
                toastIt('red', this.#mErrorMsg);
            }
            else if(!this.#form.btnAction.value.trim())
            {
                this.#_mErrors++;
                this.#mErrorMsg = 'Action not found!';
                toastIt('red', this.#mErrorMsg);
            }
            
            else 
            {

                this.#userData = {
                    name: this.#form.fullname.value.trim(),
                    phone: this.#form.phone.value.trim(),
                    bvn: this.#form.bvn.value.trim(),
                    email: this.#form.email.value.trim(),
                    password: this.#form.password.value.trim()
                };

                /**
                 * Make it available in the user session
                 */
                sessionStorage.setItem('btnAction', this.#form.btnAction.value);
                sessionStorage.setItem('customerInfo', JSON.stringify(this.#userData));
                

            }

        }

    }




    #removeModal()
    {
        //Remove Modal
        let modals = document.querySelectorAll('.modal');
        modals.forEach(instance => {
            let inst = M.Modal.getInstance(instance);
            inst.close();
        })
    }


    



    #errorReport()
    {
        // smallSpinner('Working...', '#createAcountDiv');
        let content = `
            <div class="row">
                <div class="col s12">
                    <div class="card pink lighten-5 z-depth-0">
                    <div class="card-content red-text">
                        <span class="card-title">Error!</span>
                        <p>
                            It looks like your device does not have a proper network connection.
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red darken-3 removeModal">This is True</a>
                    </div>
                    </div>
                </div>
            </div>
        `;
        insertIntoDOM('#createAcountDiv', content);



        if(document.querySelector('.removeModal'))
        {
            document.querySelector('.removeModal').addEventListener('click', e => {
                e.preventDefault();
                this.#removeModal();
            });
        }
        
    }






    /*******************
     * Public API
     * 704 x 371 modal dimenssion
     */
    checkCredentials()
    {
        if(this.#_mErrors == 0)
        {
            if(document.querySelector('#createAcountDiv'))
            {
                smallSpinner('Working...', '#createAcountDiv');

                /**
                 * Things that will happen from this moment on are follows
                 * 1. This user's phone and name will be used to formulate an email address and a password for this user.
                 * onyeka Obiora Chinedu
                 * 08102848626
                 */
                // let name = lowAndRemvSpce(this.#userData['name']);
                // let phone = lowAndRemvSpce(this.#userData['phone']);

                // //Create the user email and password
                // let ep = getEmailAndPassword(name, phone);
                // console.log(ep.email);
                // console.log(ep.password);
                

                // //Add Email and password to user data
                // this.#userData['email'] = ep.email;
                // this.#userData['password'] = ep.password;


                //Create Authentication for this user.
                // let auth = getAuth();
                // createUserWithEmailAndPassword(auth, ep.email, ep.password)
                // .then(userCredentials => {

                //     let user = userCredentials.user;
                //     let id = user.uid;
                //     console.log(user);

                //     /*
                //         After a user(customer) has created account, 
                //         1. Save customer info or data in customers collection
                //     */
                //    let colRef = collection(getFirestore(), 'customer');
                //    addDoc(colRef, this.#userData)
                //    .then(snapshot => {
                //         snapshot.id
                //         console.log(snapshot.id);
                //    })
                //    .catch(error => {
                //         console.log(error.code);
                //         console.log(error.message);
                //    });


                // })
                // .catch(error => {
                //     console.log(error.code);
                //     console.log(error.message);
                //     toastIt('red', 'Unexpected Error! please try again leter!3');
                //     this.#errorReport();
                // });




                // =========================
                //Call the user-account-profile class to display a user-profile..

                /**
                 * JUST befor we display the customer profile dashboard, we need to ask the customer if he or she is registering as a marchant or as an indivdual.
                 * 
                 */
                // import('../../main/customer_profile_dashboard.js')
                // .then(m => {

                //     let customerProfile = new m.CustomerProfileDashboard();
                //     customerProfile.createUi();

                // })
                // .catch(error => {
                //     console.log(error.message);
                //     toastIt('red', 'Unexpect error, please try again leter!2');
                // });
                import('../../modal/handlers/customer_registration_type.js')
                .then(m => {
                    let customerType = new m.CustomerRegisterType();
                    customerType.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'Unexpected Customer type not found');
                });
                // --------------------------------


                


            }

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }


}
export { CreateUserAccount };