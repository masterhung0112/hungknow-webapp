// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react';

import {GridsStyles} from '.';
import GridsStylestoriesStyle from './grid.stories.scss';

storiesOf('Core/Components/Icon/React', module).
    add('default', () => {
        return (
            <div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm-6']}>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-6</div>
                    </div>
                    <div className={GridsStyles['hk-col-sm-6']}>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-6</div>
                    </div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={`${GridsStyles['hk-col-sm-3']} ${GridsStyles['hk-col-md-6']}`}>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                    <div className='hk-col-sm-3 hk-col-md-6'>
                        <div className={GridsStylestoriesStyle.content}>hk-col-sm-3 hk-col-md-6</div>
                    </div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm-3']}><div className={GridsStylestoriesStyle.content}>hk-col-sm-3</div></div>
                    <div className={`${GridsStyles['hk-col-sm-6']} ${GridsStyles['hk-col-sm-offset-3']}`}><div className={GridsStylestoriesStyle.content}>hk-col-sm-6 hk-col-sm-offset-3</div></div>
                </div>
                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm']}><div className={GridsStylestoriesStyle.content}>hk-col-sm</div></div>
                    <div className={GridsStyles['hk-col-sm']}><div className={GridsStylestoriesStyle.content}>hk-col-sm</div></div>
                </div>

                <div className={GridsStyles['hk-row']}>
                    <div className={GridsStyles['hk-col-sm-6']}>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm']} style={{textAlign: 'center'}}>Small screen layout</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>hk-col-sm-12</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>sm-12 md-8</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>sm-12 md-4</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>hk-col-sm-12</div></div>
                        </div>
                    </div>
                    <div className={GridsStyles['hk-col-sm-6']}>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm']} style={{textAlign: 'center'}}>Medium/Large screen layout</div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>hk-col-sm-12</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={`${GridsStyles['hk-col-sm-12']} ${GridsStyles['hk-col-md-8']}`}><div className={GridsStylestoriesStyle.content} style={{height: '8rem'}}>sm-12 md-8</div></div>
                            <div className={`${GridsStyles['hk-col-sm-12']} ${GridsStyles['hk-col-md-4']}`}><div className={GridsStylestoriesStyle.content} style={{height: '8rem'}}>sm-12 md-4</div></div>
                        </div>
                        <div className={GridsStyles['hk-row']}>
                            <div className={GridsStyles['hk-col-sm-12']}><div className={GridsStylestoriesStyle.content}>hk-col-sm-12</div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });