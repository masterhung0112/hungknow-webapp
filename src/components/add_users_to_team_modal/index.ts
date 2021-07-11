// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {Team} from 'hkclient-redux/types/teams';
import {UserProfile} from 'hkclient-redux/types/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction, ActionFunc} from 'hkclient-redux/types/actions';

import {getProfilesNotInTeam, searchProfiles} from 'hkclient-redux/actions/users';

import {getProfilesNotInTeam as selectProfilesNotInTeam} from 'hkclient-redux/selectors/entities/users';

import AddUsersToTeamModal from './add_users_to_team_modal';

type Props = {
    team: Team;
    filterExcludeGuests?: boolean;
};

type Actions = {
    getProfilesNotInTeam: (teamId: string, groupConstrained: boolean, page: number, perPage?: number, options?: {[key: string]: any}) => Promise<{ data: UserProfile[] }>;
    searchProfiles: (term: string, options?: any) => Promise<{ data: UserProfile[] }>;
};

function mapStateToProps(state: GlobalState, props: Props) {
    const {id: teamId} = props.team;

    let filterOptions: {[key: string]: any} = {active: true};
    if (props.filterExcludeGuests) {
        filterOptions = {role: 'system_user', ...filterOptions};
    }

    const users: UserProfile[] = selectProfilesNotInTeam(state, teamId, filterOptions);

    return {
        users,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getProfilesNotInTeam,
            searchProfiles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToTeamModal);
