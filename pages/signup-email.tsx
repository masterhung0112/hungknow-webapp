import React from 'react'
import { bindActionCreators } from 'redux'

import SignupEmailComponent from 'components/signup/signupEmail';
import { getConfig } from 'hkclient-ts/selectors/entities/general';
import { GlobalState } from 'hkclient-ts/types/store';
import { connect } from 'react-redux';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state)

    const enableSignUpWithEmail = true//config.EnableSignUpWithEmail === 'true';
    const siteName = config.SiteName;
    const termsOfServiceLink = config.TermsOfServiceLink;
    const privacyPolicyLink = config.PrivacyPolicyLink;
    const customDescriptionText = config.CustomDescriptionText;
    const hasAccounts = config.NoAccounts === 'false';

    return {
        enableSignUpWithEmail,
        siteName,
        termsOfServiceLink,
        privacyPolicyLink,
        customDescriptionText,
        passwordConfig: {}, //getPasswordConfig(config),
        hasAccounts,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators({
            // createUser,
            // loginById,
            // setGlobalItem,
            // getTeamInviteInfo,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailComponent);