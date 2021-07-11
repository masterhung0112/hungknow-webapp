// Copyright (c) 2021-present Hungknow. All Rights Reserved.
// See LICENSE-HungKnow.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import {ShowroomWin} from 'showroom/components';
import {Intent} from 'common';

import InputGroup, {IInputGroupProps} from './inputGroup';

const baseProps: any = {
    inputRef: undefined,
    leftElement: undefined,
    leftIcon: undefined,
    rightElement: undefined,
} as IInputGroupProps;

storiesOf('Core/Components/Form/InputGroup/React', module).add('No special props', () => {
    return (
        <ShowroomWin id='form-inputgroup-no-special-props'>
            <InputGroup {...baseProps}/>
            <InputGroup
                {...baseProps}
                leftIcon='star'
                placeholder='leftIcon'
            />
            <InputGroup
                {...baseProps}
                leftElement={<button className='hk-button'>Left</button>}
                placeholder='leftElement'
            />
            <InputGroup
                {...baseProps}
                rightElement={<button className='hk-button'>Right</button>}
                placeholder='rightElement'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                large={true}
                placeholder='Large'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                small={true}
                placeholder='Small'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                round={true}
                placeholder='Round'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                disabled={true}
                placeholder='Disabled'
                value='Disabled value'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                fill={true}
                placeholder='fill'
            />
            <InputGroup
                {...baseProps}
                type='month'
                placeholder='type month'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                intent={Intent.PRIMARY}
                placeholder='Primary'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                intent={Intent.DANGER}
                placeholder='Danger'
            />
            <InputGroup
                {...baseProps}
                leftIcon='star'
                intent={Intent.DANGER}
                disabled={true}
                placeholder='Danger Disabled'
            />
        </ShowroomWin>
    );
});
