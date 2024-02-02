import { insertIntoDOM } from "../utils/insert_into_DOM";
import { toastIt } from "../utils/toast_it.js";

import { sampleProductData } from "./sample_data.js";
class CartUI 
{
    #_mErrors;
    #mErrorMsg;
    #basket;
    #sampleProductData;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        // this.#basket = JSON.parse(localStorage.getItem(''))
        this.#sampleProductData = sampleProductData;
        this.#basket = JSON.parse(localStorage.getItem('cartData')) || [];

    }





    //Class Public API
    createUi()
    {
        if(this.#_mErrors === 0)
        {
            let content = `
            <div class="container">

            <div class="row" style="margin-top: 3rem;">

                <!-- USER-PROFILE-AVARTAR  -->
                <div class="col s12">
                    
                    <p>
                        <a href="#" class="back-to-shop">
                            &larr; Back to Shop
                        </a>
                    </p>
                    <b>
                        <a href="#" class="sidenav-trigger purple-text text-darken-4" data-target="mobile-demo">
                            menu
                        </a>
                    </b>
                </div>


                <!-- FIRST SECTION OF DASHBOARD  -->
                <div class="col s12" style="margin-bottom: 2rem; margin-top: 3rem;">
                    <div class="row">

                        <div class="col s12 m8 l8">
                            <div class="card-panel purple lighten-5 z-depth-0">
                                <span class="purple-text text-darken-3">
                                    <h5><b>Cart Invoice</b></h5>
                                    <small>Ensure to check out on the right</small>
                                </span>
                                <p>
                                    <a class="btn-small purple" href="#">CLEAR INVOICE</a>
                                </p>
                            </div>
                            <!-- ================= -->
                            <ul class="collection purple lighten-5" id="cartItemHolder">
                                
                            </ul>
                                     
                            <!-- ================= -->
                            <div class="card-panel purple lighten-5 z-depth-0" style="border: 1px solid #f3e5f5;">
                                <div class="row">
                                    <div class="col s12">
                                        This div is 12-columns wide on all screen sizes
                                    </div>
                                    <div class="col s6">
                                        <b>Invoice Total:</b>
                                    </div>
                                    <div class="col s6 right-align">
                                        <h6>
                                            <b class="purple-text text-darken-3 grand_total">
                                                N 0.00
                                            </b>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 m4 l4" id="checkout">
                            <div class="card-panel z-depth-0" style="border: 1px solid #f3e5f5;">
                                <span class="purple-text text-darken-3">
                                    <p>
                                        
                                        <h5 class="purple-text">CheckOut</h5>
                                    </p>

                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>Grand Total</td>
                                            <td class="grand_total">0.00</td>
                                        </tr>
                                        <tr>
                                            <td>VAT</td>
                                            <td>N 0.00</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>N 0.00</td>
                                        </tr>
                                        </tbody>
                                    </table>


                                    <p>
                                        <a href="#" class="btn green darken-3">Pay with cnapx</a>
                                    </p>
                                </span>
                            </div>
                        </div>

                    </div>        
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

            this.#generateCartUiItems();

            // =======================
            //Event handler for the back to shop btn
            if(document.querySelector('.back-to-shop'))
            {
                let backBtn = document.querySelector('.back-to-shop');
                backBtn.addEventListener('click', e => {
                    e.preventDefault();
                    import('./shopping_cart_home_page.js')
                    .then(m => {
                        let shop = new m.ShoppingCartHomePage();
                        shop.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                })
            }
            // =======================
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }










    //UI utility function for manipulations
    #generateCartUiItems()
    {

        if(this.#basket.length !== 0)
        {
            // console.log("Basket Full");
            if(document.querySelector('#cartItemHolder'))
            {
                let cartItemOutput = ``;
                this.#basket.forEach(product => {
                    let {id, item } = product;
                    let search = this.#sampleProductData.find(inventory => inventory.id === id);
                    let total = search.price * item;
                    cartItemOutput += `
                        <li class="collection-item avatar purple lighten-5">
                            <img src=${search.img} alt="" class="circle">
                            <span class="title"><small><b class="grey-text text-darken-3">${search.name}</b></small></span>
                            <p><small><b>N ${search.price}</b></small> <br>

                                    <a href="#" class="decrement" data-decrementid=${id}>
                                        &minus;
                                    </a>

                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>

                                    <a href="#" id=${id}>
                                        ${item}
                                    </a>

                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>

                                    <a href="#" class="increment" data-incrementid=${id}>
                                        +
                                    </a>

                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>

                                    <small>
                                        <a href="#" class="red-text remove_item" data-removeid=${id}>Remove</a>
                                    </small>
                            </p>
                            
                            <a href="#!" class="secondary-content">
                                <i class="black-text">N ${total}</i>
                            </a>
                            
                        </li>
                    `;
                });
                document.querySelector('#cartItemHolder').innerHTML = cartItemOutput;

                this.#cartGrandTotalForCheckout();


                // =======================
                //Remove Item from cart
                if(document.querySelectorAll('.remove_item'))
                {
                    let removeItemBtns = document.querySelectorAll('.remove_item');
                    removeItemBtns.forEach(btn => {
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            this.#removeItemFromCart(e);
                        });
                    });
                }
                // =======================
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
                // =====================
            }
        }
        else 
        {
            // console.log("Basket Empty");
            if(document.querySelector('#cartItemHolder'))
            {
                document.querySelector('#cartItemHolder').innerHTML = `
                    <li class="collection-item avatar">
                        <p>Your cart is empty</p>
                        <p>
                            <a href="#" class="btn-large purple">Back</a>
                        </p>
                    </li>
                `;

            }

            if(document.querySelector('#checkout'))
            {
                document.querySelector('#checkout').innerHTML = `
                    <div class="card-panel z-depth-0" style="border: 1px solid #f3e5f5;">
                        <span class="purple-text text-darken-3">
                            <p><b>CheckOut</b></p>
                        </span>
                    </div>
                `;
            }
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

        this.#generateCartUiItems();
        this.#updateQuantity(id);
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        this.#cartGrandTotalForCheckout();
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
        this.#generateCartUiItems();
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        this.#cartGrandTotalForCheckout();
        
    }

    #updateQuantity(id)
    {
        let search = this.#basket.find(x => x.id === id);
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



    #removeItemFromCart = (e) => {

        // console.log(e.target);
        let id = e.target.dataset.removeid;
        this.#basket = this.#basket.filter(product => product.id !== id);
        localStorage.setItem('cartData', JSON.stringify(this.#basket));
        this.#generateCartUiItems();

    }

    #cartGrandTotalForCheckout = () => {
        if(this.#basket.length !== 0)
        {
            let amount = this.#basket.map((product) => {
                let {id, item} = product;
                let search = this.#sampleProductData.find(inventory => inventory.id === id);
                return item * search.price;
            }).reduce((x,y) => x+y,0);
            
            let grandTotals = document.querySelectorAll('.grand_total');
            grandTotals.forEach(grand_total => {
                grand_total.innerHTML = `N ${amount}`;
            });

        }
        else 
        {
            return;
        }
    }









}
export { CartUI };