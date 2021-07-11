import React from 'react';
import {storiesOf} from '@storybook/react';

import mockNextRouter from 'mocks/mockNextRouter';

import SignupController from './signupController';

const baseProps = {
    isLicensed: true,
    enableSignUpWithEmail: false,
};

storiesOf('Sign Up Controller', module).
    add('default', () => {
        return <SignupController {...baseProps}/>;
    }).
    add('enableSignUpWithEmail', () => {
        return (<SignupController
            {...baseProps}
            enableSignUpWithEmail='true'
        />);
    });
