export const NativeCustomEvent = global.CustomEvent;
export type CustomEventParams = {
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
}

function useNative() {
    try {
        const p = new NativeCustomEvent('cat', {detail: {foo: 'bar'}});
        return p.type === 'cat' && p.detail.foo === 'bar';
    } catch (e) {}
    return false;
}

export default useNative() ?
    NativeCustomEvent : // IE >= 9
    typeof document !== 'undefined' && typeof document.createEvent === 'function' ?
        function CustomEvent(type: string, params: CustomEventParams) {
            const e = document.createEvent('CustomEvent');
            if (params) {
                e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
            } else {
                e.initCustomEvent(type, false, false, void 0);
            }
            return e;
        } : // IE <= 8
        function CustomEvent(type: string, params: CustomEventParams) {
            const e = (document as any).createEventObject();
            e.type = type;
            if (params) {
                e.bubbles = Boolean(params.bubbles);
                e.cancelable = Boolean(params.cancelable);
                e.detail = params.detail;
            } else {
                e.bubbles = false;
                e.cancelable = false;
                e.detail = void 0;
            }
            return e;
        };
