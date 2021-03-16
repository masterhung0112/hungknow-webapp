import React from 'react'
import { OverlayProps, useOverlay } from '../Overlay'

export const Candles: React.FC<OverlayProps> = (props) => {
  const { data, sub } = props
  useOverlay(props)

  // If data === main candlestick data
  // render as main chart:
  if (sub === data) {
  }

  return <></>
}
