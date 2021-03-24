import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Layer, Line, Stage } from 'react-konva'
import { DataCore, Layout, MainLayout, OverlayMeta, TimeRange } from 'types/TradingChart'
import { OverlayProps } from './Overlay'
import { Candles } from './overlays/Candles.overlay'
import Utils from './utils'
import Hammer from './hammer-konva'
import Hamster from 'hamsterjs'
import * as math from './math'
import FrameAnimation from './frame'
import { EventEmitterValue } from 'components/Emitter/EventEmitterProvider'
import { withEventEmitter } from 'components/Emitter/EventEmitterHook'
import { CrossHair } from './Cursor.component'

class GridModel {
  MIN_ZOOM: number
  MAX_ZOOM: number
  overlays: any[]
  canvas: any
  // ctx: any
  // comp: any
  hm: any
  props: GridProps
  data: any
  range: TimeRange
  id: number
  layout: Layout
  interval: number
  cursor: any
  offset_x = 0
  offset_y = 0
  deltas = 0
  wmode: any
  mc: any
  drug: any
  fade: any
  pinch: any
  crosshair: any
  trackpad: boolean = false
  $emit: any

  constructor(canvas: any, props: any) {
    this.MIN_ZOOM = props.config.MIN_ZOOM
    this.MAX_ZOOM = props.config.MAX_ZOOM

    if (Utils.is_mobile) this.MIN_ZOOM *= 0.5

    this.canvas = canvas
    // this.ctx = canvas.getContext('2d')
    // this.comp = comp
    this.props = props
    this.data = this.props.sub
    this.range = this.props.range
    this.id = this.props.grid_id
    this.layout = this.props.layout.grids[this.id]
    this.interval = this.props.interval
    this.cursor = props.cursor
    this.offset_x = 0
    this.offset_y = 0
    this.deltas = 0 // Wheel delta events
    this.wmode = this.props.config.SCROLL_WHEEL

    this.listeners()
    this.overlays = []
  }

  listeners() {
    this.hm = Hamster(this.canvas)
    this.hm.wheel((event: any, delta: number) => this.mousezoom(-delta * 50, event))

    let mc = (this.mc = new Hammer.Manager(this.canvas, { domEvents: true }))
    let T = Utils.is_mobile ? 10 : 0
    mc.add(new Hammer.Pan({ threshold: T }))
    mc.add(new Hammer.Tap())
    mc.add(new Hammer.Pinch({ threshold: 0 }))
    mc.get('pinch').set({ enable: true })
    if (Utils.is_mobile) mc.add(new Hammer.Press())

    mc.on('panstart', (event: any) => {
      console.log('panstart')
      if (this.cursor.scroll_lock) return
      if (this.cursor.mode === 'aim') {
        return this.emit_cursor_coord(event)
      }
      let tfrm = this.props.y_transform
      this.drug = {
        x: event.center.x + this.offset_x,
        y: event.center.y + this.offset_y,
        r: { ...this.range },
        t: this.range.t2 - this.range.t1,
        o: tfrm ? tfrm.offset || 0 : 0,
        y_r: tfrm && tfrm.range ? tfrm.range.slice() : undefined,
        B: this.layout.B,
        t0: Utils.now(),
      }
      this.props.emit('cursor-changed', {
        grid_id: this.id,
        x: event.center.x + this.offset_x,
        y: event.center.y + this.offset_y,
      })
      this.props.emit('cursor-locked', true)
    })

    mc.on('panmove', (event: any) => {
      console.log('panmove')

      if (Utils.is_mobile) {
        this.calc_offset()
        this.propagate('mousemove', this.touch2mouse(event))
      }
      if (this.drug) {
        this.mousedrag(this.drug.x + event.deltaX, this.drug.y + event.deltaY)
        this.props.emit('cursor-changed', {
          grid_id: this.id,
          x: event.center.x + this.offset_x,
          y: event.center.y + this.offset_y,
        })
      } else if (this.cursor.mode === 'aim') {
        this.emit_cursor_coord(event)
      }
    })

    mc.on('panend', (event: any) => {
      if (Utils.is_mobile && this.drug) {
        this.pan_fade(event)
      }
      this.drug = null
      this.props.emit('cursor-locked', false)
    })

    mc.on('tap', (event: any) => {
      console.log()
      if (!Utils.is_mobile) return
      this.sim_mousedown(event)
      if (this.fade) this.fade.stop()
      this.props.emit('cursor-changed', {})
      this.props.emit('cursor-changed', {
        /*grid_id: this.id,
            x: undefined,//event.center.x + this.offset_x,
            y: undefined,//event.center.y + this.offset_y,*/
        mode: 'explore',
      })
      this.update()
    })

    mc.on('pinchstart', () => {
      this.drug = null
      this.pinch = {
        t: this.range.t2 - this.range.t1,
        r: { ...this.range },
      }
    })

    mc.on('pinchend', () => {
      this.pinch = null
    })

    mc.on('pinch', (event: any) => {
      if (this.pinch) this.pinchzoom(event.scale)
    })

    mc.on('press', (event: any) => {
      console.log('press')
      if (!Utils.is_mobile) return
      if (this.fade) this.fade.stop()
      this.calc_offset()
      this.emit_cursor_coord(event, { mode: 'aim' })
      setTimeout(() => this.update())
      this.sim_mousedown(event)
    })

    let add = addEventListener
    add('gesturestart', this.gesturestart)
    add('gesturechange', this.gesturechange)
    add('gestureend', this.gestureend)
  }

