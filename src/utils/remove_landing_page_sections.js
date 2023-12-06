
const removeLandingPageSections = () => {
    let sections = document.querySelectorAll('.landing-page');
        sections.forEach(section => {
            section.style.display = 'none';
        });
};
export { removeLandingPageSections };