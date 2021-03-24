import { withEventEmitter } from 'components/Emitter/EventEmitterHook'
import { EventEmitterContext, EventEmitterValue } from 'components/Emitter/EventEmitterProvider'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ComponentBaseProps } from 'types/TradingChart'
import { Grid, GridProps } from './Grid.component'
import { useShader } from './useShader'

export interface GridSectionProps {
  grid_id: number
  common: ComponentBaseProps
}

export const GridSection: React.FC<GridSectionProps> = ({ grid_id, common }) => {
  const { shaders, init_shaders, on_shader_event } = useShader()
  const [meta_props, setmeta_props] = useState({})
  const sbRefs = React.useRef<Record<string, any>>({})
  const { on } = useContext(EventEmitterContext)

  const grid_shaders = useCallback(() => {
    return shaders.filter((x) => x.target === 'grid')
  }, [shaders])

  const gridProps = useMemo(() => {
    const gridProps: GridProps = {
      ...common,
    } as any

    // Split offchart data between offchart grids
    if (grid_id > 0) {
      let all = gridProps.data
      gridProps.data = [gridProps.data[grid_id - 1]]
      // Merge offchart overlays with custom ids with
      // the existing onse (by comparing the grid ids)
      gridProps.data.push(...all.filter((x: any) => x.grid && x.grid.id === grid_id))
    }

    gridProps.width = gridProps.layout.grids[grid_id].width
    gridProps.height = gridProps.layout.grids[grid_id].height
    gridProps.y_transform = common.y_ts[grid_id]
    gridProps.shaders = grid_shaders()
    return gridProps
  }, [common.data])

  useEffect(() => {
    on('layer-meta-props', (detail) => {
      setmeta_props((prevState) => ({
        ...prevState,
        [detail.layer_id]: detail,
      }))
    })
    // Zoom the sidebar
    on('rezoom-range', (detail) => {
      let id = 'sb-' + detail.grid_id
      if (sbRefs.current[id]) {
        sbRefs.current[id].renderer.rezoom_range(detail.z, detail.diff1, detail.diff2)
      }
    })
  }, [])

  return (
    <>
      <Grid grid_id={grid_id} {...gridProps} />
    </>
  )
}
