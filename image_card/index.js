//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

class ImageCard {

    static classNameForImageCard = 'image-card';
    static classNameForCard = 'card';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.cardElms = document.querySelectorAll(`.${ImageCard.classNameForImageCard}`);
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.cardElms === undefined || this.cardElms === null || this.cardElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.cardElms.length; i++) {
            const ipts = this.cardElms[i].querySelectorAll('input[type="checkbox"]');
            for(let j = 0; j < ipts.length; j++) {
                const ipt = ipts[j];;
                ipts[j].addEventListener('change', () => {
                    const parentElm = ipt.parentElement;
                    if(parentElm.classList.contains(ImageCard.classNameForCard)) {
                        if(ipt.checked) {
                            parentElm.classList.add('active');
                        } else {
                            parentElm.classList.remove('active');
                        }
                    }
                });
            }
        }
    }

}
export { ImageCard };
