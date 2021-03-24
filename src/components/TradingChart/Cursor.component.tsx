import { EventEmitterContext } from 'components/Emitter/EventEmitterProvider'
import React, { useContext, useEffect } from 'react'
import { Group, Line } from 'react-konva'

export interface CrossHairProps {
  cursor: any
  colors: any
  layout: any
  hidden?: boolean
}

export const CrossHair: React.FC<CrossHairProps> = ({ cursor, colors, layout, hidden }) => {
  const x = cursor.x
  const y = cursor.y
  if (hidden && cursor.mode === 'explore') return null
  if (!x || !y) return null

  return (
    <Group>
      {/* H */}
      {cursor.grid_id === layout.id && <Line points={[0, y, layout.width - 0.5, y]} />}

      {/* V */}
      <Line points={[x, 0, x, layout.height]} stroke={colors.cross} dash={[5]} />
    </Group>
  )
}
