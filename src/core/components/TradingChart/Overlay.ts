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
  data: DataCore
  settings: any
  gridId: string
  font: any
  config: any
  meta: any
  tf: any
  i0: any
  last: any
}

export const useOverlay = (props: OverlayProps) => {
  useEffect(() => {}, [props])
  return {}
}

export const withOverlayHOC = <T>(Component: React.Component<T>) => {
  return (props: any) => {
    const screenWidth = useOverlay(props);

    return <Component {...props} />
  }
}
