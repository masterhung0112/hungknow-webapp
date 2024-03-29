// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setNavigationBlocked} from 'actions/admin_actions.jsx';

import {loadRolesIfNeeded, editRole} from 'hkclient-redux/actions/roles';

import {getRoles} from 'hkclient-redux/selectors/entities/roles';
import {getLicense, getConfig} from 'hkclient-redux/selectors/entities/general';
import {getScheme, makeGetSchemeTeams} from 'hkclient-redux/selectors/entities/schemes';

import {getScheme as loadScheme, patchScheme, createScheme, getSchemeTeams as loadSchemeTeams} from 'hkclient-redux/actions/schemes';

import {updateTeamScheme} from 'hkclient-redux/actions/teams';

import PermissionTeamSchemeSettings from './permission_team_scheme_settings.jsx';

function makeMapStateToProps() {
    const getSchemeTeams = makeGetSchemeTeams();

    return (state, ownProps) => {
        const schemeId = ownProps.match.params.scheme_id;
        return {
            config: getConfig(state),
            license: getLicense(state),
            schemeId,
            scheme: schemeId ? getScheme(state, schemeId) : null,
            teams: schemeId ? getSchemeTeams(state, {schemeId}) : null,
            roles: getRoles(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadRolesIfNeeded,
            loadScheme,
            loadSchemeTeams,
            editRole,
            patchScheme,
            updateTeamScheme,
            createScheme,
            setNavigationBlocked,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PermissionTeamSchemeSettings);
