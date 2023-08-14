//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
class ModalWindow {

    static classNameModalWindow = 'modal-window';
    static classNameActive = 'active';
    static currentZIndex = 10;
    static dataModalActionClose = 'data-modal-action="close"';
    static dataModalId = 'data-modal-id';
    static dataModalTarget = 'data-modal-target';
    static datasetModalTarget = 'modalTarget';


    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.modalElms = document.getElementsByClassName(ModalWindow.classNameModalWindow);
    }


    //////////////////////////////////////////////////////////////////////
    // Append the event for opening modal
    //////////////////////////////////////////////////////////////////////
    static AppendEventOpeningModal(elm) {
        elm.addEventListener('click', () => {
            const modal = document.querySelector(`[${ModalWindow.dataModalId}="${elm.dataset[ModalWindow.datasetModalTarget]}"]`);
            if(modal === undefined || modal === null) {
                return;
            }
            ModalWindow.currentZIndex++;
            modal.style.zIndex = ModalWindow.currentZIndex;
            modal.classList.add(ModalWindow.classNameActive);
        });
    }


    //////////////////////////////////////////////////////////////////////
    // Close modal
    //////////////////////////////////////////////////////////////////////
    static CloseModal(modalWindow = null) {
        let elms;
        if(modalWindow !== undefined && modalWindow !== null) {
            elms = [modalWindow];
        } else {
            elms = document.getElementsByClassName(ModalWindow.classNameModalWindow);
        }
        if(elms === undefined || elms === null) {
            return;
        }
        for(let i = 0; i < elms.length; i++) {
            const e = elms[i];
            if(e.classList.contains(ModalWindow.classNameActive)) {
                if(ModalWindow.currentZIndex > 10) {
                    ModalWindow.currentZIndex--;
                }
                e.style.zIndex = null;
                e.classList.remove(ModalWindow.classNameActive);
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.modalElms === undefined || this.modalElms === null || this.modalElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.modalElms.length; i++) {
            const modal = this.modalElms[i];
            modal.removeEventListener('click', (event) => { this.clkParentModalWindow(event); });
            modal.addEventListener('click', (event) => { this.clkParentModalWindow(event); });
            const closeBtns = modal.querySelectorAll(`[${ModalWindow.dataModalActionClose}]`);
            if(closeBtns === undefined || closeBtns === null || closeBtns.length === 0) {
                continue;
            }
            for(let j = 0; j < closeBtns.length; j++) {
                const closeBtn = closeBtns[j];
                closeBtn.removeEventListener('click', () => { this.clkCloseBtn(modal); });
                closeBtn.addEventListener('click', () => { this.clkCloseBtn(modal); });
            }
        }
        const modalTargets = document.querySelectorAll(`[${ModalWindow.dataModalTarget}]`);
        if(modalTargets === undefined || modalTargets === null || modalTargets.length === 0) {
            return;
        }
        for(let i = 0; i < modalTargets.length; i++) {
            const modalTarget = modalTargets[i];
            modalTarget.removeEventListener('click', () => { this.clkTargetBtn(modalTarget.dataset[ModalWindow.datasetModalTarget]); });
            modalTarget.addEventListener('click', () => { this.clkTargetBtn(modalTarget.dataset[ModalWindow.datasetModalTarget]); });
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the close button
    //////////////////////////////////////////////////////////////////////
    clkCloseBtn(modalWindow) {
        this.styleZIndex(modalWindow, false);
        modalWindow.classList.remove(ModalWindow.classNameActive);
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the parent modal window
    //////////////////////////////////////////////////////////////////////
    clkParentModalWindow(event) {
        if(event.target.classList.contains(ModalWindow.classNameModalWindow) && event.target.classList.contains(ModalWindow.classNameActive)) {
            this.styleZIndex(event.target, false);
            event.target.classList.remove(ModalWindow.classNameActive);
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the modal target button
    //////////////////////////////////////////////////////////////////////
    clkTargetBtn(dataSetValue) {
        const modal = document.querySelector(`[${ModalWindow.dataModalId}="${dataSetValue}"]`);
        if(modal === undefined || modal === null) {
            return;
        }
        this.styleZIndex(modal, true);
        modal.classList.add(ModalWindow.classNameActive);
    }


    //////////////////////////////////////////////////////////////////////
    // Style `z-index`
    //////////////////////////////////////////////////////////////////////
    styleZIndex(modalWindow, isIncrement) {
        if(isIncrement) {
            ModalWindow.currentZIndex++;
            modalWindow.style.zIndex = ModalWindow.currentZIndex;
        } else {
            if(ModalWindow.currentZIndex > 10) {
                ModalWindow.currentZIndex--;
            }
            modalWindow.style.zIndex = null;
        }
    }

}
export { ModalWindow };
