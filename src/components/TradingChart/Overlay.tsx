import React, { useEffect } from 'react'
import { DataCore, Layout } from 'types/TradingChart'

export interface OverlayProps {
  id: string
  num: any
  interval: number
  cursor: any
  colors: any
  layout: Layout
  sub: any
  data: any
  settings: any
  grid_id: number
  font: any
  config: any
  meta: any
  tf: any
  i0: any
  last: any

  // methods: {
  //   use_for(): string[]
  // }
}

export interface VolumeOverlayProps extends OverlayProps {
  _i1: number
  _i2: (p: any[]) => any
  volscale: number
}

export const useOverlay = (props: OverlayProps) => {
  useEffect(() => {}, [props])
  return {}
}

export const withOverlayHOC = <T extends OverlayProps>(Component: React.ComponentType<T>) => {
  return (props: any) => {
    useOverlay(props)

    return <Component {...props} />
  }
}
