import React from 'react'
import {storiesOf} from '@storybook/react'

import { TradingViewChart } from './TradingViewChart.component'
import csvDataFeed from '../Source/CsvDataFeed'
// import defaultDataFeed from '../Source/DefaultDataFeed'

storiesOf('tv', module)
    .add('React', () => {
        return (
            <div style={{ height: '100vh'}}>
            <TradingViewChart widgetConfig={{
                symbol: "EURUSD",
                container_id: 'tv',
                interval: '1',
                autosize: true,
                datafeed: csvDataFeed
            }} />
            </div>
        )}
    )
