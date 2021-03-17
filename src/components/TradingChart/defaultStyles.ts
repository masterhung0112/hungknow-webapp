export const DefaultStyles = {
  titleTxt: {
    type: String,
    default: 'TradingVue.js',
  },
  id: {
    type: String,
    default: 'trading-vue-js',
  },
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 421,
  },
  colorTitle: {
    type: String,
    default: '#42b883',
  },
  colorBack: {
    type: String,
    default: '#121826',
  },
  colorGrid: {
    type: String,
    default: '#2f3240',
  },
  colorText: {
    type: String,
    default: '#dedddd',
  },
  colorTextHL: {
    type: String,
    default: '#fff',
  },
  colorScale: {
    type: String,
    default: '#838383',
  },
  colorCross: {
    type: String,
    default: '#8091a0',
  },
  colorCandleUp: {
    type: String,
    default: '#23a776',
  },
  colorCandleDw: {
    type: String,
    default: '#e54150',
  },
  colorWickUp: {
    type: String,
    default: '#23a77688',
  },
  colorWickDw: {
    type: String,
    default: '#e5415088',
  },
  colorWickSm: {
    type: String,
    default: 'transparent', // deprecated
  },
  colorVolUp: {
    type: String,
    default: '#79999e42',
  },
  colorVolDw: {
    type: String,
    default: '#ef535042',
  },
  colorPanel: {
    type: String,
    default: '#565c68',
  },
  colorTbBack: {
    type: String,
  },
  colorTbBorder: {
    type: String,
    default: '#8282827d',
  },
  colors: {
    type: Object,
  },
  font: {
    type: String,
    default: Const.ChartConfig.FONT,
  },
  toolbar: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    required: true,
  },
  // Your overlay classes here
  overlays: {
    type: Array,
    default: function () {
      return []
    },
  },
  // Overwrites ChartConfig values,
  // see constants.js
  chartConfig: {
    type: Object,
    default: function () {
      return {}
    },
  },
  legendButtons: {
    type: Array,
    default: function () {
      return []
    },
  },
  indexBased: {
    type: Boolean,
    default: false,
  },
  extensions: {
    type: Array,
    default: (): any[] => {
      return []
    },
  },
  xSettings: {
    type: Object,
    default: function () {
      return {}
    },
  },
  skin: {
    type: String, // Skin Name
  },
  timezone: {
    type: Number,
    default: 0,
  },
}
