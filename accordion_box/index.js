//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

class AccordionBox {

    static classNameAccordionBox = 'accordion-box';
    static classNameAccordionBoxHeading = 'heading';
    static classNameAccordionBoxHeadingBox = 'heading-box';
    static classNameAccordionBoxHasContent = 'has-content';
    static classNameAccordionBoxContent = 'content-box';
    static classNameAccordionBoxItem = 'item';
    static classNameActive = 'active';

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.accordionBoxElms = document.querySelectorAll(`.${AccordionBox.classNameAccordionBox}`);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.accordionBoxElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.accordionBoxElms.length; i++) {
            const elms = this.accordionBoxElms[i].querySelectorAll(`.${AccordionBox.classNameAccordionBoxHeadingBox}.${AccordionBox.classNameAccordionBoxHasContent}`);
            for(let j = 0; j < elms.length; j++) {
                const elm = elms[j].parentElement;
                if(elm === undefined || elm === null || !elm.classList.contains(AccordionBox.classNameAccordionBoxItem)) {
                    continue;
                }
                const contentElm = elm.querySelector(`.${AccordionBox.classNameAccordionBoxContent}`);
                if(contentElm === undefined || contentElm === null) {
                    continue;
                }
                elms[j].addEventListener('click', () => {
                    elm.classList.toggle(AccordionBox.classNameActive);
                    if(elm.classList.contains(AccordionBox.classNameActive)) {
                        contentElm.style.maxHeight = `${contentElm.scrollHeight}px`;
                    } else {
                        contentElm.style.maxHeight = '0px';
                    }
                });
            }
        }
    }

}
export { AccordionBox };
