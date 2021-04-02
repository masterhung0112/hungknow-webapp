import Link from 'next/link'
import React, { SyntheticEvent } from 'react'
import { FormattedMessage } from 'react-intl'

import logoImage from 'images/logo.png'
import SiteNameAndDescription from 'components/siteNameAndDescription'
import { Constants } from 'utils/constants'
import FormattedMarkdownMessage from 'components/formattedMarkdownMessage'
import cx from 'classnames'
import { Intent } from 'common'
import { Button, FormGroup, InputGroup } from 'core/components'
import { isEmail } from 'hkclient-ts/lib/utils/helpers'
import { isValidPassword, isValidUsername } from 'utils/utils.jsx'
import * as UserActions from 'hkclient-ts/lib/actions/users'
import * as TeamActions from 'hkclient-ts/lib/actions/teams'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { ActionCreatorClient, ActionResult } from 'hkclient-ts/lib/types/actions'
import Router from 'next/router'
import { setGlobalItem } from 'actions/storage'

import styles from './signupEmail.module.scss'

export interface SignupEmailProps {
  hasAccounts: boolean
  enableSignUpWithEmail: boolean
  customDescriptionText?: string
  siteName?: string
  passwordConfig: any
  termsOfServiceLink?: string
  privacyPolicyLink?: string
  actions: {
    createUser: ActionCreatorClient<typeof UserActions.createUser>
    loginById: ActionCreatorClient<typeof UserActions.loginById>
    getTeamInviteInfo: ActionCreatorClient<typeof TeamActions.getTeamInviteInfo>
    setGlobalItem: ActionCreatorClient<typeof setGlobalItem>
    redirectUserToDefaultTeam: () => void
  }
}

export type SignupEmailState = {
  loading: boolean
  emailError: string | React.ReactNode
  nameError: string | React.ReactNode
  passwordError: string | React.ReactNode
  inviteId: string
  email: string
  isSubmitting: boolean
  serverError: string
  token: string
  teamName: string
  redirectTo: string
}

export default class SignupEmail extends React.Component<SignupEmailProps, SignupEmailState> {
  emailRef = React.createRef<HTMLInputElement>()
  usernameRef = React.createRef<HTMLInputElement>()
  passwordRef = React.createRef<HTMLInputElement>()

  constructor(props: any) {
    super(props)

    this.state = {
      loading: true,
      emailError: '',
      nameError: '',
      passwordError: '',
      inviteId: '',
      email: '',
      isSubmitting: false,
      serverError: '',
      token: '',
      teamName: '',
      redirectTo: '',
    }
  }

  setDocumentTitle = (siteName: string) => {
    if (siteName) {
      document.title = siteName
    }
  }

  componentDidMount() {
    this.setDocumentTitle(this.props.siteName)

    const { query } = Router
    const data = query['d']
    const token = query['t']
    const inviteId = query['id']

    const redirect_to = query['redirect_to'] ?? ''

    this.setState((previousState: SignupEmailState) => {
      return {
        ...previousState,
        data,
        token,
        inviteId,
        redirectTo: redirect_to,
      } as SignupEmailState
    })
  }

  isUserValid = () => {
    const providedEmail = this.emailRef.current.value.trim()
    if (!providedEmail) {
      this.setState({
        nameError: '',
        emailError: <FormattedMessage id="signup_user_completed.required" />,
        passwordError: '',
        serverError: '',
      })
      return false
    }

    if (!isEmail(providedEmail)) {
      this.setState({
        nameError: '',
        emailError: <FormattedMessage id="signup_user_completed.validEmail" />,
        passwordError: '',
        serverError: '',
      })
      return false
    }

    const providedUsername = this.usernameRef.current.value.trim().toLowerCase()
    if (!providedUsername) {
      this.setState({
        nameError: <FormattedMessage id="signup_user_completed.required" />,
        emailError: '',
        passwordError: '',
        serverError: '',
      })
      return false
    }

    const usernameError = isValidUsername(providedUsername)
    if (usernameError.id === 'Cannot use a reserved word as a username.') {
      this.setState({
        nameError: <FormattedMessage id="signup_user_completed.reserved" />,
        emailError: '',
        passwordError: '',
        serverError: '',
      })
      return false
    } else if (usernameError) {
      this.setState({
        nameError: (
          <FormattedMessage
            id="signup_user_completed.usernameLength"
            values={{
              min: Constants.MIN_USERNAME_LENGTH,
              max: Constants.MAX_USERNAME_LENGTH,
            }}
          />
        ),
        emailError: '',
        passwordError: '',
        serverError: '',
      })
      return false
    }

    const providedPassword = this.passwordRef.current.value
    const { valid, error } = isValidPassword(providedPassword, this.props.passwordConfig)
    if (!valid && error) {
      this.setState({
        nameError: '',
        emailError: '',
        passwordError: error,
        serverError: '',
      })
      return false
    }

    return true
  }

