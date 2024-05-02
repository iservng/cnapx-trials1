import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";
import { AddProductUi } from "./add_product_ui.js";
import { ShoppingCartHomePage } from "../shoppingCart/shopping_cart_home_page.js";

class ProcessAddProductForm
{
    #_mErrors;
    #mErrorMsg;
    // #productImage;
    #form;
    constructor(form)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = '';
        if(!form)
        {
            this.#_mErrors++;
            this.#mErrorMsg = "The form is invalide";
        }
        else 
        {
            //Begin to extract the form inputed--values
            // let productImage = form.product_image.files[0];
            let digitPattern = /^[\d]{1,}$/;

            if(!form.product_image.files[0]['name'])
            {
                this.#_mErrors++;
                this.#mErrorMsg = "Product Image is required";
            }
            else if(form.product_image.files[0]['size'] > 500000)
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The file size is too large";
            }
            else if(!form.product_name.value || !/^[a-zA-Z0-9\s-]{3,30}$/.test(form.product_name.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product name is required";
            }
            else if(!digitPattern.test(form.cost_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The cost price is required";

            }
            else if(!digitPattern.test(form.selling_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The selling price is required";
            }
            else if(!digitPattern.test(form.product_quantity.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product quantity is required";
            }
            else if(!digitPattern.test(form.product_unit.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product unit is required";
            }
            else if(!digitPattern.test(form.unit_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The unit price value is required";
            }
            else if(!digitPattern.test(form.unit_per_quantity.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The unit per quantity value is required";
            }
            else 
            {
                this.#form = form;
            }


            // let product_name = form.product_name.value;
            // let cost_price = form.cost_price.value;
            // let selling_price = form.selling_price.value;
            // let product_quantity = form.product_quantity.value;
            // let quantity_price = form.quantity_price.value;
            // let product_unit = form.product_unit.value;
            // let unit_price = form.unit_price.value; 
            // let unit_per_quantity = form.unit_per_quantity.value;
            // let add_product_btn = form.add_product_btn.value;
            

        }
    }



    //Class public API
    // =====================
    processFormContent()
    {
        if(this.#_mErrors == 0)
        {
            // console.log(this.#form);
            let reader = new FileReader();
            reader.addEventListener('error', e => {
                toastIt('red', 'The file can not be read');
            });

            reader.addEventListener('load', e => {

                let img = document.createElement('img');
                img.src = e.target.result;
                let imgWraper = document.querySelector('#imgContainer');
                imgWraper.append(img);

                //Call the function that put the whole data in the database.
                this.#addProduct(e.target.result, this.#form);

            });
            
            reader.readAsDataURL(this.#form.product_image.files[0]);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }





    //Utility functions
    #addProduct(imageData, form)
    {
        

            const storeName = 'products';
            const data = {

                product_image: imageData,
                product_name: form.product_name.value.trim().toUpperCase(),
                cost_price: Number(form.cost_price.value),
                selling_price: Number(form.selling_price.value),
                product_quantity: Number(form.product_quantity.value),
                quantity_price: Number(form.quantity_price.value),
                product_unit: Number(form.product_unit.value),
                unit_price: Number(form.unit_price.value), 
                unit_per_quantity: Number(form.unit_per_quantity.value),
                createdOn: Date.now(),
                
            };
            let offlinedb = new OfflineDB();
            offlinedb.saveToDB(storeName, this.#callBackFunc, data);
            //import

    }


    #callBackFunc(id)
    {
        console.log(id);
        let content = `
        <div class="container">
            <div class="center-align" style="margin-top: 5rem;"> 
                <h1>&checkmark;</h1>
                <h6><b class="green-text">Done!</b></h6>
                <p>
                    <a href="#" class="btn-small purle add_product">Add Product</a>
                    <a href="#" class="btn-small red shop_front">Cancel</a>
                </p>
            </div>
        </div>
        `;
        insertIntoDOM('main', content);

        //Register the add_product handler //import
        if(document.querySelectorAll('.add_product'))
        {
            let addProductBtns = document.querySelectorAll('.add_product');
            addProductBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    
                    let addProductUi = new AddProductUi();
                    addProductUi.createUi();
                    
                }, false);
            });

        }





        //Register event handler for the shop_front
        if(document.querySelector('.shop_front'))
        {
            document.querySelector('.shop_front').addEventListener('click', e => {
                e.preventDefault();
                
                let shop_front = new ShoppingCartHomePage();
                shop_front.createUi();
                
            }, false);
        }
        // =============




    }
}
export {ProcessAddProductForm};