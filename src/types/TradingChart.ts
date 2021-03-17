export type CandleData = {
  /** c-coordinate (px) */
  x: number
  /** width (px) */
  w: number
  /** open (px) */
  o: number
  /** high (px) */
  h: number
  /** low (px) */
  l: number
  /** close (px) */
  c: number
  /** Candle data e.g. [1553378400000, ...] */
  raw: any
}

export type TimeRange = {
  /** Left-bound of the range | Index (in IB mode) */
  t1: number
  /** Right-bound of the range | Index (in IB mode) */
  t2: number

  exp: boolean
}

export type TimeRangeCreator = (hi: number, lo: number, exp?: boolean) => TimeRange

export type TimeIndexData = {
  TimeIndexMap: any[]
  IndexTimeMap: any[]
  SubIndex: any[]
  IndexBased: any
  Sub: any
  SubStart: any
  IntervalMs: number
}

/**
 * DataCube [WIP] is a helper class designed for data manipulation.
 * Trading-vue component provides only rendering functionality,
 * but with the help of DC it also enables features such as real-time chart updates,
 * indicator calculations and drawing tools (and much more).
 */
export interface DataCube {
  /** Original chart data. Use it for direct access */
  data: Object

  /** Reference to trading-vue component */
  tv: any

  /** DC Settings object */
  sett: Object

  /** Script Engine state */
  se_state: Object

  /** Web-worker interface */
  ww: Object

  /** 
   * Adds a new overlay to the selected array reactively 
   * @returns Overlay datacube id
   * @example
   * dc.add('onchart', {
      type: 'Spline',
      name: 'EMA 25',
      data: [ ... ],
      settings: {
          lineColor: 'green'
      }
      }) // -> "onchart.Spline0"
   **/
  add(side: 'onchart' | 'offchart', overlay: Object): string

  /**
   * Gets all objects matching the query.
   * @param query query (String)
   * @returns Array of objects
   * @example dc.get('onchart.Spline')  // -> [{id: "onchart.Spline0", name: "EMA", ...}]
   */
  get(query: string): any[]

  /**
   * Gets first object matching the query.
   * @param query query string
   * @example
   * dc.get_one('chart') // -> Chart object
    dc.get_one('chart.data') // -> ohlcv data [ ... ]
    dc.get_one('onchart.Spline')  // -> {id: "onchart.Spline0", name: "EMA", ...}
    dc.get_one('onchart.Spline.data')  // -> [ ... ]
   */
  get_one(query: string): any

  /**
   * Changes values of selected objects.
   * @param query string
   * @param data (Object|Array) New value
   */
  set(query: string, data: Object | Object[]): void

  /**
   * Merges objects pulled by query with new data. Objects can be of type Object or Array.
   * If the type is Array, DC will first consider the data as time series and try to combine them by timestamp.
   * Note: time series must be sorted before merging
   * @param query query string
   * @param data new value
   * @example
   * dc.merge('onchart.Spline.settings', {
        lineWidth: 2,
        color: 'green'
    })
    // Merge as time series
    dc.get('chart.data') // -> [[10001, 1, 1, 1, 1 ], [10002, 1, 1, 1, 1 ]]
    dc.merge('chart.data', [
        [10002, 2, 2, 2, 2 ], [10003, 3, 3, 3, 3 ]
    ])
    dc.get('chart.data') // ->
    // [[10001, 1, 1, 1, 1 ], [10002, 2, 2, 2, 2 ], [10003, 3, 3, 3, 3 ]]
   */
  merge(query: string, data: Object | Object[]): void

  /**
   * Removes all overlays matching query.
   * @param query
   * @example
   * dc.del('.') // Remove everything (except the main chart)
   * dc.del('Spline') // Remove all overlays with id/name 'Spline'
   */
  del(query: string): void

