//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

class ArticleCard {

    static classNameForArticleCard = 'article-card';
    static classNameForItem = 'item';
    static classNameForTitle = 'title';
    static classNameForExcerpt = 'excerpt';
    static dataKeyMaxLineInTitle = 'maxLineInTitle';
    static dataKeyMaxLineInExcerpt = 'maxLineInExcerpt';

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.cardListElms = document.querySelectorAll(`.${ArticleCard.classNameForArticleCard}`);
        this.context = document.createElement('canvas').getContext('2d');
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(this.cardListElms === undefined || this.cardListElms === null || this.cardListElms.length === 0) {
            return;
        }
        for(let i = 0; i < this.cardListElms.length; i++) {
            const cardListElm = this.cardListElms[i];
            const maxLineInTitle = parseInt(cardListElm.dataset[ArticleCard.dataKeyMaxLineInTitle], 10);
            const maxLineInExcerpt = parseInt(cardListElm.dataset[ArticleCard.dataKeyMaxLineInExcerpt], 10);
            const itemElms = cardListElm.querySelectorAll(`.${ArticleCard.classNameForItem}`);
            for(let j = 0; j < itemElms.length; j++) {
                const elm = itemElms[j];
                if(!isNaN(maxLineInTitle)) {
                    this.trimText(elm.querySelector(`.${ArticleCard.classNameForTitle}`), maxLineInTitle);
                }
                if(!isNaN(maxLineInExcerpt)) {
                    this.trimText(elm.querySelector(`.${ArticleCard.classNameForExcerpt}`), maxLineInExcerpt);
                }
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // trim text
    //////////////////////////////////////////////////////////////////////
    trimText(elm, maxLine) {
        if(elm === undefined || elm === null) {
            return;
        }
        let fontWeight = window.getComputedStyle(elm).getPropertyValue('font-weight');
        if(fontWeight === undefined || fontWeight === null) {
            fontWeight = 'normal';
        }
        let fontSize = window.getComputedStyle(elm).getPropertyValue('font-size');
        if(fontSize === undefined || fontSize === null) {
            fontSize = '16px';
        }
        let fontFamily = window.getComputedStyle(document.body).getPropertyValue('font-family');
        if(fontFamily === undefined || fontFamily === null) {
            fontFamily = '';
        }
        this.context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        const textWidth = Math.ceil(this.context.measureText(elm.textContent).width);
        let letterSpacing = parseInt(window.getComputedStyle(elm).getPropertyValue('letter-spacing'));
        if(isNaN(letterSpacing)) {
            letterSpacing = 0;
        }
        const charWidth = Math.ceil(textWidth / elm.textContent.length);
        const maxChars = Math.ceil(elm.clientWidth / (charWidth + letterSpacing)) * maxLine;
        if(elm.textContent.length > maxChars) {
            let s = `${elm.textContent.substr(0, (maxChars - 3))}...`;
            elm.textContent = s;
        }
    }

}
export { ArticleCard };
