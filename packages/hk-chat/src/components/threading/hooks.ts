// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useMemo} from 'react';
import {useMatch, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {UserThread} from 'hkclient-redux/types/threads';
import {$ID, $Name} from 'hkclient-redux/types/utilities';
import {Team} from 'hkclient-redux/types/teams';

import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';

/**
 * GlobalThreads-specific hook for nav/routing, selection, and common data needed for actions.
 */
export function useThreadRouting() {
    const {params} = useMatch('/:team/threads/:threadIdentifier');
    const navigate = useNavigate();
    const currentTeamId = useSelector(getCurrentTeamId);
    const currentUserId = useSelector(getCurrentUserId);
    return useMemo(() => ({
        params,
        history,
        currentTeamId,
        currentUserId,
        clear: () => navigate(`/${params.team}/threads`, {replace: true}),
        select: (threadId?: $ID<UserThread>) => navigate(`/${params.team}/threads${threadId ? '/' + threadId : ''}`),
        goToInChannel: (threadId?: $ID<UserThread>, teamName: $Name<Team> = params.team) => navigate(`/${teamName}/pl/${threadId ?? params.threadIdentifier}`),
    }), [params.team, params.threadIdentifier, currentTeamId, currentUserId]);
}
