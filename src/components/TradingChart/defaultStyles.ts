import { ChartConfig } from './constants'

export const DefaultStyles = {
  titleTxt: 'TradingVue.js',
  id: 'trading-vue-js',
  width: 800,
  height: 421,

  colorTitle: '#42b883',

  colorBack: '#121826',

  colorGrid: '#2f3240',

  colorText: '#dedddd',

  colorTextHL: '#fff',

  colorScale: '#838383',

  colorCross: '#8091a0',

  colorCandleUp: '#23a776',

  colorCandleDw: '#e54150',

  colorWickUp: '#23a77688',

  colorWickDw: '#e5415088',

  colorWickSm: 'transparent', // deprecated

  colorVolUp: '#79999e42',

  colorVolDw: '#ef535042',

  colorPanel: '#565c68',

  colorTbBack: '#000000',
  colorTbBorder: '#8282827d',

  colors: {},

  font: ChartConfig.FONT,

  toolbar: false,
  data: {},

  // Your overlay classes here
  overlays: (): any[] => {
    return []
  },

  // Overwrites ChartConfig values,
  // see constants.js
  chartConfig: function () {
    return {}
  },

  legendButtons: (): any[] => {
    return []
  },

  indexBased: false,

  extensions: (): any[] => {
    return []
  },
  xSettings: function () {
    return {}
  },

  skin: 'black',
  // Skin Name
  timezone: 0,
}
