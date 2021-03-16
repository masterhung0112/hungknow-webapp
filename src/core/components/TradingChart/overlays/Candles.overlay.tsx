import React from 'react'
import { CandleData } from 'types/TradingChart'
import { OverlayProps, useOverlay } from '../Overlay'

export const Candles: React.FC<OverlayProps> = (props) => {
  const { data, sub, layout } = props
  useOverlay(props)

  let cnv: {
    candles: CandleData[]
    volumes: any[]
  } = {
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

  return <>{cnv.candles.map((candleData) => {})}</>
}
