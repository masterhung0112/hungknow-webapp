import React from 'react'
import { storiesOf } from '@storybook/react'
import SignupController from './signupController'
import IntlProvider from 'components/intl-provider';
import mockNextRouter from 'mocks/mockNextRouter'

const baseProps = {
    isLicensed: true,
    enableSignUpWithEmail: false
}

storiesOf('Sign Up Controller', module)
    .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
    .add(
        'default',
        () => {
            return (
                <SignupController {...baseProps} />
            )
        }
    )
    .add(
        'enableSignUpWithEmail',
        () => {
            return (
                <SignupController {...baseProps} enableSignUpWithEmail="true" />
            )
        }
    )