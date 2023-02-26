import React, {useEffect} from 'react';
import {DataCore, Layout} from 'types/TradingChart';

export interface OverlayProps {
    // Overlay unique id (within current grid) ,e.g 'EMA_1'
    id: string;
    // Overlay unique num (within current grid)
    num: number;
    // Candlestick interval, ms (e.g. 1 min = 60000 )
    interval: number;
    // Crosshair position and selected values
    cursor: any;
    // All colors from TradingVue.vue combined
    colors: any;
    // Layout API object
    layout: Layout;
    // Current subset of candlestick data
    sub: any;
    // Current subset of indicator data
    data: any;
    // Indicator's settings, defined in data.json
    settings: any;
    // Current grid id
    grid_id: number;
    font: any;
    // Chart config, see 'constants.js'
    config: any;
    // Contains the last price and other info
    meta: any;
    tf: any;
    // The first global index of the current subset
    i0: any;
    last: any;

    // methods: {
    //   use_for(): string[]
    // }
}

export interface VolumeOverlayProps extends OverlayProps {
    _i1: number;
    _i2: (p: any[]) => any;
    volscale: number;
}

export const useOverlay = (props: OverlayProps) => {
    useEffect(() => {}, [props]);
    return {};
};

export const withOverlayHOC = <T extends OverlayProps>(Component: React.ComponentType<T>) => {
    return (props: any) => {
        useOverlay(props);

        return <Component {...props}/>;
    };
};