  gesturestart(event: any) {
    event.preventDefault()
  }
  gesturechange(event: any) {
    event.preventDefault()
  }
  gestureend(event: any) {
    event.preventDefault()
  }

  mousemove(event: any) {
    console.log('mousemove')
    if (Utils.is_mobile) return
    this.props.emit('cursor-changed', {
      grid_id: this.id,
      x: event.layerX,
      y: event.layerY + this.layout.offset,
    })
    this.calc_offset()
    this.propagate('mousemove', event)
  }

  mouseout(event: any) {
    if (Utils.is_mobile) return
    this.props.emit('cursor-changed', {})
    this.propagate('mouseout', event)
  }

  mouseup(event: any) {
    this.drug = null
    this.props.emit('cursor-locked', false)
    this.propagate('mouseup', event)
  }

  mousedown(event: any) {
    if (Utils.is_mobile) return
    this.propagate('mousedown', event)
    this.props.emit('cursor-locked', true)
    if (event.defaultPrevented) return
    this.props.emit('custom-event', {
      event: 'grid-mousedown',
      args: [this.id, event],
    })
  }

  // Simulated mousedown (for mobile)
  sim_mousedown(event: any) {
    if (event.srcEvent.defaultPrevented) return
    this.props.emit('custom-event', {
      event: 'grid-mousedown',
      args: [this.id, event],
    })
    this.propagate('mousemove', this.touch2mouse(event))
    this.update()
    this.propagate('mousedown', this.touch2mouse(event))
    setTimeout(() => {
      this.propagate('click', this.touch2mouse(event))
    })
  }

  // Convert touch to "mouse" event
  touch2mouse(e: any) {
    this.calc_offset()
    return {
      original: e.srcEvent,
      layerX: e.center.x + this.offset_x,
      layerY: e.center.y + this.offset_y,
      preventDefault: function () {
        this.original.preventDefault()
      },
    }
  }

  click(event: any) {
    this.propagate('click', event)
  }

  emit_cursor_coord(event: any, add = {}) {
    this.props.emit(
      'cursor-changed',
      Object.assign(
        {
          grid_id: this.id,
          x: event.center.x + this.offset_x,
          y: event.center.y + this.offset_y + this.layout.offset,
        },
        add
      )
    )
  }

  pan_fade(event: any) {
    let dt = Utils.now() - this.drug.t0
    let dx = this.range.t2 - this.drug.r.t2
    let v = (42 * dx) / dt
    let v0 = Math.abs(v * 0.01)
    if (dt > 500) return
    if (this.fade) this.fade.stop()
    this.fade = new FrameAnimation((self: any) => {
      v *= 0.85
      if (Math.abs(v) < v0) {
        self.stop()
      }
      this.range.t1 += v
      this.range.t2 += v
      this.change_range()
    })
  }

  calc_offset() {
    let rect = this.canvas.getBoundingClientRect()
    this.offset_x = -rect.x
    this.offset_y = -rect.y
  }

  new_layer(layer: any) {
    if (layer.name === 'crosshair') {
      this.crosshair = layer
    } else {
      this.overlays.push(layer)
    }
    this.update()
  }

  del_layer(id: number) {
    this.overlays = this.overlays.filter((x) => x.id !== id)
    this.update()
  }

  show_hide_layer(event: any) {
    let l = this.overlays.filter((x) => x.id === event.id)
    if (l.length) l[0].display = event.display
  }