  getRedirectTo(): string | undefined {
    const { query } = Router
    const redirectToMaybeArray = query['redirect_to']
    let redirectTo = ''

    if (Array.isArray(redirectToMaybeArray)) {
      redirectTo = redirectToMaybeArray[0]
    } else {
      redirectTo = redirectToMaybeArray
    }

    return redirectTo
  }

  handleSignupSuccess = (user: UserProfile, data: UserProfile) => {
    const { router } = Router
    const { redirectTo } = this.state
    // trackEvent('signup', 'signup_user_02_complete');

    this.props.actions.loginById(data.id, user.password, '').then((actionResult) => {
      const isOK = actionResult ? (actionResult as ActionResult) : (undefined as ActionResult)

      if (isOK && isOK.error) {
        if (isOK.error.server_error_id === 'api.user.login.not_verified.app_error') {
          let verifyUrl = '/should_verify_email?email=' + encodeURIComponent(user.email)
          if (this.state.teamName) {
            verifyUrl += '&teamname=' + encodeURIComponent(this.state.teamName)
          }
          if (redirectTo) {
            verifyUrl += '&redirect_to=' + redirectTo
          }
          router.push(verifyUrl)
        } else {
          this.setState({
            serverError: isOK.error.message,
            isSubmitting: false,
          })
        }

        return
      }

      if (this.state.token && this.state.token.length > 0) {
        this.props.actions.setGlobalItem(this.state.token, JSON.stringify({ usedBefore: true }))
      }

      if (redirectTo) {
        router.push(redirectTo)
      } else {
        this.props.actions.redirectUserToDefaultTeam()
      }
    })
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    // bail out if a submission is already in progress
    if (this.state.isSubmitting) {
      // return;
    }

    if (this.isUserValid()) {
      this.setState({
        nameError: '',
        emailError: '',
        passwordError: '',
        serverError: '',
        isSubmitting: true,
      })

      const user = {
        email: this.emailRef.current.value.trim(),
        username: this.usernameRef.current.value.trim().toLowerCase(),
        password: this.passwordRef.current.value,
        allow_marketing: true,
      } as UserProfile

      const redirectTo = this.getRedirectTo()

      this.props.actions.createUser(user, this.state.token, this.state.inviteId, redirectTo).then((result) => {
        const userProfile = result ? result : undefined
        if (userProfile && userProfile.error) {
          this.setState({
            serverError: userProfile.error.message,
            isSubmitting: false,
          })
          return
        }

        if (userProfile && userProfile.data) {
          this.handleSignupSuccess(user, userProfile.data)
        } else {
          console.error('createUser should return single result')
        }
      })
    }
  }

