import ViewsConstants from 'constants/views';

import {IModule} from 'redux-dynamic-modules-core';
import {ViewsAwareState} from 'types/views';

import viewReducer from '../reducers/views';

export const ViewsModule: IModule<ViewsAwareState> = {
    id: ViewsConstants.VIEWS_MODULE_NAME,
    reducerMap: {
        [ViewsConstants.VIEWS_MODULE_NAME]: viewReducer as any,
    },
};
