import { Draft, produce } from 'immer'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction, combineReducers, ReducersMapObject } from 'redux'

export const combineReducersWithGlobalActions = (reducersMap: ReducersMapObject) => {
  const reducersMapWithHydration = Object.keys(reducersMap).reduce((acc, reducerKey) => {
    acc[reducerKey] = (state: any, action: AnyAction) => {
      let nextState = state
      if (action.type === HYDRATE && action.payload[reducerKey]) {
        nextState = produce(nextState, (draft: Draft<{ [key: string]: any }>) => {
          Object.entries(action.payload[reducerKey]).forEach(([key, value]) => {
            draft[key] = value
          })
        })
      }

      return reducersMap[reducerKey](nextState, action)
    }

    return acc
  }, {} as ReducersMapObject)

  return combineReducers(reducersMapWithHydration)
}
