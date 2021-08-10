import React from 'react';
import {storiesOf} from '@storybook/react';

storiesOf('Core/Components/Icon/React', module).add('default', () => {
    return (
        <div>
            <div className="hk-g">
                <div className="pure-u-1-2">
                    <div className="content">1/2</div>
                </div>
                <div className="pure-u-1-2">
                    <div className="content">1/2</div>
                </div>
            </div>
        </div>
    )
})