//SPMALL SPINNER..
let progressLoader = (msg = 'Checking...', classname = '.task_wrapper_div') => {
    let content = `
        <div class="center-align" style="padding-top: 3rem; padding-bottom: 5rem;">
            <progress></progress>
            <div><small class="black-text">${msg}</small></div>
        </div>
    `;
    document.querySelector(classname).innerHTML = '';
    document.querySelector(classname).innerHTML = content;
};

export { progressLoader };