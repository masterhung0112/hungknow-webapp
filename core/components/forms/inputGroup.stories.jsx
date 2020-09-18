import React from 'react'
import { storiesOf } from '@storybook/react'
import InputGroup from './inputGroup'

const baseProps = {
    inputRef: undefined,
    leftElement: undefined,
    leftIcon: undefined,
    rightElement: undefined
}

storiesOf('Form - InputGroup', module)
    .add(
        'No special props',
        () => {
            return (
                <div style={{"display": "flex", "flexDirection": "column"}}>
                    <InputGroup {...baseProps} />
                    <InputGroup {...baseProps} leftIcon="star" />
                    <InputGroup {...baseProps} rightElement={<span>Hello</span>} />
                </div>
            )
        }
    )