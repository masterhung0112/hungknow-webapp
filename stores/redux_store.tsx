import configureStore from 'stores'
import { MakeStore, createWrapper, Context } from "next-redux-wrapper"
import { GlobalState } from 'hkclient-ts/types/store';

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

export const makeStore: MakeStore<GlobalState> = (context: Context) => configureStore()

export const wrapper = createWrapper<GlobalState>(makeStore, { debug: true });

// export default store