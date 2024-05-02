

/**
 * 01/11/2023 - 08:48AM
 * THIS CLASS REPRESENTS THE APPLICATION, 
 * It is the class that represent the only standard entrance to this app. It will use also the help of other more specialized classed to acomplish it taske though.
 */
import { removeSidenav } from '../utils_src/remove_side_nav.js';
import { toastIt } from '../utils_src/toast_it.js';
class CnapxApplication
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
    }




    /// The Publis API for Admin
    displayAppAdmin()
    {
        /**
         * This function will load the admin-login-interface so that the admin can login
         */

        import('../admin/admin_login_ui.js')
        .then(m => {
            
            let adminLoginForm = new m.AdminLoginUi();
            adminLoginForm.createUi();

        })
        .catch(error => {
            console.log(error.message);
            toastIt('red', 'Error! please try again!');
        })
        
    }


    // The Publis API for Customer/client
    displayApp()
    {
        if(this.#_mErrors == 0)
        {
            console.log("Inside = modal/modal_structure.js");


            // This Functions also register event handler for the login button click event
            if(document.querySelectorAll('.login'))
            {
                console.log('Login found');
                let logins = (document.querySelectorAll('.login'));
                logins.forEach(btn => {
                    btn.addEventListener('click', e => {
                        console.log(e.target);
                        this.#checkNetworkStatus();
                    }, false);
                });

            }

            //Import and activate the modal
            import('../modal/modal_structure.js')
            .then(m => {
                let modalstructure = new m.ModalStructure();
                modalstructure.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load the Modal Structure');
            });

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }







    #checkNetworkStatus() {
        if (navigator.onLine) {
            console.log("You are online!");
          // You can make a request to a server here to further verify connectivity
            // fetch('https://www.example.com')
            // .then(response => {
            //     if (response.ok) {
            //         console.log('Server is reachable.');
            //     } else {
            //         console.error('Server returned an error.');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
            this.#showLoginUi();
        } else {
            console.log("You are offline!");
        }
      }
      




      #showLoginUi()
      {
            import('../main/customer_login_interface.js')
            .then(m => {
                let loginUi = new m.CustomerLoginInterface();
                loginUi.createUi();
                removeSidenav();
            })
            .catch(error => {
                log(error.message);
                toastIt('red', 'Login UI refused to load');
            });

      }









}

export {
    CnapxApplication
};


// ============
// function checkNetworkStatus() {
//     if (navigator.onLine) {
//       console.log("You are online!");
//       // You can make a request to a server here to further verify connectivity
//       fetch('https://www.example.com')
//         .then(response => {
//           if (response.ok) {
//             console.log('Server is reachable.');
//           } else {
//             console.error('Server returned an error.');
//           }
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//     } else {
//       console.log("You are offline!");
//     }
//   }
  
  // Call the function initially to check the network status
//   checkNetworkStatus();
  
//   // Listen for changes in network status
//   window.addEventListener('online', checkNetworkStatus);
//   window.addEventListener('offline', checkNetworkStatus);