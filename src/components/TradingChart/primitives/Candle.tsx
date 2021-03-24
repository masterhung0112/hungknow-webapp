import { CandleData } from 'types/TradingChart'
import { Line, Rect } from 'react-konva'
import React from 'react'
import { DefaultStyles } from '../defaultStyles'

export type CandleProps = {
  data: CandleData
  // overlay: OverlayData
}

export const Candle: React.FC<CandleProps> = ({ data }) => {
  const green = data.raw[4] >= data.raw[1]
  const style = DefaultStyles
  const body_color = green ? style.colorCandleUp : style.colorCandleDw
  const wick_color = green ? style.colorWickUp : style.colorWickDw

  let w = Math.max(data.w, 1)
  let hw = Math.max(Math.floor(w * 0.5), 1)
  let h = Math.abs(data.o - data.c)
  let max_h = data.c === data.o ? 1 : 2
  let x05 = Math.floor(data.x) - 0.5
  let s = green ? 1 : -1

  return (
    <>
      <Line points={[x05, Math.floor(data.h), x05, Math.floor(data.l)]} stroke={wick_color} />
      {data.w > 1.5 ? (
        <Rect
          x={Math.floor(data.x - hw - 1)}
          y={data.c}
          width={Math.floor(hw * 2 + 1)}
          height={s * Math.max(h, max_h)}
          fill={body_color}
        />
      ) : (
        <Line
          points={[
            x05,
            Math.floor(Math.min(data.o, data.c)),
            x05,
            Math.floor(Math.max(data.o, data.c)) + (data.o === data.c ? 1 : 0),
          ]}
          stroke={body_color}
        />
      )}
    </>
  )
}
