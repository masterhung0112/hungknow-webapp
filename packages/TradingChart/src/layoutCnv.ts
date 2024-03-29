import {CandleData, Layout} from 'types/TradingChart';

import {t2screen} from './layoutFn';
import {VolumeOverlayProps} from './Overlay';
import {CandlesOverlayProps} from './overlays/Candles.overlay';
import Utils from './utils';

export function layout_cnv(
    self: CandlesOverlayProps,
): {
        candles: CandleData[];
        volumes: any[];
    } {
    const $p = self;
    const sub = $p.data;

    // let t2screen = $p.layout.t2screen
    const layout = $p.layout;

    const candles = [];
    const volumes: any[] = [];

    // The volumes bar height is determined as a percentage of
    // the chart's height (VOLSCALE)
    const maxv = Math.max(...sub.map((x: any) => x[5]));
    const vs = ($p.config.VOLSCALE * layout.height) / maxv;
    let x1;
    let x2;
    let w;
    let avg_w;
    let mid;
    let prev;

    // Subset interval against main interval
    const [interval2, ratio] = new_interval(layout, $p, sub);
    const px_step2 = layout.px_step * ratio;

    const splitter = px_step2 > 5 ? 1 : 0;

    // A & B are current chart tranformations:
    // A === scale,  B === Y-axis shift
    for (let i = 0; i < sub.length; i++) {
        const p = sub[i];
        mid = t2screen(self.layout, p[0], self.layout.range) + 1;

        // Clear volumes bar if there is a time gap
        if (sub[i - 1] && p[0] - sub[i - 1][0] > interval2) {
            prev = null;
        }

        x1 = prev || Math.floor(mid - px_step2 * 0.5);
        x2 = Math.floor(mid + px_step2 * 0.5) - 0.5;

        // TODO: add log scale support
        candles.push({
            x: mid,
            w: layout.px_step * $p.config.CANDLEW * ratio,
            o: Math.floor(p[1] * layout.A + layout.B),
            h: Math.floor(p[2] * layout.A + layout.B),
            l: Math.floor(p[3] * layout.A + layout.B),
            c: Math.floor(p[4] * layout.A + layout.B),
            raw: p,
        });

        volumes.push({
            x1,
            x2,
            h: p[5] * vs,
            green: p[4] >= p[1],
            raw: p,
        });
        prev = x2 + splitter;
    }

    return {candles, volumes};
}

export function layout_vol(self: VolumeOverlayProps) {
    const $p = self;
    const sub = $p.data;

    // let t2screen = $p.layout.t2screen
    const layout = $p.layout;

    const volumes = [];

    // Detect data second dimention size:
    const dim = sub[0] ? sub[0].length : 0;

    // Support special volumes data (see API book), or OHLCV
    // Data indices:
    self._i1 = dim < 6 ? 1 : 5;
    self._i2 = dim < 6 ? (p: any[]) => p[2] : (p: any[]) => p[4] >= p[1];

    const maxv = Math.max(...sub.map((x: any) => x[self._i1]));
    const volscale = self.volscale || $p.config.VOLSCALE;
    const vs = (volscale * layout.height) / maxv;
    let x1;
    let x2;
    let mid;
    let prev;

    // Subset interval against main interval
    const [interval2, ratio] = new_interval(layout, $p, sub);
    const px_step2 = layout.px_step * ratio;

    const splitter = px_step2 > 5 ? 1 : 0;

    // A & B are current chart tranformations:
    // A === scale,  B === Y-axis shift
    for (let i = 0; i < sub.length; i++) {
        const p = sub[i];
        mid = t2screen(layout, p[0], layout.range) + 1;

        // Clear volumes bar if there is a time gap
        if (sub[i - 1] && p[0] - sub[i - 1][0] > interval2) {
            prev = null;
        }
        x1 = prev || Math.floor(mid - px_step2 * 0.5);
        x2 = Math.floor(mid + px_step2 * 0.5) - 0.5;

        volumes.push({
            x1,
            x2,
            h: p[self._i1] * vs,
            green: self._i2(p),
            raw: p,
        });
        prev = x2 + splitter;
    }
    return volumes;
}

function new_interval(layout: Layout, $p: any, sub: any) {
    // Subset interval against main interval
    let interval2 = 0;
    let ratio = 0;
    if (!layout.ti_map.IndexBased) {
        interval2 = $p.tf || Utils.detect_interval(sub);
        ratio = interval2 / $p.interval;
    } else if ($p.tf) {
        ratio = $p.tf / layout.ti_map.IntervalMs;
        interval2 = ratio;
    } else {
        interval2 = Utils.detect_interval(sub);
        ratio = interval2 / $p.interval;
    }
    return [interval2, ratio];
}