  update(childItems?: any[]) {
    // Update reference to the grid
    // TODO: check what happens if data changes interval
    this.layout = this.props.layout.grids[this.id]
    this.interval = this.props.interval

    if (!this.layout) return []

    const items: any[] = childItems || []
    const drawContext = { items }

    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.props.shaders.length) this.apply_shaders(drawContext)

    this.grid(items)

    let overlays = []
    overlays.push(...this.overlays)

    // z-index sorting
    overlays.sort((l1, l2) => l1.z - l2.z)

    overlays.forEach((l) => {
      if (!l.display) return
      // this.ctx.save()
      let r = l.renderer
      if (r.pre_draw) r.pre_draw(drawContext)
      r.draw(drawContext)
      if (r.post_draw) r.post_draw(drawContext)
      // this.ctx.restore()
    })

    if (this.crosshair) {
      this.crosshair.renderer.draw(drawContext)
    }
    return items
  }

  apply_shaders(drawContext: any) {
    let layout = this.props.layout.grids[this.id]
    let props = {
      layout: layout,
      range: this.range,
      interval: this.interval,
      tf: layout.ti_map.IntervalMs,
      cursor: this.cursor,
      colors: this.props.colors,
      sub: this.data,
      font: this.props.font,
      config: this.props.config,
      meta: this.props.meta,
    }
    for (var s of this.props.shaders) {
      // this.ctx.save()
      s.draw(drawContext, props)
      // this.ctx.restore()
    }
  }

  // Actually draws the grid (for real)
  grid(stack: any[]) {
    // const gridLines: any[] = []
    const ymax = this.layout.height
    // console.log(ymax)
    for (const [x] of this.layout.xs) {
      stack.push(<Line key={`x-${x}`} points={[x - 0.5, 0, x - 0.5, ymax]} stroke={this.props.colors.colorGrid} />)
    }

    for (const [y] of this.layout.ys) {
      stack.push(
        <Line key={`y-${y}`} points={[0, y - 0.5, this.layout.width, y - 0.5]} stroke={this.props.colors.colorGrid} />
      )
    }

    // this.ctx.strokeStyle = this.props.colors.grid
    // this.ctx.beginPath()

    // const ymax = this.layout.height
    // for (var [x, p] of this.layout.xs) {
    //   this.ctx.moveTo(x - 0.5, 0)
    //   this.ctx.lineTo(x - 0.5, ymax)
    // }

    // for (var [y, y$] of this.layout.ys) {
    //   this.ctx.moveTo(0, y - 0.5)
    //   this.ctx.lineTo(this.layout.width, y - 0.5)
    // }

    // this.ctx.stroke()

    if (this.props.grid_id) this.upper_border(stack)
  }

  upper_border(stack: any[]) {
    stack.push(
      <Line
        key={`border-${this.layout.width}`}
        points={[0, 0.5, this.layout.width, 0.5]}
        stroke={this.props.colors.scale}
      />
    )
    // this.ctx.strokeStyle = this.props.colors.scale
    // this.ctx.beginPath()
    // this.ctx.moveTo(0, 0.5)
    // this.ctx.lineTo(this.layout.width, 0.5)
    // this.ctx.stroke()
  }

  mousezoom(delta: number, event: any) {
    // TODO: for mobile
    if (this.wmode !== 'pass') {
      if (this.wmode === 'click' && !this.props.meta.activated) {
        return
      }
      event.originalEvent.preventDefault()
      event.preventDefault()
    }

    event.deltaX = event.deltaX || Utils.get_deltaX(event)
    event.deltaY = event.deltaY || Utils.get_deltaY(event)

    if (Math.abs(event.deltaX) > 0) {
      this.trackpad = true
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        delta *= 0.1
      }
      this.trackpad_scroll(event)
    }

    if (this.trackpad) delta *= 0.032

    delta = Utils.smart_wheel(delta)

    // TODO: mouse zooming is a little jerky,
    // needs to follow f(mouse_wheel_speed) and
    // if speed is low, scroll shoud be slower
    if (delta < 0 && this.data.length <= this.MIN_ZOOM) return
    if (delta > 0 && this.data.length > this.MAX_ZOOM) return
    let k = this.interval / 1000
    let diff = delta * k * this.data.length
    let tl = this.props.config.ZOOM_MODE === 'tl'
    if (event.originalEvent.ctrlKey || tl) {
      let offset = event.originalEvent.offsetX
      let diff1 = (offset / (this.canvas.width() - 1)) * diff
      let diff2 = diff - diff1
      // console.log('diff1', diff1, this.canvas.width())
      this.range.t1 -= diff1
      this.range.t2 += diff2
    } else {
      this.range.t1 -= diff
    }

    if (tl) {
      let offset = event.originalEvent.offsetY
      let diff1 = (offset / (this.canvas.height - 1)) * 2
      let diff2 = 2 - diff1
      let z = diff / (this.range.t2 - this.range.t1)
      //rezoom_range(z, diff_x, diff_y)
      this.props.emit('rezoom-range', {
        grid_id: this.id,
        z,
        diff1,
        diff2,
      })
    }

    this.change_range()
  }

  mousedrag(x: number, y: number) {
    let dt = (this.drug.t * (this.drug.x - x)) / this.layout.width

    let d$ = this.layout.$_hi - this.layout.$_lo
    d$ *= (this.drug.y - y) / this.layout.height
    let offset = this.drug.o + d$

    let ls = this.layout.grid.logScale

    if (ls && this.drug.y_r) {
      let dy = this.drug.y - y
      var range = this.drug.y_r.slice()
      range.t1 = math.exp((0 - this.drug.B + dy) / this.layout.A)
      range.t2 = math.exp((this.layout.height - this.drug.B + dy) / this.layout.A)
    }

    if (this.drug.y_r && this.props.y_transform && !this.props.y_transform.auto) {
      this.props.emit('sidebar-transform', {
        grid_id: this.id,
        range: ls ? range || this.drug.y_r : [this.drug.y_r[0] - offset, this.drug.y_r[1] - offset],
      })
    }

    this.range.t1 = this.drug.r.t1 + dt
    this.range.t2 = this.drug.r.t2 + dt

    this.change_range()
  }

  pinchzoom(scale: number) {
    if (scale > 1 && this.data.length <= this.MIN_ZOOM) return
    if (scale < 1 && this.data.length > this.MAX_ZOOM) return

    let t = this.pinch.t
    let nt = (t * 1) / scale

    this.range.t1 = this.pinch.r[0] - (nt - t) * 0.5
    this.range.t2 = this.pinch.r[1] + (nt - t) * 0.5

    this.change_range()
  }

  trackpad_scroll(event: any) {
    let dt = this.range.t2 - this.range.t1

    this.range.t1 += event.deltaX * dt * 0.011
    this.range.t2 += event.deltaX * dt * 0.011

    this.change_range()
  }

  change_range() {
    // TODO: better way to limit the view. Problem:
    // when you are at the dead end of the data,
    // and keep scrolling,
    // the chart continues to scale down a little.
    // Solution: I don't know yet
    // console.log('change range', this.data, this.range)

    if (!this.range || this.data.length < 2) return

    let l = this.data.length - 1
    let data = this.data
    let range = this.range

    range.t1 = Utils.clamp(range.t1, -Infinity, data[l][0] - this.interval * 5.5)

    range.t2 = Utils.clamp(range.t2, data[0][0] + this.interval * 5.5, Infinity)
    // TODO: IMPORTANT scrolling is jerky The Problem caused
    // by the long round trip of 'range-changed' event.
    // First it propagates up to update layout in Chart.vue,
    // then it moves back as watch() update. It takes 1-5 ms.
    // And because the delay is different each time we see
    // the lag. No smooth movement and it's annoying.
    // Solution: we could try to calc the layout immediatly
    // somewhere here. Still will hurt the sidebar & bottombar
    this.props.emit('range-changed', range)
  }

  // Propagate mouse event to overlays
  propagate(name: string, event: any) {
    for (var layer of this.overlays) {
      if (layer.renderer[name]) {
        layer.renderer[name](event)
      }
      const mouse = layer.renderer.mouse
      const keys = layer.renderer.keys
      if (mouse.listeners) {
        mouse.emit(name, event)
      }
      if (keys && keys.listeners) {
        keys.emit(name, event)
      }
    }
  }

  destroy() {
    let rm = removeEventListener
    rm('gesturestart', this.gesturestart)
    rm('gesturechange', this.gesturechange)
    rm('gestureend', this.gestureend)
    if (this.mc) this.mc.destroy()
    if (this.hm) this.hm.unwheel()
  }
}

