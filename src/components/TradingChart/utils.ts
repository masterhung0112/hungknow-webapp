import { DAY, MAP_UNIT, MONTH } from './constants'
import IndexedArray from 'arrayslicer'
import { TimeRange } from 'types/TradingChart'

export default {
  clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num
  },

  add_zero(i: number) {
    let iStr = '' + i
    if (i < 10) {
      iStr = '0' + i
    }
    return iStr
  },

  // Start of the day (zero millisecond)
  day_start(t: number): number {
    let start = new Date(t)
    return start.setUTCHours(0, 0, 0, 0)
  },

  // Start of the month
  month_start(t: number): number {
    let date = new Date(t)
    return Date.UTC(date.getFullYear(), date.getMonth(), 1)
  },

  // Start of the year
  year_start(t: number): number {
    const d = new Date(t)
    return Date.UTC(d.getFullYear(), 0)
  },

  get_year(t: number): number {
    if (!t) return undefined
    return new Date(t).getUTCFullYear()
  },

  get_month(t: number): number {
    if (!t) return undefined
    return new Date(t).getUTCMonth()
  },

  // Nearest in array
  nearest_a(x: number, array: number[]) {
    let dist = Infinity
    let val = null
    let index = -1
    for (var i = 0; i < array.length; i++) {
      var xi = array[i]
      if (Math.abs(xi - x) < dist) {
        dist = Math.abs(xi - x)
        val = xi
        index = i
      }
    }
    return [index, val] as const
  },

  round(num: number, decimals = 8): number {
    return parseFloat(num.toFixed(decimals))
  },

  // Strip? No, it's ugly floats in js
  strip(number: string | number): number {
    return parseFloat(parseFloat(number + '').toPrecision(12))
  },

  get_day(t: number): number | null {
    return t ? new Date(t).getDate() : null
  },

  // Update array keeping the same reference
  overwrite<T>(arr: T[], new_arr: T[]) {
    arr.splice(0, arr.length, ...new_arr)
  },

  // Copy layout in reactive way
  copy_layout(obj: Record<string, any>, new_obj: Record<string, any>) {
    for (var k in obj) {
      if (Array.isArray(obj[k])) {
        // (some offchart indicators are added/removed)
        // we need to update layout in a reactive way
        if (obj[k].length !== new_obj[k].length) {
          this.overwrite(obj[k], new_obj[k])
          continue
        }
        for (var m in obj[k]) {
          Object.assign(obj[k][m], new_obj[k][m])
        }
      } else {
        Object.assign(obj[k], new_obj[k])
      }
    }
  },

  // Detects candles interval
  detect_interval(ohlcv: any[]) {
    let len = Math.min(ohlcv.length - 1, 99)
    let min = Infinity
    ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i + 1][0] - x[0]
      if (d === d && d < min) min = d
    })
    // This saves monthly chart from being awkward
    if (min >= MONTH && min <= DAY * 30) {
      return DAY * 31
    }
    return min
  },

  // Gets numberic part of overlay id (e.g 'EMA_1' = > 1)
  get_num_id(id: string): number {
    return parseInt(id.split('_').pop())
  },

  // Fast filter. Really fast, like 10X
  fast_filter(arr: number[][], t1: number, t2: number) {
    if (!arr.length) return [arr, undefined]
    try {
      let ia = new IndexedArray(arr, '0')
      let res = ia.getRange(t1, t2)
      let i0 = ia.valpos[t1].next
      return [res, i0]
    } catch (e) {
      // Something wrong with fancy slice lib
      // Fast fix: fallback to filter
      return [arr.filter((x) => x[0] >= t1 && x[0] <= t2), 0]
    }
  },

  // Fast filter (index-based)
  fast_filter_i(arr: number[], t1: number, t2: number) {
    if (!arr.length) return [arr, undefined]
    let i1 = Math.floor(t1)
    if (i1 < 0) i1 = 0
    let i2 = Math.floor(t2 + 1)
    let res = arr.slice(i1, i2)
    return [res, i1]
  },

  // Nearest indexes (left and right)
  fast_nearest(arr: number[], t1: number) {
    let ia = new IndexedArray(arr, '0')
    ia.fetch(t1)
    return [ia.nextlow, ia.nexthigh] as const
  },

  now() {
    return new Date().getTime()
  },

  pause(delay: number): Promise<any> {
    return new Promise((rs, rj) => setTimeout(rs, delay))
  },

  // Limit crazy wheel delta values
  smart_wheel(delta: number): number {
    let abs = Math.abs(delta)
    if (abs > 500) {
      return (200 + Math.log(abs)) * Math.sign(delta)
    }
    return delta
  },

  // Parse the original mouse event to find deltaX
  get_deltaX(event: any) {
    return event.originalEvent.deltaX / 12
  },

  // Parse the original mouse event to find deltaY
  get_deltaY(event: any) {
    return event.originalEvent.deltaY / 12
  },

  // Apply opacity to a hex color
  apply_opacity(c: string, op: number) {
    if (c.length === 7) {
      let n = Math.floor(op * 255)
      n = this.clamp(n, 0, 255)
      c += n.toString(16)
    }
    return c
  },

  // Parse timeframe or return value in ms
  parse_tf(smth: any): any {
    if (typeof smth === 'string') {
      return MAP_UNIT[smth]
    } else {
      return smth
    }
  },

  // Detect index shift between the main data sub
  // and the overlay's sub (for IB-mode)
  index_shift(sub: any[], data: any[]) {
    // Find the second timestamp (by value)
    if (!data.length) return 0
    let first = data[0][0]
    let second

    for (var i = 1; i < data.length; i++) {
      if (data[i][0] !== first) {
        second = data[i][0]
        break
      }
    }

    for (var j = 0; j < sub.length; j++) {
      if (sub[j][0] === second) {
        return j - i
      }
    }

    return 0
  },

  // Fallback fix for Brave browser
  // https://github.com/brave/brave-browser/issues/1738
  measureText(ctx: any, text: string, tv_id: string) {
    let m = ctx.measureTextOrg(text)
    if (m.width === 0) {
      const doc = document
      const id = 'tvjs-measure-text'
      let el = doc.getElementById(id)
      if (!el) {
        let base = doc.getElementById(tv_id)
        el = doc.createElement('div')
        el.id = id
        el.style.position = 'absolute'
        el.style.top = '-1000px'
        base.appendChild(el)
      }
      if (ctx.font) el.style.font = ctx.font
      el.innerText = text.replace(/ /g, '.')
      return { width: el.offsetWidth }
    } else {
      return m
    }
  },

  uuid(temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
    return temp.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  uuid2() {
    return this.uuid('xxxxxxxxxxxx')
  },

  // Delayed warning, f = condition lambda fn
  warn(f: () => unknown, text: string, delay = 0) {
    setTimeout(() => {
      if (f()) console.warn(text)
    }, delay)
  },

  // Checks if script props updated
  // (and not style settings or something else)
  is_scr_props_upd(n: any, prev: any[]) {
    let p = prev.find((x) => x.v.$uuid === n.v.$uuid)
    if (!p) return false

    let props = n.p.settings.$props
    if (!props) return false

    return props.some((x: any) => n.v[x] !== p.v[x])
  },

  // Checks if it's time to make a script update
  // (based on execInterval in ms)
  delayed_exec(v: any) {
    if (!v.script || !v.script.execInterval) return true
    let t = this.now()
    let dt = v.script.execInterval
    if (!v.settings.$last_exec || t > v.settings.$last_exec + dt) {
      v.settings.$last_exec = t
      return true
    }
    return false
  },

  // Format names such 'RSI, $length', where
  // length - is one of the settings
  format_name(ov: any) {
    if (!ov.name) return undefined

    let name = ov.name

    for (var k in ov.settings || {}) {
      let val = ov.settings[k]
      let reg = new RegExp(`\\$${k}`, 'g')
      name = name.replace(reg, val)
    }

    return name
  },

  // Default cursor mode
  xmode() {
    return this.is_mobile ? 'explore' : 'default'
  },

  default_prevented(event: any) {
    if (event.original) {
      return event.original.defaultPrevented
    }
    return event.defaultPrevented
  },

  // WTF with modern web development
  is_mobile: ((w: any) =>
    'onorientationchange' in w &&
    (!!navigator.maxTouchPoints ||
      !!navigator.msMaxTouchPoints ||
      'ontouchstart' in w ||
      (w.DocumentTouch && document instanceof w.DocumentTouch)))(typeof window !== 'undefined' ? window : {}),

  timeRange(t1: number, t2: number, exp?: boolean): TimeRange {
    return {
      t1,
      t2,
      exp: exp || false,
    }
  },
}
