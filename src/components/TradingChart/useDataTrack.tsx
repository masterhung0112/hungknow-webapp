import { useCallback, useState } from 'react'

export type DataTrackValue = {
  _data_n0: any,
            _data_len: number,
            _data_t: number
}

export type DataTrackHookProps = {
  dataTrackData: DataTrackValue
  data_changed: () => void
  check_all_data: (changed: any) => void
  reindex_delta: (n: any, p: any) => void
  save_data_t: () => void
}

export function useDataTrack(): DataTrackHookProps {
  const [dataTrackData, setDataTrackData] = useState<DataTrackValue>({_data_n0: null,
    _data_len: 0,
    _data_t: 0})

  const data_changed = useCallback(() => {
      let n = this.ohlcv
      let changed = false
      if (dataTrackData._data_n0 !== n[0] && this._data_len !== n.length) {
          changed = true
      }
      check_all_data(changed)
      if (this.ti_map.ib) {
          this.reindex_delta(n[0], this._data_n0)
      }
      dataTrackData._data_n0 = n[0]
      dataTrackData._data_len = n.length
      save_data_t()
      return changed
  }, [])

  const check_all_data = useCallback((changed) => {
      // If length of data in the Structure changed by > 1 point
      // emit a special event for DC to recalc the scripts
      // TODO: check overlays data too
      let len = dataTrackData._data_len || 0
      if (Math.abs(this.ohlcv.length - len) > 1 ||
        dataTrackData._data_n0 !== this.ohlcv[0]) {
          // this.$emit('custom-event', {
          //     event: 'data-len-changed',
          //     args: []
          // })
      }

  }, [])

  const reindex_delta = useCallback((n, p) {
      n = n || [[0]]
      p = p || [[0]]
      let dt = n[0] - p[0]
      if (dt !== 0 && this._data_t) {
          // Convert t back to index
          try {
              // More precise method first
              let nt = dataTrackData._data_t + 0.01 // fix for the filter lib
              let res = Utils.fast_nearest(this.ohlcv, nt)
              let cndl = this.ohlcv[res[0]]
              var off = (nt - cndl[0]) / this.interval_ms
              this.goto(res[0] + off)
          } catch(e) {
              this.goto(this.ti_map.t2i(this._data_t))
          }
      }
  }, [])

  const save_data_t = useCallback(() {
    dataTrackData._data_t = this.ti_map.i2t(this.range[1]) // save as t
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
  return (props: any) => {
    const dataTrackHook = useDataTrack()

    return <Component {...dataTrackHook} {...props} />
  }
}
