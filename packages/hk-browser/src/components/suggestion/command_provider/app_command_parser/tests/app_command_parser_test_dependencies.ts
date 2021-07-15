// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import thunk from 'redux-thunk';
export {thunk};

const configureStore = require('redux-mock-store').default;
export {configureStore};

export {Client4} from 'hkclient-redux/client';

export type {AppBinding, AppForm} from 'hkclient-redux/types/apps';
export {AppFieldTypes} from 'hkclient-redux/constants/apps';

export const checkForExecuteSuggestion = true;
