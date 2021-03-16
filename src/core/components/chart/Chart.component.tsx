import React, { MutableRefObject, Ref, RefObject } from 'react'

export type ChartProps = {
  data: any
  width: number
  height: number
}

export type ChartState = {
  /** Current data slice */
  sub: any[]

  /** Time range */
  range: any[]

  /** Candle stick interval */
  interval: number

  cursor: {
    x: number | null
    y: number | null
    t: number | null
    gridId: string | null
    locked: boolean
    values: Object
    scrollLock: boolean
    mode: string
  }

  // A trick to re-render botbar
  rerender: number

  // Layers meta-props (changing behaviour)
  layersMeta: Object

  // Y-transforms (for y-zoom and -shift)
  yTransforms: Object

  // Default OHLCV settings (when using DataStructure v1.0)
  settingsOhlcv: Object

  // Default overlay settings
  settingsOv: Object

  // Meta data
  last_candle: any[]
  last_values: Object
  subStart: any
  activated: boolean
}

export class Chart extends React.Component<ChartProps, ChartState> {
  canvasRef: RefObject<HTMLCanvasElement>
  canvasCtxRef: MutableRefObject<CanvasRenderingContext2D>

  constructor(props: ChartProps) {
    super(props)
    this.canvasRef = React.createRef()
    this.canvasCtxRef = React.createRef()
  }

  componentDidMount() {
    if (this.canvasRef.current && !this.canvasCtxRef.current) {
      this.canvasCtxRef.current = this.canvasRef.current.getContext('2d')
    }
  }

  render() {
    return <canvas ref={this.canvasRef} height={this.props.height} width={this.props.width}></canvas>
  }
}
