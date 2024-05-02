
import { toastIt } from "../utils/toast_it.js";
import { insertIntoDOM } from "../utils/insert_into_DOM.js";

import { sampleProductData } from "./sample_data.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";
import { ShoppingCartHomePage } from "./shopping_cart_home_page.js";
import { ProcessMakePaymentForm } from "../shop/process_make_payment_form.js";


class CartUI 
{
    #_mErrors;
    #mErrorMsg;
    #basket;
    #sampleProductData;
    #offlinedb;
    constructor()
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        this.#offlinedb = new OfflineDB();
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
                            <div class="card-panel z-depth-0">
                                <span class="purple-text text-darken-3">
                                    <h5><b>Cart Invoice</b></h5>
                                    <small>Ensure to check out on the right, select the mode of payment and continue</small>
                                </span>
                                <p>
                                    
                                </p>
                            </div>
                            <!-- ================= -->
                            <ul class="collection" id="cartItemHolder">
                                
                            </ul>
                                
                            <!-- ================= -->
                            <div class="card-panel lighten-5 z-depth-0" style="border-bottom: 1px solid #f3e5f5;">
                                <div class="row">
                                    <div class="col s6">
                                        <b>Invoice Total:</b>
                                    </div>
                                    <div class="col s6 right-align">
                                        <b class="purple-text text-darken-3 grand_total">
                                            N 0.00
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col s12 m4 l4" id="checkout">
                            <div class="card-panel z-depth-0" style="border: 1px solid #f3e5f5;">
                            <form id="makePaymentForm">
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
                                            <td><span style="text-decoration: line-through;">N</span> 0.00</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td><span style="text-decoration: line-through;">N</span> 0.00</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <p>
                                        <h6><small>Please selectpayment mode</small></h6>
                                        <input type="hidden" id="grandTotal">
                                        <label>
                                            <input name="paymode" type="radio" value="cnapx"/>
                                            <span><small>Cnapx</small></span>
                                        </label>
                                        <label>
                                            <input name="paymode" type="radio" value="pos"/>
                                            <span><small>POS</small></span>
                                        </label>
                                        <label>
                                            <input name="paymode" type="radio" value="cash"/>
                                            <span><small>Cash</small></span>
                                        </label>
                                    </p>

                                    <p>
                                        <input type="submit" class="btn green darken-3" value="Make Payment">
                                    </p>
                                </span>
                                </form>
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



            //Register event handler for clear_cart
            if(document.querySelector('.clear_cart'))
            {
                // document.querySelector('.clear_cart').addEventListener('click', e => {
                //     e.preventDefault();
                //     localStorage.removeItem('cartData');
                //     import('../shoppingCart/shopping_cart_home_page.js')
                //     .then(m => {
                //         let shopHome = new m.ShoppingCartHomePage();
                //         shopHome.createUi();
                //     })
                //     .catch(error => {
                //         console.log(error.message);
                //         toastIt('red', 'Unable to load the shop home');
                //     });
                // });
            }

            this.#generateCartUiItems();



            //Register event handler for the makePaymentForm submission
            if(document.querySelector('#makePaymentForm'))
            {
                document.querySelector('#makePaymentForm').addEventListener('submit', e => {
                    e.preventDefault();
                    this.#processMakePaymentForm(e.target);
                });
            }

