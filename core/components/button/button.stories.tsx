import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from './button'
import { Intent } from 'common'
import { ShowroomWin } from 'showroom/components'

storiesOf('Button', module)
  .add(
    'default',
    () => {
      return (
        <ShowroomWin id="story-button-default">
            {/* Empty button*/}
            <Button />
            <Button text="Hello world" />

            <Button icon="refresh">"Click to wiggle"</Button>
            <Button icon="user" rightIcon="caret-down" text="Profile settings" />

            <Button icon="user" rightIcon="caret-down" text="Profile settings" intent={Intent.DANGER} />
        </ShowroomWin>
      )
    }
  )