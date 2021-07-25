// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createBrowserHistory} from 'history';

// eslint-disable-next-line no-negated-condition
export const browserHistory = typeof window != 'undefined' ? createBrowserHistory({basename: (window as any).basename} as any) : {};
