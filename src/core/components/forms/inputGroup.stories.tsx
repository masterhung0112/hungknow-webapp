import React from 'react'
import { storiesOf } from '@storybook/react'
import InputGroup, { IInputGroupProps } from './inputGroup'
import { ShowroomWin } from 'showroom/components'
import { Intent } from 'common'

const baseProps = {
  inputRef: undefined,
  leftElement: undefined,
  leftIcon: undefined,
  rightElement: undefined,
} as IInputGroupProps

storiesOf('Core/Components/Form/InputGroup/React', module).add('No special props', () => {
  return (
    <ShowroomWin id="form-inputgroup-no-special-props">
      <InputGroup {...baseProps} />
      <InputGroup {...baseProps} leftIcon="star" placeholder="leftIcon" />
      <InputGroup {...baseProps} leftElement={<button className="hk-button">Left</button>} placeholder="leftElement" />
      <InputGroup
        {...baseProps}
        rightElement={<button className="hk-button">Right</button>}
        placeholder="rightElement"
      />
      <InputGroup {...baseProps} leftIcon="star" large placeholder="Large" />
      <InputGroup {...baseProps} leftIcon="star" small placeholder="Small" />
      <InputGroup {...baseProps} leftIcon="star" round placeholder="Round" />
      <InputGroup {...baseProps} leftIcon="star" disabled placeholder="Disabled" value="Disabled value" />
      <InputGroup {...baseProps} leftIcon="star" fill placeholder="fill" />
      <InputGroup {...baseProps} type="month" placeholder="type month" />
      <InputGroup {...baseProps} leftIcon="star" intent={Intent.PRIMARY} placeholder="Primary" />
      <InputGroup {...baseProps} leftIcon="star" intent={Intent.DANGER} placeholder="Danger" />
      <InputGroup {...baseProps} leftIcon="star" intent={Intent.DANGER} disabled placeholder="Danger Disabled" />
    </ShowroomWin>
  )
})
