import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Layer } from 'react-konva'
import { DataCore, Layout, MainLayout, TimeRange } from 'types/TradingChart'
import { OverlayProps } from './Overlay'
import { Candles } from './overlays/Candles.overlay'

export type GridProps = {
  id: string
  layout: MainLayout
  data: DataCore[]
  overlays?: React.ComponentType<OverlayProps>[]
  sub: any
  range: TimeRange
  interval: number
  cursor: any
  colors: any
  width: number
  height: number
  grid_id: number
  y_transform: any
  font: any
  tv_id: any
  config: any
  meta: any
  shaders: any
}

const SupportedOverlays = [Candles]

export const Grid: React.FC<GridProps> = ({
  id,
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
}) => {
  // Store map from the name of indicator to index in SupportedOverlays
  const [registry, setRegistry] = useState<Record<string, number>>({})
  const [supportedOverlays, setSupportOverlays] = useState<React.ComponentType<OverlayProps>[]>([
    ...SupportedOverlays,
    ...overlays,
  ])
  const [tools, setTools] = useState([])

  const mappedOverlays = useMemo(() => {
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
  }, [supportedOverlays])

  useEffect(() => {
    // We need to know which components we will use.
    // Custom overlay components overwrite built-ins:
    supportedOverlays.forEach((x, i) => {
      let use_for = x.methods.use_for()
      if (x.methods.tool)
        tools.push({
          use_for,
          info: x.methods.tool(),
        })
      use_for.forEach((indicator) => {
        registry[indicator] = i
      })
    })

    // Create Grid instance
    // call setup
  }, [])

  const currentLayout = layout.grids[grid_id]

  return (
    <Layer
      id={`grid-${id}`}
      position={{
        x: 0,
        y: currentLayout.offset || 0,
      }}
      width={currentLayout.width}
      height={currentLayout.height}
      canvasStyle={{
        backgroundColor: 'black',
      }}
    >
      {mappedOverlays}
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
    </Layer>
  )
}