  /**
   * Updates/appends a data point, depending on the timestamp (or current time).
   * @param data Specifies an update, see examples below
   * @returns true if a new candle is formed
   * @example
   * // Update with a trade stream:
      dc.update({
          price: 8800,
          volume: 22,
          'EMA': 8576, // query => value
          'BB': [8955, 8522] // query => [value, value, ...]
      })
      // Update with full candlestick:
      dc.update({
          candle: [1573231698000, 8750, 8900, 8700, 8800, 1688],
          'EMA': 8576, // query => value
          'BB': [8955, 8522] // query => [value, value, ...]
      })
      // Update with ohlcv (auto time):
      dc.update({
          candle: [8750, 8900, 8700, 8800, 1688],
          'EMA': 8576, // query => value
          'BB': [8955, 8522] // query => [value, value, ...]
      })
   */
  update(data: Object): boolean

  /**
   * Excludes specific query from results (for all query-based methods).
   * @param query
   * @example
   * dc.lock('onchart.Spline')
   * dc.get('onchart.Spline')  // -> []
   */
  lock(query: string): void

  /**
   * Enables the query back.
   * @param query
   * @example
   * dc.unlock('onchart.Spline')
   * dc.get('onchart.Spline')  // -> [{id: "onchart.Spline0", name: "EMA", ...}]
   */
  unlock(query: string): void

  /**
   * Show/Hide all overlays by query.
   * @param query
   * @example
   * dc.show('onchart.Spline')
   * dc.hide('.')
   */
  show(query: string): void
  hide(query: string): void
}

export type DataCubSettings = {
  /** Update aggregation interval, default = 100 */
  aggregation: number
  /** 0 === Exec on all data, default = 0 */
  script_depth: number
  /** Auto scroll to a new candle, default = true */
  auto_scroll: boolean
  /** Enable overlays scripts, default = true */
  scripts: boolean
  /** Use node.js instead of WW */
  node_url: string
  /** Shift+click measurment, default = true */
  shift_measure: string
  /** WebWorker RAM limit (MB), default = 0 */
  ww_ram_limit: number
}

export type CursorData = {
  /** Current x position (px) */
  x: number

  /** Current y position (px) */
  y: number

  /** Current timestamp (ms) */
  t: number

  /** Current price level */
  y$: number

  /** Current grid id */
  grid_id: number

  /** true during scrolling, false otherwise */
  locked: boolean

  /** Current indicator values in a specific format
   *  Values format
   *  values: {
   *   "<grid_id>": {
   *       "ohlcv": [ ... ] | undefined,
   *       "<overlay_id>": [ ... ],
   *       ...
   *   },
   *   ...
   *  }
   *
   * Examples:
   * {
   *     0: {
   *         ohlcv: [1553378400000,4051.3,4063.9,4051.3,4063.8,259.61602371],
   *         EMA_0: [1553378400000,4054.9315737970815],
   *         EMA_1: [1553378400000,4057.3817565994727]
   *     },
   *     1: {
   *         ohlcv: undefined,
   *         RSI_0: [1553378400000,53.148999912870806]
   *     }
   * }
   */
  values: Record<number, Record<string, any>>

  /** True when scrolling is locked (drawing mode) */
  scrollLock: boolean
}

export interface GridSettings {
  logScale?: boolean
  height?: number // Grid height (weight)
  id?: number // New grid id (merge with another, offchart only)
}

export interface GridLayout extends Layout {
  // id: string
  // height: number
  // width: number
  logScale?: number | null
}

export interface ComponentBaseProps {
  // Common props
  title_txt: string
  layout: Layout
  sub: any
  range: TimeRange
  interval: number
  cursor: CursorData
  colors: any
  font: any
  y_ts: any
  tv_id: string
  config: any
  buttons: any
  meta: any
  skin: any
  data: DataCore[]
}
export interface LayoutComponentProps extends ComponentBaseProps {
  overlays: any
}
export interface BotBarProps extends ComponentBaseProps {
  width: number
  height: number
  rerender: Function
}

