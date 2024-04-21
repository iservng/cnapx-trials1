import { insertIntoDOM } from "../utils/insert_into_DOM.js";
import { toastIt } from "../utils/toast_it.js";
import { OfflineDB } from "../indexeddb/offlinedb.js";

class EditProductUi
{
    #_mErrors;
    #mErrorMsg;
    #productId;
    #offlinedb;
    #product;
    #transaction;
    constructor(productIdElem)
    {
        this.#_mErrors = 0;
        this.#mErrorMsg = ``;
        this.#offlinedb = new OfflineDB();

        // this.#productId
        if(!productIdElem)
        {
            this.#_mErrors++;
            this.#mErrorMsg = `The product element is invalid!`;
        }
        else if(!productIdElem.id)
        {
            this.#_mErrors++;
            this.#mErrorMsg = `The prodict ID not found!`;
        }
        else 
        {
            this.#productId = Number(productIdElem.id);
            console.log(this.#productId);
        }
    }

    createUi()
    {
        if(this.#_mErrors == 0)
        {
            let content = `
                <div class="container">
                    <div class="row" style="margin-top: 3rem;">
                        <div class="col s12" style="margin-bottom: 1rem;">
                            <h5 class="purple-text center-align">Edit Product</h5>
                            <b class="hide-on-small-only">
                                <a href="#" class="btn-small purple z-depth-0 sidenav-trigger white-text text-darken-4" data-target="mobile-demo">
                                    Menu
                                </a>
                            </b>
                            <p><a href="#" class="backToInventory btn-flat">Back To Inventory</a></p>
                        </div>
                    </div>

                    <form id="editProductForm">
                        <div class="row" id="editDivContainer">
                        </div>
                    </form>
                </div>`;
            insertIntoDOM('main', content);



            //Register event handler for the editProductForm
            if(document.querySelector('#editProductForm'))
            {
                document.querySelector('#editProductForm').addEventListener('submit', e => {
                    e.preventDefault();
                    console.log(e.target);
                    this.#checkAndSaveEditedProduct(e.target);
                });
            }

            //Register event handler for the backToInventory
            if(document.querySelector('.backToInventory'))
            {
                document.querySelector('.backToInventory').addEventListener('click', e => {
                    e.preventDefault();
                    import('./records_ui.js')
                    .then(m => {
                        let recordsui = new m.RecordsUi();
                        recordsui.createUi();
                    })
                    .catch(error => {
                        console.log(error.message);
                        toastIt('red', 'Unable to load the records ui');
                    });
                });
            }

            //Call for the product
            this.#getProductForEditing(this.#productId);

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }



    #getProductForEditing(productId)
    {
        this.#offlinedb.withDB(db => {

            this.#transaction = db.transaction('products');
            let objectStore = this.#transaction.objectStore('products');

            objectStore.get(this.#productId).onsuccess = event => {
                this.#product = event.target.result;
                if(this.#product)
                {
                    // console.log(this.#product);
                    document.querySelector('#editDivContainer').innerHTML = `
                    <div class="col s12 m6 l6">
                        <div class="row">
                            <div class="col s12">
                                <div class="card z-depth-0">
                                    <div class="card-image">
                                        <div id="imgContainer"><img src=${this.#product.product_image}></div>
                                        <span class="card-title">
                                            Edit Mode
                                        </span>
                                    </div>
                                    <p>
                                        <div class="file-field input-field">
                                            <div class="btn">
                                                <span>File</span>
                                                <input type="file" id="product_image">
                                            </div>
                                            <div class="file-path-wrapper">
                                                <input class="file-path validate" type="text" placeholder="Change Product Image">
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--PRODUCT INFORMATION-->
                    <div class="col s12 m6 l6">
                        <h5>
                            Other product Information
                        </h5>
                        <p>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="product_name" type="text" value="${this.#product.product_name}">
                                    <label for="product_name">Product Name</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s6">
                                    <input placeholder="Placeholder" id="cost_price" type="number" class="validate" value="${this.#product.cost_price}">
                                    <label for="cost_price">Cost Price</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="selling_price" type="number" class="validate" value="${this.#product.selling_price}" >
                                    <label for="selling_price">Selling Price</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s6">
                                    <input placeholder="Placeholder" id="product_quantity" type="number" class="validate" value="${this.#product.product_quantity}">
                                    <label for="product_quantity">
                                        Product Quantity
                                    </label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="quantity_price" type="number" class="validate" value="${this.#product.quantity_price}" >
                                    <label for="quantity_price">
                                        Quantity Price
                                    </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s6">
                                    <input placeholder="Placeholder" id="product_unit" type="number" class="validate" value="${this.#product.product_unit}">
                                    <label for="product_unit">
                                        Product Unit
                                    </label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="unit_price" type="number" class="validate" value="${this.#product.unit_price}" >
                                    <label for="unit_price">
                                        Unit Price
                                    </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s6">
                                    <input placeholder="Placeholder" id="unit_per_quantity" type="number" class="validate" value="${this.#product.unit_per_quantity}">
                                    <label for="unit_per_quantity">
                                        Unit Per Quantity
                                    </label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="createdOn" type="date" class="validate" value="${this.#product.createdOn}" >
                                    <label for="createdOn">
                                        Unit Price
                                    </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s6">
                                    <input type="submit" class="btn validate" value="Save Changes">
                                </div>
                            </div>
                        </p>
                    </div>
                    `;

                }
                else 
                {
                    toastIt('red', 'Unable to load data');
                }
            };
        });
    }





    #checkAndSaveEditedProduct(form)
    {
        let namePattern = /^[a-zA-Z0-9\s-]{3,30}$/;
        let digitPattern = /^[\d]{1,}$/;

        let product_name = form.product_name.value.trim().toUpperCase();
        if(namePattern.test(product_name))
            this.#product.product_name = product_name;
        
        // let cost_price = ``;
        if(digitPattern.test(form.cost_price.value))
            this.#product.cost_price = Number(form.cost_price.value);

        // let selling_price = '';
        if(digitPattern.test(form.selling_price.value))
            this.#product.selling_price = Number(form.selling_price.value);

        // let product_quantity = '';
        if(digitPattern.test(form.product_quantity.value))
            this.#product.product_quantity = Number(form.product_quantity.value);

        // let quantity_price = '';
        if(digitPattern.test(form.quantity_price.value))
            this.#product.quantity_price = Number(form.quantity_price.value);

        // let product_unit = '';
        if(digitPattern.test(form.product_unit.value))
            this.#product.product_unit = Number(form.product_unit.value);

        // let unit_price = '';
        if(digitPattern.test(form.unit_price.value))
            this.#product.unit_price = Number(form.unit_price.value);

        // let unit_per_quantity = ''
        if(digitPattern.test(form.unit_per_quantity.value))
            this.#product.unit_per_quantity = Number(form.unit_per_quantity.value);


        if(form.product_image.files[0])
        {
            // In the asurance that a file has been selected, then we should start the filereader.
            let reader = new FileReader();
            reader.addEventListener('error', e => {
                toastIt('red', 'The file can not be read');
            });

            reader.addEventListener('load', e => {
                let img = document.createElement('img');
                img.src = e.target.result;
                let imgWraper = document.querySelector('#imgContainer');
                imgWraper.innerHTML = ``;
                imgWraper.append(img);
                //Call the function that put the whole data in the database.
                this.#product.product_image = e.target.result;

                // -----------------
                //Product Image has been changed.
                this.#offlinedb.withDB(db => {
                    let transaction = db.transaction('products', 'readwrite');
                    let objectStore = transaction.objectStore('products');
                    let request = objectStore.put(this.#product, this.#productId);
                    request.onerror = event => {
                        toastIt('red', 'Could not update product');
                    };
                    request.onsuccess = event => {
                        toastIt('green', 'Product Updated');
                    };
                });
                // -----------------

            });
            reader.readAsDataURL(form.product_image.files[0]);
        }
        else 
        {
            //Product image was not selected to be adited.
            this.#offlinedb.withDB(db => {
                let transaction = db.transaction('products', 'readwrite');
                let objectStore = transaction.objectStore('products');
                let request = objectStore.put(this.#product, this.#productId);
                request.onerror = event => {
                    toastIt('red', 'Could not update product');
                };
                request.onsuccess = event => {
                    toastIt('green', 'Product Updated');
                };
            });

        }

        

        

    }


    // ==============================
}
export { EditProductUi };