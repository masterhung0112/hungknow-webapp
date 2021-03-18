import { useCallback, useState } from 'react'
import { TimeRange } from 'types/TradingChart'
import TI from './TiMapping'
import Utils from './utils'

export type DataTrackValue = {
  _data_n0: any
  _data_len: number
  _data_t: number
}

export interface DataTrackHookProps {
  dataTrackData: DataTrackValue
  data_changed: (params: DataTrackParamHack) => void
  check_all_data: (changed: any, params: DataTrackParamHack) => void
  reindex_delta: (n: any, p: any, params: DataTrackParamHack) => void
  save_data_t: (params: DataTrackParamHack) => void
}

export interface DataTrackParamHack {
  readonly ohlcv: any[]
  readonly ti_map: TI
  readonly interval_ms: number
  goto(t: number): void
  readonly range: TimeRange
}

export function useDataTrack(): DataTrackHookProps {
  const [dataTrackData, setDataTrackData] = useState<DataTrackValue>({ _data_n0: null, _data_len: 0, _data_t: 0 })

  const data_changed = useCallback(
    (params: DataTrackParamHack) => {
      let n = params.ohlcv
      let changed = false
      if (dataTrackData._data_n0 !== n[0] && dataTrackData._data_len !== n.length) {
        changed = true
      }
      check_all_data(changed, params)
      if (params.ti_map.ib) {
        reindex_delta(n[0], dataTrackData._data_n0, params)
      }
      setDataTrackData((prevState) => ({
        ...prevState,
        _data_n0: n[0],
        _data_len: n.length,
      }))

      save_data_t(params)
      return changed
    },
    [dataTrackData]
  )

  const check_all_data = useCallback(
    (changed: any, params: DataTrackParamHack) => {
      // If length of data in the Structure changed by > 1 point
      // emit a special event for DC to recalc the scripts
      // TODO: check overlays data too
      let len = dataTrackData._data_len || 0
      if (Math.abs(params.ohlcv.length - len) > 1 || dataTrackData._data_n0 !== params.ohlcv[0]) {
        // this.$emit('custom-event', {
        //     event: 'data-len-changed',
        //     args: []
        // })
      }
    },
    [dataTrackData]
  )

  const reindex_delta = useCallback(
    (n, p, params: DataTrackParamHack) => {
      n = n || [[0]]
      p = p || [[0]]
      let dt = n[0] - p[0]
      if (dt !== 0 && dataTrackData._data_t) {
        // Convert t back to index
        try {
          // More precise method first
          let nt = dataTrackData._data_t + 0.01 // fix for the filter lib
          let res = Utils.fast_nearest(params.ohlcv, nt)
          let cndl = params.ohlcv[res[0]]
          var off = (nt - cndl[0]) / params.interval_ms
          params.goto(res[0] + off)
        } catch (e) {
          params.goto(params.ti_map.t2i(dataTrackData._data_t))
        }
      }
    },
    [dataTrackData]
  )

  const save_data_t = useCallback((params: DataTrackParamHack) => {
    // dataTrackData._data_t = params.ti_map.i2t(params.range.t2) // save as t
    setDataTrackData((prevState) => ({
      ...prevState,
      _data_t: params.ti_map.i2t(params.range.t2), // save as t
    }))
  }, [])

  return {
    dataTrackData,
    data_changed,
    check_all_data,
    reindex_delta,
    save_data_t,
  }
}

export const withDataTrackHOC = <T extends DataTrackHookProps>(Component: React.ComponentType<T>) => {
  return (props: Omit<T, keyof DataTrackHookProps>) => {
    const dataTrackHook = useDataTrack()

    return <Component {...dataTrackHook} {...(props as any)} />
  }
}
