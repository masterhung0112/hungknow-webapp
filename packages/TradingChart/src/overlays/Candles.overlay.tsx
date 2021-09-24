import React from 'react';
import {CandleData, OverlayMeta} from '../Models';

import {layout_cnv} from '../layoutCnv';
import {OverlayProps, useOverlay} from '../Overlay';
import {Candle} from '../primitives/Candle';

export type CandlesOverlayProps = OverlayProps

export const Candles: React.FC<CandlesOverlayProps> & OverlayMeta = (props) => {
    const {data, sub, layout} = props;
    useOverlay(props);

    let cnv: {
        candles: CandleData[];
        volumes: any[];
    } = {
        candles: [],
        volumes: [],
    };

    // If data === main candlestick data
    // render as main chart:
    if (sub === data) {
        cnv.candles = layout.candles;
        cnv.volumes = layout.volume;
    } else {
        cnv = layout_cnv(props);
    }

    return (
        <>
            {cnv.candles.map((candleData) => {
                return <Candle data={candleData}/>;
            })}
        </>
    );
};

Candles.use_for = ['Candles'];
