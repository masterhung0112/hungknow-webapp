// Calculates all necessary items to build the chart
// Heights, widths, transforms, ... = everything
// Why such a mess you ask? Well, that's because
// one components size can depend on other component
// data formatting (e.g. grid width depends on sidebar precision)

import {Layout, GridMakerParams, LayoutParams, GridLayout, GridMaker} from 'types/TradingChart';

import {createGridMaker} from './GridMaker';
import {t2screen} from './layoutFn';
import log_scale from './logScale';

// Generate all the necessary grids from the layout params
export class generateLayout {
    grids: Layout[]
    botbar: any

    constructor(params: LayoutParams) {
        let {chart, sub, offsub, interval, range, ctx, layers_meta, ti_map, $props: $p, y_transforms: y_ts} = params;

        const mgrid = chart.grid || {};

        offsub = offsub.filter((x) => {
            // Skip offchart overlays with custom grid id,
            // because they will be mergred with the existing grids
            return !(x.grid && x.grid.id);
        });

        // Splits space between main chart
        // and offchart indicator grids
        function grid_hs() {
            const height = $p.height - $p.config.BOTBAR;

            // When at least one height defined (default = 1),
            // Pxs calculated as: (sum of weights) / number
            if (mgrid.height || offsub.find((x) => x.grid.height)) {
                return weighted_hs(mgrid, height);
            }

            const n = offsub.length;
            const off_h = (2 * Math.sqrt(n)) / 7 / (n || 1);

            // Offchart grid height
            const px = Math.floor(height * off_h);

            // Main grid height
            const m = height - px * n;
            return [m].concat(Array(n).fill(px));
        }

        function weighted_hs(grid: GridLayout, height: number) {
            let hs = [{grid}, ...offsub].map((x) => x.grid.height || 1);
            let sum = hs.reduce((a, b) => a + b, 0);
            hs = hs.map((x) => Math.floor((x / sum) * height));

            // Refine the height if Math.floor decreased px sum
            sum = hs.reduce((a, b) => a + b, 0);
            for (let i = 0; i < height - sum; i++) {
                hs[i % hs.length]++;
            }
            return hs;
        }

        function candles_n_vol() {
            self.candles = [];
            self.volume = [];

            const maxv = Math.max(...sub.map((x) => x[5]));
            const vs = ($p.config.VOLSCALE * $p.height) / maxv;
            let x1;
            let x2;
            let mid;
            let prev;

            const splitter = self.px_step > 5 ? 1 : 0;
            const hf_px_step = self.px_step * 0.5;

            for (let i = 0; i < sub.length; i++) {
                const p = sub[i];
                mid = t2screen(self, p[0], range) + 0.5;
                self.candles.push(
                    mgrid.logScale ?
                        log_scale.candle(self, mid, p, $p) :
                        {
                            x: mid,
                            w: self.px_step * $p.config.CANDLEW,
                            o: Math.floor(p[1] * self.A + self.B),
                            h: Math.floor(p[2] * self.A + self.B),
                            l: Math.floor(p[3] * self.A + self.B),
                            c: Math.floor(p[4] * self.A + self.B),
                            raw: p,
                        },
                );

                // Clear volume bar if there is a time gap
                if (sub[i - 1] && p[0] - sub[i - 1][0] > interval) {
                    prev = null;
                }
                x1 = prev || Math.floor(mid - hf_px_step);
                x2 = Math.floor(mid + hf_px_step) - 0.5;
                self.volume.push({
                    x1,
                    x2,
                    h: p[5] * vs,
                    green: p[4] >= p[1],
                    raw: p,
                });
                prev = x2 + splitter;
            }
        }

        // Main grid
        const hs = grid_hs();
        const specs: GridMakerParams = {
            sub,
            interval,
            range,
            ctx,
            $p,
            layers_meta,
            ti_map,
            height: hs[0],
            y_t: y_ts[0],
            grid: mgrid,
            timezone: $p.timezone,
        };
        const gms: GridMaker[] = [createGridMaker(0, specs)];

        // Sub grids
        for (var [i, {data, grid}] of offsub.entries()) {
            specs.sub = data;
            specs.height = hs[i + 1];
            specs.y_t = y_ts[i + 1];
            specs.grid = grid || {};
            gms.push(createGridMaker(i + 1, specs, gms[0].layout));
        }

        // Max sidebar among all grinds
        const sb = Math.max(...gms.map((x) => x.sidebar));

        const grids = [];
        let offset = 0;

        for (i = 0; i < gms.length; i++) {
            gms[i].sidebar = sb;
            grids.push(gms[i].create());
            grids[i].id = i;
            grids[i].offset = offset;
            offset += grids[i].height;
        }

        const self = grids[0];

        candles_n_vol();

        return {
            grids,
            botbar: {
                width: $p.width,
                height: $p.config.BOTBAR,
                offset,
                xs: grids[0] ? grids[0].xs : [],
            },
        };
    }
}
