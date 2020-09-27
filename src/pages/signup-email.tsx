import { bindActionCreators } from 'redux'

import SignupEmailComponent from 'components/signup/signupEmail'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { connect } from 'react-redux'
import { createUser, loginById } from 'hkclient-ts/lib/actions/users'
import { getPasswordConfig } from 'hkclient-ts/lib/utils/helpers'
import { DispatchFunc } from 'hkclient-ts/lib/types/actions'
import { wrapper } from 'stores/redux_store'
import { loadMeAndConfig } from 'actions/views/root'

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   // store.dispatch(serverRenderClock(true))
//   // store.dispatch(addCount())
  var results = await store.dispatch(loadMeAndConfig())
  if (results && results[0] && results[0].error) {
    console.log('error1 @###: ', results[0].error)
  } else {
    // console.log('state1 @###: ', JSON.parse(JSON.stringify(mapStateToProps(store.getState()))))
  }
  return {
    props: JSON.parse(JSON.stringify(mapStateToProps(store.getState()))),
  }
})

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

export default connect(null, mapDispatchToProps)(SignupEmailComponent)
