import { StorageTypes } from 'action-types'
import { StorageConstants } from 'constants/storage'
import { GetStateFunc, DispatchFunc } from 'hkclient-ts/lib/types/actions'
import { Persistor } from 'redux-persist'
import { GlobalState } from 'types/stores'

export function setGlobalItem(name: string, value: string) {
  return (dispatch: DispatchFunc) => {
    dispatch({
      type: StorageTypes.SET_GLOBAL_ITEM,
      data: { name, value, timestamp: new Date() },
    })
    return { data: true }
  }
}

export function storageRehydrate(incoming: Record<string, any>, persistor: Persistor) {
  return (dispatch: DispatchFunc, getState: () => GlobalState) => {
    const state = getState()
    persistor.pause()
    Object.keys(incoming).forEach((key) => {
      const storage: Record<string, any> = {}
      try {
        const value = JSON.parse(incoming[key])
        if (value === null) {
          storage[key] = { value, timestamp: new Date() }
        } else if (typeof state[StorageConstants.STORAGE_MODULE_NAME].storage[key] === 'undefined') {
          if (typeof value.timestamp === 'undefined') {
            storage[key] = { value, timestamp: new Date() }
          } else {
            storage[key] = { value: value.value, timestamp: new Date(value.timestamp) }
          }
        } else if (typeof value.timestamp === 'undefined') {
          storage[key] = { value, timestamp: new Date() }
        } else if (typeof state[StorageConstants.STORAGE_MODULE_NAME].storage[key].timestamp === 'undefined') {
          storage[key] = { value: value.value, timestamp: new Date(value.timestamp) }
        } else if (new Date(value.timestamp) > state[StorageConstants.STORAGE_MODULE_NAME].storage[key].timestamp) {
          storage[key] = { value: value.value, timestamp: new Date(value.timestamp) }
        } else {
          return
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-line no-process-env
          console.warn('Error rehydrating data for key "storage"', err) // eslint-disable-line no-console
        }
      }
      dispatch({
        type: StorageTypes.STORAGE_REHYDRATE,
        data: storage,
      })
    })
    persistor.resume()
    return { data: true }
  }
}
