
// let namePattern = /^([a-zA-Z]{3,20})(\s)([a-zA-z]{3,20})(\s)?([a-zA-Z]{3,20})?$/;
// let phonePattern = /^(0)([7-9])([0-1])(\d){8}$/;
// let name = 'Babangida Usman tooman';
// console.log(namePattern.test(name));

// let phone = '08134899043';
// console.log(phonePattern.test(phone));

let name = 'babangidausmantooman';
let phone = '08134899043';

function getEmailAndPassword(name, phone)
{
    let phone1part = phone.substring(0, 6);
    let phone2part = phone.substring(phone1part.length);

    let name1part = name.substring(0, 6);
    let name2part = name.substring(name1part.length);

    let email = name1part+phone2part+'@gmail.com';
    let password = name2part+phone1part;
    return { email, password };

}
export { getEmailAndPassword };


let re = getEmailAndPassword(name, phone);
// console.log(re.email);
// console.log(re.password);



/**
 * The openCursor() function takes several argument.
 * 1. First we can limit the range of items that are retrieved by using a key range object. 
 * 2. Second we can specify the direction that we want to iterate.
 * 
 * 
 * The success callback for cursor is a little special, the cursor-object itself id the result of the request.
 * 
 * The actual key and value can be found on the "key" and "value" property of the cursor-object, if you want to keep going then you can call continue() on the cursor-object.
 * 
 * 
 * USING INDEX
 * ----------------
 * We can open two types of cursors on indexes
 * 1. A normal cursor maps the index property to the object in the object store
 * 2. A key-cursor maps the index property to the key used to store the objects in the object-store.
 * 
 * 
 * SPECIFYING THE RANGE AND DIRECTION OF CURSORS
 * ----------------------------------------------
 * If you would like to limit the range of values you will see in a cursor, 
 * 1. We can use IDBKeyRange object and pass it as the first argument to openCursor().
 * 
 * We can make a key range that only 
 * 1. allow a single key or 
 * 2. has a lower or upper bound
 * 3. or both lower and upper bound
 * 
 * 1. The bound may be closed - ie the key range includes the given values 
 * 2. The bounds may be open - ie the key range doe not include the given values
 * 
 */




































































































































































































































































































































































