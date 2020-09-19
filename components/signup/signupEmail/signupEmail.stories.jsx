import React from 'react'
import { storiesOf } from '@storybook/react'
import SignupEmail from './signupEmail'

const baseProps = {
    location: '',
    hasAccounts: false,
    enableSignUpWithEmail: true,
    customDescriptionText: undefined,
    siteName: 'Hung Know'
}

storiesOf('Sign Up Email', module)
    .add(
        'Enable Email',
        () => {
            return (
                <SignupEmail {...baseProps} />
            )
        }
    )