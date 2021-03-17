import React, { useEffect, useRef } from 'react'

export type CanvasItemPosition = {
  x: number
  y: number
}

export type CanvasProps = {
  id: string
  width: number
  height: number
  position: CanvasItemPosition
  canvasStyle: React.CSSProperties
}

export const Canvas: React.FC<CanvasProps> = ({ id, width, height, position, canvasStyle, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d')

      const { devicePixelRatio: ratio = 1 } = window
      canvasRef.current.width = width * ratio
      canvasRef.current.height = height * ratio
      canvasCtx.scale(ratio, ratio)
    }
  }, [])

  return (
    <div
      id={`${id}-canvas-container`}
      style={{
        left: position.x + 'px',
        top: position.y + 'px',
        position: 'absolute',
      }}
    >
      <canvas ref={canvasRef} id={`${id}-canvas`} style={canvasStyle}></canvas>
      {children}
    </div>
  )
}
