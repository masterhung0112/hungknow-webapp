import React from 'react'
import {storiesOf} from '@storybook/react'

import GridsStyles from './styles/_grid.scss'
import './grid.stories.scss'

storiesOf('Core/Components/Grid', module).
    add('Css', () => {
        return (
            <div className={'grid-stories'}>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm-6']}>
                        col-sm-6
                    </div>
                    <div className={GridsStyles['col-sm-6']}>
                       col-sm-6
                    </div>
                </div>

                <h2>Three column in a row. The remaining is fluid</h2>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={`${GridsStyles.row}`}>
                        <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                        </div>
                        <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                        </div>
                        <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                        </div>
                    </div>
                    <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                    </div>
                    <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                    </div>
                    <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                    </div>
                    <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                    </div>
                    <div className={`${GridsStyles['col-sm-3']} ${GridsStyles['col-md-3']}`}>
                        col-sm-3 col-md-3
                    </div>
                </div>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm-3']}>col-sm-3</div>
                    <div className={`${GridsStyles['col-sm-6']} ${GridsStyles['col-sm-offset-3']}`}>col-sm-6 col-sm-offset-3</div>
                </div>

                <h2>Auto-layout columns</h2>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm']}>col-sm</div>
                    <div className={GridsStyles['col-sm']}>col-sm</div>
                </div>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm']}>col-sm</div>
                    <div className={GridsStyles['col-sm']}>col-sm</div>
                    <div className={GridsStyles['col-sm']}>col-sm</div>
                </div>

                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={`${GridsStyles['col-md-6']} ${GridsStyles['col-sm-12']}`}>
                        <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm']} style={{textAlign: 'center'}}>Small screen layout</div>
                        </div>
                        <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>col-sm-12</div>
                        </div>
                        <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>sm-12 md-8</div>
                        </div>
                        <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>sm-12 md-4</div>
                        </div>
                        <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>col-sm-12</div>
                        </div>
                    </div>
                    <div className={`${GridsStyles['col-md-6']} ${GridsStyles['col-sm-12']}`}>
                        <div className={`${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm']} style={{textAlign: 'center'}}>Medium/Large screen layout</div>
                        </div>
                        <div className={`${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>col-sm-12</div>
                        </div>
                        <div className={`${GridsStyles.row}`}>
                            <div className={`${GridsStyles['col-sm-12']} ${GridsStyles['col-md-8']}`}><div style={{height: '8rem'}}>sm-12 md-8</div></div>
                            <div className={`${GridsStyles['col-sm-12']} ${GridsStyles['col-md-4']}`}><div style={{height: '8rem'}}>sm-12 md-4</div></div>
                        </div>
                        <div className={`${GridsStyles.row}`}>
                            <div className={GridsStyles['col-sm-12']}>col-sm-12</div>
                        </div>
                    </div>
                </div>

                <h2>Predefined layouts</h2>
                <div className={`${`${GridsStyles.hk} ${GridsStyles.row}`} ${GridsStyles['cols-sm-6']} ${GridsStyles['cols-md-3']}`}>
                    <div>
                        cols-sm-6 cols-md-3
                    </div>
                    <div>
                        cols-sm-6 cols-md-3
                    </div>
                    <div>
                        cols-sm-6 cols-md-3
                    </div>
                    <div>
                        cols-sm-6 cols-md-3
                    </div>
                </div>

                <h2>Setting one column width</h2>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm']}>1 of 3</div>
                    <div className={GridsStyles['col-sm-6']}>2 of 3 (wider)</div>
                    <div className={GridsStyles['col-sm']}>3 of 3</div>
                </div>
                <div className={`${GridsStyles.hk} ${GridsStyles.row}`}>
                    <div className={GridsStyles['col-sm']}>1 of 3</div>
                    <div className={GridsStyles['col-sm-5']}>2 of 3 (wider)</div>
                    <div className={GridsStyles['col-sm']}>3 of 3</div>
                </div>
            </div>
        )
    })