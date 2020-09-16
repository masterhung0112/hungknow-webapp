import React from 'react'
import { storiesOf } from '@storybook/react'
import SignupEmail from './signupEmail'
import IntlProvider from 'components/intl-provider';

const baseProps = {
}

storiesOf('Sign Up Email', module)
    .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
    .add(
        'default',
        () => {
            return (
                <SignupEmail {...baseProps} />
            )
        }
    )