  renderEmailSignup() {
    return (
      <form>
        <div className="inner__content">
          <FormGroup
            label={
              <strong>
                <FormattedMessage id="signup_user_completed.whatis" defaultMessage="What's your email address?" />
              </strong>
            }
            labelFor="email"
            labelProps={{
              id: 'email_label',
            }}
            intent={this.state.emailError ? Intent.DANGER : Intent.PRIMARY}
            helperText={
              <>
                {this.state.emailError ? <span id="email-error">{this.state.emailError}</span> : null}
                {!this.state.emailError ? (
                  <span id="email-help">
                    <FormattedMessage
                      id="signup_user_completed.emailHelp"
                      defaultMessage="Valid email required for sign-up"
                    />
                  </span>
                ) : null}
              </>
            }
          >
            <InputGroup
              id="email"
              type="email"
              inputRef={this.emailRef}
              defaultValue={this.state.email}
              maxLength={128}
              autoFocus={true}
              spellCheck={false}
              autoCapitalize="off"
              intent={this.state.emailError ? Intent.DANGER : Intent.PRIMARY}
            />
          </FormGroup>
          {this.state.email ? (
            <FormattedMarkdownMessage
              id="signup_user_completed.emailIs"
              defaultMessage="Your email address is **{email}**. You'll use this address to sign in to {siteName}."
              values={{
                email: this.state.email,
                siteName: this.props.siteName,
              }}
            />
          ) : null}
          <div className="mt-8">
            <FormGroup
              label={
                <strong>
                  <FormattedMessage id="signup_user_completed.chooseUser" defaultMessage="Choose your username" />
                </strong>
              }
              labelFor="name"
              intent={this.state.nameError ? Intent.DANGER : Intent.PRIMARY}
              helperText={
                <>
                  {this.state.nameError ? <span id="name-error">{this.state.nameError}</span> : null}
                  {!this.state.nameError ? (
                    <span id="valid_name">
                      <FormattedMessage
                        id="signup_user_completed.userHelp"
                        defaultMessage="You can use lowercase letters, numbers, periods, dashes, and underscores."
                      />
                    </span>
                  ) : null}
                </>
              }
            >
              <InputGroup
                id="name"
                type="text"
                inputRef={this.usernameRef}
                maxLength={Constants.MAX_USERNAME_LENGTH}
                spellCheck={false}
                autoCapitalize="off"
                intent={this.state.nameError ? Intent.DANGER : Intent.PRIMARY}
              />
            </FormGroup>
          </div>
          <div className="mt-8">
            <FormGroup
              label={
                <strong>
                  <FormattedMessage id="signup_user_completed.choosePwd" defaultMessage="Choose your password" />
                </strong>
              }
              labelFor="password"
              intent={this.state.passwordError ? Intent.DANGER : Intent.PRIMARY}
              helperText={this.state.passwordError ? <span id="password-error">{this.state.passwordError}</span> : null}
            >
              <InputGroup
                id="password"
                type="password"
                inputRef={this.passwordRef}
                maxLength={128}
                spellCheck={false}
                autoCapitalize="off"
                intent={this.state.passwordError ? Intent.DANGER : Intent.PRIMARY}
              />
            </FormGroup>
          </div>
          <p className="mt-5">
            <Button
              id="createAccountButton"
              type="submit"
              onClick={this.handleSubmit}
              intent={Intent.PRIMARY}
              disabled={this.state.isSubmitting}
            >
              <FormattedMessage id="signup_user_completed.create" defaultMessage="Create Account" />
            </Button>
          </p>
        </div>
      </form>
    )
  }

  render() {
    const {
      customDescriptionText,
      enableSignUpWithEmail,
      privacyPolicyLink,
      siteName,
      termsOfServiceLink,
      hasAccounts,
    } = this.props
    const { redirectTo } = this.state

    let serverError = null
    if (this.state.serverError) {
      serverError = (
        <div id="existingEmailErrorContainer" className={'form-group has-error'}>
          <label className={styles['control-label']}>{this.state.serverError}</label>
        </div>
      )
    }

    let emailSignup
    if (enableSignUpWithEmail) {
      emailSignup = this.renderEmailSignup()
    } else {
      return <h1>You don't have any signup methods</h1>
      // emailSignup = this.renderEmailSignup()
    }

    return (
      <div>
        {/* {hasAccounts && <BackButton onClick={() => trackEvent('signup_email', 'click_back')}/>} */}
        <div id="signup_email_section" className="col-sm-12">
          <div className={cx(styles['signup-team__container'], styles['padding--less'])}>
            <img alt={'signup team logo'} className={styles['signup-team__container-logo']} src={logoImage} />
            <SiteNameAndDescription customDescriptionText={customDescriptionText} siteName={siteName} />
            <h4 id="create_account" className={styles['signup-create-action']}>
              <FormattedMessage id="signup_user_completed.lets" defaultMessage="Let's create your account" />
            </h4>
            <span id="signin_account" className={styles['signup-create-action']}>
              <FormattedMessage id="signup_user_completed.haveAccount" defaultMessage="Already have an account?" />{' '}
              <Link
                href={'/login' + redirectTo}
                // onClick={() => trackEvent('signup_email', 'click_signin_account')}
              >
                <a id="signin_account_link">
                  <FormattedMessage id="signup_user_completed.signIn" defaultMessage="Click here to sign in." />
                </a>
              </Link>
            </span>
            {emailSignup}
            {serverError}
            {/* {terms} */}
          </div>
        </div>
      </div>
    )
  }
}
