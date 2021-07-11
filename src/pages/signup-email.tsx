import {bindActionCreators} from 'redux';

import SignupEmailComponent from 'components/signup/signupEmail';

import {connect} from 'react-redux';

import {getPasswordConfig} from 'utils/utils.jsx';

import {wrapper} from 'stores/redux_store';
import {loadMeAndConfig} from 'actions/views/root';
import {setGlobalItem} from 'actions/storage';
import {redirectUserToDefaultTeam} from 'actions/global_actions';

import {getTeamInviteInfo} from 'hkclient-redux/actions/teams';
import {DispatchFunc} from 'hkclient-redux/types/actions';
import {GlobalState} from 'hkclient-redux/types/store';
import {createUser, loginById} from 'hkclient-redux/actions/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
    const results = await store.dispatch(loadMeAndConfig());
    if (results && results.error) {
    //TODO: Remove this
        console.error('loadMeAndConfig error: ', results.error);
    }

    return {
        props: JSON.parse(JSON.stringify(mapStateToProps(store.getState()))),
    };
});

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    const enableSignUpWithEmail = config.EnableSignUpWithEmail === 'true';
    const siteName = config.SiteName;
    const termsOfServiceLink = config.TermsOfServiceLink;
    const privacyPolicyLink = config.PrivacyPolicyLink;
    const customDescriptionText = config.CustomDescriptionText;
    const hasAccounts = config.NoAccounts === 'false';

    return {
        hasAccounts,
        enableSignUpWithEmail,
        customDescriptionText,
        siteName,
        passwordConfig: getPasswordConfig(config),
        termsOfServiceLink,
        privacyPolicyLink,
    };
}

function mapDispatchToProps(dispatch: DispatchFunc) {
    return {
        actions: bindActionCreators(
            {
                createUser,
                loginById,
                setGlobalItem,
                getTeamInviteInfo,
                redirectUserToDefaultTeam,
            },
            dispatch,
        ),
    };
}

export default connect(null, mapDispatchToProps)(SignupEmailComponent);
