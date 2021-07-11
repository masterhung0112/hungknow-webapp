import {Layout} from 'types/TradingChart';

import * as math from './math';

export default {
    candle(self: Layout, mid: number, p: number[], $p: any) {
        return {
            x: mid,
            w: self.px_step * $p.config.CANDLEW,
            o: Math.floor(math.log(p[1]) * self.A + self.B),
            h: Math.floor(math.log(p[2]) * self.A + self.B),
            l: Math.floor(math.log(p[3]) * self.A + self.B),
            c: Math.floor(math.log(p[4]) * self.A + self.B),
            raw: p,
        };
    },

    expand(self: Layout, height: number) {
    // expand log scale
        const A = -height / (math.log(self.$_hi) - math.log(self.$_lo));
        const B = -math.log(self.$_hi) * A;

        const top = -height * 0.1;
        const bot = height * 1.1;

        self.$_hi = math.exp((top - B) / A);
        self.$_lo = math.exp((bot - B) / A);
    },
};
