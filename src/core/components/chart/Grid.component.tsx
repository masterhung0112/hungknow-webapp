import React, { useMemo } from 'react'
import { Layout } from 'types/TradingChart'
import { Canvas } from './Canvas.component'

export type GridProps = {
  id: string
  layout: Layout
  data: DataCore[]
}

export const Grid: React.FC<GridProps> = ({ id, layout, data }) => {
  const overlays = useMemo(() => {
    const compList = []
    const count = {}
    for (let d of data) {
    }
  }, [])
  return (
    <Canvas
      id={`grid-${id}`}
      position={{
        x: 0,
        y: layout.offset || 0,
      }}
      width={layout.width}
      height={layout.height}
      canvasStyle={{
        backgroundColor: 'black',
      }}
    >
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
                        id, tv_id: this.$props.tv_id,
                        uxs: this.uxs,
                        colors: this.$props.colors,
                        config: this.$props.config,
                        updater: Math.random()
                    },
                    on: {
                        'custom-event': this.emit_ux_event
                    }
                })
        */}
    </Canvas>
  )
}
