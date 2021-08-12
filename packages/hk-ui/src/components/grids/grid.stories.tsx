// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import './styles/_grids.scss';
import './grid.stories.scss';

storiesOf('Core/Components/Icon/React', module).
    add('default', () => {
        return (
            <div>
                <div className='hk-row'>
                    <div className='hk-col-sm-6'>
                        <div className='content'>hk-col-sm-6</div>
                    </div>
                    <div className='hk-col-sm-6'>
                        <div className='content'>hk-col-sm-6</div>
                    </div>
                </div>
                <div className='hk-row'>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className='content'>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className='content'>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className='content'>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className='content'>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                </div>
                <div className='hk-row'>
                    <div className='hk-col-sm-3'><div className='content'>hk-col-sm-3</div></div>
                    <div className='hk-col-sm-6 hk-col-sm-offset-3'><div className='content'>hk-col-sm-6 hk-col-sm-offset-3</div></div>
                </div>
                <div className='hk-row'>
                    <div className='hk-col-sm'><div className='content'>hk-col-sm</div></div>
                    <div className='hk-col-sm'><div className='content'>hk-col-sm</div></div>
                </div>

                <div className='hk-row'>
                    <div className='hk-col-sm-6'>
                        <div className='hk-row'>
                            <div className='hk-col-sm' style={{textAlign: 'center'}}>Small screen layout</div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>hk-col-sm-12</div></div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>sm-12 md-8</div></div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>sm-12 md-4</div></div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>hk-col-sm-12</div></div>
                        </div>
                    </div>
                    <div className='hk-col-sm-6'>
                        <div className='hk-row'>
                            <div className='hk-col-sm' style={{textAlign: 'center'}}>Medium/Large screen layout</div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>hk-col-sm-12</div></div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12 hk-col-md-8'><div className='content' style={{height: '8rem'}}>sm-12 md-8</div></div>
                            <div className='hk-col-sm-12 hk-col-md-4'><div className='content' style={{height: '8rem'}}>sm-12 md-4</div></div>
                        </div>
                        <div className='hk-row'>
                            <div className='hk-col-sm-12'><div className='content'>hk-col-sm-12</div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });