// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect} from 'react';
import {Link, useMatch} from 'react-router-dom';
import classNames from 'classnames';
import {useIntl} from 'react-intl';
import {useSelector, useDispatch} from 'react-redux';

import {t} from 'utils/i18n';

import {isUnreadFilterEnabled} from 'selectors/views/channel_sidebar';

import ChannelMentionBadge from 'components/sidebar/sidebar_channel/channel_mention_badge';

import {getThreadCountsInCurrentTeam} from 'hkclient-redux/selectors/entities/threads';
import {isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';
import {getThreads} from 'hkclient-redux/actions/threads';

import {useThreadRouting} from '../hooks';

import ThreadsIcon from './threads_icon';

import './global_threads_link.scss';

const GlobalThreadsLink = () => {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const isFeatureEnabled = useSelector(isCollapsedThreadsEnabled);

    const matching = useMatch('/:team/threads/:threadIdentifier');

    // const {pathname} = useLocation();
    const inGlobalThreads = matching != null;
    const {currentTeamId, currentUserId} = useThreadRouting();

    const counts = useSelector(getThreadCountsInCurrentTeam);
    const unreadsOnly = useSelector(isUnreadFilterEnabled);
    const someUnreadThreads = counts?.total_unread_threads;

    useEffect(() => {
        // load counts if necessary
        if (isFeatureEnabled) {
            dispatch(getThreads(currentUserId, currentTeamId, {perPage: 5}));
        }
    }, [currentTeamId, isFeatureEnabled]);

    if (!isFeatureEnabled || (unreadsOnly && !inGlobalThreads && !someUnreadThreads)) {
        // hide link if feature disabled or filtering unreads and there are no unread threads
        return null;
    }

    return (
        <ul className='SidebarGlobalThreads NavGroupContent nav nav-pills__container'>
            <li
                className={classNames('SidebarChannel', {
                    active: inGlobalThreads,
                    unread: someUnreadThreads,
                })}
                tabIndex={-1}
            >
                <Link
                    to={`${matching.pathname}/threads`}
                    draggable='false'
                    className={classNames('SidebarLink sidebar-item', {
                        'unread-title': Boolean(someUnreadThreads),
                    })}
                    role='listitem'
                    tabIndex={0}
                >
                    <span className='icon'>
                        <ThreadsIcon/>
                    </span>
                    <div className='SidebarChannelLinkLabel_wrapper'>
                        <span className='SidebarChannelLinkLabel sidebar-item__name'>
                            {formatMessage({id: t('globalThreads.sidebarLink'), defaultMessage: 'Threads'})}
                        </span>
                    </div>
                    {counts?.total_unread_mentions > 0 && (
                        <ChannelMentionBadge unreadMentions={counts.total_unread_mentions}/>
                    )}
                </Link>
            </li>
        </ul>
    );
};

export default GlobalThreadsLink;
