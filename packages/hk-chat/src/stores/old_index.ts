import {createTransform, persistStore} from 'redux-persist';
import {transformSet} from 'store/utils';
import localForage from 'localforage';
import {extendPrototype} from 'localforage-observable';

import {storageRehydrate} from 'actions/storage';
import {clearUserCookie} from 'actions/views/cookie';

import {ActionTypes} from 'utils/constants';
import {getBasePath} from 'selectors/general';

import {StorageModule} from 'modules/storage';
import {GlobalState} from 'types/store';

import {GeneralModule} from 'hkclient-redux/modules/general';

import reduxInitialState from 'hkclient-redux/store/initial_state';
import {General, RequestStatus} from 'hkclient-redux/constants';
import configureServiceStore from 'hkclient-redux/store';

import {combineReducersWithGlobalActions} from './hydrate_reducer';

function getAppReducer() {
    return require('../reducers');
}

const usersSetTransform = ['profilesInChannel', 'profilesNotInChannel', 'profilesInTeam', 'profilesNotInTeam'];

const teamSetTransform = ['membersInTeam'];

const setTransforms = [...usersSetTransform, ...teamSetTransform];

// This is a hack to get the whitelist to work with our storage keys
// We will implement it properly when we eventually upgrade redux-persist
const whitelist: {
    keys: string[];
    prefixes: string[];
    indexOf: (key: string) => number;
} = {
    keys: [], // add normal whitelist keys here
    prefixes: ['storage'], // add any whitelist prefixes here
    indexOf: function indexOf(key: string) {
        if (this.keys.indexOf(key) !== -1) {
            return 0;
        }

        for (let i = 0; i < this.prefixes.length; i++) {
            if (key.startsWith(this.prefixes[i])) {
                return 0;
            }
        }

        return -1;
    },
};

// window.Observable = Observable;

export default function configureStore(initialState: GlobalState = undefined) {
    const setTransformer = createTransform(
        (inboundState: any, key) => {
            if (key === 'entities') {
                const state = {...inboundState};
                for (const prop in state) {
                    if (Object.prototype.hasOwnProperty.call(state, prop)) {
                        state[prop] = transformSet(state[prop], setTransforms);
                    }
                }

                return state;
            }

            return inboundState;
        },
        (outboundState, key) => {
            if (key === 'entities') {
                const state = {...outboundState};
                for (const prop in state) {
                    if (Object.prototype.hasOwnProperty.call(state, prop)) {
                        state[prop] = transformSet(state[prop], setTransforms, false);
                    }
                }

                return state;
            }

            return outboundState;
        },
    );

    const offlineOptions = {
        persist: (store: any, options: any): any => {
            const localforage = extendPrototype(localForage);
            const storage = localforage;
            const KEY_PREFIX = 'reduxPersist:';

            localforage.
                ready().
                then(() => {
                    const persistor = persistStore(store, {storage, keyPrefix: KEY_PREFIX, ...options}, () => {
                        store.dispatch({
                            type: General.STORE_REHYDRATION_COMPLETE,
                            complete: true,
                        });
                    });

                    localforage.configObservables({
                        crossTabNotification: true,
                    });

                    const observable = localforage.newObservable({
                        crossTabNotification: true,
                        changeDetection: true,
                    });

                    const restoredState: Record<string, any> = {};
                    localforage.
                        iterate((value, key) => {
                            if (key && key.indexOf(KEY_PREFIX + 'storage:') === 0) {
                                const keyspace = key.substr((KEY_PREFIX + 'storage:').length);
                                restoredState[keyspace] = value;
                            }
                        }).
                        then(() => {
                            storageRehydrate(restoredState, persistor)(store.dispatch, store.getState);
                        });

                    observable.subscribe({
                        next: (args) => {
                            if (args.key && args.key.indexOf(KEY_PREFIX + 'storage:') === 0 && args.oldValue === null) {
                                const keyspace = args.key.substr((KEY_PREFIX + 'storage:').length);

                                const statePartial: Record<string, any> = {};
                                statePartial[keyspace] = args.newValue;
                                storageRehydrate(statePartial, persistor)(store.dispatch, store.getState);
                            }
                        },
                    });

                    let purging = false;

                    // check to see if the logout request was successful
                    store.subscribe(() => {
                        const state = store.getState();
                        const basePath = getBasePath(state);

                        if (state.requests.users.logout.status === RequestStatus.SUCCESS && !purging) {
                            purging = true;

                            persistor.purge();
                            clearUserCookie();

                            // Preserve any query string parameters on logout, including parameters
                            // used by the application such as extra and redirect_to.
                            window.location.href = `${basePath}${window.location.search}`;

                            store.dispatch({
                                type: General.OFFLINE_STORE_RESET,
                                data: Object.assign({}, reduxInitialState, initialState),
                            });

                            setTimeout(() => {
                                purging = false;
                            }, 500);
                        }
                    });
                }).
                catch((error) => {
                    store.dispatch({
                        type: ActionTypes.STORE_REHYDRATION_FAILED,
                        error,
                    });
                });
            return store;
        },
        persistOptions: {
            autoRehydrate: {
                log: false,
            },
            whitelist,
            debounce: 30,
            transforms: [setTransformer],
            _stateIterator: (collection: any, callback: any) => {
                return Object.keys(collection).forEach((key) => {
                    if (key === 'storage') {
                        Object.keys(collection.storage.storage).forEach((storageKey) => {
                            callback(collection.storage.storage[storageKey], 'storage:' + storageKey);
                        });
                    } else {
                        callback(collection[key], key);
                    }
                });
            },
            _stateGetter: (state: any, key: any) => {
                if (key.indexOf('storage:') === 0) {
                    state.storage = state.storage || {storage: {}};
                    return state.storage.storage[key.substr(8)];
                }
                return state[key];
            },
            _stateSetter: (state: any, key: any, value: any) => {
                if (key.indexOf('storage:') === 0) {
                    state.storage = state.storage || {storage: {}};
                    state.storage.storage[key.substr(8)] = value;
                }
                state[key] = value;
                return state;
            },
        },

    // detectNetwork: detect,
    };

    return configureServiceStore({}, offlineOptions, [GeneralModule, StorageModule], combineReducersWithGlobalActions);
}