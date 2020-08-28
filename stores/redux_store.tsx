import configureStore from 'stores'

// Create the default store
const store = configureStore();

// export function bindActionToRedux(action, ...args) {
//     return async () => {
//         await action(...args)(store.dispatch, store.getState);
//     };
// }

if (process.env.NODE_ENV !== 'production') {
    const windowAny = window as any
    windowAny.store = store;
}

export default store