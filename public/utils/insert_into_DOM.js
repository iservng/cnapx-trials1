const  insertIntoDOM = (classname, content) => {
    
    let main = document.querySelector(classname);
    main.innerHTML = '';
    main.innerHTML = content;
};
export { insertIntoDOM };