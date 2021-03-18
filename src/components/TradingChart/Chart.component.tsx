import React from 'react'
import { CursorData, LayersMeta, LayoutComponentProps, OverlayData, TimeRange } from 'types/TradingChart'
import { IB_TF_WARN, SECOND } from './constants'
import { generateLayout } from './Layout'
import TI from './TiMapping'
import { DataTrackHookProps, withDataTrackHOC } from './useDataTrack'
import { ShaderHookProps, withShaderHOC } from './useShader'
import Utils from './utils'

export type ChartProps = {
  title_txt: string
  data: any
  width: number
  height: number
  font: any
  colors: any
  overlays: OverlayData[]
  tv_id: any
  config: any
  buttons: any
  toolbar: any
  ib: any
  skin: any
  timezone: any
} & ShaderHookProps &
  DataTrackHookProps

export type ChartState = {
  /** Current data slice */
  sub: any[]

  /** Time range */
  range: TimeRange

  /** Candle stick interval */
  interval: number

  cursor: CursorData

  // A trick to re-render botbar
  rerender: number

  // Layers meta-props (changing behaviour)
  layers_meta: LayersMeta

  // Y-transforms (for y-zoom and -shift)
  y_transforms: any

  // Default OHLCV settings (when using DataStructure v1.0)
  settings_ohlcv: Record<string, any>

  // Default overlay settings
  settings_ov: Object

  // Meta data
  last_candle: any[]
  last_values: {
    onchart?: any[]
    offchart?: any[]
  }
  sub_start: any
  activated: boolean
}

class ChartNoShader extends React.Component<ChartProps, ChartState> {
  // ohlcv: number[][] = []

  ti_map: any
  updater: any
  interval_ms: number
  _layout: any
  ctx: any
  // on_chart: any[]
  // offchart: any[]

  constructor(props: ChartProps) {
    super(props)

    // this.ctx = new Context(this.props)

    this.state = {
      // Current data slice
      sub: [],

      // Time range
      range: Utils.timeRange(-Infinity, Infinity),

      // Candlestick interval
      interval: 0,

      // Crosshair states
      cursor: {
        x: null,
        y: null,
        t: null,
        y$: null,
        grid_id: null,
        locked: false,
        values: {},
        scroll_lock: false,
        mode: Utils.xmode(),
      },

      // A trick to re-render botbar
      rerender: 0,

      // Layers meta-props (changing behaviour)
      layers_meta: {},

      // Y-transforms (for y-zoom and -shift)
      y_transforms: {},

      // Default OHLCV settings (when using DataStructure v1.0)
      settings_ohlcv: {},

      // Default overlay settings
      settings_ov: {},

      // Meta data
      last_candle: [],
      last_values: {},
      sub_start: undefined,
      activated: false,
    }

    // this.updater = new CursorUpdater(this)
    this._layout = this.newGenerateLayout()
  }

  newGenerateLayout() {
    return new generateLayout({
      chart: this.chart,
      sub: this.state.sub,
      offsub: this.offsub,
      interval: this.state.interval,
      range: this.state.range,
      ctx: this.ctx,
      layers_meta: this.state.layers_meta,
      ti_map: this.ti_map,
      $props: this.props,
      y_transforms: this.state.y_transforms,
    })
  }

