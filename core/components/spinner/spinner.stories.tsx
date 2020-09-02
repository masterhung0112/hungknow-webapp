import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spinner } from './spinner'
import { Intent } from 'common'

storiesOf('Spinner', module)
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
            <Spinner />
        </div>
      )
    }
  )