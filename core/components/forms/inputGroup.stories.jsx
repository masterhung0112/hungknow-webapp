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
                <div style={{"display": "flex", "flexDirection": "column", "maxWidth": "140px"}}>
                    <InputGroup {...baseProps} />
                    <InputGroup {...baseProps} leftIcon="star" />
                    <InputGroup {...baseProps} rightElement={<button className="hk-button">Hello</button>} />
                </div>
            )
        }
    )