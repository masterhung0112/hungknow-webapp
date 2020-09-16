import React from 'react'
import { storiesOf } from '@storybook/react'
import SignupController from './signupController'
import IntlProvider from 'components/intl-provider';

storiesOf('Sign Up Controller', module)
    .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
    .add(
        'default',
        () => {
            return (
                <SignupController />
            )
        }
    )