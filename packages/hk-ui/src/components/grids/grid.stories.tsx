// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import './styles/_grids.scss';
import './grid.stories.scss';

storiesOf('Core/Components/Icon/React', module).
    add('default', () => {
        return (
            <div className='hk-container'>
                <div className='hk-row'>
                    <div className='hk-col hk-col-50'>
                        <div className='content'>1/2</div>
                    </div>
                    <div className='hk-col hk-col-50'>
                        <div className='content'>1/2</div>
                    </div>
                </div>
                <div className='hk-row'>
                    <div className='hk-col hk-col-25'>
                        <div className='content'>1/4</div>
                    </div>
                    <div className='hk-col hk-col-25'>
                        <div className='content'>1/4</div>
                    </div>
                    <div className='hk-col hk-col-25'>
                        <div className='content'>1/4</div>
                    </div>
                    <div className='hk-col hk-col-25'>
                        <div className='content'>1/4</div>
                    </div>
                </div>
                <div className='hk-row'>
                    <div className='hk-col'><div className='content'>.col</div></div>
                    <div className='hk-col hk-col-50 hk-col-offset-25'><div className='content'>.col col-50 col-offset-25</div></div>
                </div>
            </div>
        );
    });