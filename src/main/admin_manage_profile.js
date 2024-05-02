import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";

import { getAuth, updateEmail, updatePassword } from "firebase/auth";

class AdminManageProfile 
{

    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
    }


    //Class Public Api
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
                <div class="container">
                    <div class="row">
                        <div class="col s12" style="margin-top: 4rem; margin-bottom: 2rem;">
                            <h6>
                                <b class="purple-text">
                                    Admin Mange Account
                                </b>
                            </h6>
                        </div>

                        <div class="col s12 m4 l4">
                            <div class="row">
                                <div class="col s12">
                                <div class="card-panel z-depth-0">
                                    <p><b>Change Password</b></p>
                                    <p><div class="divider"></div></p>
                                    <p><a class="btn purple darken-3 admin_change_password">Get Started</a></p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 m4 l4">
                            <div class="row">
                                <div class="col s12">
                                <div class="card-panel z-depth-0">
                                    <p><b>Change Profile Info</b></p>
                                    <p><div class="divider"></div></p>
                                    <p><a class="btn purple darken-3 admin_change_profile_info">Get Started</a></p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 m4 l4">
                            <div class="row">
                                <div class="col s12">
                                <div class="card-panel z-depth-0">
                                    <p><b>Asign Role</b></p>
                                    <p><div class="divider"></div></p>
                                    <p><a class="btn purple darken-3 admin_asign_role">Get Started</a></p>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            `;
            insertIntoDOM('main', content);

            //Register event handler for the "admin_change_password"
            if(document.querySelector('.admin_change_password'))
            {
                document.querySelector('.admin_change_password').addEventListener('click', e => {
                    e.preventDefault();
                    this.#enterCurrentlyCredentials();
                }, false);
            }

        }
        else 
        {
            console.log(this.#mErrorMsg);
            toastIt('red', this.#mErrorMsg);
        }
    }





    //Class base utility methods 
    #enterCurrentlyCredentials()
    {
        let content = `
        <div class="container">
            <div class="row">
                <div class="col s12" style="margin-top: 4rem;">
                    <b>Enter new Credentials</b>
                </div>
                <div class="col s12">
                    <div class="row">
                        <form class="col s12 currentCredForm">

                            <div class="row">
                                <div class="input-field col s12">
                                <input id="email" type="email" class="validate">
                                <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="password" type="password" class="validate">
                                <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input type="submit" class="btn-small validate">
                                <label for="email">&nbsp;</label>
                                </div>
                            </div>
                        
                        </form>
                    </div>
                </div>

                <div class="col s6">

                </div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);



        //Register event handle for the submit of "currentCredForm" form
        if(document.querySelector('.currentCredForm'))
        {
            document.querySelector('.currentCredForm').addEventListener('submit', e => {
                e.preventDefault();
                this.#getAndProccessForm(e.target);
            }, false);
        }

    }




    #getAndProccessForm(form)
    {
        let email = form.email.value.trim();
        let password = form.password.value.trim();

        const auth = getAuth();
        console.log('auth =', auth);
        const user = auth.currentUser;
        console.log('user =', user);
        if (user !== null) 
        {
            // The user object has basic properties such as display name, email, etc.
            // const displayName = user.displayName;
            // const email = user.email;
            // const photoURL = user.photoURL;
            // const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            // const uid = user.uid;
            // ======================
            // Update email
            updateEmail(user, email).then(() => {
                // Email updated!
                toastIt('green', 'Email Updated successfully');
                updatePassword(user, password).then(() => {
                    // Update successful...
                    toastIt('green', 'Password Updated successfully');
                    this.#taskCompleted();
                }).catch((error) => {
                    console.log(error.message);
                    console.log(error.code);
                    toastIt('red', 'Password Could not be updated');
                });
                // ...
            }).catch((error) => {
                // An error occurred
                console.log(error.message);
                console.log(error.code);
                toastIt('red', 'Unable to update email');
            }); 
            // ============
        }
        else 
        {
            toastIt('red', 'Email might be invalid');
        }


    }



    #taskCompleted()
    {
        let content =  `
        <div class="container">
            <div class="row">
                <div class="col s12 center-align" style="margin-top: 4rem;">
                    <h1 class="green-text">&checkmark;</h1>
                </div>
                <div class="col s12 center-align">
                    <p>The login credentials has been successfully updated!</p>
                </div>

                <div class="col s6">
                    <a href="#" class="btn-large purple darken-3 task_completed">Task Completed</a>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);

        //Register event handle for "task_completed"
        if(document.querySelector('.task_completed'))
        {
            document.querySelector('.task_completed').addEventListener('click', e => {
                e.preventDefault();
                this.#callLogOutClass();
            }, false);
        }
    }



    #callLogOutClass()
    {

        sessionStorage.clear();
        import('../utils_src/logout_class.js')
        .then(m => {
            let logout = new m.Logout();
            logout.logUserOut();
        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Unable to load the logout');
        });
    }


}
export { AdminManageProfile };