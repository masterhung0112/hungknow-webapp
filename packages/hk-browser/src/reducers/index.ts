// import { GenericAction } from 'hkclient-redux/types/actions'
// import { GlobalState } from 'hkclient-redux/types/store'
// import { HYDRATE } from 'next-redux-wrapper'

// const reducer = (state: GlobalState, action: GenericAction) => {
//   console.log('@@ app reducer')
//   if (action.type === HYDRATE) {
//     console.log('@@ hydrate', action.payload)
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     //if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
//     return nextState
//   } else {
//     return state
//   }
// }

// export default reducer
export default {};