  range_changed(r: TimeRange) {
    // Overwite & keep the original references
    // Quick fix for IB mode (switch 2 next lines)
    // TODO: wtf?
    var sub = this.subset(r)
    // this.state.range = { ...r }
    this.setState((prevState) => ({
      ...prevState,
      range: { ...r },
    }))
    Utils.overwrite(this.state.sub, sub)
    this.update_layout()
    // this.$emit('range-changed', r)
    if (this.props.ib) this.props.save_data_t()
  }
  goto(t: number) {
    const dt = this.state.range.t2 - this.state.range.t1
    this.range_changed(Utils.timeRange(t - dt, t))
  }
  setRange(t1: number, t2: number) {
    this.range_changed(Utils.timeRange(t1, t2))
  }
  cursor_changed(e: any) {
    if (e.mode) this.state.cursor.mode = e.mode
    if (this.state.cursor.mode !== 'explore') {
      this.updater.sync(e)
    }
    // if (this._hook_xchanged) this.ce('?x-changed', e)
  }
  cursor_locked(state: any) {
    if (this.state.cursor.scroll_lock && state) return
    this.state.cursor.locked = state
    // if (this._hook_xlocked) this.ce('?x-locked', state)
  }
  calc_interval() {
    let tf = Utils.parse_tf(this.forced_tf)
    if (this.ohlcv.length < 2 && !tf) return
    this.interval_ms = tf || Utils.detect_interval(this.ohlcv)
    this.setState((prevState) => ({
      ...prevState,
      interval: this.props.ib ? 1 : this.interval_ms,
    }))
    // this.state.interval = this.props.ib ? 1 : this.interval_ms
    Utils.warn(() => this.props.ib && !this.chart.tf, IB_TF_WARN, SECOND)
  }
  set_ytransform(s: any) {
    let obj = this.state.y_transforms[s.grid_id] || {}
    Object.assign(obj, s)
    this.setState((prevState) => ({
      ...prevState,
      y_transforms: {
        ...prevState.y_transforms,
        [s.grid_id]: obj,
      },
    }))
    // this.state.y_transforms, s.grid_id, obj)
    this.update_layout()
    // Utils.overwrite(this.state.range, this.state.range)
  }
  default_range() {
    const dl = this.props.config.DEFAULT_LEN
    const ml = this.props.config.MINIMUM_LEN + 0.5
    const l = this.ohlcv.length - 1

    if (this.ohlcv.length < 2) return
    if (this.ohlcv.length <= dl) {
      var s = 0,
        d = ml
    } else {
      ;(s = l - dl), (d = 0.5)
    }
    if (!this.props.ib) {
      this.setState((prevState) => ({
        ...prevState,
        range: Utils.timeRange(this.ohlcv[s][0] - this.state.interval * d, this.ohlcv[s][0] - this.state.interval * d),
      }))
      // Utils.overwrite(this.state.range, [
      //   this.ohlcv[s][0] - this.state.interval * d,
      //   c
      // ])
    } else {
      // Utils.overwrite(this.state.range, [s - this.state.interval * d, l + this.state.interval * ml])
      this.setState((prevState) => ({
        ...prevState,
        range: Utils.timeRange(s - this.state.interval * d, l + this.state.interval * ml),
      }))
    }
  }
  subset(range = this.state.range) {
    var [res, index] = this.filter(this.ohlcv, range.t1 - this.state.interval, range.t2)
    this.ti_map = new TI()
    if (res) {
      this.setState((prevState) => ({
        ...prevState,
        sub_start: index,
      }))
      // this.state.sub_start = index
      this.ti_map.init(this, res)
      if (!this.props.ib) return res || []
      return this.ti_map.sub_i
    }
    return []
  }
  common_props() {
    return {
      title_txt: this.chart.name || this.props.title_txt,
      layout: this._layout,
      sub: this.state.sub,
      range: this.state.range,
      interval: this.state.interval,
      cursor: this.state.cursor,
      colors: this.props.colors,
      font: this.props.font,
      y_ts: this.state.y_transforms,
      tv_id: this.props.tv_id,
      config: this.props.config,
      buttons: this.props.buttons,
      meta: this.meta,
      skin: this.props.skin,
    }
  }
  overlay_subset(source: any[], side: string) {
    return source.map((d, i) => {
      let res = Utils.fast_filter(
        d.data,
        this.ti_map.i2t_mode(this.state.range.t1 - this.state.interval, d.indexSrc),
        this.ti_map.i2t_mode(this.state.range.t2, d.indexSrc)
      )
      return {
        type: d.type,
        name: Utils.format_name(d),
        data: this.ti_map.parse(res[0] || [], d.indexSrc || 'map'),
        settings: d.settings || this.state.settings_ov,
        grid: d.grid || {},
        tf: Utils.parse_tf(d.tf),
        i0: res[1],
        loading: d.loading,
        last: ((this.state.last_values as any)[side] || [])[i],
      }
    })
  }
  section_props(i: number) {
    return i === 0 ? this.main_section : this.sub_section
  }
  init_range() {
    this.calc_interval()
    this.default_range()
  }
  layer_meta_props(d: any) {
    // TODO: check reactivity when layout is changed
    if (!(d.grid_id in this.state.layers_meta)) {
      this.setState((prevState) => ({
        ...prevState,
        layers_meta: {
          ...prevState.layers_meta,
          [d.grid_id]: {},
        },
      }))
    }
    // this.$set(this.state.layers_meta[d.grid_id], d.layer_id, d)

    // Rerender
    this.update_layout()
  }
  remove_meta_props(grid_id: any, layer_id: any) {
    if (grid_id in this.state.layers_meta) {
      // this.$delete(this.state.layers_meta[grid_id], layer_id)
    }
  }
  emit_custom_event(d: any) {
    this.props.on_shader_event(d, 'botbar')
    // this.$emit('custom-event', d)
    if (d.event === 'remove-layer-meta') {
      // this.remove_meta_props(...d.args)
    }
  }
  update_layout(clac_tf?: any) {
    if (clac_tf) this.calc_interval()
    const lay = this.newGenerateLayout()
    Utils.copy_layout(this._layout, lay)
    // if (this._hook_update) this.ce('?chart-update', lay)
  }
  legend_button_click(event: any) {
    // this.$emit('legend-button-click', event)
  }
  register_kb(event: any) {
    // if (!this.$refs.keyboard) return
    // this.$refs.keyboard.register(event)
  }
  remove_kb(event: any) {
    // if (!this.$refs.keyboard) return
    // this.$refs.keyboard.remove(event)
  }
  update_last_values() {
    this.setState((prevState) => ({
      ...prevState,
      last_candle: this.ohlcv ? this.ohlcv[this.ohlcv.length - 1] : undefined,
      last_values: { onchart: [], offchart: [] },
    }))
    // this.state.last_candle = this.ohlcv ? this.ohlcv[this.ohlcv.length - 1] : undefined
    // this.state.last_values = { onchart: [], offchart: [] }
    this.onchart.forEach((x, i) => {
      let d = x.data || []
      this.state.last_values.onchart[i] = d[d.length - 1]
    })
    this.offchart.forEach((x, i) => {
      let d = x.data || []
      this.state.last_values.offchart[i] = d[d.length - 1]
    })
  }
  // Hook events for extensions
  ce(event: any, ...args: any[]) {
    this.emit_custom_event({ event, args })
  }
  // Set hooks list (called from an extension)
  hooks(...list: any[]) {
    // list.forEach((x) => (this[`_hook_${x}`] = true))
  }

