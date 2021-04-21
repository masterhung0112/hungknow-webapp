import { TimeIndexData } from 'types/TradingChart'

import Utils from './utils'

const MAX_ARR = Math.pow(2, 32)

/**
 * Auto detect: is it time or index?
 * Assuming that index-based mode is ON
 * @param smth
 */
export function smth2i(timeIndexData: TimeIndexData, smth: number): number {
  if (smth > MAX_ARR) {
    return t2i(timeIndexData, smth) // it was time
  } else {
    return smth // it was an index
  }
}

export function smth2t(timeIndexData: TimeIndexData, smth: number): number {
  if (smth < MAX_ARR) {
    return i2t(timeIndexData, smth) // it was an index
  } else {
    return smth // it was time
  }
}

/**
 * time => index
 *  TODO: when switch from IB mode to regular tools
        disappear (bc there is no more mapping)
 * @param t 
 */
export function t2i(timeIndexData: TimeIndexData, t: number): number {
  if (!timeIndexData.Sub.length) return undefined

  // Discrete mapping
  const res = timeIndexData.TimeIndexMap[t]
  if (res !== undefined) return res

  const t0 = timeIndexData.Sub[0][0]
  const tN = timeIndexData.Sub[timeIndexData.Sub.length - 1][0]

  // Linear extrapolation
  if (t < t0) {
    return timeIndexData.SubStart - (t0 - t) / timeIndexData.IntervalMs
  } else if (t > tN) {
    const k = timeIndexData.Sub.length - 1
    return timeIndexData.SubStart + k - (tN - t) / timeIndexData.IntervalMs
  }

  try {
    // Linear Interpolation
    const i = Utils.fast_nearest(timeIndexData.Sub, t)
    const tk = timeIndexData.Sub[i[0]][0]
    const tk2 = timeIndexData.Sub[i[1]][0]
    const k = (t - tk) / (tk2 - tk)
    return timeIndexData.SubStart + i[0] + k * (i[1] - i[0])
  } catch (e) {}

  return undefined
}

// index => time
export function i2t(timeIndexData: TimeIndexData, i: number): number {
  if (!timeIndexData.IndexBased || !timeIndexData.Sub.length) return i // Regular mode

  // Discrete mapping
  const res = timeIndexData.IndexTimeMap[i]
  if (res !== undefined) return res
  // Linear extrapolation
  else if (i >= timeIndexData.SubStart + timeIndexData.SubIndex.length) {
    const di = i - (timeIndexData.SubStart + timeIndexData.SubIndex.length) + 1
    const last = timeIndexData.Sub[timeIndexData.Sub.length - 1]
    return last[0] + di * timeIndexData.IntervalMs
  } else if (i < timeIndexData.SubStart) {
    const di = i - timeIndexData.SubStart
    return timeIndexData.Sub[0][0] + di * timeIndexData.IntervalMs
  }

  // Linear Interpolation
  const i1 = Math.floor(i) - timeIndexData.SubStart
  let i2 = i1 + 1
  const len = timeIndexData.Sub.length

  if (i2 >= len) i2 = len - 1

  const sub1 = timeIndexData.Sub[i1]
  const sub2 = timeIndexData.Sub[i2]

  if (sub1 && sub2) {
    const t1 = sub1[0]
    const t2 = sub2[0]
    return t1 + (t2 - t1) * (i - i1 - timeIndexData.SubStart)
  }
  return undefined
}
