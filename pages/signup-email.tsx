import { bindActionCreators } from 'redux'

import SignupEmailComponent from 'components/signup/signupEmail'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { connect } from 'react-redux'
import { createUser, loginById } from 'hkclient-ts/lib/actions/users'
import { getPasswordConfig } from 'hkclient-ts/lib/utils/helpers'
import { DispatchFunc } from 'hkclient-ts/lib/types/actions'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)

  const enableSignUpWithEmail = config.EnableSignUpWithEmail === 'true'
  const siteName = config.SiteName
  const termsOfServiceLink = config.TermsOfServiceLink
  const privacyPolicyLink = config.PrivacyPolicyLink
  const customDescriptionText = config.CustomDescriptionText
  const hasAccounts = config.NoAccounts === 'false'

  return {
    hasAccounts,
    enableSignUpWithEmail,
    customDescriptionText,
    siteName,
    passwordConfig: getPasswordConfig(config),
    termsOfServiceLink,
    privacyPolicyLink,
  }
}

function mapDispatchToProps(dispatch: DispatchFunc) {
  return {
    actions: bindActionCreators(
      {
        createUser,
        loginById,
        // setGlobalItem,
        // getTeamInviteInfo,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailComponent)
