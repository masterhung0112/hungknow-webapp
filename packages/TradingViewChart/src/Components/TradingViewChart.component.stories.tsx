import React from 'react'
import {storiesOf} from '@storybook/react'

import { TradingViewChart } from './TradingViewChart.component'

storiesOf('tv', module)
    .add('React', () => {
        return (
            <div style={{ height: '100vh'}}>
            <TradingViewChart widgetConfig={{
                symbol: "NASDAQ:AAPL",
                container_id: 'tv',
                interval: '1',
                autosize: true
            }} />
            </div>
        )}
    )
