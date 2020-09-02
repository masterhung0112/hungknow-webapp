import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from './button'
import { Intent } from 'common'

storiesOf('Button', module)
  .add(
    'default',
    () => {
      return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"            
        }}>
            {/* Empty button*/}
            <Button />
            <Button text="Hello world" />

            <Button icon="refresh">"Click to wiggle"</Button>
            <Button icon="user" rightIcon="caret-down" text="Profile settings" />

            <Button icon="user" rightIcon="caret-down" text="Profile settings" intent={Intent.DANGER} />
        </div>
      )
    }
  )