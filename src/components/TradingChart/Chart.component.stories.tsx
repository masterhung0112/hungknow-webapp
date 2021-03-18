import React from 'react'
import { storiesOf } from '@storybook/react'
import { ShowroomWin } from 'showroom/components'
import { Chart } from './Chart.component'
import Data from './data/data.json'
import { ChartConfig } from './constants'
import { DefaultStyles } from './defaultStyles'

storiesOf('Components/Trading Chart/Chart', module)
  // .addParameters({ component: Candle })
  .add('Default', () => (
    <Chart
      width={window.innerWidth}
      height={window.innerHeight}
      title_txt={'title'}
      data={Data}
      font={ChartConfig.FONT}
      colors={DefaultStyles}
      overlays={[]}
      tv_id={'0'}
      config={ChartConfig}
      buttons={{}}
      toolbar={{}}
      ib={0}
      skin={''}
      timezone={''}
    ></Chart>
  ))
