// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';
import {connect} from 'react-redux';

import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {sendVerificationEmail} from 'hkclient-redux/actions/users';
import {GenericAction, ActionFunc} from 'hkclient-redux/types/actions';
import {GlobalState} from 'hkclient-redux/types/store';

import ShouldVerifyEmail from './should_verify_email';

type Actions = {
    sendVerificationEmail: (email: string) => Promise<{
        data: boolean;
        error?: {
            err: string;
        };
    }>;
}

const mapStateToProps = (state: GlobalState) => {
    const {SiteName: siteName} = getConfig(state);
    return {siteName};
};

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
        sendVerificationEmail,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShouldVerifyEmail);
