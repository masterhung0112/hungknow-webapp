import React from 'react'
import { Stage } from 'react-konva'
import { CursorData, LayersMeta, LayoutComponentProps, MainLayout, OverlayData, TimeRange } from 'types/TradingChart'
import { IB_TF_WARN, SECOND } from './constants'
import Context from './Context'
import { GridSection } from './GridSection.component'
import { generateLayout } from './Layout'
import TI from './TiMapping'
import { DataTrackHookProps, withDataTrackHOC } from './useDataTrack'
import { ShaderHookProps, withShaderHOC } from './useShader'
import Utils from './utils'

export interface ChartNoShaderProps {
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
}

export interface ChartProps extends ChartNoShaderProps, ShaderHookProps, DataTrackHookProps {}

export type ChartState = {}

export class ChartNoShader extends React.Component<ChartProps, ChartState> {
  // ohlcv: number[][] = []

  ti_map: any
  updater: any
  interval_ms: number
  _layout: MainLayout
  ctx: any
  // on_chart: any[]
  // offchart: any[]

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

  constructor(props: ChartProps) {
    super(props)

    this.ctx = Context(this.props)

    // Current data slice
    this.sub = []

    // Time range
    this.range = Utils.timeRange(-Infinity, Infinity)

    // Candlestick interval
    this.interval = 0

    // Crosshair states
    this.cursor = {
      x: null,
      y: null,
      t: null,
      y$: null,
      grid_id: null,
      locked: false,
      values: {},
      scroll_lock: false,
      mode: Utils.xmode(),
    }

    // A trick to re-render botbar
    this.rerender = 0

    // Layers meta-props (changing behaviour)
    this.layers_meta = {}

    // Y-transforms (for y-zoom and -shift)
    this.y_transforms = {}

    // Default OHLCV settings (when using DataStructure v1.0)
    this.settings_ohlcv = {}

    // Default overlay settings
    this.settings_ov = {}

    // Meta data
    this.last_candle = []
    this.last_values = {}
    this.sub_start = undefined
    this.activated = false

    this.ti_map = new TI()
    // this.updater = new CursorUpdater(this)
  }

  componentWillMount() {
    this.init_range()

    this.sub = this.subset()

    this._layout = this.newGenerateLayout()
    this.update_last_values()
  }

  // componentDidMount() {
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     sub: this.subset(),
  //   }))
  // }

  newGenerateLayout() {
    return new generateLayout({
      chart: this.chart,
      sub: this.sub,
      offsub: this.offsub,
      interval: this.interval,
      range: this.range,
      ctx: this.ctx,
      layers_meta: this.layers_meta,
      ti_map: this.ti_map,
      $props: this.props,
      y_transforms: this.y_transforms,
    })
  }

