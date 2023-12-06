import { toastIt } from "./toast_it.js";
import { removeSidenav } from "./remove_side_nav.js";





class Logout 
{
    #_mErrors;
    #mErrorMsg;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';

        /**
         * Here is where we could grab the user authentication and destroy it using firebase, after which we can then process without error in the second function below
         */

    }

    //Public API of this class
    logUserOut()
    {
        if(this.#_mErrors == 0)
        {
            //1. Dynamically Change back the menu-items
            import('../header/app_header.js')
            .then(m => {
                let header = new m.AppHeader();
                header.createUi();
            })

            //2. Dynamically Import and execute the main_content_class 
            import('../main/main_content.js')
            .then(m => {
                let main_content = new m.MainContent();
                main_content.createUi();
            })

            if(document.querySelectorAll('.landing-page'))
            {
                
                let landingPageSections = document.querySelectorAll('.landing-page');
                landingPageSections.forEach(section => {
                    section.style.display = 'block';
                });

                import('../modal/modal_structure.js')
                .then(m => {
                    let modal = new m.ModalStructure();
                    modal.createUi();
                })
                .catch(error => {
                    console.log(error.message);
                });
            }

            removeSidenav();
            
        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { Logout };