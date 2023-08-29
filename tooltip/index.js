//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class ToolTip {

    static classNameTopLeft     = 'top-left';
    static classNameTopRight    = 'top-right';
    static classNameBottomRight = 'bottom-right';
    static classNameBottomLeft  = 'bottom-left';


    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.toolTipTargetElms  = document.querySelectorAll('[data-tooltip-target]');
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        for(let i = 0; i < this.toolTipTargetElms.length; i++) {
            const toolTipTargetElm = this.toolTipTargetElms[i];
            const toolTipIdElm = document.querySelector(`[data-tooltip-id="${toolTipTargetElm.dataset.tooltipTarget}"]`);
            if(toolTipIdElm === undefined || toolTipIdElm === null) {
                continue;
            }
            this.positioning(toolTipTargetElm, toolTipIdElm);
            toolTipTargetElm.addEventListener('mouseover', () => {
                toolTipIdElm.classList.add('activated');
            });
            toolTipTargetElm.addEventListener('mouseleave', (event) => {
                const toId =  setTimeout((event) => {
                    toolTipIdElm.classList.remove('activated');
                }, 300);
                toolTipIdElm.addEventListener('mouseover', () => {
                    clearTimeout(toId);
                    toolTipIdElm.classList.add('activated');
                });
                toolTipIdElm.addEventListener('mouseleave', () => {
                    clearTimeout(toId);
                    toolTipIdElm.classList.remove('activated');
                });
            });
            window.addEventListener('resize', () => {
                this.positioning(toolTipTargetElm, toolTipIdElm);
            });
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Positioning elements
    //////////////////////////////////////////////////////////////////////
    positioning(toolTipTargetElm, toolTipIdElm) {
        // Clear
        toolTipIdElm.classList.remove(ToolTip.classNameTopLeft);
        toolTipIdElm.classList.remove(ToolTip.classNameTopRight);
        toolTipIdElm.classList.remove(ToolTip.classNameBottomRight);
        toolTipIdElm.classList.remove(ToolTip.classNameBottomLeft);

        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;
        
        const toolTipTargetElmRect = toolTipTargetElm.getBoundingClientRect();
        const toolTipIdElmRect = toolTipIdElm.getBoundingClientRect();
        
        if(toolTipTargetElmRect.x < wWidth / 2 && toolTipTargetElmRect.y < wHeight / 2) {
            // top-left
            toolTipIdElm.style.left = `${toolTipTargetElmRect.x + toolTipTargetElmRect.width}px`;
            toolTipIdElm.style.top = `${toolTipTargetElmRect.y + toolTipIdElmRect.height}px`;
            toolTipIdElm.classList.add(ToolTip.classNameTopLeft);
        } else if(toolTipTargetElmRect.x > wWidth / 2 && toolTipTargetElmRect.y < wHeight / 2) {
            // top-right
            toolTipIdElm.style.left = `${toolTipTargetElmRect.x - toolTipIdElmRect.width}px`;
            toolTipIdElm.style.top = `${toolTipTargetElmRect.y + toolTipTargetElmRect.height}px`;
            toolTipIdElm.classList.add(ToolTip.classNameTopRight);
        } else if(toolTipTargetElmRect.x > wWidth / 2 && toolTipTargetElmRect.y > wHeight / 2) {
            // bottom-right
            toolTipIdElm.style.left = `${toolTipTargetElmRect.x - toolTipIdElmRect.width}px`;
            toolTipIdElm.style.top = `${toolTipTargetElmRect.y - toolTipIdElmRect.height}px`;
            toolTipIdElm.classList.add(ToolTip.classNameBottomRight);
        } else if(toolTipTargetElmRect.x < wWidth / 2 && toolTipTargetElmRect.y > wHeight / 2) {
            // bottom-left
            toolTipIdElm.style.left = `${toolTipTargetElmRect.x + toolTipTargetElmRect.width}px`;
            toolTipIdElm.style.top = `${toolTipTargetElmRect.y - toolTipIdElmRect.height}px`;
            toolTipIdElm.classList.add(ToolTip.classNameBottomLeft);
        } else {
            return;
        }
    }

}
export { ToolTip }
