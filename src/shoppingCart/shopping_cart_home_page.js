


import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { sampleProductData } from "./sample_data.js";

class ShoppingCartHomePage
{
    #_mErrors;
    #mErrorMsg;
    #basket;
    #sampleProductData;

    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#basket = JSON.parse(localStorage.getItem('cartData')) || [];
        this.#sampleProductData = sampleProductData;
    }





    /*******************************
     * The public API of this Class
     */
    createUi()
    {
        //Organize the content of the profile to be displayed, on the condition that this class has not found any errors while its processing
        if(this.#_mErrors == 0)
        {
            //Display Content
            let content = `
            <div class="container">
                <div class="row" style="margin-top: 3rem;">
                    
                    <!-- USER-PROFILE-AVARTAR  -->

                    <div class="col s12">
                        <h5>Marchants Business Name</h5>
                        <b>
                            <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                                Menu
                            </a>
                            
                        </b>
                    </div>


                    <!-- FIRST SECTION OF DASHBOARD  -->
                    <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                        <!-- products structure layout  -->
                        <div class="row shop"></div>
                        <!-- products structure layout  -->
                    </div>
                    

                    <div class="col s12 right-align" style="margin-top: 6rem;">
                        <p>
                            <div class="divider"></div>
                        </p>
                        <small class="grey-text">Powered by </small>
                        <b class="purple-text text-darken-3">
                            iservng
                        </b>
                    </div>
                </div>
            </div>
            `;
            insertIntoDOM('main', content);



            //CODE: open cart ui
           




            /**
             * TO DISPLAY THE SAMPLE PRODUCTS IN THE FRONT-PAGE
             */
            if(document.querySelector('.shop'))
            {
                let shop = document.querySelector('.shop');
                this.#displaySampleProducts(shop);
                this.#cartTotal();
            }



            //1.
            /************************************
             *  Logout Button Event Implementation
             */
            if(document.querySelectorAll('.logout'))
            {
                let logoutButtons = document.querySelectorAll('.logout');
                logoutButtons.forEach(logoutBtn => {
                    logoutBtn.addEventListener('click', e => {
                        e.preventDefault();
                        //Dynamically import and Execute the logout class
                        // ---- 
                        import('../utils/logout_class.js')
                        .then(m => {
                            let logout = new m.Logout();
                            logout.logUserOut();
                        })
                        .catch(error => {
                            console.log(error.message);
                            toastIt('red', 'Unexpected network issue, try again!');
                        });
                    });
                });
            }
            // =======================


        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

        
    }







    /**
     * UTILITY FUNCTIONS FOR UI MANIPULATION
     * =======================================
     */
    #displaySampleProducts(shop)
    {
        
        // Start
       let productOutput = ``;
       this.#sampleProductData.forEach(product => {
            let {id, name, price, img} = product;
            let search = this.#basket.find(product => product.id === id) || []; 
            productOutput += `
            <div class="col s12 m3 l3" id=product-id-${id}>
                    <div class="card z-depth-0">
                        <div class="card-image">
                            <img src=${img}>
                            <span class="card-title">New Arrivals</span>
                        </div>
                        <div class="card-content grey lighten-5">
                            <p>
                                <b class="grey-text">${name}</b>
                            </p>
                            <div> N ${price} </div>
                        </div>
                        <div class="card-action grey lighten-5" style="border-bottom: 1px solid grey;">

                            <div class="row">
                                <div class="col s12 center-align">

                                    <a href="#" class="btn-small purple decrement z-depth-0" data-decrementid=${id}>
                                        &minus;
                                    </a>

                                    <a href="#" class="btn-small white grey-text z-depth-0" id=${id}>
                                         ${search.item === undefined? 0 : search.item}
                                    </a>

                                    <a href="#" class="btn-small purple increment z-depth-0" data-incrementid=${id}>
                                        +
                                    </a>
                                    
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
            `;
        });

        shop.innerHTML = productOutput;

        // Increment
        if(document.querySelectorAll('.increment'))
        {
            let incrementBtns = document.querySelectorAll('.increment');
            incrementBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    this.#incrementQuantity(e);
                });
            });
        }

        //Register Event-Handlers for decrement and Increment
        if(document.querySelectorAll('.decrement'))
        {
            let decrementBtns = document.querySelectorAll('.decrement');
            decrementBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    this.#decrimentQuantity(e);
                });
            });
        }

        
    }




    #incrementQuantity(e)
    {
        e.preventDefault();
        let id = (e.target.dataset.incrementid);

        let search = this.#basket.find((x) => x.id === id);
        if(search === undefined)
            this.#basket.push({id: id, item: 1});
        else
            search.item += 1;

        
        this.#updateQuantity(id);
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        
    }

    #decrimentQuantity(e)
    {
        e.preventDefault();
        let id = (e.target.dataset.decrementid);

        let search = this.#basket.find((x) => x.id === id);
        if(search === undefined || search.item === 0)
            return;
        else 
            search.item -= 1;
        

        this.#updateQuantity(id);
        this.#basket = this.#basket.filter(product => product.item !== 0);
        
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        
    }

    #updateQuantity(id)
    {
        let search = this.#basket.find(x => x.id === id);
        // console.log(search.item);
        document.getElementById(id).innerHTML = search.item;
        this.#cartTotal();
    }


    #cartTotal()
    {
        
        if(document.querySelectorAll('.cartAmount'))
        {
            let cartAmountTags = document.querySelectorAll('.cartAmount');
            cartAmountTags.forEach(elem => {
                elem.innerHTML = this.#basket.map((product) => product.item).reduce((x,y) => x+y,0);
            });

        }
    }


}
export { ShoppingCartHomePage };