export interface GridProps extends EventEmitterValue {
  // id: string
  sub: any
  layout: MainLayout
  range: TimeRange
  interval: number
  cursor: any
  colors: any
  overlays?: (React.ComponentType<OverlayProps> & OverlayMeta)[]
  width: number
  height: number
  data: DataCore[]
  grid_id: number
  y_transform: any
  font: any
  tv_id: any
  config: any
  meta: any
  shaders: any
}

const SupportedOverlays = [Candles]

const GridBase: React.FC<GridProps> = (props) => {
  const {
    layout,
    data,
    overlays,
    sub,
    range,
    interval,
    cursor,
    colors,
    width,
    height,
    grid_id,
    y_transform,
    font,
    tv_id,
    config,
    meta,
    shaders,
  } = props
  const canvasRef = useRef()
  const [renderer, setRenderer] = useState<GridModel>()

  // Store map from the name of indicator to index in SupportedOverlays
  const [registry, setRegistry] = useState<Record<string, number>>({})
  const [supportedOverlays, setSupportOverlays] = useState<(React.ComponentType<OverlayProps> & OverlayMeta)[]>([
    ...SupportedOverlays,
    ...overlays,
  ])
  const [tools, setTools] = useState([])

  const mappedOverlays = (() => {
    const compList: {
      cls: React.ComponentType<OverlayProps>
      type: string
      data: any
      settings: any
      i0: any
      tf: any
      last: any
    }[] = []
    const count: Record<string, number> = {}
    for (let d of data) {
      let comp = supportedOverlays[registry[d.type]]
      if (comp) {
        // if (comp.methods.calc) {
        //   comp = inject_renderer(comp)
        // }
        compList.push({
          cls: comp,
          type: d.type,
          data: d.data,
          settings: d.settings,
          i0: d.i0,
          tf: d.tf,
          last: d.last,
        })
      }
    }
    return compList.map((comp, i) =>
      React.createElement(comp.cls, {
        cursor: cursor,
        colors: colors,
        layout: layout.grids[grid_id],
        interval: interval,
        sub: sub,
        font: font,
        config: config,

        id: `${comp.type}_${count[comp.type]++}`,
        // type: comp.type,
        data: comp.data,
        settings: comp.settings,
        i0: comp.i0,
        tf: comp.tf,
        num: i,
        grid_id: grid_id,
        meta: meta,
        last: comp.last,
      })
    )
  })() //, [supportedOverlays, registry, sub])

  useEffect(() => {
    setRenderer(new GridModel(canvasRef.current, props))

    // We need to know which components we will use.
    // Custom overlay components overwrite built-ins:
    const tempRegistry = { ...registry }
    supportedOverlays.forEach((x, i) => {
      let use_for = x.use_for
      if (x.tool)
        tools.push({
          use_for,
          info: x.tool,
        })
      use_for.forEach((indicator) => {
        tempRegistry[indicator] = i
      })
    })
    setRegistry(tempRegistry)

    // Create Grid instance
    // call setup
  }, [])

  const currentLayout = layout.grids[grid_id]

  const childItems: any[] = []

  if (renderer) {
    renderer.update(childItems)
  }

  // const gridLines = useMemo(() => {
  //   const gridLines: any[] = []
  //   const ymax = currentLayout.height
  //   // console.log(ymax)
  //   for (const [x] of currentLayout.xs) {
  //     gridLines.push(<Line key={x} points={[x - 0.5, 0, x - 0.5, ymax]} stroke={colors.colorGrid} />)
  //   }

  //   for (const [y] of currentLayout.ys) {
  //     gridLines.push(<Line key={y} points={[0, y - 0.5, currentLayout.width, y - 0.5]} stroke={colors.colorGrid} />)
  //   }
  //   return gridLines
  // }, [currentLayout])

  return (
    <Stage
      id={`grid-${tv_id}`}
      position={{
        x: 0,
        y: currentLayout.offset || 0,
      }}
      width={currentLayout.width}
      height={currentLayout.height}
      canvasStyle={{
        backgroundColor: colors.back,
      }}
      ref={canvasRef}
    >
      <Layer>
        {childItems}
        {/* {gridLines} */}
        {mappedOverlays}
        <CrossHair {...props} />
      </Layer>
      {/*
         h(Crosshair, {
                    props: this.common_props(),
                    on: this.layer_events
                }),
                h(KeyboardListener, {
                    on: this.keyboard_events
                }),
                h(UxLayer, {
                    props: {
                        id, tv_id: tv_id,
                        uxs: this.uxs,
                        colors: colors,
                        config: config,
                        updater: Math.random()
                    },
                    on: {
                        'custom-event': this.emit_ux_event
                    }
                })
        */}
    </Stage>
  )
}

export const Grid = withEventEmitter(GridBase)
