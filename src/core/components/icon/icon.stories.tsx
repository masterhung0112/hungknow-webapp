import React from 'react'
import { storiesOf } from '@storybook/react'

import { Icon } from './icon'

storiesOf('Core/Components/Icon/React', module).add('default', () => {
  return (
    <div>
      <Icon icon="calendar" />
    </div>
  )
})
