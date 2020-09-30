import { StorageTypes } from 'action-types'
import { DispatchFunc } from 'hkclient-ts/types/actions'

export function setGlobalItem(name: string, value: string) {
  return (dispatch: DispatchFunc) => {
    dispatch({
      type: StorageTypes.SET_GLOBAL_ITEM,
      data: { name, value, timestamp: new Date() },
    })
    return { data: true }
  }
}
