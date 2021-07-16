// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {createSelector} from 'hkreselect';
import {GlobalState} from 'types/store';
import {AppBinding} from 'types/apps';
import {ClientConfig} from 'types/config';

import {getConfig} from 'selectors/entities/general';

// This file's contents belong to the Apps Framework feature.
// Apps Framework feature is experimental, and the contents of this file are
// susceptible to breaking changes without pushing the major version of this package.
export const appsEnabled = createSelector(
    'appsEnabled',
    (state: GlobalState) => getConfig(state),
    (config?: Partial<ClientConfig>) => {
        const enabled = config?.['FeatureFlagAppsEnabled' as keyof Partial<ClientConfig>];
        return enabled === 'true';
    },
);

export const makeAppBindingsSelector = (location: string) => {
    return createSelector(
        'makeAppBindingsSelector',
        (state: GlobalState) => state.entities.apps.bindings,
        (state: GlobalState) => appsEnabled(state),
        (bindings: AppBinding[], areAppsEnabled: boolean) => {
            if (!areAppsEnabled || !bindings) {
                return [];
            }

            const headerBindings = bindings.filter((b) => b.location === location);
            return headerBindings.reduce((accum: AppBinding[], current: AppBinding) => accum.concat(current.bindings || []), []);
        },
    );
};