            // =======================
            //Event handler for the back to shop btn//new
            if(document.querySelector('.back-to-shop'))
            {
                let backBtn = document.querySelector('.back-to-shop');
                backBtn.addEventListener('click', e => {
                    e.preventDefault();
                    
                    let shop = new ShoppingCartHomePage();
                    shop.createUi();
                
                }, false);
            }
            // =======================
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }










    //UI utility function for manipulations//import
    #generateCartUiItems()
    {

        if(this.#basket.length !== 0)
        {
            
            if(document.querySelector('#cartItemHolder'))
            {
                let cartItemOutput = ``;
                this.#basket.forEach(product => {
                    let {id, item, key} = product;

                    this.#offlinedb.withDB(db => {
                        db.transaction("products")
                            .objectStore("products")
                            .get(key).onsuccess = (event) => {

                                let cartProduct = event.target.result;
                                let total = cartProduct.selling_price * item;

                                cartItemOutput = `
                                    <img src=${cartProduct.product_image} alt="" class="circle">
                                    <span class="title"><small><b class="grey-text text-darken-3">${cartProduct.product_name}</b></small></span>
                                    <p>
                                        <small>
                                            <b><span style="text-decoration: line-through;">N</span> ${cartProduct.selling_price}.00</b>
                                        </small> <br>

                                        <a href="#" id=${id}>
                                            ${item}
                                        </a>
                                    </p>
                                    
                                    <a href="#!" class="secondary-content">
                                        <i class="black-text"><span style="text-decoration: line-through;">N</span> ${total}.00</i>
                                    </a>`;
                                
                                let wrapper = document.querySelector('#cartItemHolder');

                                let li = document.createElement('li');
                                li.setAttribute('class', "collection-item avatar purple lighten-5");

                                li.innerHTML = cartItemOutput;

                                wrapper.append(li);
                                this.#cartGrandTotalForCheckout();

                                // ========================
                                if(document.querySelectorAll('.remove_item'))
                                {
                                    let removeItemBtns = document.querySelectorAll('.remove_item');
                                    removeItemBtns.forEach(btn => {
                                        btn.addEventListener('click', e => {
                                            e.preventDefault();
                                            this.#removeItemFromCart(e);
                                        }, false);
                                    });
                                }
                                // ========================
                            };
                    });
                });

                


                
                // =======================
                // Increment
                if(document.querySelectorAll('.increment'))
                {
                    let incrementBtns = document.querySelectorAll('.increment');
                    incrementBtns.forEach(btn => {
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            this.#incrementQuantity(e);
                        }, false);
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
                        }, false);
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
                        <div class="center-align">
                            <p>Your cart is empty</p>
                            <p style="margin-top: 2rem;">
                                <a href="#" class="btn-small purple shop_front">Back to shop</a>
                            </p>
                        </div>
                    </li>
                `;

                //Register event hander for shop_front//new
                if(document.querySelector('.shop_front'))
                {
                    document.querySelector('.shop_front').addEventListener('click', e => {
                        e.preventDefault();
                        let shopfront = new ShoppingCartHomePage();
                        shopfront.createUi();
                    }, false);
                }

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











    
    #processMakePaymentForm(form)
    {
        let paymentProccessor = new ProcessMakePaymentForm(form);
        paymentProccessor.validatePayment();
        //import
    }




    

    // =====================================
    #incrementQuantity(e)
    {
        e.preventDefault();
        let id = Number(e.target.dataset.incrementid);
        let selling_price = Number(e.target.dataset.sellingprice);
        let realkey = Number(e.target.dataset.incrementidkey);
        let cost_price = Number(e.target.dataset.costprice);

        let search = this.#basket.find((x) => x.id === id);
        if(search === undefined)
            this.#basket.push({
                        id: id, 
                        item: 1,
                        key: realkey,
                        selling_price: selling_price,
                        cost_price: cost_price
                    });
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

        console.log(e.target);
    }

    #cartGrandTotalForCheckout = () => {
        if(this.#basket.length !== 0)
        {
            
            let amount = 0;
            this.#basket.forEach((product) => {
                let {id, item, key} = product;

                
                this.#offlinedb.withDB(db => {
                    db.transaction('products')
                        .objectStore('products')
                        .get(key).onsuccess = (event) => {

                            let product = event.target.result;
                            amount += product.selling_price * item;

                            let grandTotals = document.querySelectorAll('.grand_total');
                            grandTotals.forEach(grand_total => {
                                grand_total.innerHTML = `<span style="text-decoration: line-through;">N</span> ${amount}.00`;
                            });
                            document.querySelector('#grandTotal').value = amount;
                        };
                });

            });

        }
        else 
        {
            return;
        }
    }

}
export { CartUI };