export interface DataCore {
  type: string
  name: string
  data: any
  settings: Record<string, string>
  grid: GridLayout
  tf: number // Forced timeframe, e.g. '1s'...'1Y' | Number
  i0: number
  loading: boolean
  last: any
}

/** Key is grid_id */
export type LayersMeta = Record<string, { y_range: TimeRangeCreator; x_range: TimeRangeCreator }[]>
export interface GridMakerParams {
  sub: any[]
  interval: any
  range: TimeRange
  ctx: any
  $p: any
  layers_meta: LayersMeta
  ti_map: any
  height: number
  y_t: any
  grid: GridLayout // Parent grid
  timezone: any

  // grids: any
  // offsub: any[]
  // y_transforms: any

  // $props: any
  // chart: any
}

export interface LayoutParams {
  chart: any
  sub: any[]
  offsub: any[]
  interval: any
  range: TimeRange
  ctx: any
  layers_meta: LayersMeta
  ti_map: any
  $props: any
  y_transforms: any
}

export interface GridMaker {
  create(): GridLayout
  readonly layout: Layout
  sidebar: any
  // readonly sideBar: any
}

export interface MainLayout {
  grids: Layout[]
}

export interface Layout {
  type: string

  /** Upper bound of price-range */
  $_hi: number
  /** Upper bound of price-range */
  $_lo: number
  /** Grid price step */
  $_step: number
  /** Grid price multipler (log-scale mode) */
  $_mult: number

  /** Grid time step */
  t_step: number

  /** Scale transform coefficient */
  A: number

  /** Scale transform coefficient */
  B: number

  /** Grid ID */
  id: number

  /** Sidebar precision (decimals after point) */
  prec: number

  /** Grid height (px) */
  height: number

  /** Grid width (without sidebar, px) */
  width: number

  /** Grid offset from the top (px) */
  offset: number

  /** Candlestick step (px) */
  px_step: number

  /** Sidebar width */
  sb: number

  /** Drawing area width (px) */
  spacex: number

  /** First candle position (px) */
  startx: number

  /** Time-index mapping for IB mode */
  ti_map: TimeIndexData

  /** Candles subset */
  candles: CandleData[]

  /** Volume bars positions and sizes */
  volume: any[]

  /** vertical grid lines [[x, candle], ...] */
  xs: [number, any][]

  /** horizontal grid lines [[y, price], ...] */
  ys: [number, any][]

  // grids: GridLayout[]
  grid: GridLayout
  botbar: {
    width: number
    height: number
    offset: number
    xs: any[]
  }

  master_grid: GridLayout

  range: TimeRange

  /**
   * Returns y-coordinate for given price
   * @param price price number
   * @returns pixels (number)
   */
  // $2screen(price: number): number

  /**
   * Returns x-coordinate for given timestamp
   * @param t time (number)
   * @returns pixels (number)
   */
  // t2screen(t: number): number

  /**
   * Returns price for given y-coordinate
   * @param y y (number)
   * @returns price (number)
   */
  // screen2$(y: number): number

  /**
   * Returns time for given x-coordinate
   * @param x x (number)
   * @returns time (number)
   */
  // screen2t(x: number): number

  /**
   * Returns x-coordinate of nearest candle for given time
   * @param t time (number)
   * @returns pixels (number)
   */
  // t_magnet(t: number): number

  /**
   * Returns nearest candle for given time
   * @param t time (Number)
   * @returns Candle Object
   */
  // c_magnet(t: number): CandleData
}

export type OverlayData = {
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
  data: DataCore[]

  /** Indicator's settings, defined in data.json */
  settings: Record<string, string>

  /** Current grid id */
  grid_id: number

  /** Chart config, see 'constants.js' */
  config: Object

  /** Contains the last price and other info */
  meta: Object

  /** The first global index of the current subset */
  i0: number
}

export interface ToolData {
  type: string
  group?: string
  hint?: string
  settings: Record<string, string>
  data: any[]
}
