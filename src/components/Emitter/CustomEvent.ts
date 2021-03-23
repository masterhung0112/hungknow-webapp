export const NativeCustomEvent = global.CustomEvent
export type CustomEventParams = {
  bubbles: boolean
  cancelable: boolean
  detail: any
}

function useNative() {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } })
    return 'cat' === p.type && 'bar' === p.detail.foo
  } catch (e) {}
  return false
}

export default useNative()
  ? NativeCustomEvent
  : // IE >= 9
  'undefined' !== typeof document && 'function' === typeof document.createEvent
  ? function CustomEvent(type: string, params: CustomEventParams) {
      var e = document.createEvent('CustomEvent')
      if (params) {
        e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail)
      } else {
        e.initCustomEvent(type, false, false, void 0)
      }
      return e
    }
  : // IE <= 8
    function CustomEvent(type: string, params: CustomEventParams) {
      var e = (document as any).createEventObject()
      e.type = type
      if (params) {
        e.bubbles = Boolean(params.bubbles)
        e.cancelable = Boolean(params.cancelable)
        e.detail = params.detail
      } else {
        e.bubbles = false
        e.cancelable = false
        e.detail = void 0
      }
      return e
    }
