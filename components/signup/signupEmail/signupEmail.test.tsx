import React from 'react'
import {shallow} from 'enzyme'
import SignupEmail, { SignupEmailProps } from './signupEmail'

describe('components/SignupEmail', () => {
    const baseProps = {
        location: { search: 'search_path' },
        hasAccounts: false,
        enableSignUpWithEmail: true,
        customDescriptionText: undefined,
        siteName: 'Hung Know'
    } as SignupEmailProps

    it('has enough fields', () => {
        const wrapper = shallow(<SignupEmail {...baseProps}/>);
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

    test('field has intent-danger for error', () => {
        const wrapper = shallow(<SignupEmail {...baseProps}/>);
        const emailFormGroup = wrapper.find('FormGroup[labelFor="email"]')
        const emailInputGroup = emailFormGroup.find('InputGroup[type="email"]')
        // Check 
        wrapper.setState({ emailError: true })
        
    })
})