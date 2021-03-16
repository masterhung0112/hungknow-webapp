export type Overlay {
    /** Overlay unique id (within current grid) ,e.g 'EMA_1' */
    id: string
    /** Overlay unique num (within current grid) */
    num: number
    /** Candlestick interval, ms (e.g. 1 min = 60000 ) */
    interval: number

    /** Crosshair position and selected values, see below */
    cursor: Object

    /** All colors from TradingVue.vue combined */
    colors: Object

    /** Layout API object */
    layout: Object

    /** Current subset of candlestick data */
    sub: any[]

    /** Current subset of indicator data */
    data: any[]

    /** Indicator's settings, defined in data.json */
    settings: Object

    /** Current grid id */
    gridId: number

    /** Chart config, see 'constants.js' */
    config: Object

    /** Contains the last price and other info */
    meta: Object

    /** The first global index of the current subset */
    i0: number
}