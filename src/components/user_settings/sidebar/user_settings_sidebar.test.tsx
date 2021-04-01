// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {shallow} from 'enzyme';
import React from 'react';

import {UserProfile} from 'hkclient-ts/lib/types/users';

import {SidebarPreferences} from 'hkclient-ts/lib/selectors/entities/preferences';

import {mountWithIntl} from 'tests/helpers/intl-test-helper';

import UserSettingsSidebar from 'components/user_settings/sidebar/user_settings_sidebar';

import {UserSettingsSidebarProps} from './user_settings_sidebar';

describe('components/user_settings/sidebar/UserSettingsSidebar', () => {
    const defaultProps: UserSettingsSidebarProps = {
        closeUnusedDirectMessages: 'after_seven_days',
        showUnusedOption: false,
        channelSwitcherOption: 'true',
        showChannelOrganization: true,
        enableLegacySidebar: true,
        sidebarPreference: {
            grouping: 'by_type',
            sorting: 'alpha',
        } as SidebarPreferences,
        unreadsAtTop: 'true',
        favoriteAtTop: 'true',
        user: {
            id: 'someuserid',
        } as UserProfile,
        closeModal: () => () => true,
        collapseModal: () => () => true,
        updateSection: () => () => true,
        actions: {
            savePreferences: () => true,
        },
    };

    test('should match snapshot', () => {
        const wrapper = shallow(<UserSettingsSidebar {...defaultProps}/>);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state('isSaving')).toEqual(false);
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: defaultProps.sidebarPreference.grouping,
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });
    });

    test('should match state when updateSection is called', () => {
        const newUpdateSection = jest.fn();
        const updateArg = 'unreadChannels';
        const props: UserSettingsSidebarProps = {...defaultProps, updateSection: newUpdateSection};
        const wrapper = shallow<UserSettingsSidebar>(<UserSettingsSidebar {...props}/>);

        wrapper.setState({isSaving: true,
            settings: {
                close_unused_direct_messages: 'junk',
                channel_switcher_section: defaultProps.channelSwitcherOption,
                grouping: defaultProps.sidebarPreference.grouping,
                sorting: defaultProps.sidebarPreference.sorting,
                unreadsAtTop: defaultProps.unreadsAtTop,
                favoriteAtTop: defaultProps.favoriteAtTop,
            },
        });
        wrapper.instance().updateSection(updateArg);

        expect(wrapper.state('isSaving')).toEqual(false);
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: defaultProps.sidebarPreference.grouping,
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });
        expect(newUpdateSection).toHaveBeenCalledTimes(1);
        expect(newUpdateSection).toHaveBeenCalledWith(updateArg);
    });

    test('should pass handleChange for channel grouping', () => {
        const props = {...defaultProps, activeSection: 'groupChannels'};
        const wrapper = mountWithIntl(
            <UserSettingsSidebar {...props}/>,
        );

        wrapper.find('#noneOption').simulate('change');
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'none',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });

        wrapper.find('#byTypeOption').simulate('change');
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'by_type',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });

        wrapper.find('#unreadAtTopOption').simulate('change', {target: {checked: false}});
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'by_type',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: 'false',
            favoriteAtTop: defaultProps.favoriteAtTop,
        });

        wrapper.find('#unreadAtTopOption').simulate('change', {target: {checked: true}});
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'by_type',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: 'true',
            favoriteAtTop: defaultProps.favoriteAtTop,
        });

        wrapper.find('#favoriteAtTopOption').simulate('change', {target: {checked: false}});
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'by_type',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: 'false',
        });

        wrapper.find('#favoriteAtTopOption').simulate('change', {target: {checked: true}});
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'by_type',
            sorting: defaultProps.sidebarPreference.sorting,
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: 'true',
        });
    });

    test('should pass handleChange for channel grouping', () => {
        const props: UserSettingsSidebarProps = {
            ...defaultProps,
            activeSection: 'groupChannels',
            sidebarPreference: {
                ...defaultProps.sidebarPreference,
                grouping: 'none',
            }};
        const wrapper = mountWithIntl(
            <UserSettingsSidebar {...props}/>,
        );

        wrapper.find('#recentSectionEnabled').simulate('change');
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'none',
            sorting: 'recent',
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });

        wrapper.find('#alphaSectionEnabled').simulate('change');
        expect(wrapper.state('settings')).toEqual({
            close_unused_direct_messages: defaultProps.closeUnusedDirectMessages,
            channel_switcher_section: defaultProps.channelSwitcherOption,
            grouping: 'none',
            sorting: 'alpha',
            unreadsAtTop: defaultProps.unreadsAtTop,
            favoriteAtTop: defaultProps.favoriteAtTop,
        });
    });
});
