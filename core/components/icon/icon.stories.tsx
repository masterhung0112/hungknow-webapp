import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from './icon'

storiesOf('Icon', module).add('default', () => {
  return (
    <div>
      <Icon icon="calendar" />
    </div>
  )
})
