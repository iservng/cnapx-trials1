
const removeModal = () => {
    if(document.querySelectorAll('.modal'))
    {
        let modals = document.querySelectorAll('.modal');
        modals.forEach(instance => {
            let inst = M.Modal.getInstance(instance);
            inst.close();
        });
    }
    
};
export { removeModal };