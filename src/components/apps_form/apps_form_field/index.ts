// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {Channel} from 'hkclient-redux/types/channels';
import {UserProfile} from 'hkclient-redux/types/users';

import {getTeammateNameDisplaySetting} from 'hkclient-redux/selectors/entities/preferences';

import {GlobalState} from 'hkclient-redux/types/store';

import {autocompleteChannels} from 'actions/channel_actions';
import {autocompleteUsers} from 'actions/user_actions';

import AppsFormField from './apps_form_field';

function mapStateToProps(state: GlobalState) {
    return {
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
    };
}
type Actions = {
    autocompleteChannels: (term: string, success: (channels: Channel[]) => void, error: () => void) => (dispatch: any, getState: any) => Promise<void>;
    autocompleteUsers: (search: string) => Promise<UserProfile[]>;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            autocompleteChannels,
            autocompleteUsers,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppsFormField);
