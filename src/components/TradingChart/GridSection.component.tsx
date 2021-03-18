import React, { useCallback, useMemo } from 'react'
import { ComponentBaseProps } from 'types/TradingChart'
import { Grid, GridProps } from './Grid.component'
import { useShader } from './useShader'

export type GridSectionProps = {
  grid_id: number
  common: ComponentBaseProps
}

export const GridSection: React.FC<GridSectionProps> = ({ grid_id, common }) => {
  const { shaders, init_shaders, on_shader_event } = useShader()

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

  return (
    <>
      <Grid grid_id={grid_id} {...gridProps} />
    </>
  )
}
