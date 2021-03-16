// Calculates all necessary items to build the chart
// Heights, widths, transforms, ... = everything
// Why such a mess you ask? Well, that's because
// one components size can depend on other component
// data formatting (e.g. grid width depends on sidebar precision)

import { Layout, LayoutParams } from 'types/TradingChart'

// So it's better to calc all in one place.
export const generateLayout = (params: LayoutParams): Layout => {
  let grids = []
  let offset = 0

  return {
    grids,
    botbar: {
      width: 0,
      height: 0,
      offset: 0,
      xs: [],
    },
  }
}