  get main_section() {
    const p: LayoutComponentProps = Object.assign(
      {
        data: this.overlay_subset(this.onchart, 'onchart'),
        overlays: this.props.overlays,
      },
      this.common_props()
    )
    // p.data = this.overlay_subset(this.onchart, 'onchart')
    p.data.push({
      type: this.chart.type || 'Candles',
      main: true,
      data: this.state.sub,
      i0: this.state.sub_start,
      settings: this.chart.settings || this.state.settings_ohlcv,
      grid: this.chart.grid || {},
      last: this.state.last_candle,
    })
    // p.overlays = this.props.overlays
    return p
  }

  get sub_section() {
    const p = Object.assign(
      {
        data: this.overlay_subset(this.offchart, 'offchart'),
        overlays: this.props.overlays,
      },
      this.common_props()
    )
    // p.data = this.overlay_subset(this.offchart, 'offchart')
    // p.overlays = this.props.overlays
    return p
  }
  get botbar_props() {
    let p = Object.assign(
      {
        width: this._layout.botbar.width,
        height: this._layout.botbar.height,
        rerender: this.state.rerender,
      },
      this.common_props()
    )
    // p.width = p.layout.botbar.width
    // p.height = p.layout.botbar.height
    // p.rerender = this.state.rerender
    return p
  }
  get offsub() {
    return this.overlay_subset(this.offchart, 'offchart')
  }
  // Datasets: candles, onchart, offchart indicators
  get ohlcv() {
    return this.props.data.ohlcv || this.chart.data || []
  }
  get chart() {
    return this.props.data.chart || { grid: {} }
  }
  get onchart(): any[] {
    return this.props.data.onchart || []
  }
  get offchart(): any[] {
    return this.props.data.offchart || []
  }
  get filter() {
    return this.props.ib ? Utils.fast_filter_i : Utils.fast_filter
  }
  get styles() {
    let w = this.props.toolbar ? this.props.config.TOOLBAR : 0
    return { 'margin-left': `${w}px` }
  }
  get meta() {
    return {
      last: this.state.last_candle,
      sub_start: this.state.sub_start,
      activated: this.state.activated,
    }
  }
  get forced_tf() {
    return this.chart.tf
  }

  render() {
    return <div></div>
  }
}

export const Chart = withDataTrackHOC(withShaderHOC(ChartNoShader))
