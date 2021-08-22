
import React from 'react';
import ReactDOM from 'react-dom'
import { TradingViewChart } from './TradingViewChart.component';

describe('TradingViewComponent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TradingViewChart widgetConfig={{
            symbol: "NASDAQ:AAPL",
            container_id: 'tv',
            interval: '1'
        }} />, div)
    })
})