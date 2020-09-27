import React from 'react'
import { storiesOf } from '@storybook/react'
import { ShowroomWin } from 'showroom/components'
import InputGroup from './inputGroup'
import FormGroup, { FormGroupProps } from './formGroup'
import { Intent } from 'common'

const baseProps = {
  style: undefined,
  disabled: undefined,
  inline: undefined,
  contentClassName: undefined,
  label: undefined,
  labelFor: undefined,
  labelInfo: undefined,
  helperText: undefined,
} as FormGroupProps

storiesOf('Form - FormGroup', module).add('No special props', () => {
  return (
    <ShowroomWin id="form-formGroup-no-special-props">
      <FormGroup {...baseProps} label="Username:" labelInfo={'(required)'} labelFor="username">
        <InputGroup type="text" name="username" />
      </FormGroup>
      <FormGroup {...baseProps} label="Password:" helperText="This is help text">
        <InputGroup type="password" name="password" />
      </FormGroup>
      <FormGroup {...baseProps} disabled label="Disable label:" helperText="This is help text">
        <InputGroup type="text" name="disabled" value="Disabled Text" />
      </FormGroup>
      <FormGroup {...baseProps} inline label="Inline label:" helperText="This is help text">
        <InputGroup type="text" name="inline" value="Inline Text" />
      </FormGroup>

      <FormGroup {...baseProps} intent={Intent.DANGER} label="Danger label:" helperText="This is help text">
        <InputGroup type="text" name="danger" value="Danger Text" />
      </FormGroup>
    </ShowroomWin>
  )
})
