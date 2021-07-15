import React from 'react';
import {storiesOf} from '@storybook/react';
import {ShowroomWin} from 'showroom/components';
import {Intent} from 'common';

import InputGroup from './inputGroup';
import FormGroup, {FormGroupProps} from './formGroup';

const baseProps: any = {
    style: undefined,
    disabled: undefined,
    inline: undefined,
    contentClassName: undefined,
    label: undefined,
    labelFor: undefined,
    labelInfo: undefined,
    helperText: undefined,
} as FormGroupProps;

storiesOf('Core/Components/Form/FormGroup/React', module).
    addParameters({component: FormGroup}).
    add('No special props', () => (
        <ShowroomWin id='form-formGroup-no-special-props'>
            <FormGroup
                {...baseProps}
                label='Username:'
                labelInfo='(required)'
                labelFor='username'
            >
                <InputGroup
                    type='text'
                    name='username'
                />
            </FormGroup>
            <FormGroup
                {...baseProps}
                label='Password:'
                helperText='This is help text'
            >
                <InputGroup
                    type='password'
                    name='password'
                />
            </FormGroup>
            <FormGroup
                {...baseProps}
                disabled={true}
                label='Disable label:'
                helperText='This is help text'
            >
                <InputGroup
                    type='text'
                    name='disabled'
                    value='Disabled Text'
                />
            </FormGroup>
            <FormGroup
                {...baseProps}
                inline={true}
                label='Inline label:'
                helperText='This is help text'
            >
                <InputGroup
                    type='text'
                    name='inline'
                    value='Inline Text'
                />
            </FormGroup>
            <FormGroup
                {...baseProps}
                intent={Intent.DANGER}
                label='Danger label:'
                helperText='This is help text'
            >
                <InputGroup
                    type='text'
                    name='danger'
                    value='Danger Text'
                />
            </FormGroup>
        </ShowroomWin>
    ));
