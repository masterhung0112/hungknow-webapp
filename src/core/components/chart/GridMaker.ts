import { LayoutParams } from 'types/TradingChart'
import { TIMESCALES, $SCALES, WEEK, MONTH, YEAR, HOUR, DAY } from './constants'

const MAX_INT = Number.MAX_SAFE_INTEGER

export interface GridMaker {
  create(): any
  readonly layout: Layout
  readonly sidebar: any
  readonly sideBar: any
}

// masterGrid - ref to the master grid
export function createGridMaker(id: string, layoutParams: LayoutParams, masterGrid: any = null): GridMaker {
  const { layersMeta, tiMap, grid } = layoutParams
  let self = { tiMap }
  let lm = layersMeta[id]
  let yRangeFn = null
  let ls = grid.logScale

  if (lm && Object.keys(lm).length) {
    // Gets last yRange fn()
    let yrs = Object.values(lm).filter((x) => x.yRange)
    // The first yRange() determines the range
    if (yrs.length) yRangeFn = yrs[0].yRange
  }

  // Calc vertical ($/₿) range
  function calc_$range() {
    if (!masterGrid) {
      let hi, lo
      // $ candlestick range
      if (yRangeFn) {
        ;[hi, lo] = yRangeFn(hi, lo)
      } else {
        ;(hi = -Infinity), (lo = Infinity)
        for (let x of sub) {
          if (x[2] > hi) hi = x[2]
          if (x[3] < lo) lo = x[3]
        }
      }
    } else {
      // Offchart indicator range
      ;(hi = -Infinity), (lo = Infinity)
      for (let x of sub) {
        for (let y of x) {
          if (y > hi) hi = y
          if (y < lo) lo = y
        }
      }
      if (yRangeFn) {
        let [hi, lo, exp] = yRangeFn(hi, lo)
      }
    }

    // Fixed y-range in non-auto mode
    if (y_t && !y_t.auto && y_t.range) {
      self.$_hi = y_t.range[0]
      self.$_lo = y_t.range[1]
    } else {
      if (!ls) {
        exp = exp === false ? 0 : 1
        self.$_hi = hi + (hi - lo) * $p.config.EXPAND * exp
        self.$_lo = lo - (hi - lo) * $p.config.EXPAND * exp
      } else {
        self.$_hi = hi
        self.$_lo = lo
        log_scale.expand(self, height)
      }

      if (self.$_hi === self.$_lo) {
        if (!ls) {
          self.$_hi *= 1.05 // Expand if height range === 0
          self.$_lo *= 0.95
        } else {
          log_scale.expand(self, height)
        }
      }
    }
  }

  function calc_sidebar() {
    if (sub.length < 2) {
      self.prec = 0
      self.sb = $p.config.SBMIN
      return
    }

    // TODO: improve sidebar width calculation
    // at transition point, when one precision is
    // replaced with another

    // Gets formated levels (their lengths),
    // calculates max and measures the sidebar length
    // from it:

    // TODO: add custom formatter f()

    self.prec = calc_precision(sub)
    let lens = []
    lens.push(self.$_hi.toFixed(self.prec).length)
    lens.push(self.$_lo.toFixed(self.prec).length)
    let str = '0'.repeat(Math.max(...lens)) + '    '
    self.sb = ctx.measureText(str).width
    self.sb = Math.max(Math.floor(self.sb), $p.config.SBMIN)
    self.sb = Math.min(self.sb, $p.config.SBMAX)
  }

  // Calculate $ precision for the Y-axis
  function calc_precision(data) {
    var max_r = 0,
      max_l = 0

    let min = Infinity
    let max = -Infinity

    // Speed UP
    for (var i = 0, n = data.length; i < n; i++) {
      let x = data[i]
      if (x[1] > max) max = x[1]
      else if (x[1] < min) min = x[1]
    }
    // Get max lengths of integer and fractional parts
    ;[min, max].forEach((x) => {
      // Fix undefined bug
      var str = x != null ? x.toString() : ''
      if (x < 0.000001) {
        // Parsing the exponential form. Gosh this
        // smells trickily
        var [ls, rs] = str.split('e-')
        var [l, r] = ls.split('.')
        if (!r) r = ''
        r = { length: r.length + parseInt(rs) || 0 }
      } else {
        var [l, r] = str.split('.')
      }
      if (r && r.length > max_r) {
        max_r = r.length
      }
      if (l && l.length > max_l) {
        max_l = l.length
      }
    })

    // Select precision scheme depending
    // on the left and right part lengths
    //
    let even = max_r - (max_r % 2) + 2

    if (max_l === 1) {
      return Math.min(8, Math.max(2, even))
    }
    if (max_l <= 2) {
      return Math.min(4, Math.max(2, even))
    }

    return 2
  }

  function calcPositions() {
    if (sub.length < 2) return

    let dt = range[1] - range[0]

    // A pixel space available to draw on (x-axis)
    self.spacex = $p.width - self.sb

    // Candle capacity
    let capacity = dt / interval
    self.pxStep = self.spacex / capacity

    // px / time ratio
    let r = self.spacex / dt
    self.startx = (sub[0][0] - range[0]) * r

    // Candle Y-transform: (A = scale, B = shift)
    if (!grid.logScale) {
      self.A = -height / (self.$_hi - self.$_lo)
      self.B = -self.$_hi * self.A
    } else {
      self.A = -height / (math.log(self.$_hi) - math.log(self.$_lo))
      self.B = -math.log(self.$_hi) * self.A
    }
  }

  // Select nearest good-loking t step (m is target scale)
  function timeStep() {
    let k = tiMap.ib ? 60000 : 1
    let xrange = (range[1] - range[0]) * k
    let m = xrange * ($p.config.GRIDX / $p.width)
    let s = TIMESCALES
    return Utils.nearest_a(m, s)[1] / k
  }

  // Select nearest good-loking $ step (m is target scale)
  function dollar_step() {
    let yrange = self.$_hi - self.$_lo
    let m = yrange * ($p.config.GRIDY / height)
    let p = parseInt(yrange.toExponential().split('e')[1])
    let d = Math.pow(10, p)
    let s = $SCALES.map((x) => x * d)

    // TODO: center the range (look at RSI for example,
    // it looks ugly when "80" is near the top)
    return Utils.strip(Utils.nearest_a(m, s)[1])
  }

  function dollar_mult() {
    let mult_hi = dollar_mult_hi()
    let mult_lo = dollar_mult_lo()
    return Math.max(mult_hi, mult_lo)
  }

  // Price step multiplier (for the log-scale mode)
  function dollar_mult_hi() {
    let h = Math.min(self.B, height)
    if (h < $p.config.GRIDY) return 1
    let n = h / $p.config.GRIDY // target grid N
    let yrange = self.$_hi
    if (self.$_lo > 0) {
      var yratio = self.$_hi / self.$_lo
    } else {
      yratio = self.$_hi / 1 // TODO: small values
    }
    let m = yrange * ($p.config.GRIDY / h)
    let p = parseInt(yrange.toExponential().split('e')[1])
    return Math.pow(yratio, 1 / n)
  }

  function dollar_mult_lo() {
    let h = Math.min(height - self.B, height)
    if (h < $p.config.GRIDY) return 1
    let n = h / $p.config.GRIDY // target grid N
    let yrange = Math.abs(self.$_lo)
    if (self.$_hi < 0 && self.$_lo < 0) {
      var yratio = Math.abs(self.$_lo / self.$_hi)
    } else {
      yratio = Math.abs(self.$_lo) / 1
    }
    let m = yrange * ($p.config.GRIDY / h)
    let p = parseInt(yrange.toExponential().split('e')[1])
    return Math.pow(yratio, 1 / n)
  }

  function gridX() {
    // If this is a subgrid, no need to calc a timeline,
    // we just borrow it from the masterGrid
    if (!masterGrid) {
      self.tStep = timeStep()
      self.xs = []
      const dt = range[1] - range[0]
      const r = self.spacex / dt

      /* TODO: remove the left-side glitch
        let year_0 = Utils.get_year(sub[0][0])
        for (var t0 = year_0; t0 < range[0]; t0 += self.tStep) {}
        let m0 = Utils.get_month(t0)*/

      for (var i = 0; i < sub.length; i++) {
        let p = sub[i]
        let prev = sub[i - 1] || []
        let prev_xs = self.xs[self.xs.length - 1] || [0, []]
        let x = Math.floor((p[0] - range[0]) * r)

        insertLine(prev, p, x)

        // Filtering lines that are too near
        let xs = self.xs[self.xs.length - 1] || [0, []]

        if (prev_xs === xs) continue

        if (xs[1][0] - prev_xs[1][0] < self.tStep * 0.8) {
          // prev_xs is a higher "rank" label
          if (xs[2] <= prev_xs[2]) {
            self.xs.pop()
          } else {
            // Otherwise
            self.xs.splice(self.xs.length - 2, 1)
          }
        }
      }

      // TODO: fix grid extension for bigger timeframes
      if (interval < WEEK && r > 0) {
        extendLeft(dt, r)
        extend_right(dt, r)
      }
    } else {
      self.tStep = masterGrid.tStep
      self.pxStep = masterGrid.pxStep
      self.startx = masterGrid.startx
      self.xs = masterGrid.xs
    }
  }

  function insertLine(prev, p, x, m0) {
    let prev_t = tiMap.ib ? tiMap.i2t(prev[0]) : prev[0]
    let p_t = tiMap.ib ? tiMap.i2t(p[0]) : p[0]

    if (tiMap.tf < DAY) {
      prev_t += timezone * HOUR
      p_t += timezone * HOUR
    }
    let d = timezone * HOUR

    // TODO: take this block =========> (see below)
    if ((prev[0] || interval === YEAR) && Utils.get_year(p_t) !== Utils.get_year(prev_t)) {
      self.xs.push([x, p, YEAR]) // [px, [...], rank]
    } else if (prev[0] && Utils.get_month(p_t) !== Utils.get_month(prev_t)) {
      self.xs.push([x, p, MONTH])
    }
    // TODO: should be added if this day !== prev day
    // And the same for 'botbar.js', TODO(*)
    else if (Utils.day_start(p_t) === p_t) {
      self.xs.push([x, p, DAY])
    } else if (p[0] % self.tStep === 0) {
      self.xs.push([x, p, interval])
    }
  }

  function extendLeft(dt, r) {
    if (!self.xs.length || !isFinite(r)) return

    let t = self.xs[0][1][0]
    while (true) {
      t -= self.tStep
      let x = Math.floor((t - range[0]) * r)
      if (x < 0) break
      // TODO: ==========> And insert it here somehow
      if (t % interval === 0) {
        self.xs.unshift([x, [t], interval])
      }
    }
  }

  function extend_right(dt, r) {
    if (!self.xs.length || !isFinite(r)) return

    let t = self.xs[self.xs.length - 1][1][0]
    while (true) {
      t += self.tStep
      let x = Math.floor((t - range[0]) * r)
      if (x > self.spacex) break
      if (t % interval === 0) {
        self.xs.push([x, [t], interval])
      }
    }
  }

  function gridY() {
    // Prevent duplicate levels
    let m = Math.pow(10, -self.prec)
    self.$_step = Math.max(m, dollar_step())
    self.ys = []

    let y1 = self.$_lo - (self.$_lo % self.$_step)

    for (var y$ = y1; y$ <= self.$_hi; y$ += self.$_step) {
      let y = Math.floor(y$ * self.A + self.B)
      if (y > height) continue
      self.ys.push([y, Utils.strip(y$)])
    }
  }

  function gridYLog() {
    // TODO: Prevent duplicate levels, is this even
    // a problem here ?
    self.$_mult = dollar_mult()
    self.ys = []

    if (!sub.length) return

    let v = Math.abs(sub[sub.length - 1][1] || 1)
    let y1 = searchStartPos(v)
    let y2 = searchStartNeg(-v)
    let yp = -Infinity // Previous y value
    let n = height / $p.config.GRIDY // target grid N

    let q = 1 + (self.$_mult - 1) / 2

    // Over 0
    for (var y$ = y1; y$ > 0; y$ /= self.$_mult) {
      y$ = log_rounder(y$, q)
      let y = Math.floor(math.log(y$) * self.A + self.B)
      self.ys.push([y, Utils.strip(y$)])
      if (y > height) break
      if (y - yp < $p.config.GRIDY * 0.7) break
      if (self.ys.length > n + 1) break
      yp = y
    }

    // Under 0
    yp = Infinity
    for (var y$ = y2; y$ < 0; y$ /= self.$_mult) {
      y$ = log_rounder(y$, q)
      let y = Math.floor(math.log(y$) * self.A + self.B)
      if (yp - y < $p.config.GRIDY * 0.7) break
      self.ys.push([y, Utils.strip(y$)])
      if (y < 0) break
      if (self.ys.length > n * 3 + 1) break
      yp = y
    }

    // TODO: remove lines near to 0
  }

  // Search a start for the top grid so that
  // the fixed value always included
  function searchStartPos(value) {
    let N = height / $p.config.GRIDY // target grid N
    var y = Infinity,
      y$ = value,
      count = 0
    while (y > 0) {
      y = Math.floor(math.log(y$) * self.A + self.B)
      y$ *= self.$_mult
      if (count++ > N * 3) return 0 // Prevents deadloops
    }
    return y$
  }

  function searchStartNeg(value) {
    let N = height / $p.config.GRIDY // target grid N
    var y = -Infinity,
      y$ = value,
      count = 0
    while (y < height) {
      y = Math.floor(math.log(y$) * self.A + self.B)
      y$ *= self.$_mult
      if (count++ > N * 3) break // Prevents deadloops
    }
    return y$
  }

  // Make log scale levels look great again
  function log_rounder(x, quality) {
    let s = Math.sign(x)
    x = Math.abs(x)
    if (x > 10) {
      for (var div = 10; div < MAX_INT; div *= 10) {
        let nice = Math.floor(x / div) * div
        if (x / nice > quality) {
          // More than 10% off
          break
        }
      }
      div /= 10
      return s * Math.floor(x / div) * div
    } else if (x < 1) {
      for (var ro = 10; ro >= 1; ro--) {
        let nice = Utils.round(x, ro)
        if (x / nice > quality) {
          // More than 10% off
          break
        }
      }
      return s * Utils.round(x, ro + 1)
    } else {
      return s * Math.floor(x)
    }
  }

  function applySizes() {
    self.width = $p.width - self.sb
    self.height = height
  }

  calc_$range()
  calc_sidebar()

  return {
    // First we need to calculate max sidebar width
    // (among all grids). Then we can actually make
    // them
    create: () => {
      calcPositions()
      gridX()
      if (grid.logScale) {
        gridYLog()
      } else {
        gridY()
      }
      applySizes()

      if (masterGrid) {
        self.masterGrid = masterGrid
      }
      self.grid = grid // Grid Params

      // Here we add some helpful functions for plugin creators
      return layoutFn(self, range)
    },
    get layout() {
      return this
    },
  }
}
