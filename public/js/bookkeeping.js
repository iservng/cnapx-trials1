import {removeSidenav } from "../utils/remove_side_nav.js";
import { toastIt } from "../utils/toast_it.js";
import { insertIntoDOM } from '../utils/insert_into_DOM.js';
import { APP_NAME, DEFAILT_MENU } from '../config/app_constants.js';

import { ShoppingCartHomePage } from "../shoppingCart/shopping_cart_home_page.js";
import { AddProductUi } from "../shop/add_product_ui.js";
import { RecordsUi } from "../shop/records_ui.js";
import { TransactionsUi } from "../shop/transactions_ui.js";
import { ChecksAndBalances } from "../shop/checks_and_balances.js";
import { AddMoneyInUi } from "../shop/add_money_in_ui.js";
import { AddMoneyOutUi } from "../shop/add_money_out_ui.js";


import { ListCustomers } from "../shop/list_customers.js";
import { CartUI } from "../shoppingCart/cart_ui.js";


import { removeLandingPageSections } from "../utils/remove_landing_page_sections.js";

//Open Cart
if(document.querySelectorAll('.cart-ui'))
{
    let cartOpenBtns = document.querySelectorAll('.cart-ui');
    cartOpenBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            //Dynamically import and execute the cartUI class
            
            let cartUI = new CartUI();
            cartUI.createUi();
            removeSidenav();
            removeLandingPageSections();
            
        }, false);
    });
}







//Shop front
// ================
if(document.querySelectorAll('.go_to_shop'))
{
    let goToShopBtns = document.querySelectorAll('.go_to_shop');
    goToShopBtns.forEach(btn => {
        btn.addEventListener('click', e => {
                e.preventDefault();
                let shopfront = new ShoppingCartHomePage();
                shopfront.createUi();
                removeSidenav();
                removeLandingPageSections();
            }, false);
        });
}
// ===========================            








/**
             * The event handler for a"add_product"
             * --------------------------------------
             */
if(document.querySelectorAll('.add_product'))
{
    let addProductBtns = document.querySelectorAll('.add_product');
    addProductBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            let addProductUi = new AddProductUi();
            addProductUi.createUi();
            removeSidenav();
            removeLandingPageSections();

        }, false);
    });
}








//REGISTER EVENT HANDLER FOR records
if(document.querySelectorAll('.records'))
{
    let recordsBtns = document.querySelectorAll('.records');
    recordsBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            let recodsUi = new RecordsUi();
            recodsUi.createUi();
            removeSidenav();
            removeLandingPageSections();
        }, false);
    });
}





/**
    * Register event handler for handler Transactions
    * -------------------------
// */
if(document.querySelectorAll('.transactions'))
{
    let transactionsBtns = document.querySelectorAll('.transactions');
    transactionsBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            let transactionsUi = new TransactionsUi();
            transactionsUi.createUi();
            removeSidenav();
            removeLandingPageSections();
            
        }, false);
    })
}









//  Register event handler for checks_and_balances
if(document.querySelector('.checks_and_balances'))
{
    document.querySelector('.checks_and_balances').addEventListener('click', e => {
        e.preventDefault();
        //Dynamically import and execute the class responsible
        
        let checks_and_balances = new ChecksAndBalances();
        checks_and_balances.createUi();
        removeSidenav();
        removeLandingPageSections();
    }, false);
}




/**
* Register event handler for the record_money_in
* --------------------------------------------
*/
if(document.querySelectorAll('.record_money_in'))
{
    let recordMoneyInBtns = document.querySelectorAll('.record_money_in');
    recordMoneyInBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            let moneyInUi = new AddMoneyInUi();
            moneyInUi.createUi();
            removeSidenav();
            removeLandingPageSections();
        }, false);
    });

}






    //Register event handler for the record_money_out
            // =================
if(document.querySelectorAll('.record_money_out'))
{
    let recordMoneyOutBtns = document.querySelectorAll('.record_money_out');
    recordMoneyOutBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            let moneyOutUi = new AddMoneyOutUi();
            moneyOutUi.createUi();
            removeSidenav();
            removeLandingPageSections();
        }, false);
    });

}









//Register event handler for list_customers
if(document.querySelector('.list_customers'))
{
    document.querySelector('.list_customers').addEventListener('click', e => {
        e.preventDefault();
        //Load the class responsible for displaying customers list
        
        let customerList = new ListCustomers();
        customerList.createUi();
        removeSidenav();
        removeLandingPageSections();
    }, false);
}
