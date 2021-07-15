import StorageConstants from 'constants/storage';

import {IModule} from 'redux-dynamic-modules-core';
import {StorageAwareState} from 'types/storage';

import storageReducer from '../reducers/storage';

export const StorageModule: IModule<StorageAwareState> = {
    id: StorageConstants.STORAGE_MODULE_NAME,
    reducerMap: {
        [StorageConstants.STORAGE_MODULE_NAME]: storageReducer,
    },
};
