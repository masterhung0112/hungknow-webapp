import Link from 'next/link';
import React, { SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import logoImage from 'images/logo.png';
import SiteNameAndDescription from 'components/siteNameAndDescription'
import { Constants } from 'utils/constants';
import FormattedMarkdownMessage from 'components/formattedMarkdownMessage'
import cx from 'classnames'
import styles from './signupEmail.module.scss'
import { CssClasses } from 'common'

type Props = {
    location: any
    hasAccounts: boolean
    enableSignUpWithEmail: boolean
    customDescriptionText?: string
    siteName?: string
}

type State = {
    loading: boolean,
    emailError: boolean,
    nameError: boolean,
    passwordError: boolean,
    inviteId: string,
    email: string,
    isSubmitting: boolean,
    serverError: string
}

export default class SignupEmail extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        // styles.
        const inviteId = ''// (new URLSearchParams(this.props.location.search)).get('id');

        this.state = {
            loading: true,
            emailError: false,
            nameError: false,
            passwordError: false,
            inviteId,
            email: '',
            isSubmitting: false,
            serverError: ''
        }
    }

    handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    renderEmailSignup() {

        let emailDivStyle = cx(
            CssClasses.FORMGROUP,
            {
                [CssClasses.FORMGROUP_HAS_ERROR]: this.state.emailError
            }
        )

        let nameDivStyle = cx(
            CssClasses.FORMGROUP,
            {
                [CssClasses.FORMGROUP_HAS_ERROR]: this.state.nameError
            }
        )

        let passwordDivStyle = cx(
            CssClasses.FORMGROUP,
            {
                [CssClasses.FORMGROUP_HAS_ERROR]: this.state.passwordError
            }
        )

        let emailContainerStyle = 'mt-8';
        if (this.state.email) {
            emailContainerStyle = 'hidden';
        }

        return (
            <form>
                <div className='inner__content'>
                    <div className={emailContainerStyle}>
                        <h5 id='email_label'>
                            <strong>
                                <FormattedMessage
                                    id='signup_user_completed.whatis'
                                    defaultMessage="What's your email address?"
                                />
                            </strong>
                        </h5>
                        <div className={emailDivStyle}>
                            <input
                                id='email'
                                type='email'
                                ref='email'
                                className={CssClasses.FORMCONTROL}
                                defaultValue={this.state.email}
                                placeholder=''
                                maxLength={128}
                                autoFocus={true}
                                spellCheck='false'
                                autoCapitalize='off'
                            />
                            {this.state.emailError ? <label className={styles['control-label']}>{this.state.emailError}</label> : null}
                            {!this.state.emailError ? <span
                                id='valid_email'
                                className={styles['form-input-help-text']}
                            >
                                <FormattedMessage
                                    id='signup_user_completed.emailHelp'
                                    defaultMessage='Valid email required for sign-up'
                                />
                            </span> : null}
                        </div>
                    </div>
                    {this.state.email ?
                        <FormattedMarkdownMessage
                            id='signup_user_completed.emailIs'
                            defaultMessage="Your email address is **{email}**. You'll use this address to sign in to {siteName}."
                            values={{
                                email: this.state.email,
                                siteName: this.props.siteName,
                            }}
                        />
                        : null}
                    <div className='mt-8'>
                        <h5 id='name_label'>
                            <strong>
                                <FormattedMessage
                                    id='signup_user_completed.chooseUser'
                                    defaultMessage='Choose your username'
                                />
                            </strong>
                        </h5>
                        <div className={nameDivStyle}>
                            <input
                                id='name'
                                type='text'
                                ref='name'
                                className={CssClasses.FORMCONTROL}
                                placeholder=''
                                maxLength={Constants.MAX_USERNAME_LENGTH}
                                spellCheck='false'
                                autoCapitalize='off'
                            />
                            {this.state.nameError ? <label className={styles['control-label']}>{this.state.nameError}</label> : null}
                            {!this.state.nameError ? <span
                                id='valid_name'
                                className={styles['form-input-help-text']}
                            >
                                <FormattedMessage
                                    id='signup_user_completed.userHelp'
                                    defaultMessage='You can use lowercase letters, numbers, periods, dashes, and underscores.'
                                />
                            </span> : null}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h5 id='password_label'>
                            <strong>
                                <FormattedMessage
                                    id='signup_user_completed.choosePwd'
                                    defaultMessage='Choose your password'
                                />
                            </strong>
                        </h5>
                        <div className={passwordDivStyle}>
                            <input
                                id='password'
                                type='password'
                                ref='password'
                                className={CssClasses.FORMCONTROL}
                                placeholder=''
                                maxLength={128}
                                spellCheck='false'
                            />
                            {this.state.passwordError ? <label className={styles['control-label']}>{this.state.passwordError}</label> : null}
                        </div>
                    </div>
                    <p className='mt-5'>
                        <button
                            id='createAccountButton'
                            type='submit'
                            onClick={this.handleSubmit}
                            className={cx(CssClasses.BUTTON, CssClasses.INTENT_PRIMARY)}
                            disabled={this.state.isSubmitting}
                        >
                            <FormattedMessage
                                id='signup_user_completed.create'
                                defaultMessage='Create Account'
                            />
                        </button>
                    </p>
                </div>
            </form>
        )
    }

    render() {
        const {
            customDescriptionText,
            enableSignUpWithEmail,
            location,
            // privacyPolicyLink,
            siteName,
            // termsOfServiceLink,
            hasAccounts,
        } = this.props;

        let serverError = null;
        if (this.state.serverError) {
            serverError = (
                <div
                    id='existingEmailErrorContainer'
                    className={'form-group has-error'}
                >
                    <label className={styles['control-label']}>{this.state.serverError}</label>
                </div>
            );
        }

        let emailSignup;
        if (enableSignUpWithEmail) {
            emailSignup = this.renderEmailSignup();
        } else {
            return null;
        }

        return (
            <div>
                {/* {hasAccounts && <BackButton onClick={() => trackEvent('signup_email', 'click_back')}/>} */}
                <div
                    id='signup_email_section'
                    className='col-sm-12'
                >
                    <div className={cx(styles['signup-team__container'], styles['padding--less'])}>
                        <img
                            alt={'signup team logo'}
                            className={styles['signup-team__container-logo']}
                            src={logoImage}
                        />
                        <SiteNameAndDescription
                            customDescriptionText={customDescriptionText}
                            siteName={siteName}
                        />
                        <h4
                            id='create_account'
                            className={styles['signup-create-action']}
                        >
                            <FormattedMessage
                                id='signup_user_completed.lets'
                                defaultMessage="Let's create your account"
                            />
                        </h4>
                        <span
                            id='signin_account'
                            className={styles['signup-create-action']}
                        >
                            <FormattedMessage
                                id='signup_user_completed.haveAccount'
                                defaultMessage='Already have an account?'
                            />
                            {' '}
                            <Link
                                href={'/login'}//</span> + location.search}
                            // onClick={() => trackEvent('signup_email', 'click_signin_account')}
                            >
                                {/* <FormattedMessage
                                    id='signup_user_completed.signIn'
                                    tagName='a'
                                    defaultMessage='Click here to sign in.'
                                /> */}
                                Click here to sign in.
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