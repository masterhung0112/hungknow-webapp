import { CandleData, Layout, TimeRange } from 'types/TradingChart'
import Utils from './utils'
import { smth2i } from './IndexBase'
import * as math from './math'

// Time to screen coordinates
export function t2screen(layout: Layout, t: number, range: TimeRange): number {
  const { ti_map: timeIndexData } = layout
  const { IndexBased } = timeIndexData
  if (IndexBased) t = smth2i(timeIndexData, t)
  const dt = range.t2 - range.t1
  const r = layout.spacex / dt
  return Math.floor((t - range.t1) * r) - 0.5
}

// $ to screen coordinates
export function $2screen(layout: Layout, y: number): number {
  if (layout.grid.logScale) y = math.log(y)
  return Math.floor(y * layout.A + layout.B) - 0.5
}

// Screen-Y to dollar value (or whatever)
export function screen2$(layout: Layout, y: number): number {
  if (layout.grid.logScale) return math.exp((y - layout.B) / layout.A)
  return (y - layout.B) / layout.A
}

// Time-axis nearest step
export function t_magnet(layout: Layout, t: number): number | undefined {
  const { ti_map } = layout

  if (ti_map.IndexBased) t = smth2i(ti_map, t)
  const cn = layout.candles || layout.master_grid.candles
  const arr = cn.map((x) => x.raw[0])
  const i = Utils.nearest_a(t, arr)[0]
  if (!cn[i]) return undefined
  return Math.floor(cn[i].x) - 0.5
}

// Screen-X to timestamp
export function screen2t(layout: Layout, x: number, range: TimeRange): number {
  // TODO: most likely Math.floor not needed
  // return Math.floor(range.t1 + x / r)
  const dt = range.t2 - range.t1
  const r = layout.spacex / dt
  return range.t1 + x / r
}
// $-axis nearest step
// export function $_magnet(price) {}
// Nearest candlestick
export function c_magnet(layout: Layout, t: number): CandleData {
  const cn = layout.candles || layout.master_grid.candles
  const arr = cn.map((x) => x.raw[0])
  const i = Utils.nearest_a(t, arr)[0]
  return cn[i]
}

// export function layoutFn(self: Layout, range: TimeRange) {
//   const ib = self.ti_map.IndexBased
//   const dt = range.t2 - range.t1
//   const r = self.spacex / dt
//   const ls = self.grid.logScale || false

//   Object.assign(self, {
//     // Time to screen coordinates
//     t2screen: (t) => {
//       if (ib) t = self.ti_map.smth2i(t)
//       return Math.floor((t - range.t1) * r) - 0.5
//     },
//     // $ to screen coordinates
//     $2screen: (y) => {
//       if (ls) y = math.log(y)
//       return Math.floor(y * self.A + self.B) - 0.5
//     },
//     // Time-axis nearest step
//     t_magnet: (t) => {
//       if (ib) t = self.ti_map.smth2i(t)
//       const cn = self.candles || self.master_grid.candles
//       const arr = cn.map((x) => x.raw[0])
//       const i = Utils.nearest_a(t, arr)[0]
//       if (!cn[i]) return
//       return Math.floor(cn[i].x) - 0.5
//     },
//     // Screen-Y to dollar value (or whatever)
//     screen2$: (y) => {
//       if (ls) return math.exp((y - self.B) / self.A)
//       return (y - self.B) / self.A
//     },
//     // Screen-X to timestamp
//     screen2t: (x) => {
//       // TODO: most likely Math.floor not needed
//       // return Math.floor(range.t1 + x / r)
//       return range.t1 + x / r
//     },
//     // $-axis nearest step
//     $_magnet: (price) => {},
//     // Nearest candlestick
//     c_magnet: (t) => {
//       const cn = self.candles || self.master_grid.candles
//       const arr = cn.map((x) => x.raw[0])
//       const i = Utils.nearest_a(t, arr)[0]
//       return cn[i]
//     },
//     // Nearest data points
//     data_magnet: (t) => {
//       /* TODO: implement */
//     },
//   })

//   return self
// }
