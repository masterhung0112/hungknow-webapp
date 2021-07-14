import React from 'react';
import {storiesOf} from '@storybook/react';

import {UserProfile} from 'hkclient-redux/types/users';
import {ActionResultType} from 'hkclient-redux/types/actions';

import SignupEmail, {SignupEmailProps} from './signupEmail';

const baseProps: any = {
    hasAccounts: false,
    enableSignUpWithEmail: true,
    customDescriptionText: undefined,
    siteName: 'Hung Know',
    passwordConfig: {
        minimumLength: 3,
        requireLowercase: false,
        requireNumber: false,
        requireSymbol: false,
        requireUppercase: false,
    },
    actions: {
        createUser: async (
            user: UserProfile,
            token: string,
            inviteId: string,
            redirect: string,
        ): Promise<ActionResultType> => {
            return {
                data: true,
            };
        },
        loginById: async (id: string, password: string, mfaToken?: string): Promise<ActionResultType> => {
            return {
                data: true,
            };
        },
    },
    privacyPolicyLink: undefined,
    termsOfServiceLink: undefined,
} as SignupEmailProps;

storiesOf('Sign Up Email', module).add('Enable Email', () => {
    return <SignupEmail {...baseProps}/>;
});
