import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from './icon'

storiesOf('Icon', module)
  .add(
    'default',
    () => {
      return (
        <Icon icon='calendar' />
      )
    }
  )