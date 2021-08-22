import { demoData } from './Customdata'

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange: string, fromSymbol: string, toSymbol: string) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function parseFullSymbol(fullSymbol: string) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}

const configurationData = {
	supported_resolutions: ['1'],
	exchanges: [{
		value: 'FxcmCsv',
		name: 'FxcmCsv',
		desc: 'Fxcm CSV',
	},
	],
	symbols_types: [{
		name: 'EUR/USD',

		// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
		value: 'EUR/USD',
	},
		// ...
	],
};

export default {
    onReady: (callback: Function) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));

    },
    resolveSymbol: (symbolName: string, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
        console.log('[resolveSymbol]: Method call');
        var split_data = symbolName.split(/[:/]/)
        // console.log({split_data})
        var symbol_stub = {
          name: symbolName,
          description: '',
          type: 'crypto',
          session: '24x7',
          timezone: 'Etc/UTC',
          ticker: symbolName,
          minmov: 1,
          pricescale: 100000000,
          has_intraday: true,
          intraday_multipliers: ['1', '60'],
          supported_resolution: '1',
          volume_precision: 8,
          data_status: 'streaming',
        }
    
        if (split_data[1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
          symbol_stub.pricescale = 100
        }
        setTimeout(() =>onSymbolResolvedCallback(symbol_stub))
    },

    getBars: async (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any) => {
        const { from, to, firstDataRequest } = periodParams;
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
        let bars: {
            time: number,
            low: number,
            high: number,
            open: number,
            close: number
        }[] = [];

        for (let i = 0; i < 2000; ++i) {
            const [timeStr, low, high, open, close, _] = demoData[i]
            const time = new Date(timeStr).getMilliseconds()
            // if (time >= from && time < to) {
                bars = [...bars, {
                    time: time * 1000,
                    low: low,
                    high: high,
                    open: open,
                    close: close,
                }]
            // }
        }
        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onHistoryCallback(bars, { noData: false });
    },
}