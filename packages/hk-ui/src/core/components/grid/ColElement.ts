import {HkUiElement} from '../../../hkui/HkUiElement'

const defaultClassName = 'col'

export class Col extends HkUiElement {
    // constructor() {
    //     super();

    // }

    get _defaultClassName() {
        return 'col'
    }

    get type() {
        return 'div'
    }

    _compile() {
        // for (let i = 0; i < this.children.length; ++i) {
        //     const el = this.children[i]
        //     if (el.classList.contains('title')) {
        //         el.classList.add('hk-')
        //     }
        // }
        this.classList.add(defaultClassName)
    }
}