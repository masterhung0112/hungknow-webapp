import { toNodes, isBoolean, isFunction } from '@hungknow/utils'
import { Constructor } from './Constructor'

export interface TogglableMixin {
    clsEnter: string
    clsLeave: string
}


export function TogglableMixin<TBase extends Constructor>(Base: TBase) {
    return class Togglable extends Base {
        clsEnter = 'uk-togglabe-enter'
        clsLeave = 'uk-togglabe-leave'

        toggleElement(targets: any[], toggle: boolean, animate: boolean) {
            return new Promise(resolve =>
                Promise.all(toNodes(targets).map(el => {
                    const show = isBoolean(toggle) ? toggle : !this.isToggled(el)

                    if (!trigger(el, `before${show ? 'show' : 'hide'}`, [this])) {
                        return Promise.reject();
                    }

                    const promise = (
                        isFunction(animate)
                            ? animate
                            : animate === false || !this.hasAnimation
                                ? this._toggle
                                : this.hasTransition
                                    ? toggleHeight(this)
                                    : toggleAnimation(this)
                    )(el, show)

                    const cls = show ? this.clsEnter : this.clsLeave

                    addClass(el, cls)
                })))
        }

        isToggled(el = this.$el) {
            return false
        }
    };
}