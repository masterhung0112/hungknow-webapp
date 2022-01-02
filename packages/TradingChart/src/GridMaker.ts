import { GridMaker, Layout, GridMakerParams, TimeRangeCreator, GridLayout, TimeRange } from './types';

import { TIMESCALES, $SCALES, WEEK, MONTH, YEAR, HOUR, DAY } from './constants';
import Utils from './utils';
import log_scale from './logScale';
import * as math from './math';

// import layout_fn from './layoutFn'

const MAX_INT = Number.MAX_SAFE_INTEGER;

// masterGrid - ref to the master grid
export function createGridMaker(
    id: number,
    GridMakerParams: GridMakerParams,
    master_grid: Layout | null = null,
): GridMaker {
    const { sub, interval, range, ctx, $p, layers_meta, height, y_t, ti_map, grid, timezone } = GridMakerParams;

    const gridLayout: GridLayout = { ti_map } as GridLayout;
    const lm = layers_meta[id];
    let y_range_fn: TimeRangeCreator = null;
    const ls = grid.logScale;

    if (lm && Object.keys(lm).length) {
        // Gets last y_range fn()
        const yrs = Object.values(lm).filter((x) => x.y_range);

        // The first y_range() determines the range
        if (yrs.length) {
            y_range_fn = yrs[0].y_range;
        }
    }

    // Calc vertical ($/₿) range
    function calc_$range() {
        let timeRange: TimeRange = {
            t1: -Infinity,
            t2: Infinity,
            exp: undefined,
        };
        if (!master_grid) {
            // $ candlestick range
            if (y_range_fn) {
                timeRange = y_range_fn(timeRange.t1, timeRange.t2);
            } else {
                for (var i = 0, n = sub.length; i < n; i++) {
                    const x = sub[i];
                    // max high value of candle
                    if (x[2] > timeRange.t1) {
                        timeRange.t1 = x[2];
                    }
                    // max low value of candle
                    if (x[3] < timeRange.t2) {
                        timeRange.t2 = x[3];
                    }
                }
            }
        } else {
            // Offchart indicator range
            for (var i = 0; i < sub.length; i++) {
                for (let j = 1; j < sub[i].length; j++) {
                    const v = sub[i][j];
                    if (v > timeRange.t1) {
                        timeRange.t1 = v;
                    }
                    if (v < timeRange.t2) {
                        timeRange.t2 = v;
                    }
                }
            }
            if (y_range_fn) {
                timeRange = y_range_fn(timeRange.t1, timeRange.t2);
            }
        }

        // Fixed y-range in non-auto mode
        if (y_t && !y_t.auto && y_t.range) {
            gridLayout.$_hi = y_t.range.t1;
            gridLayout.$_lo = y_t.range.t2;
        } else {
            if (ls) {
                gridLayout.$_hi = timeRange.t1
                gridLayout.$_lo = timeRange.t2
                log_scale.expand(gridLayout, height)
            } else {
                // console.log('hi', timeRange.t1 - timeRange.t2)
                const expVal = timeRange.exp === false ? 0 : 1
                gridLayout.$_hi = timeRange.t1 + (timeRange.t1 - timeRange.t2) * $p.config.EXPAND * expVal
                gridLayout.$_lo = timeRange.t2 - (timeRange.t1 - timeRange.t2) * $p.config.EXPAND * expVal
            }

            if (gridLayout.$_hi === gridLayout.$_lo) {
                if (ls) {
                    log_scale.expand(gridLayout, height);
                } else {
                    gridLayout.$_hi *= 1.05; // Expand if height range === 0
                    gridLayout.$_lo *= 0.95;
                }
            }
        }
    }

    function calc_sidebar() {
        if (sub.length < 2) {
            gridLayout.prec = 0;
            gridLayout.sb = $p.config.SBMIN;
            return;
        }

        // TODO: improve sidebar width calculation
        // at transition point, when one precision is
        // replaced with another

        // Gets formated levels (their lengths),
        // calculates max and measures the sidebar length
        // from it:

        // TODO: add custom formatter f()

        gridLayout.prec = calc_precision(sub);
        const lens = [];
        lens.push(gridLayout.$_hi.toFixed(gridLayout.prec).length);
        lens.push(gridLayout.$_lo.toFixed(gridLayout.prec).length);
        const str = '0'.repeat(Math.max(...lens)) + '    ';
        gridLayout.sb = ctx.measureText(str).width;
        gridLayout.sb = Math.max(Math.floor(gridLayout.sb), $p.config.SBMIN);
        gridLayout.sb = Math.min(gridLayout.sb, $p.config.SBMAX);
    }

    // Calculate $ precision for the Y-axis
    function calc_precision(data: any[]) {
        let max_r = 0;
        let max_l = 0;

        let min = Infinity;
        let max = -Infinity;

        // Speed UP
        for (let i = 0, n = data.length; i < n; i++) {
            const x = data[i];
            if (x[1] > max) {
                max = x[1];
            } else if (x[1] < min) {
                min = x[1];
            }
        }

        // Get max lengths of integer and fractional parts
        [min, max].forEach((x) => {
            // Fix undefined bug
            const str = x != null ? x.toString() : '';
            if (x < 0.000001) {
                // Parsing the exponential form. Gosh this
                // smells trickily
                const [ls, rs] = str.split('e-');
                var [l, r] = ls.split('.');
                if (!r) {
                    r = '';
                }
                r = { length: r.length + parseInt(rs) || 0 } as string;
            } else {
                var [l, r] = str.split('.');
            }
            if (r && r.length > max_r) {
                max_r = r.length;
            }
            if (l && l.length > max_l) {
                max_l = l.length;
            }
        });

        // Select precision scheme depending
        // on the left and right part lengths
        //
        const even = max_r - (max_r % 2) + 2;

        if (max_l === 1) {
            return Math.min(8, Math.max(2, even));
        }
        if (max_l <= 2) {
            return Math.min(4, Math.max(2, even));
        }

        return 2;
    }

    function calc_positions() {
        if (sub.length < 2) {
            return;
        }

        const dt = range.t2 - range.t1;

        // A pixel space available to draw on (x-axis)
        gridLayout.spacex = $p.width - gridLayout.sb;

        // Candle capacity
        const capacity = dt / interval;

        // Calculate candlestick step
        gridLayout.px_step = gridLayout.spacex / capacity;

        // px / time ratio
        const r = gridLayout.spacex / dt;

        // First candle position (px)
        gridLayout.startx = (sub[0][0] - range.t1) * r;

        // Candle Y-transform: (A = scale, B = shift)
        if (!grid.logScale) {
            gridLayout.A = -height / (gridLayout.$_hi - gridLayout.$_lo);
            gridLayout.B = -gridLayout.$_hi * gridLayout.A;
        } else {
            gridLayout.A = -height / (math.log(gridLayout.$_hi) - math.log(gridLayout.$_lo));
            gridLayout.B = -math.log(gridLayout.$_hi) * gridLayout.A;
        }

        // gridLayout.A = -6.498271312812643
        // gridLayout.B = 337.61538461538464
        // console.log('gridLayout.A', height, gridLayout.$_hi, gridLayout.$_lo, gridLayout.A, gridLayout.B)
    }

    // Select nearest good-loking t step (m is target scale)
    function time_step() {
        const k = ti_map.ib ? 60000 : 1;
        const xrange = (range.t2 - range.t1) * k;
        const m = xrange * ($p.config.GRIDX / $p.width);
        const s = TIMESCALES;
        return Utils.nearest_a(m, s)[1] / k;
    }

    // Select nearest good-loking $ step (m is target scale)
    function dollar_step() {
        const yrange = gridLayout.$_hi - gridLayout.$_lo;
        const m = yrange * ($p.config.GRIDY / height);
        const p = parseInt(yrange.toExponential().split('e')[1]);
        const d = Math.pow(10, p);
        const s = $SCALES.map((x) => x * d);

        // TODO: center the range (look at RSI for example,
        // it looks ugly when "80" is near the top)
        return Utils.strip(String(Utils.nearest_a(m, s)[1]));
    }

    function dollar_mult() {
        const mult_hi = dollar_mult_hi();
        const mult_lo = dollar_mult_lo();
        return Math.max(mult_hi, mult_lo);
    }

    // Price step multiplier (for the log-scale mode)
    function dollar_mult_hi() {
        const h = Math.min(gridLayout.B, height);
        if (h < $p.config.GRIDY) {
            return 1;
        }
        const n = h / $p.config.GRIDY; // target grid N
        const yrange = gridLayout.$_hi;
        if (gridLayout.$_lo > 0) {
            var yratio = gridLayout.$_hi / gridLayout.$_lo;
        } else {
            yratio = gridLayout.$_hi / 1; // TODO: small values
        }
        const m = yrange * ($p.config.GRIDY / h);
        const p = parseInt(yrange.toExponential().split('e')[1]);
        return Math.pow(yratio, 1 / n);
    }

    function dollar_mult_lo() {
        const h = Math.min(height - gridLayout.B, height);
        if (h < $p.config.GRIDY) {
            return 1;
        }
        const n = h / $p.config.GRIDY; // target grid N
        const yrange = Math.abs(gridLayout.$_lo);
        if (gridLayout.$_hi < 0 && gridLayout.$_lo < 0) {
            var yratio = Math.abs(gridLayout.$_lo / gridLayout.$_hi);
        } else {
            yratio = Math.abs(gridLayout.$_lo) / 1;
        }
        const m = yrange * ($p.config.GRIDY / h);
        const p = parseInt(yrange.toExponential().split('e')[1]);
        return Math.pow(yratio, 1 / n);
    }

    function grid_x() {
        // If this is a subgrid, no need to calc a timeline,
        // we just borrow it from the master_grid
        if (!master_grid) {
            gridLayout.t_step = time_step();
            gridLayout.xs = [];
            const dt = range.t2 - range.t1;
            const r = gridLayout.spacex / dt;

            /* TODO: remove the left-side glitch
        let year_0 = Utils.get_year(sub[0][0])
        for (var t0 = year_0; t0 < range.t1; t0 += gridLayout.t_step) {}
        let m0 = Utils.get_month(t0)*/
            for (let i = 0; i < sub.length; i++) {
                const p = sub[i];
                const prev = sub[i - 1] || [];
                const prev_xs = gridLayout.xs[gridLayout.xs.length - 1] || [0, []];
                const x = Math.floor((p[0] - range.t1) * r);

                // console.log('x', p[0] - range.t1, r, (p[0] - range.t1) * r)

                insert_line(prev, p, x);

                // Filtering lines that are too near
                const xs = gridLayout.xs[gridLayout.xs.length - 1] || [0, []];

                if (prev_xs === xs) {
                    continue;
                }

                if (xs[1][0] - prev_xs[1][0] < gridLayout.t_step * 0.8) {
                    // prev_xs is a higher "rank" label
                    if (xs[2] <= prev_xs[2]) {
                        gridLayout.xs.pop();
                    } else {
                        // Otherwise
                        gridLayout.xs.splice(gridLayout.xs.length - 2, 1);
                    }
                }
            }

            // TODO: fix grid extension for bigger timeframes
            if (interval < WEEK && r > 0) {
                extend_left(dt, r);
                extend_right(dt, r);
            }
        } else {
            gridLayout.t_step = master_grid.t_step;
            gridLayout.px_step = master_grid.px_step;
            gridLayout.startx = master_grid.startx;
            gridLayout.xs = master_grid.xs;
        }
    }

    function insert_line(prev: any[], p: any[], x: number) {
        let prev_t = ti_map.ib ? ti_map.i2t(prev[0]) : prev[0];
        let p_t = ti_map.ib ? ti_map.i2t(p[0]) : p[0];

        if (ti_map.tf < DAY) {
            prev_t += timezone * HOUR;
            p_t += timezone * HOUR;
        }
        const d = timezone * HOUR;

        // TODO: take this block =========> (see below)
        if ((prev[0] || interval === YEAR) && Utils.get_year(p_t) !== Utils.get_year(prev_t)) {
            gridLayout.xs.push([x, p, YEAR]); // [px, [...], rank]
        } else if (prev[0] && Utils.get_month(p_t) !== Utils.get_month(prev_t)) {
            gridLayout.xs.push([x, p, MONTH]);
        }

        // TODO: should be added if this day !== prev day
        // And the same for 'botbar.js', TODO(*)
        else if (Utils.day_start(p_t) === p_t) {
            gridLayout.xs.push([x, p, DAY]);
        } else if (p[0] % gridLayout.t_step === 0) {
            gridLayout.xs.push([x, p, interval]);
        }
    }

    function extend_left(dt: any, r: any) {
        if (!gridLayout.xs.length || !isFinite(r)) {
            return;
        }

        let t = gridLayout.xs[0][1][0];
        while (true) {
            t -= gridLayout.t_step;
            const x = Math.floor((t - range.t1) * r);
            if (x < 0) {
                break;
            }

            // TODO: ==========> And insert it here somehow
            if (t % interval === 0) {
                gridLayout.xs.unshift([x, [t], interval]);
            }
        }
    }

    function extend_right(dt: any, r: any) {
        if (!gridLayout.xs.length || !isFinite(r)) {
            return;
        }

        let t = gridLayout.xs[gridLayout.xs.length - 1][1][0];
        while (true) {
            t += gridLayout.t_step;
            const x = Math.floor((t - range.t1) * r);
            if (x > gridLayout.spacex) {
                break;
            }
            if (t % interval === 0) {
                gridLayout.xs.push([x, [t], interval]);
            }
        }
    }

    function grid_y() {
        // Prevent duplicate levels
        const m = Math.pow(10, -gridLayout.prec);
        gridLayout.$_step = Math.max(m, dollar_step());
        gridLayout.ys = [];

        const y1 = gridLayout.$_lo - (gridLayout.$_lo % gridLayout.$_step);

        for (let y$ = y1; y$ <= gridLayout.$_hi; y$ += gridLayout.$_step) {
            const y = Math.floor(y$ * gridLayout.A + gridLayout.B);
            if (y > height) {
                continue;
            }
            gridLayout.ys.push([y, Utils.strip(y$)]);
        }
    }

    function grid_y_log() {
        // TODO: Prevent duplicate levels, is this even
        // a problem here ?
        gridLayout.$_mult = dollar_mult();
        gridLayout.ys = [];

        if (!sub.length) {
            return;
        }

        const v = Math.abs(sub[sub.length - 1][1] || 1);
        const y1 = search_start_pos(v);
        const y2 = search_start_neg(-v);
        let yp = -Infinity; // Previous y value
        const n = height / $p.config.GRIDY; // target grid N

        const q = 1 + (gridLayout.$_mult - 1) / 2;

        // Over 0
        for (var y$ = y1; y$ > 0; y$ /= gridLayout.$_mult) {
            y$ = log_rounder(y$, q);
            const y = Math.floor(math.log(y$) * gridLayout.A + gridLayout.B);
            gridLayout.ys.push([y, Utils.strip(y$)]);
            if (y > height) {
                break;
            }
            if (y - yp < $p.config.GRIDY * 0.7) {
                break;
            }
            if (gridLayout.ys.length > n + 1) {
                break;
            }
            yp = y;
        }

        // Under 0
        yp = Infinity;
        for (var y$ = y2; y$ < 0; y$ /= gridLayout.$_mult) {
            y$ = log_rounder(y$, q);
            const y = Math.floor(math.log(y$) * gridLayout.A + gridLayout.B);
            if (yp - y < $p.config.GRIDY * 0.7) {
                break;
            }
            gridLayout.ys.push([y, Utils.strip(y$)]);
            if (y < 0) {
                break;
            }
            if (gridLayout.ys.length > n * 3 + 1) {
                break;
            }
            yp = y;
        }

        // TODO: remove lines near to 0
    }

    // Search a start for the top grid so that
    // the fixed value always included
    function search_start_pos(value: number) {
        const N = height / $p.config.GRIDY; // target grid N
        let y = Infinity;
        let y$ = value;
        let count = 0;
        while (y > 0) {
            y = Math.floor(math.log(y$) * gridLayout.A + gridLayout.B);
            y$ *= gridLayout.$_mult;
            if (count++ > N * 3) {
                return 0;
            } // Prevents deadloops
        }
        return y$;
    }

    function search_start_neg(value: number) {
        const N = height / $p.config.GRIDY; // target grid N
        let y = -Infinity;
        let y$ = value;
        let count = 0;
        while (y < height) {
            y = Math.floor(math.log(y$) * gridLayout.A + gridLayout.B);
            y$ *= gridLayout.$_mult;
            if (count++ > N * 3) {
                break;
            } // Prevents deadloops
        }
        return y$;
    }

    // Make log scale levels look great again
    function log_rounder(x: number, quality: number) {
        const s = Math.sign(x);
        x = Math.abs(x);
        if (x > 10) {
            for (var div = 10; div < MAX_INT; div *= 10) {
                const nice = Math.floor(x / div) * div;
                if (x / nice > quality) {
                    // More than 10% off
                    break;
                }
            }
            div /= 10;
            return s * Math.floor(x / div) * div;
        } else if (x < 1) {
            for (var ro = 10; ro >= 1; ro--) {
                const nice = Utils.round(x, ro);
                if (x / nice > quality) {
                    // More than 10% off
                    break;
                }
            }
            return s * Utils.round(x, ro + 1);
        }
        return s * Math.floor(x);
    }

    function apply_sizes() {
        gridLayout.width = $p.width - gridLayout.sb;
        gridLayout.height = height;
    }

    calc_$range();
    calc_sidebar();

    return {

        // First we need to calculate max sidebar width
        // (among all grids). Then we can actually make
        // them
        create: () => {
            calc_positions();
            grid_x();
            if (grid.logScale) {
                grid_y_log();
            } else {
                grid_y();
            }
            apply_sizes();

            // console.log('size', gridLayout.width, gridLayout.height)

            // Link to the master grid (candlesticks)
            if (master_grid) {
                gridLayout.master_grid = master_grid;
            }

            gridLayout.grid = grid; // Grid params
            gridLayout.type = 'grid';
            gridLayout.range = range;

            // Here we add some helpful functions for plugin creators
            // return layout_fn(gridLayout, range)
            return gridLayout;
        },
        get layout() {
            return gridLayout as GridLayout;
        },
        get sidebar(): any {
            return gridLayout.sb;
        },
        set sidebar(value: any) {
            gridLayout.sb = value;
        },
    };
}
