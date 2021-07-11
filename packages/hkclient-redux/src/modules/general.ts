// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import General from 'hkclient-redux/constants/general';

import generalReducer from 'hkclient-redux/reducers/entities/general';

import {IModule} from 'redux-dynamic-modules-core';

import {GeneralAwareState} from 'hkclient-redux/types/general';

export const GeneralModule: IModule<GeneralAwareState> = {
    id: General.GENERAL_MODULE_NAME,
    reducerMap: {
        [General.GENERAL_MODULE_NAME]: generalReducer,
    },
};
