
function generatePassword()
{
    const passwordLength = 12;
    const includeLowerCase = true;
    const includeUpperCase = true;
    const includeSymbols = true;
    const includeNumbers = true;

    const lowerCaseChars = `abcdefgjijklmnopqrstuvwxyz`;
    const upperCaseChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const numberChars = `0123456789`;
    const symbolChars = `'@#$%^&*()|?_=+-`;

    let allowedChars = ``;
    let password = ``;

    allowedChars += includeLowerCase ? lowerCaseChars : ``;
    allowedChars += includeUpperCase ? upperCaseChars : ``;
    allowedChars += includeSymbols ? symbolChars : ``;
    allowedChars += includeNumbers ? numberChars : ``;

    if(passwordLength <= 0)
        return `(Password length must be at least one)`;
    

    if(allowedChars.length === 0)
        return `(At least one set of characters need to be selected)`;
    

    for(let i = 0; i < passwordLength; i++)
    {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    return `${password}`;
}



function generateShortPassword()
{
    const passwordLength = 6;
    const includeLowerCase = true;
    const includeUpperCase = true;
    const includeNumbers = true;

    const lowerCaseChars = `abcdefgjijklmnopqrstuvwxyz`;
    const upperCaseChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const numberChars = `0123456789`;

    let allowedChars = ``;
    let password = ``;

    allowedChars += includeLowerCase ? lowerCaseChars : ``;
    allowedChars += includeUpperCase ? upperCaseChars : ``;
    allowedChars += includeNumbers ? numberChars : ``;

    if(passwordLength <= 0)
        return `(Password length must be at least one)`;
    

    if(allowedChars.length === 0)
        return `(At least one set of characters need to be selected)`;
    

    for(let i = 0; i < passwordLength; i++)
    {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    return `${password}`;
}

export { generatePassword, generateShortPassword };