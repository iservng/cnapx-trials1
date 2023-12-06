const removeSidenav = () => {
    if(document.querySelectorAll('.sidenav'))
    {
        
        let sideNavs = document.querySelectorAll('.sidenav');
        sideNavs.forEach(sidenav => {
            let inst = M.Sidenav.getInstance(sidenav);
            inst.close();
        });

    }
};
export { removeSidenav };