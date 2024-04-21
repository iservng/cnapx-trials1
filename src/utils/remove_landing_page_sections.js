
const removeLandingPageSections = () => {
    if(document.querySelectorAll('.landing-page'))
    {
        let sections = document.querySelectorAll('.landing-page');
        sections.forEach(section => {
            section.style.display = 'none';
        });

    }
    
};
export { removeLandingPageSections };