import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";

class QRCodePaymentUi 
{
    #_mErrors;
    #mErrorMsg;
    constructor() 
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';

    }

    /**
     * Class public API
     */
    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    <div class="col s12 hide-on-med-and-up center-align">
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b> 
                                <a href="#" class="sidenav-trigger" data-target="mobile-demo">
                                    John Danfodio
                                </a>
                            </b>
                        </small>
                    </div>

                    <div class="col s12 hide-on-small-only">
                        <img src="./images/userprofile.png" alt="">
                        <br>
                        <small class="blue-text text-darken-3">
                            <b>
                                <a href="#" class="sidenav-trigger" data-target="mobile-demo">
                                    John Danfodio
                                </a>
                            </b>
                        </small>
                    </div>

                    <!--  PAGE TITLE-->
                    <div class="col s12 center-align" id="pageTitle" style="margin-bottom: 2rem;">
                        
                    </div>

                    <!--BOX-1 (INSTRUCTION DEFAULT)-->
                    <div class="col s12 m4 l4" id="boxOne">
                    </div>

                    <div class="col s12 m4 l4" id="boxTwo">
                    </div>

                    <div class="col s12 m4 l4" id="boxThree">
                    </div>


                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text"> Powered by </small>
                        <b class="purple-text text-darken-3">iservng</b>
                    </div>
                </div>
            </div>
            `;

            insertIntoDOM('main', content);

            this.#loadPageComponents();
            this.#registerCancelEventHandler();






            /**
             * Register an event handler for the show ShowQRCode button above
             */
            if(document.querySelector('#ShowQRCode'))
            {
                document.querySelector('#ShowQRCode').addEventListener('click', e => {
                    e.preventDefault();
                    this.#showQRCode();
                });
            }


        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }






    /**
     * Utility class function for ui manipulation
     */
    #showQRCode()
    {

        //Hide box 1 and 2
        this.#hideBoxOne();
        this.#hideBoxThree();
        
        let content = `
        <div class="row">
            <div class="col s12">
                <div class="card z-depth-0">
                    <div class="card-content center-align">

                        <span class="card-title">
                            <strong class="purple-text" id="cardTitle">
                                Wait!
                            </strong>
                        </span>
                        <p style="margin-top: 2rem;" id="qrcodeImgContainer">
                            <img src="./images/qr.png" alt="qrcode" width="200" height="200" id="qrcodeImg">
                        </p>
                        
                    </div>
                    <div class="card-action">
                        <a href="#" class="cancel">
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('#boxTwo', content);


        /**
         * The qr-image interface has been load successly, 
         * we, can then 
         */
        // -------------------------
        if(document.querySelector('#qrcodeImg'))
        {
            document.querySelector('#qrcodeImgContainer').innerHTML = `
            <progress></progress>
            <br>
            <small class="purple-text"><i>Generating... please wait</i>!</small>
            `;
            let dataForQR = "2click@cnapxpay";
            this.#serverGeneratQRCode(dataForQR);
        }
        

        //Call the page title to specify what is happening
        this.#hidePageTitle();
        this.#registerCancelEventHandler();
    }
    #serverGeneratQRCode(data)
    {
        let qrValue = data;
        let imgURL = ``;
        imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

        let qrImg = document.createElement('img');
        qrImg.src = imgURL;
        qrImg.addEventListener('load', () => {

            // generatorDiv.classList.add('active');
            // generateBtn.innerText = 'Generate QR code';
            document.querySelector('strong#cardTitle').innerHTML = 'Pay';
            document.querySelector('#qrcodeImgContainer').innerHTML = qrImg;
            

        });
        // -------------------------
    }










    //Show Page Title.
    // -----------------
    #showPageTitle(title)
    {

        let content = `
        <small class="purple-text text-darken-3">
            <p>
                <h6><b>${title}</b></h6>
            </p>
        </small>
        `;
        insertIntoDOM('#pageTitle', content);

    }
    #hidePageTitle()
    {
        let content = `&nbsp;`;
        insertIntoDOM('#pageTitle', content);

    }


    //1. BoxOne
    //Show Page Instruction in Box-1
    #showBoxOne()
    {
        let content = `
            <div class="row">
                <div class="card-panel white z-depth-0">
                    <b class="purple-text text-darken-2">
                        Please Confirm.
                    </b>
                    <p>
                        <small class="grey-text text-darken-2">
                            Please specify either to open the scan for recieving payment or show the QR-Code to be scanned.
                        </small>
                    </p>
                    <p>
                        <a href="#" class="red-text cancel">
                            cancel
                        </a>
                    </p>
                                    
                </div>        
            </div>
        `;
        insertIntoDOM('#boxOne', content);
    }

    #hideBoxOne()
    {

        let content = `&nbsp;`;
        insertIntoDOM('#boxOne', content);

    }





    //2. BoxTwo
    //Show the btn for qr
    #showBoxTwo()
    {
        let content = `
            <div class="card-panel purple lighten-5 z-depth-0" style="border-bottom: 1px solid purple; border-top: 1px solid purple;">
                <div class="white-text center-align">
                    <b>
                        <a href="#" id="ShowQRCode" class="btn-small purple darken-4">
                            Pay Now
                        </a>
                    </b>      
                </div>
            </div>
        `;
        insertIntoDOM('#boxTwo', content);
    }
    #hideBoxTwo()
    {

        let content = '&nbsp;';
        insertIntoDOM('#boxTwo', content);

    }




    //3. BoxThree
    //Contains the scanner
    #showBoxThree()
    {
        console.log("Na box three");
        let content = `
        <div class="card-panel purple lighten-5 z-depth-0" style="border-bottom: 1px solid purple; border-top: 1px solid purple;">
            <div class="white-text center-align">
                <b>
                    <a href="#" class="btn-small purple darken-4 text-darken-3 collectByScanner">
                        Collect
                    </a>
                </b>         
            </div>
        </div>
        `;
        insertIntoDOM('#boxThree', content);

        if(document.querySelector('.collectByScanner'))
        {
            document.querySelector('.collectByScanner').addEventListener('click', e => {
                e.preventDefault();
                this.#showScannerUi();
            })
        }
        // --------------------
    }
    #showScannerUi()
    {
        console.log("Scanner UI.");
        this.#hideBoxOne();
        this.#hideBoxThree();
        this.#hidePageTitle();
        let content = `
        <div class="row">
            <div class="col s12">
                <div class="card z-depth-0">
                    <div class="card-content purple-text center-align">
                        <span class="card-title">
                            <strong>Getting Scanner</strong>
                        </span>
                        <p style="margin-top: 2rem;" id="scannerContainer">
                            <progress></progress>
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="cancel">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        insertIntoDOM('#boxTwo', content);

        //Register Event-Handler for the cancel btn, which actualy takes a user back to the payment-profile-dashboard
        this.#registerCancelEventHandler();

    }
    #hideBoxThree()
    {

        let content = `&nbsp;`;
        insertIntoDOM('#boxThree', content);

    }




    /**
     * This function provide the initial values (state) at the start of this interface. 
     */
    #loadPageComponents()
    {

        let title = "Generate or Scan QR-Code";
        this.#showPageTitle(title);

        this.#showBoxOne();
        this.#showBoxTwo();
        this.#showBoxThree();

    }








    #registerCancelEventHandler()
    {
        /**
             * 1. CANCEL
             * ----------
             * Register event handler for the cancel-button that returns user to the dashboard ui.
             */
        if(document.querySelectorAll('.cancel'))
        {
            
            let cancelBtns = document.querySelectorAll('.cancel');
            cancelBtns.forEach(cancel => {
                cancel.addEventListener('click', e => {
                    e.preventDefault();

                    import('./customer_profile_dashboard.js')
                    .then(m => {
                        let dashboard = new m.CustomerProfileDashboard();
                        dashboard.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Error! Unable to load UI.');
                    });
                    // -----------

                });
            })
        }
    }



}


export { QRCodePaymentUi };