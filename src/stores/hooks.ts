// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useSelector, useDispatch} from 'react-redux';

import {createSelector} from 'reselect';

import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';

import {makeGetGlobalItem} from 'selectors/storage';
import {setGlobalItem} from 'actions/storage';

export const currentUserAndTeamSuffix = createSelector('currentUserAndTeamSuffix', [
    getCurrentUserId,
    getCurrentTeamId,
], (
    userId,
    teamId,
) => {
    return `:${userId}:${teamId}`;
});

export const currentUserSuffix = createSelector('currentUserSuffix', [
    getCurrentUserId,
], (
    userId,
) => {
    return `:${userId}`;
});

/**
 *
 * @param initialValue
 * @param name name of stored value, prepended to suffix
 * @param suffix to provide scope; defaults to user and team
 */
export function useGlobalState<TVal>(
    initialValue: TVal,
    name: string,
    suffix: string = useSelector(currentUserAndTeamSuffix),
): [TVal, (value: TVal) => ReturnType<typeof setGlobalItem>] {
    const dispatch = useDispatch();
    const storedKey = `${name}${suffix}`;

    return [
        useSelector(makeGetGlobalItem(storedKey, initialValue)),
        (newValue) => dispatch(setGlobalItem(storedKey, newValue)),
    ];
}