  range_changed(r: TimeRange) {
    // Overwite & keep the original references
    // Quick fix for IB mode (switch 2 next lines)
    // TODO: wtf?
    let sub = this.subset(r)
    // this.range = { ...r }
    console.log('set time', r)
    this.range = { ...r }
    Utils.overwrite(this.sub, sub)
    this.update_layout()
    // this.$emit('range-changed', r)
    if (this.props.ib) this.props.save_data_t(this)
  }
  goto(t: number) {
    const dt = this.range.t2 - this.range.t1
    this.range_changed(Utils.timeRange(t - dt, t))
  }
  setRange(t1: number, t2: number) {
    this.range_changed(Utils.timeRange(t1, t2))
  }
  cursor_changed(e: any) {
    if (e.mode) this.cursor.mode = e.mode
    if (this.cursor.mode !== 'explore') {
      this.updater.sync(e)
    }
    // if (this._hook_xchanged) this.ce('?x-changed', e)
  }
  cursor_locked(state: any) {
    if (this.cursor.scroll_lock && state) return
    this.cursor.locked = state
    // if (this._hook_xlocked) this.ce('?x-locked', state)
  }
  calc_interval() {
    let tf = Utils.parse_tf(this.forced_tf)
    if (this.ohlcv.length < 2 && !tf) return
    this.interval_ms = tf || Utils.detect_interval(this.ohlcv)
    this.interval = this.props.ib ? 1 : this.interval_ms
    // this.interval = this.props.ib ? 1 : this.interval_ms
    Utils.warn(() => this.props.ib && !this.chart.tf, IB_TF_WARN, SECOND)
  }
  set_ytransform(s: any) {
    let obj = this.y_transforms[s.grid_id] || {}
    Object.assign(obj, s)
    this.y_transforms = {
      ...this.y_transforms,
      [s.grid_id]: obj,
    }
    // this.y_transforms, s.grid_id, obj)
    this.update_layout()
    // Utils.overwrite(this.range, this.range)
  }
  default_range() {
    const dl = this.props.config.DEFAULT_LEN
    const ml = this.props.config.MINIMUM_LEN + 0.5
    const l = this.ohlcv.length - 1
    let s = 0
    let d = 0.5

    if (this.ohlcv.length < 2) return
    if (this.ohlcv.length <= dl) {
      d = ml
    } else {
      s = l - dl
      d = 0.5
    }
    if (!this.props.ib) {
      this.range = Utils.timeRange(this.ohlcv[s][0] - this.interval * d, this.ohlcv[l][0] + this.interval * ml)
      // Utils.overwrite(this.range, [
      //   this.ohlcv[s][0] - this.interval * d,
      //   c
      // ])
    } else {
      // Utils.overwrite(this.range, [s - this.interval * d, l + this.interval * ml])
      this.range = Utils.timeRange(s - this.interval * d, l + this.interval * ml)
    }
  }
  subset(range = this.range) {
    var [res, index] = this.filter(this.ohlcv, range.t1 - this.interval, range.t2)
    // index = 4148
    // console.log('subset', range.t2, range.t1, res.length, index)

    if (res) {
      this.sub_start = index
      // this.sub_start = index
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
      sub: this.sub,
      range: this.range,
      interval: this.interval,
      cursor: this.cursor,
      colors: this.props.colors,
      font: this.props.font,
      y_ts: this.y_transforms,
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
        this.ti_map.i2t_mode(this.range.t1 - this.interval, d.indexSrc),
        this.ti_map.i2t_mode(this.range.t2, d.indexSrc)
      )
      return {
        type: d.type,
        name: Utils.format_name(d),
        data: this.ti_map.parse(res[0] || [], d.indexSrc || 'map'),
        settings: d.settings || this.settings_ov,
        grid: d.grid || {},
        tf: Utils.parse_tf(d.tf),
        i0: res[1],
        loading: d.loading,
        last: ((this.last_values as any)[side] || [])[i],
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
    if (!(d.grid_id in this.layers_meta)) {
      this.layers_meta = {
        ...this.layers_meta,
        [d.grid_id]: {},
      }
    }
    // this.$set(this.layers_meta[d.grid_id], d.layer_id, d)

    // Rerender
    this.update_layout()
  }
  remove_meta_props(grid_id: any, layer_id: any) {
    if (grid_id in this.layers_meta) {
      // this.$delete(this.layers_meta[grid_id], layer_id)
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
    this.last_candle = this.ohlcv ? this.ohlcv[this.ohlcv.length - 1] : undefined
    this.last_values = { onchart: [], offchart: [] }
    // this.last_candle = this.ohlcv ? this.ohlcv[this.ohlcv.length - 1] : undefined
    // this.last_values = { onchart: [], offchart: [] }
    this.onchart.forEach((x, i) => {
      let d = x.data || []
      this.last_values.onchart[i] = d[d.length - 1]
    })
    this.offchart.forEach((x, i) => {
      let d = x.data || []
      this.last_values.offchart[i] = d[d.length - 1]
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
      data: this.sub,
      i0: this.sub_start,
      settings: this.chart.settings || this.settings_ohlcv,
      grid: this.chart.grid || {},
      last: this.last_candle,
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
      last: this.last_candle,
      sub_start: this.sub_start,
      activated: this.activated,
    }
  }
  get forced_tf() {
    return this.chart.tf
  }
  // get range() {
  //   return this.range
  // }

  // componentDidUpdate(prevProps: ChartProps, prevState: ChartState) {
  //   if (this.range.t1 !== -Infinity && prevState.range.t1 === -Infinity) {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       sub: this.subset(),
  //     }))
  //     this._layout = this.newGenerateLayout()
  //   }
  // }

  render() {
    // if (!this._layout && this.range.t1 !== -Infinity) {
    //   this._layout = this.newGenerateLayout()
    // }
    return (
      <Stage height={this.props.height} width={this.props.width}>
        {this._layout.grids.map((grid, i) => {
          return <GridSection common={this.section_props(i)} grid_id={i} />
        })}
      </Stage>
    )
  }
}

export const Chart = withDataTrackHOC(withShaderHOC(ChartNoShader))
