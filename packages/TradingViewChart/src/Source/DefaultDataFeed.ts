export default {
    onReady: (callback: any) => {
      console.log("[onReady]: Method call");
      callback({});
    },
    searchSymbols: (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
      console.log("[searchSymbols]: Method call");
    },
    resolveSymbol: (
      symbolName: any,
      onSymbolResolvedCallback: any,
      onResolveErrorCallback: any
    ) => {
      console.log("[resolveSymbol]: Method call", symbolName);
    },
    getBars: async (
      symbolInfo: any,
      resolution: any,
      from: any,
      to: any,
      onHistoryCallback: any,
      onErrorCallback: any,
      firstDataRequest: any
    ) => {
     
    },
    subscribeBars: (
      symbolInfo: any,
      resolution: any,
      onRealtimeCallback: any,
      subscribeUID: any,
      onResetCacheNeededCallback: any
    ) => {
      console.log(
        "[subscribeBars]: Method call with subscribeUID:",
        subscribeUID
      );
    },
    unsubscribeBars: (subscriberUID: any) => {
      console.log(
        "[unsubscribeBars]: Method call with subscriberUID:",
        subscriberUID
      );
    },
  };
  