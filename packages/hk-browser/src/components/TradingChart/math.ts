// Distance from point to line
// p1 = point, (p2, p3) = line
export function cpoint2line(p1: number[], p2: number[], p3: number[]) {
    const {area, base} = tri(p1, p2, p3);
    return Math.abs(triH(area, base));
}

// Distance from point to segment
// p1 = point, (p2, p3) = segment
export function point2seg(p1: number[], p2: number[], p3: number[]) {
    const {area, base} = tri(p1, p2, p3);

    // Vector projection
    const proj = dotProd(p1, p2, p3) / base;

    // Distance from left pin
    const l1 = Math.max(-proj, 0);

    // Distance from right pin
    const l2 = Math.max(proj - base, 0);

    // Normal
    const h = Math.abs(triH(area, base));
    return Math.max(h, l1, l2);
}

// Distance from point to ray
// p1 = point, (p2, p3) = ray
export function point2ray(p1: number[], p2: number[], p3: number[]) {
    const {area, base} = tri(p1, p2, p3);

    // Vector projection
    const proj = dotProd(p1, p2, p3) / base;

    // Distance from left pin
    const l1 = Math.max(-proj, 0);

    // Normal
    const h = Math.abs(triH(area, base));
    return Math.max(h, l1);
}

/* Area of triangle:
            p1
          /    \
        p2  _  p3
    */
export function area(p1: number[], p2: number[], p3: number[]) {
    return p1[0] * (p2[1] - p3[1]) + p2[0] * (p3[1] - p1[1]) + p3[0] * (p1[1] - p2[1]);
}

export function tri(p1: number[], p2: number[], p3: number[]) {
    const areaValue = area(p1, p2, p3);
    const dx = p3[0] - p2[0];
    const dy = p3[1] - p2[1];
    const base = Math.sqrt(dx * dx + dy * dy);
    return {area: areaValue, base};
}

// Triangle height
export function triH(area: number, base: number) {
    return area / base;
}

// Dot product of (p2, p3) and (p2, p1)
export function dotProd(p1: number[], p2: number[], p3: number[]) {
    const v1 = [p3[0] - p2[0], p3[1] - p2[1]];
    const v2 = [p1[0] - p2[0], p1[1] - p2[1]];
    return v1[0] * v2[0] + v1[1] * v2[1];
}

// Symmetrical log
export function log(x: number) {
    // TODO: log for small values
    return Math.sign(x) * Math.log(Math.abs(x) + 1);
}

// Symmetrical exp
export function exp(x: number) {
    return Math.sign(x) * (Math.exp(Math.abs(x)) - 1);
}

// Middle line on log scale based on range & px height
export function log_mid(r: number[], h: number) {
    const log_hi = log(r[0]);
    const log_lo = log(r[1]);
    const px = h / 2;
    const gx = log_hi - (px * (log_hi - log_lo)) / h;
    return exp(gx);
}

// Return new adjusted range, based on the previous
// range, new $_hi, target middle line
export function re_range(r1: number[], hi2: number, mid: number) {
    const log_hi1 = log(r1[0]);
    const log_lo1 = log(r1[1]);
    const log_hi2 = log(hi2);
    const log_$ = log(mid);

    const W = ((log_hi2 - log_$) * (log_hi1 - log_lo1)) / (log_hi1 - log_$);

    return exp(log_hi2 - W);
}

// Return new adjusted range, based on the previous
// range, new $_hi, target middle line + dy (shift)
// WASTE
/*range_shift(r1, hi2, mid, dy, h) {
        let log_hi1 = log(r1[0])
        let log_lo1 = log(r1[1])
        let log_hi2 = log(hi2)
        let log_$ = log(mid)
        let W = h * (log_hi2 - log_$) /
                (h * (log_hi1 - log_$) / (log_hi1 - log_lo1) + dy)
        return exp(log_hi2 - W)
    }*/
