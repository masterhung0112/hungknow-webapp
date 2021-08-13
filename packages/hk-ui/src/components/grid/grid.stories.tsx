// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import GridsStyles from './styles/_grid.scss';
import './grid.stories.scss';

storiesOf('Core/Components/Grid', module).
    add('Css', () => {
        return (
            <div className={'grid-stories'}>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm-6']}>
                        hk-col-sm-6
                    </div>
                    <div className={GridsStyles['hk-col-sm-6']}>
                       hk-col-sm-6
                    </div>
                </div>

                <div className={GridsStyles['hk-row']}>
                    <div className={`${GridsStyles['hk-col-sm-3']} ${GridsStyles['hk-col-md-6']}`}>
                        hk-col-sm-3 hk-col-md-6
                    </div>
                    <div className={`${GridsStyles['hk-col-sm-3']} ${GridsStyles['hk-col-md-6']}`}>
                        hk-col-sm-3 hk-col-md-6
                    </div>
                    <div className={`${GridsStyles['hk-col-sm-3']} ${GridsStyles['hk-col-md-6']}`}>
                        hk-col-sm-3 hk-col-md-6
                    </div>
                    <div className={`${GridsStyles['hk-col-sm-3']} ${GridsStyles['hk-col-md-6']}`}>
                        hk-col-sm-3 hk-col-md-6
                    </div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm-3']}>hk-col-sm-3</div>
                    <div className={`${GridsStyles['hk-col-sm-6']} ${GridsStyles['hk-col-sm-offset-3']}`}>hk-col-sm-6 hk-col-sm-offset-3</div>
                </div>

                <h2>Auto-layout columns</h2>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm']}>hk-col-sm</div>
                    <div className={GridsStyles['hk-col-sm']}>hk-col-sm</div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm']}>hk-col-sm</div>
                    <div className={GridsStyles['hk-col-sm']}>hk-col-sm</div>
                    <div className={GridsStyles['hk-col-sm']}>hk-col-sm</div>
                </div>

                <div className={GridsStyles['hk-row']}>
                    <div className={`${GridsStyles['hk-col-md-6']} ${GridsStyles['hk-col-sm-12']}`}>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm']} style={{textAlign: 'center'}}>Small screen layout</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>hk-col-sm-12</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>sm-12 md-8</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>sm-12 md-4</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>hk-col-sm-12</div>
                        </div>
                    </div>
                    <div className={`${GridsStyles['hk-col-md-6']} ${GridsStyles['hk-col-sm-12']}`}>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm']} style={{textAlign: 'center'}}>Medium/Large screen layout</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>hk-col-sm-12</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={`${GridsStyles['hk-col-sm-12']} ${GridsStyles['hk-col-md-8']}`}><div style={{height: '8rem'}}>sm-12 md-8</div></div>
                            <div className={`${GridsStyles['hk-col-sm-12']} ${GridsStyles['hk-col-md-4']}`}><div style={{height: '8rem'}}>sm-12 md-4</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}>hk-col-sm-12</div>
                        </div>
                    </div>
                </div>

                <h2>Predefined layouts</h2>
                <div className={`${GridsStyles['hk-row']} ${GridsStyles['hk-cols-sm-6']} ${GridsStyles['hk-cols-md-3']}`}>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                </div>

                <h2>Setting one column width</h2>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm']}>1 of 3</div>
                    <div className={GridsStyles['hk-col-sm-6']}>2 of 3 (wider)</div>
                    <div className={GridsStyles['hk-col-sm']}>3 of 3</div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm']}>1 of 3</div>
                    <div className={GridsStyles['hk-col-sm-5']}>2 of 3 (wider)</div>
                    <div className={GridsStyles['hk-col-sm']}>3 of 3</div>
                </div>
            </div>
        );
    });