import React from 'react'
import { shallow } from 'enzyme'
import SignupEmail, { SignupEmailProps } from './signupEmail'
import { render, fireEvent } from '@testing-library/react'
import { defaultIntl, wrapIntlProvider, translationData } from 'hktest/intlProvider'
import '@testing-library/jest-dom'
import { PasswordConfig } from 'hkclient-ts/types/config'
import userEvent from '@testing-library/user-event'
import { General } from 'hkclient-ts/constants'

describe('components/SignupEmail', () => {
    const baseProps = {
        location: { search: 'search_path' },
        hasAccounts: false,
        enableSignUpWithEmail: true,
        customDescriptionText: undefined,
        siteName: 'Hung Know',
        passwordConfig: {
            minimumLength: 3,
            requireLowercase: false,
            requireNumber: false,
            requireSymbol: false,
            requireUppercase: false
        } as PasswordConfig,
        actions: {
            createUser: jest.fn()
        }
    } as SignupEmailProps

    it('has enough fields', () => {
        const wrapper = shallow(<SignupEmail {...baseProps} />);
        // console.log(wrapper.debug())
        const emailFormGroup = wrapper.find('FormGroup[labelFor="email"]')
        expect(emailFormGroup.exists()).toBeTruthy()
        const emailInputGroup = emailFormGroup.find('InputGroup[type="email"]')
        expect(emailInputGroup.exists()).toBeTruthy()

        const usernameFormGroup = wrapper.find('FormGroup[labelFor="name"]')
        expect(usernameFormGroup.exists()).toBeTruthy()
        const usernameInputGroup = usernameFormGroup.find('InputGroup[type="text"]')
        expect(usernameInputGroup.exists()).toBeTruthy()

        const passwordFormGroup = wrapper.find('FormGroup[labelFor="password"]')
        expect(passwordFormGroup.exists()).toBeTruthy()
        const passwordInputGroup = passwordFormGroup.find('InputGroup[type="password"]')
        expect(passwordInputGroup.exists()).toBeTruthy()
    })

    test('field has error message when invalid input', () => {
        const createUser = jest.fn().mockResolvedValue({data: true});

        const { getByText, queryByText, getByLabelText, unmount, container } = render(wrapIntlProvider(<SignupEmail {...baseProps} actions={{createUser: createUser}} />));

        // Check email help text display by default
        expect(queryByText(translationData['signup_user_completed.emailHelp'])).toBeInTheDocument()
        expect(queryByText(translationData['signup_user_completed.required'])).not.toBeInTheDocument()

        expect(queryByText(translationData['signup_user_completed.userHelp'])).toBeInTheDocument()
        // expect(queryByText(translationData['signup_user_completed.required'])).not.toBeInTheDocument()

        const createButton = getByText(translationData['signup_user_completed.create'])
        // Click create button, we expect error message displaying on every fields
        fireEvent.click(createButton)

        // Check email error not to be displayed
        expect(queryByText(translationData['signup_user_completed.emailHelp'])).not.toBeInTheDocument()
        expect(queryByText(translationData['signup_user_completed.required'])).toBeInTheDocument()

        // When email error is displaying, the user help is still displaying
        expect(queryByText(translationData['signup_user_completed.userHelp'])).toBeInTheDocument()

        expect(queryByText(translationData['signup_user_completed.validEmail'])).not.toBeInTheDocument()

        const emailInput = getByLabelText(translationData['signup_user_completed.whatis'])
        // Input invalid email, hope error message appear
        // fireEvent.change(emailInput, { target: { value: 'invalid_email' } })

        userEvent.type(emailInput, 'invalid_email')

        fireEvent.click(createButton)
        expect(queryByText(translationData['signup_user_completed.validEmail'])).toBeInTheDocument()

        // Input valid email, hope error message disappear
        // fireEvent.change(emailInput, { target: { value: 'valid_email@gmail.com' } })
        userEvent.clear(emailInput)
        userEvent.type(emailInput, 'valid_email@gmail.com')
        fireEvent.click(createButton)
        expect(queryByText(translationData['signup_user_completed.validEmail'])).not.toBeInTheDocument()

        const usernameInput = getByLabelText(translationData['signup_user_completed.chooseUser'])
        
        // Input reserved username, hope error message appear
        userEvent.clear(usernameInput)
        userEvent.type(usernameInput, 'hungknowbot')
        fireEvent.click(createButton)
        expect(queryByText(translationData['signup_user_completed.reserved'])).toBeInTheDocument()

        // Input invalid username, hope error message appear
        userEvent.clear(usernameInput)
        userEvent.type(usernameInput, 'a')
        fireEvent.click(createButton)

        // Generate final message
        const usernameLength = defaultIntl.formatMessage({ id: 'signup_user_completed.usernameLength' }, {
            min: General.MIN_USERNAME_LENGTH,
            max: General.MAX_USERNAME_LENGTH,
        })
        expect(queryByText(usernameLength)).toBeInTheDocument()

        // Input invalid username, hope error message appear
        userEvent.clear(usernameInput)
        userEvent.type(usernameInput, 'HungBui')

        const passwordInput = getByLabelText(translationData['signup_user_completed.choosePwd'])
        userEvent.clear(passwordInput)
        userEvent.type(passwordInput, 'password@')
        
        // Never call createUser method before
        expect(createUser).toBeCalledTimes(0)
        fireEvent.click(createButton)
        expect(container.querySelector('#email-error')).toBeNull()
        expect(container.querySelector('#name-error')).toBeNull()
        expect(container.querySelector('#password-error')).toBeNull()
        expect(createUser).toBeCalledTimes(1)

        unmount()
    })
})