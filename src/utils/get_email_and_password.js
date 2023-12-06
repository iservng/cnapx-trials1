
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