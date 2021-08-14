function getElementClass(): typeof HTMLElement {
    if (typeof HTMLElement !== 'function') { // Safari
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
        const BaseElement: any = () => {}
        BaseElement.prototype = document.createElement('div')
        return BaseElement
    }
    return HTMLElement
}

export class HkUiElement extends getElementClass() {
    // name: string

    // constructor() {
    //     super();
    //     // this.name = name;
    // }
}