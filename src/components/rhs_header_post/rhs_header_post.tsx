// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Tooltip} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import OverlayTrigger from 'components/overlay_trigger';

import Constants, {RHSStates} from 'utils/constants';
import {isMobile} from 'utils/utils.jsx';
import {browserHistory} from 'utils/browser_history';
import FollowButton from 'components/threading/common/follow_button';

import {Channel} from 'hkclient-redux/types/channels';

interface RhsHeaderPostProps {
    isExpanded: boolean;
    rootPostId: string;
    previousRhsState?: string;
    relativeTeamUrl: string;
    channel: Channel;
    isCollapsedThreadsEnabled: boolean;
    isFollowingThread?: boolean;
    currentTeamId: string;
    currentUserId: string;
    setRhsExpanded: (b: boolean) => void;
    showMentions: () => void;
    showSearchResults: () => void;
    showFlaggedPosts: () => void;
    showPinnedPosts: () => void;
    closeRightHandSide: (e?: React.MouseEvent) => void;
    toggleRhsExpanded: (e: React.MouseEvent) => void;
    setThreadFollow: (userId: string, teamId: string, threadId: string, newState: boolean) => void;
}

export default class RhsHeaderPost extends React.PureComponent<RhsHeaderPostProps> {
    handleBack = (e: React.MouseEvent) => {
        e.preventDefault();

        switch (this.props.previousRhsState) {
        case RHSStates.SEARCH:
            this.props.showSearchResults();
            break;
        case RHSStates.MENTION:
            this.props.showMentions();
            break;
        case RHSStates.FLAG:
            this.props.showFlaggedPosts();
            break;
        case RHSStates.PIN:
            this.props.showPinnedPosts();
            break;
        default:
            break;
        }
    }

    handleJumpClick = () => {
        if (isMobile()) {
            this.props.closeRightHandSide();
        }

        this.props.setRhsExpanded(false);
        const teamUrl = this.props.relativeTeamUrl;
        browserHistory.push(`${teamUrl}/pl/${this.props.rootPostId}`);
    }

    handleFollowChange = () => {
        const {currentTeamId, currentUserId, rootPostId, isFollowingThread} = this.props;
        this.props.setThreadFollow(currentUserId, currentTeamId, rootPostId, !isFollowingThread);
    }

    render() {
        let back;
        const closeSidebarTooltip = (
            <Tooltip id='closeSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.closeSidebarTooltip'
                    defaultMessage='Close'
                />
            </Tooltip>
        );

        let backToResultsTooltip;

        switch (this.props.previousRhsState) {
        case RHSStates.SEARCH:
        case RHSStates.MENTION:
            backToResultsTooltip = (
                <Tooltip id='backToResultsTooltip'>
                    <FormattedMessage
                        id='rhs_header.backToResultsTooltip'
                        defaultMessage='Back to search results'
                    />
                </Tooltip>
            );
            break;
        case RHSStates.FLAG:
            backToResultsTooltip = (
                <Tooltip id='backToResultsTooltip'>
                    <FormattedMessage
                        id='rhs_header.backToFlaggedTooltip'
                        defaultMessage='Back to saved posts'
                    />
                </Tooltip>
            );
            break;
        case RHSStates.PIN:
            backToResultsTooltip = (
                <Tooltip id='backToResultsTooltip'>
                    <FormattedMessage
                        id='rhs_header.backToPinnedTooltip'
                        defaultMessage='Back to pinned posts'
                    />
                </Tooltip>
            );
            break;
        }

        const expandSidebarTooltip = (
            <Tooltip id='expandSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.expandSidebarTooltip'
                    defaultMessage='Expand Sidebar'
                />
            </Tooltip>
        );

        const shrinkSidebarTooltip = (
            <Tooltip id='shrinkSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.collapseSidebarTooltip'
                    defaultMessage='Collapse Sidebar'
                />
            </Tooltip>
        );

        const channelName = this.props.channel.display_name;

        if (backToResultsTooltip) {
            back = (
                <OverlayTrigger
                    delayShow={Constants.OVERLAY_TIME_DELAY}
                    placement='top'
                    overlay={backToResultsTooltip}
                >
                    <a
                        href='#'
                        onClick={this.handleBack}
                        className='sidebar--right__back'
                    >
                        <FormattedMessage
                            id='generic_icons.back'
                            defaultMessage='Back Icon'
                        >
                            {(ariaLabel: string) => (
                                <i
                                    className='icon icon-arrow-back-ios'
                                    aria-label={ariaLabel}
                                />
                            )}
                        </FormattedMessage>
                    </a>
                </OverlayTrigger>
            );
        }

        return (
            <div className='sidebar--right__header'>
                <span className='sidebar--right__title'>
                    {back}
                    <FormattedMessage
                        id='rhs_header.details'
                        defaultMessage='Thread'
                    />
                    {channelName &&
                        <button
                            onClick={this.handleJumpClick}
                            className='style--none sidebar--right__title__channel'
                        >
                            {channelName}
                        </button>
                    }
                </span>
                <div className='controls'>
                    {this.props.isCollapsedThreadsEnabled ? (
                        <FollowButton
                            className='sidebar--right__follow__thread'
                            isFollowing={this.props.isFollowingThread ?? false}
                            onClick={this.handleFollowChange}
                        />
                    ) : null}

                    <OverlayTrigger
                        delayShow={Constants.OVERLAY_TIME_DELAY}
                        placement='top'
                        overlay={this.props.isExpanded ? shrinkSidebarTooltip : expandSidebarTooltip}
                    >
                        <button
                            type='button'
                            className='sidebar--right__expand btn-icon'
                            aria-label='Expand'
                            onClick={this.props.toggleRhsExpanded}
                        >
                            <FormattedMessage
                                id='rhs_header.expandSidebarTooltip.icon'
                                defaultMessage='Expand Sidebar Icon'
                            >
                                {(ariaLabel: string) => (
                                    <i
                                        className='icon icon-arrow-expand'
                                        aria-label={ariaLabel}
                                    />
                                )}
                            </FormattedMessage>
                            <FormattedMessage
                                id='rhs_header.collapseSidebarTooltip.icon'
                                defaultMessage='Collapse Sidebar Icon'
                            >
                                {(ariaLabel: string) => (
                                    <i
                                        className='icon icon-arrow-collapse'
                                        aria-label={ariaLabel}
                                    />
                                )}
                            </FormattedMessage>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        delayShow={Constants.OVERLAY_TIME_DELAY}
                        placement='top'
                        overlay={closeSidebarTooltip}
                    >
                        <button
                            id='rhsCloseButton'
                            type='button'
                            className='sidebar--right__close btn-icon'
                            aria-label='Close'
                            onClick={this.props.closeRightHandSide}
                        >
                            <FormattedMessage
                                id='rhs_header.closeTooltip.icon'
                                defaultMessage='Close Sidebar Icon'
                            >
                                {(ariaLabel: string) => (
                                    <i
                                        className='icon icon-close'
                                        aria-label={ariaLabel}
                                    />
                                )}
                            </FormattedMessage>
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}
