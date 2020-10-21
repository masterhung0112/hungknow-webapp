import { bindActionCreators } from 'redux'

import SignupEmailComponent from 'components/signup/signupEmail'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { connect } from 'react-redux'
import { createUser, loginById } from 'hkclient-ts/lib/actions/users'
import { getTeamInviteInfo } from 'hkclient-ts/lib/actions/teams'
import { getPasswordConfig } from 'hkclient-ts/lib/utils/helpers'
import { DispatchFunc } from 'hkclient-ts/lib/types/actions'
import { wrapper } from 'stores/redux_store'
import { loadMeAndConfig } from 'actions/views/root'
import { setGlobalItem } from 'actions/storage'
import { redirectUserToDefaultTeam } from 'actions/global_actions'
import { IModuleStore } from 'redux-dynamic-modules'
import { GeneralModule } from 'hkclient-ts/lib/modules/general'

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  ;(store as IModuleStore<any>).addModule(GeneralModule)

  var results = await store.dispatch(loadMeAndConfig())
  if (results && results[0] && results[0].error) {
    //TODO: Remove this
    console.error('loadMeAndConfig error: ', results[0].error)
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
        setGlobalItem,
        getTeamInviteInfo,
        redirectUserToDefaultTeam,
      },
      dispatch
    ),
  }
}

export default connect(null, mapDispatchToProps)(SignupEmailComponent)
