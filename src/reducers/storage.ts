import {combineReducers} from 'redux';

import {General} from 'hkclient-redux/constants';

import {GenericAction} from 'hkclient-redux/types/actions';
import {Dictionary} from 'hkclient-redux/types/utilities';

import StorageTypes from '../action-types/storage';

function storage(state: Dictionary<any> = {}, action: GenericAction) {
    let key;

    switch (action.type) {
    case StorageTypes.SET_ITEM: {
        if (
            !state[action.data.prefix + action.data.name] ||
        !state[action.data.prefix + action.data.name].timestamp ||
        state[action.data.prefix + action.data.name].timestamp < action.data.timestamp
        ) {
            const nextState = {...state};
            nextState[action.data.prefix + action.data.name] = {
                timestamp: action.data.timestamp,
                value: action.data.value,
            };
            return nextState;
        }
        return state;
    }
    case StorageTypes.REMOVE_ITEM: {
        const nextState = {...state};
        Reflect.deleteProperty(nextState, action.data.prefix + action.data.name);
        return nextState;
    }
    case StorageTypes.SET_GLOBAL_ITEM: {
        if (
            !state[action.data.name] ||
        !state[action.data.name].timestamp ||
        state[action.data.name].timestamp < action.data.timestamp
        ) {
            const nextState = {...state};
            nextState[action.data.name] = {
                timestamp: action.data.timestamp,
                value: action.data.value,
            };
            return nextState;
        }
        return state;
    }
    case StorageTypes.REMOVE_GLOBAL_ITEM: {
        const nextState = {...state};
        Reflect.deleteProperty(nextState, action.data.name);
        return nextState;
    }
    case StorageTypes.CLEAR: {
        const cleanState: Dictionary<any> = {};
        if (action.data && action.data.exclude && action.data.exclude.forEach) {
            action.data.exclude.forEach((excluded: string) => {
                if (state[excluded]) {
                    cleanState[excluded] = state[excluded];
                }
            });
        }
        return cleanState;
    }
    case StorageTypes.ACTION_ON_GLOBAL_ITEMS_WITH_PREFIX: {
        const nextState = {...state};
        for (key in state) {
            if (key.lastIndexOf(action.data.prefix, 0) === 0) {
                nextState[key] = {
                    timestamp: new Date(),
                    value: action.data.action(key, state[key].value),
                };
            }
        }
        return nextState;
    }
    case StorageTypes.ACTION_ON_ITEMS_WITH_PREFIX: {
        const nextState = {...state};
        const globalPrefix = action.data.globalPrefix;
        const globalPrefixLen = action.data.globalPrefix.length;
        for (key in state) {
            if (key.lastIndexOf(globalPrefix + action.data.prefix, 0) === 0) {
                const userkey = key.substring(globalPrefixLen);
                nextState[key] = {
                    timestamp: new Date(),
                    value: action.data.action(userkey, state[key].value),
                };
            }
        }
        return nextState;
    }
    case StorageTypes.STORAGE_REHYDRATE: {
        return {...state, ...action.data};
    }
    default:
        return state;
    }
}

function initialized(state = false, action: GenericAction) {
    switch (action.type) {
    case General.STORE_REHYDRATION_COMPLETE:
        return state || action.complete;

    default:
        return state;
    }
}

export default combineReducers({
    storage,
    initialized,
});
