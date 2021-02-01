import FormError from 'components/formError'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import Link from 'next/link'
import LocalizedIcon from 'components/localizedIcon'
import { t } from 'utils/i18n'

type SignupControllerProps = {
  isLicensed: boolean
  enableSignUpWithEmail: boolean
}

type SignupControllerState = {
  loading: boolean
  serverError: string
  noOpenServerError: boolean
  usedBefore: boolean
}

export default class SignupController extends React.PureComponent<SignupControllerProps, SignupControllerState> {
  constructor(props: SignupControllerProps) {
    super(props)

    const loading = false
    const serverError = ''
    const noOpenServerError = false
    const usedBefore = false

    this.state = {
      loading,
      serverError,
      noOpenServerError,
      usedBefore,
    }
  }

  renderSignupControls = () => {
    let signupControls: any[] = []

    if (this.props.enableSignUpWithEmail) {
      signupControls.push(
        <Link
          // className="btn btn-custom-login btn--full email"
          key="email"
          href={'/signup_email' + window.location.search}
        >
          <span className="btn btn-custom-login btn--full email">
            <LocalizedIcon
              className="icon fa fa-envelope"
              component="span"
              title={{
                id: t('signup.email.icon'),
                defaultMessage: 'Email Icon',
              }}
            />
            <FormattedMessage id="signup.email" defaultMessage="Email and Password" />
          </span>
        </Link>
      )
    }

    if (signupControls.length === 0) {
      const signupDisabledError = (
        <FormattedMessage
          id="signup_user_completed.none"
          defaultMessage="No user creation method has been enabled. Please contact an administrator for access."
        />
      )
      signupControls = [<FormError key="signup-disabled-error" error={signupDisabledError} margin={true} />]
    } else if (signupControls.length === 1) {
      const { router } = Router

      // In case there is only one method of login and that is using with email, jump directly to page
      if (this.props.enableSignUpWithEmail) {
        //TODO: Fix this for flicker
        router.push('/signup-email' + window.location.search)
        return signupControls
      }

      //TODO: Open
      // else if (this.props.isLicensed && this.props.enableLDAP) {
      //     return browserHistory.push('/login' + window.location.search);
      // }
    }

    return signupControls
  }

  render() {
    // if (this.state.loading) {
    // }

    if (this.state.usedBefore) {
      return (
        <div>
          <FormattedMessage
            id="signup_user_completed.expired"
            defaultMessage="You've already completed the signup process for this invitation or this invitation has expired."
          />
        </div>
      )
    }

    let serverError = null
    if (this.state.serverError) {
      serverError = (
        <div className={'form-group has-error'}>
          <label className="control-label">{this.state.serverError}</label>
        </div>
      )
    }

    let signupControls
    if (this.state.noOpenServerError || this.state.usedBefore) {
      signupControls = null
    } else {
      signupControls = this.renderSignupControls()
    }

    return (
      <div>
        <div className="col-sm-12">
          <div className="signup-team__container">
            <div className="signup__content">
              {signupControls}
              {serverError}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
