import React from 'react'
import { storiesOf } from '@storybook/react'
import SignupEmail from './signupEmail'
import IntlProvider from 'components/intl-provider';

const baseProps = {
    location: '',
    hasAccounts: false,
    enableSignUpWithEmail: true,
    customDescriptionText: undefined,
    siteName: 'Hung Know'
}

storiesOf('Sign Up Email', module)
    .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
    .add(
        'Enable Email',
        () => {
            return (
                <SignupEmail {...baseProps} />
            )
        }
    )