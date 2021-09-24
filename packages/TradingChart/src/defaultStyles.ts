import {ChartConfig} from './constants';

export const DefaultStyles = {
    // Chart title text
    titleTxt: 'TradingVue.js',
    // HTML id of root div
    id: 'trading-vue-js',
    // Chart width
    width: 800,
    // Chart height
    height: 421,
    // Title text color
    colorTitle: '#42b883',
    // Background text color
    colorBack: '#121826',
    // Grid color
    colorGrid: '#2f3240',
    // Text (labels) color
    colorText: '#dedddd',
    // Highlighted text color
    colorTextHL: '#fff',
    // Scales border color
    colorScale: '#838383',
    // Crosshair color
    colorCross: '#8091a0',
    // Green candle color
    colorCandleUp: '#23a776',
    // Red candle color
    colorCandleDw: '#e54150',
    // Green wick color
    colorWickUp: '#23a77688',
    // Red wick color
    colorWickDw: '#e5415088',
    // Scaled down wick color
    colorWickSm: 'transparent', // deprecated

    colorVolUp: '#79999e42',

    colorVolDw: '#ef535042',
    // Value bars color
    colorPanel: '#565c68',

    // Toolbar background color
    colorTbBack: '#000000',
    colorTbBorder: '#8282827d',

    // All-colors object, has a lower priority
    colors: {
        black: '#000000',
        cross: '#888888',
    },

    // Full font string, e.g. "11px Arial..."
    font: ChartConfig.FONT,

    toolbar: false,
    // Data object
    data: {},

    // List of custom overlay classes
    overlays: (): any[] => {
        return [];
    },

    // Overwrites ChartConfig values,
    // see constants.js
    chartConfig() {
        return {};
    },

    // Array of legend buttons ids
    legendButtons: (): any[] => {
        return [];
    },

    // Index-based rendering mode (global setting)
    indexBased: false,

    // Array of extensions
    extensions: (): any[] => {
        return [];
    },
    xSettings() {
        return {};
    },

    // Skin ID (should be in the extensions)
    skin: 'black',

    // Shift from UTC, hours
    timezone: 0,
};
