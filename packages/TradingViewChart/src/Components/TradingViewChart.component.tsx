import React, { PureComponent } from 'react'

export type IntervalTypes =
  '1' |
  '3' |
  '5' |
  '15' |
  '30' |
  '60' |
  '120' |
  '180' |
  'D' |
  'W'

// interval: 
//   1,
//   3,
//   5,
//   15,
//   30,
//   60,
//   120,
//   180,
//   '1',
//   '3',
//   '5',
//   '15',
//   '30',
//   '60',
//   '120',
//   '180',
//   IntervalTypes.D,
//   IntervalTypes.W
// ])

export type TradingViewWidgetProps = {
  autosize?: boolean
  width?: number | string
  height?: number | string
  symbol: string
  interval: IntervalTypes
  timezone?: string
  hide_top_toolbar?: boolean
  container_id: string
}
export type TradingViewChartProps = {
  widgetConfig: TradingViewWidgetProps
}

const TV_SCRIPT_ID = 'tradingview-widget-script'
const TV_CONTAINER_ID = 'tradingview-widget'

export class TradingViewChart extends PureComponent<TradingViewChartProps> {
  static defaultProps = {
    containerId: 'tv-chart'
  }

  canUseDOM = () => !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

  initWidget() {
    if (typeof TradingView === 'undefined' || !document.getElementById(this.props.widgetConfig.container_id)) return

    const { widgetConfig } = this.props;
    const widgetOptions: TradingViewWidgetProps = { ...widgetConfig };

    if (widgetOptions.autosize) {
      delete widgetOptions.width;
      delete widgetOptions.height;
    }

    if (typeof widgetOptions.interval === 'number') {
      widgetOptions.interval = widgetOptions.interval.toString();
    }

    new TradingView.widget(widgetOptions);
  }

  updateOnloadListener(onload: () => void) {
    const script = this.scriptElement
    if (script) {
      const oldOnLoad = script.onload as any
      script.onload = () => {
        oldOnLoad && oldOnLoad()
        onload()
      }
    }
  }

  appendScript(onload: () => void) {
    if (!this.canUseDOM()) {
      onload()
      return
    }

    if (this.scriptExists) {
      /* global TradingView */
      if (typeof TradingView === 'undefined') {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return
    }

    const script = document.createElement('script')
    script.id = TV_SCRIPT_ID
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://s3.tradingview.com/tv.js'
    script.onload = onload
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  get containerElement() {
    return document.getElementById(this.props.widgetConfig.container_id)
  }

  get scriptElement() {
    return document.getElementById(TV_SCRIPT_ID)
  }

  get scriptExists() {
    return this.scriptElement !== null
  }

  componentDidMount() {
    this.appendScript(this.initWidget.bind(this))
  }

  getStyle = () => {
    if (!this.props.widgetConfig.autosize) return {};
    return {
      width: '100%',
      height: '100%'
    };
  };

  render() {
    return <div
      id={this.props.widgetConfig.container_id}
      style={this.getStyle()}
      className={'TVChartContainer'}
    />
  }
}