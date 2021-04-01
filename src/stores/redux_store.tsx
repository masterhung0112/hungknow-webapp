import configureStore from 'store'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import { GlobalState } from 'hkclient-ts/lib/types/store'

// Create the default store
// const store = configureStore();

// export function bindActionToRedux(action, ...args) {
//     return async () => {
//         await action(...args)(store.dispatch, store.getState);
//     };
// }

// if (process.env.NODE_ENV !== 'production') {
//     const windowAny = window as any
//     windowAny.store = store;
// }

export const makeStore: MakeStore<GlobalState> = () => configureStore({})

export const wrapper = createWrapper<GlobalState>(makeStore, { debug: false })

// export default wrapper
