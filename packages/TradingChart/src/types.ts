export type Ohlcv = number[][]

export type OnChartItem = {
    name: string
    type: string
    data: number[][]
    settings: Record<string, any>
}

export type OffChartItem = {
    name: string
    type: string
    data: number[][]
    settings: Record<string, any>
}