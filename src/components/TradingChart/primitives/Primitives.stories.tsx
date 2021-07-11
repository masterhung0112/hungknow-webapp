import React from 'react';
import {storiesOf} from '@storybook/react';
import {ShowroomWin} from 'showroom/components';

import {Layer, Stage} from 'react-konva';

import {Candle} from './Candle';

storiesOf('Components/Trading Chart/Primitive/Candle', module).

// .addParameters({ component: Candle })
    add('Default', () => (
        <ShowroomWin id='candle-no-special-props'>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
            >
                <Layer>
                    <Candle
                        data={{
                            w: 20,
                            h: 10,
                            x: 100,
                            c: 60,
                            l: 100,
                            o: 30,
                            raw: [1558688400000, 7968.22730706, 7999, 7937, 7968.2, 173.28647568],
                        }}
                    />
                </Layer>
            </Stage>
        </ShowroomWin>
    ));
