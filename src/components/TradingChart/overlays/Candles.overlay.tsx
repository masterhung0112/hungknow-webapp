import React from 'react'
import { CandleData } from 'types/TradingChart'
import { layout_cnv } from '../layoutCnv'
import { OverlayProps, useOverlay } from '../Overlay'
import { Candle } from '../primitives/Candle'

export interface CandelsOverlayProps extends OverlayProps {}

export const Candles: React.FC<CandelsOverlayProps> = (props) => {
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
    cnv = layout_cnv(props)
  }

  return (
    <>
      {cnv.candles.map((candleData) => {
        return <Candle data={candleData} overlay={props} />
      })}
    </>
  )
}
