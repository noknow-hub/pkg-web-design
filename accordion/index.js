//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

class Accordion {

    static classNameAccordion = 'accordion';
    static classNameAccordionHeading = 'heading';
    static classNameAccordionHeadingBox = 'heading-box';
    static classNameAccordionHasContent = 'has-content';
    static classNameAccordionContent = 'content-box';
    static classNameAccordionItem = 'item';
    static classNameActive = 'active';

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.accordionBoxElms = document.querySelectorAll(`.${Accordion.classNameAccordion}`);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.accordionBoxElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.accordionBoxElms.length; i++) {
            const elms = this.accordionBoxElms[i].querySelectorAll(`.${Accordion.classNameAccordionHeadingBox}.${Accordion.classNameAccordionHasContent}`);
            for(let j = 0; j < elms.length; j++) {
                const elm = elms[j].parentElement;
                if(elm === undefined || elm === null || !elm.classList.contains(Accordion.classNameAccordionItem)) {
                    continue;
                }
                const contentElm = elm.querySelector(`.${Accordion.classNameAccordionContent}`);
                if(contentElm === undefined || contentElm === null) {
                    continue;
                }
                elms[j].addEventListener('click', () => {
                    elm.classList.toggle(Accordion.classNameActive);
                    if(elm.classList.contains(Accordion.classNameActive)) {
                        contentElm.style.maxHeight = `${contentElm.scrollHeight}px`;
                    } else {
                        contentElm.style.maxHeight = '0px';
                    }
                });
            }
        }
    }

}
export { Accordion };
