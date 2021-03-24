import { screen2$, screen2t, t2screen } from './layoutFn'
import Utils from './utils'

export class CursorUpdater {
  comp: any
  // grids: any
  cursor: any

  constructor(comp: any) {
    this.comp = comp
    // this.grids = comp._layout.grids
    this.cursor = comp.cursor
  }

  sync(e: any) {
    // TODO: values not displaying if a custom grid id is set:
    // grid: { id: N }
    this.cursor.grid_id = e.grid_id
    let once = true
    for (var grid of this.comp._layout.grids) {
      const c = this.cursor_data(grid, e)
      if (!this.cursor.locked) {
        // TODO: find a better fix to invisible cursor prob
        if (once) {
          this.cursor.t = this.cursor_time(grid, e, c)
          // console.log('this.cursor.t', this.cursor.t)
          if (this.cursor.t) once = false
        }
        if (c.values) {
          // this.comp.$set(this.cursor.values, grid.id, c.values)
          this.cursor.values[grid.id] = c.values
        }
      }
      if (grid.id !== e.grid_id) continue
      this.cursor.x = t2screen(grid, this.cursor.t, grid.range)
      this.cursor.y = c.y
      this.cursor.y$ = c.y$
    }
  }

  overlay_data(grid: any, e: any) {
    const s = grid.id === 0 ? 'main_section' : 'sub_section'
    let data = this.comp[s].data

    // Split offchart data between offchart grids
    if (grid.id > 0) {
      // Sequential grids
      let d = data.filter((x: any) => x.grid.id === undefined)
      // grids with custom ids (for merging)
      let m = data.filter((x: any) => x.grid.id === grid.id)
      data = [d[grid.id - 1], ...m]
    }

    const t = screen2t(grid, e.x, grid.range)
    let ids: any = {},
      res: any = {}
    for (var d of data) {
      let ts = d.data.map((x: any) => x[0])
      let i = Utils.nearest_a(t, ts)[0]
      d.type in ids ? ids[d.type]++ : (ids[d.type] = 0)
      res[`${d.type}_${ids[d.type]}`] = d.data[i]
    }
    return res
  }

  // Nearest datapoints
  cursor_data(grid: any, e: any) {
    const data = this.comp.main_section.sub

    let xs = data.map((x: any) => t2screen(grid, x[0], grid.range) + 0.5)
    let i = Utils.nearest_a(e.x, xs)[0]

    if (!xs[i]) return {}
    return {
      x: Math.floor(xs[i]) - 0.5,
      y: Math.floor(e.y - 2) - 0.5 - grid.offset,
      y$: screen2$(grid, e.y - 2 - grid.offset),
      t: (data[i] || [])[0],
      values: Object.assign(
        {
          ohlcv: grid.id === 0 ? data[i] : undefined,
        },
        this.overlay_data(grid, e)
      ),
    }
  }

  // Get cursor t-position (extended)
  cursor_time(grid: any, mouse: any, candle: any) {
    let t = screen2t(grid, mouse.x, grid.range)
    let r = Math.abs((t - candle.t) / this.comp.interval)
    let sign = Math.sign(t - candle.t)
    if (r >= 0.5) {
      // Outside the data range
      let n = Math.round(r)
      return candle.t + n * this.comp.interval * sign
    }
    // Inside the data range
    return candle.t
  }
}
