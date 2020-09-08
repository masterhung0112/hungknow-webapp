import { getBasePath } from 'selectors/general'
import { GlobalState } from 'hkclient-ts/types/store';

const getPreviousTeamIdKey = (userId: string) => ['user_prev_team', userId].join(':')

const getPathScopedKey = (path: string, key: string) => {
    if (path === '' || path === '/') {
        return key;
    }

    return [path, key].join(':');
}

// LocalStorageStore exposes an interface for accessing entries in the localStorage.
//
// Note that this excludes keys managed by redux-persist. The latter cannot currently be used for
// key/value storage that persists beyond logout. Ideally, we could purge all but certain parts
// of the Redux store so as to allow them to be used on re-login.

// Lets open a separate issue to refactor local storage and state interactions.
// This whole store can be connected to redux
class LocalStorageStoreClass {
    getItem(key: string, state: GlobalState) {
        const basePath = getBasePath(state);

        return localStorage.getItem(getPathScopedKey(basePath, key));
    }

    getPreviousTeamId(userId: string, state: GlobalState) {
        return this.getItem(getPreviousTeamIdKey(userId), state);
    }
}

const LocalStorageStore = new LocalStorageStoreClass();

export default LocalStorageStore;