// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {createSelector} from 'hkreselect';

import {createComplianceReport, getComplianceReports} from 'hkclient-redux/actions/admin';
import {getComplianceReports as selectComplianceReports, getConfig} from 'hkclient-redux/selectors/entities/admin';
import {getLicense} from 'hkclient-redux/selectors/entities/general';

import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {Compliance} from 'hkclient-redux/types/compliance';
import {GlobalState} from 'hkclient-redux/types/store';
import {UserProfile} from 'hkclient-redux/types/users';
import {Dictionary} from 'hkclient-redux/types/utilities';

import ComplianceReports from './compliance_reports';

type Actions = {
    getComplianceReports: () => Promise<{data: Compliance[]}>;
    createComplianceReport: (job: Partial<Compliance>) => Promise<{data: Compliance; error?: Error}>;
}

const getUsersForReports = createSelector(
    'getUsersForReports',
    (state: GlobalState) => state.entities.users.profiles,
    (state: GlobalState) => state.entities.admin.complianceReports,
    (users, reports) => {
        const usersMap: Dictionary<UserProfile> = {};
        Object.values(reports).forEach((r) => {
            const u = users[r.user_id];
            if (u) {
                usersMap[u.id] = u;
            }
        });
        return usersMap;
    },
);

function mapStateToProps(state: GlobalState) {
    const license = getLicense(state);
    const isLicensed = license.IsLicensed === 'true';

    let enabled = false;
    const config = getConfig(state);
    if (config && config.ComplianceSettings) {
        enabled = config.ComplianceSettings.Enable;
    }

    let serverError: string | undefined;
    const error = state.requests.admin.createCompliance.error;
    if (error) {
        serverError = error.message;
    }

    const reports = Object.values(selectComplianceReports(state)).sort((a, b) => {
        return b.create_at - a.create_at;
    });

    return {
        isLicensed,
        enabled,
        reports,
        serverError,
        users: getUsersForReports(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getComplianceReports,
            createComplianceReport,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplianceReports);
