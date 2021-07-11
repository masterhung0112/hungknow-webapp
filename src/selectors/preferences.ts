// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {GlobalState} from 'types/store';
import {Preferences} from 'utils/constants';

import {getBool as getBoolPreference} from 'hkclient-redux/selectors/entities/preferences';

export const arePreviewsCollapsed = (state: GlobalState) => {
    return getBoolPreference(
        state,
        Preferences.CATEGORY_DISPLAY_SETTINGS,
        Preferences.COLLAPSE_DISPLAY,
        Preferences.COLLAPSE_DISPLAY_DEFAULT !== 'false',
    );
};
