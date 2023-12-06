

/**
 * 01/11/2023 - 08:48AM
 * THIS CLASS REPRESENTS THE APPLICATION, 
 * It is the class that represent the only standard entrance to this app. It will use also the help of other more specialized classed to acomplish it taske though.
 */
import { toastIt } from '../utils/toast_it.js';
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

    // =======================





    // The Publis API for Customer/client
    displayApp()
    {
        if(this.#_mErrors == 0)
        {
            /**
             * Here three of the most high level classes will be activated to render the application. These classes are 
             * 1. The headerSection class
             * 2. The mainSection class
             * 3. The footerSection class
             */
            import('../header/app_header.js')
            .then(m => {
                let header = new m.AppHeader();
                header.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load menu');
            });
            


            //Import and display main content
            // ----------------------------------
            import('../main/main_content.js')
            .then(m => {
                let maincontent = new m.MainContent();
                maincontent.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load main content');
            });



            //Import and display the main-content sub-section
            // -------------------------------------------------
            import('../main/main_sub_section.js')
            .then(m => {
                let subsection = new m.MainSubSection();
                subsection.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load subsection');
            });



            //Import and display the Application footer 
            import('../footer/footer.js')
            .then(m => {
                let footer = new m.Footer();
                footer.createUi();
            })
            .catch(error => {
                console.log(error.message);
                toastIt('red', 'Unable to load footer');
            });


            //Import and activate the modal
            import('../modal/modal_structure.js')
            .then(m => {
                let modalstructure = new m.ModalStructure();
                modalstructure.createUi();
            })

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
            
        }
    }
    // ================
}

export {
    CnapxApplication
};