import React from 'react'
import { storiesOf } from '@storybook/react'

import { Intent } from 'common'
import { ShowroomWin } from 'showroom/components'

import { Button } from './button'

storiesOf('Core/Components/Button/React', module)
  .addParameters({ component: Button })
  .add('default', () => {
    return (
      <ShowroomWin id="story-button-default">
        {/* Empty button*/}
        <Button />
        <Button text="Hello world" />

        <Button icon="refresh">Click to wiggle</Button>
        <Button icon="user" rightIcon="caret-down" text="Profile settings" />

        <Button icon="user" rightIcon="caret-down" text="Profile settings" intent={Intent.DANGER} />
      </ShowroomWin>
    )
  })
