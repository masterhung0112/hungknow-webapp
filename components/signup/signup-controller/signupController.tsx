import { Utils } from 'common';
import FormError from 'components/formError';
import React from 'react'
import { FormattedMessage } from 'react-intl';
import { Utils as WebUtils } from 'utils'
import Router from 'next/router'


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
        super(props);

        let loading = false;
        let serverError = '';
        let noOpenServerError = false;
        let usedBefore = false;


        this.state = {
            loading,
            serverError,
            noOpenServerError,
            usedBefore,
        }
    }

    renderSignupControls = () => {
        let signupControls: any[] = [];

        if (signupControls.length === 0) {
            const signupDisabledError = (
                <FormattedMessage
                    id='signup_user_completed.none'
                    defaultMessage='No user creation method has been enabled. Please contact an administrator for access.'
                />
            );
            signupControls = [(
                <FormError
                    error={signupDisabledError}
                    margin={true}
                />
            )]
        } else if (signupControls.length === 1) {
            var { pathname, router } = Router

            if (this.props.enableSignUpWithEmail) {
                return router.push('/signup_email' + window.location.search);
            } 
           
            //TODO: Open
            // else if (this.props.isLicensed && this.props.enableLDAP) {
            //     return browserHistory.push('/login' + window.location.search);
            // }
        }

        return signupControls;
    }

    render() {
        if (this.state.loading) {
        }

        if (this.state.usedBefore) {
            return (
                <div>
                    <FormattedMessage
                        id='signup_user_completed.expired'
                        defaultMessage="You've already completed the signup process for this invitation or this invitation has expired."
                    />
                </div>
            )
        }

        let serverError = null;
        if (this.state.serverError) {
            serverError = (
                <div className={'form-group has-error'}>
                    <label className='control-label'>{this.state.serverError}</label>
                </div>
            );
        }

        let signupControls;
        if (this.state.noOpenServerError || this.state.usedBefore) {
            signupControls = null;
        } else {
            signupControls = this.renderSignupControls();
        }

        return (
            <div>
                <div className='col-sm-12'>
                    <div className='signup-team__container'>
                        <div className='signup__content'>
                            {signupControls}
                            {serverError}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}