import React from 'react'
import { OverlayProps, useOverlay } from '../Overlay'

export const Candles: React.FC<OverlayProps> = (props) => {
  const { data, sub, layout } = props
  useOverlay(props)

  let cnv: any = {
    candles: [],
    volumes: [],
  }

  // If data === main candlestick data
  // render as main chart:
  if (sub === data) {
    cnv.candles = layout.candles
    cnv.volumes = layout.volume
  } else {
    cnv = layout_cnv(layout)
  }

  return <>
  {cnv.candles.map}
  </>
}
