// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import './styles/_grids.scss';

storiesOf('Core/Components/Icon/React', module).
    add('default', () => {
        return (
            <div>
                <div className='hk-row'>
                    <div className='hk-column hk-column-50'>
                        <div className='content'>1/2</div>
                    </div>
                    <div className='hk-column hk-column-50'>
                        <div className='content'>1/2</div>
                    </div>
                </div>
            </div>
        );
    });