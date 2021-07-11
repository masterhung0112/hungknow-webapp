// Copyright (c) 2021-present Hungknow. All Rights Reserved.
// See LICENSE-HungKnow.txt for license information.

import React from 'react';

import {CssClasses} from 'common';
import {fireEvent, render} from '@testing-library/react';

import Icon from '../icon';

import InputGroup from './inputGroup';
import '@testing-library/jest-dom';

describe('<InputGroup>', () => {
    it('supports custom props', () => {
        const renderResult = render(<InputGroup
            style={{background: 'yellow'}}
            tabIndex={4}
        />);
        const inputElement = renderResult.container.querySelector('input');

        // Check if <input> element exists
        expect(inputElement).toBeInTheDocument();

        // Check if the props is equal to what is input
        const inputElementDom = inputElement as HTMLElement;
        expect(inputElementDom.style.background).toEqual('yellow');
        expect(inputElementDom.tabIndex).toEqual(4);
    });

    it('would work like a text input', () => {
        const onChangeMock = jest.fn();
        const renderResult = render(<InputGroup
            value='value'
            onChange={onChangeMock}
            data-testid={'input-test'}
        />);
        const inputElement = renderResult.getByTestId('input-test');
        expect(inputElement).toBeInTheDocument();

        // Check if the default value for input is "text" and value is value
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('value', 'value');

        const mockEvent = {
            preventDefault() {},
            target: {value: 'test-value'},
        } as React.ChangeEvent<HTMLInputElement>;
        fireEvent.change(inputElement, mockEvent);

        expect(onChangeMock).toHaveBeenCalledTimes(1);

    //TODO: Find out how to chec
    // expect(onChangeMock).toHaveBeenCalledWith(mockEvent)
    });

    it('supports custom type attribute', () => {
        const emailInput = render(<InputGroup
            type='email'
            data-testid={'email'}
        />).getByTestId('email');
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = render(<InputGroup
            type='password'
            data-testid={'password'}
        />).getByTestId('password');
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('supports inputRef', () => {
        let input: HTMLInputElement | null = null;

        // tslint:disable-next-line:jsx-no-lambda
        render(<InputGroup inputRef={(ref) => (input = ref)}/>);
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('renders left icon before input', () => {
        const renderResult = render(<InputGroup
            leftIcon='star'
            data-testid='input-test'/>);
        expect(renderResult.container.querySelector('[data-icon="star"]')).toBeInTheDocument();
        expect(renderResult.container.querySelector('input').classList.contains(CssClasses.INPUT)).toEqual(true);
    });

    it(`renders right element inside .${CssClasses.INPUT_ACTION} after input`, () => {
        const renderResult = render(<InputGroup
            rightElement={<address/>}
            data-testid='input-test'/>);
        const action = renderResult.container.querySelector('span');
        expect(action).toBeInTheDocument();
        expect(action.classList.contains(CssClasses.INPUT_ACTION)).toEqual(true);
        expect(action.querySelectorAll('address')).toHaveLength(1);
    });
});
