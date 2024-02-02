import { toastIt } from "../utils/toast_it.js";

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
            let productImage = form.product_image.files[0];
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
            else if(!form.product_name.value || !/^[a-zA-Z0-9]{3,30}$/.test(form.product_name.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product name is required";
            }
            else if(!/^[\d]{1,}$/.test(form.cost_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The cost price is required";

            }
            else if(!/^[\d]{1,}$/.test(form.selling_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The selling price is required";
            }
            else if(!/^[\d]{1,}$/.test(form.product_quantity.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product quantity is required";
            }
            else if(!/^[\d]{1,}$/.test(form.product_unit.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The product unit is required";
            }
            else if(!/^[\d]{1,}$/.test(form.unit_price.value))
            {
                this.#_mErrors++;
                this.#mErrorMsg = "The unit price value is required";
            }
            else if(!/^[\d]{1,}$/.test(form.unit_per_quantity.value))
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
            console.log(this.#form);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }

    }
}