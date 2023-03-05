//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
class Table {

    static classNameScrollTable = 'scroll-table';
    static datasetKeyStickyColumn      = 'stickyColumn';
    static datasetKeyStickyRow      = 'stickyRow';
    static classNameDropDown  = 'drop-down';
    static classNameActive    = 'active';
    static classNameList      = 'list';
    static classNameSubList   = 'sub-list';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.elms = document.querySelectorAll(`.${Table.classNameScrollTable}`);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        for(let i = 0; i < this.elms.length; i++) {
            const elm = this.elms[i];
            const stickyColumn = parseInt(elm.dataset[Table.datasetKeyStickyColumn], 10);

            if(isNaN(stickyColumn)) {
                continue;
            }

            const trs = elm.querySelectorAll('tr');
            loop:
            for(let j = 0; j < trs.length; j++) {
                const items = trs[j].children;
                let offsetLeft = 0;
                for(let k = 0; k < items.length; k++) {
                    if(stickyColumn <= k) {
                        break;
                    }
                    const item = items[k];
                    item.classList.add('sticky');
                    item.style.left = `${offsetLeft}px`;
                    offsetLeft = offsetLeft + item.getBoundingClientRect().width;
                }
            }
            
            
            
        }
        
    }


    



}
export { Table };
