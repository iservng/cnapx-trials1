//SPMALL SPINNER..
let smallSpinner = (msg = 'Checking...', classname = '.task_wrapper_div') => {



    let content = `
    <div class="center-align" style="padding-top: 3rem; padding-bottom: 5rem;">
        <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue-only">

                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div>

                  <div class="gap-patch">
                    <div class="circle"></div>
                  </div>

                  <div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>

            </div>
        </div>

        <div><small>${msg}</small></div>
    </div>
    `;
    document.querySelector(classname).innerHTML = '';
    document.querySelector(classname).innerHTML = content;
};

export { smallSpinner };