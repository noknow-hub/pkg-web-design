//////////////////////////////////////////////////////////////////////
// directory.js
//////////////////////////////////////////////////////////////////////
class Directory {

    static classNameDirectory = 'directory';
    static classNameContent   = 'content';
    static classNameItem      = 'item';
    static classNameDropDown  = 'drop-down';
    static classNameActive    = 'active';
    static classNameList      = 'list';
    static classNameSubList   = 'sub-list';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.elms = document.querySelectorAll(`.${Directory.classNameDirectory} .${Directory.classNameItem}.${Directory.classNameDropDown}`);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        for(let i = 0; i < this.elms.length; i++) {
            const elm = this.elms[i];
            this.setUpMaxHeight(elm);
            elm.addEventListener('click', () => {
                elm.classList.toggle(Directory.classNameActive);
                this.setUpMaxHeight(elm);
            });
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Set up max-height for sub-list
    //////////////////////////////////////////////////////////////////////
    async setUpMaxHeight(elm) {
        const nextElm = elm.nextElementSibling;
        if(nextElm === undefined || nextElm === null) {
            return;
        }
        const listElm = nextElm.querySelector(`.${Directory.classNameSubList}`);
        if(listElm === undefined || listElm === null) {
            return;
        }
        const listElmRect = listElm.getBoundingClientRect();
        if(elm.classList.contains(Directory.classNameActive)) {
            nextElm.style.maxHeight = `${listElmRect.height}px`;
        } else {
            nextElm.style.maxHeight = 0;
        }
    }

}
export { Directory };
