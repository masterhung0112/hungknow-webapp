import React from 'react'
import {storiesOf} from '@storybook/react'

import CardStyles from './_card.scss'

storiesOf('Core/Components/Card', module).
    add('Css', () => {
        return (
            <div>
                <div className={`${CardStyles.card} ${CardStyles.divider}`}>
                    <div className={`${CardStyles.section} ${CardStyles.title}`}>
                        Card with divider
                    </div>
                    <div className={CardStyles.section}>
                        <p>Small cards are 240px wide.</p>
                    </div>
                    <div className={CardStyles.section}>
                        Footer
                    </div>
                </div>
                <div className={`${CardStyles.card}`}>
                    <img src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17b3f6f851b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17b3f6f851b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E' data-src='holder.js/100px180' alt='100%x180' style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered='true' />
                    <div className={CardStyles.section}>
                        <h3>Small Card</h3>
                        <p>Small cards are 240px wide.</p>
                        <button type='button' className='btn btn-primary'>Go somewhere</button>
                    </div>
                </div>
                <div className={`${CardStyles.card} ${CardStyles.section}`}>
                    <p>Card include section class, so it has padding.</p>
                </div>
                {/* <div className={`${CardStyles.card}`}>
                    <div className={GridStyles['hk-row']}>
                        <div className={GridStyles['hk-col-sm-3']}>
                            <img src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17b3f6f851b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17b3f6f851b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E' data-src='holder.js/100px180' alt='100%x180' style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered='true' />
                        </div>
                        <div className={`${GridStyles['hk-col-sm']} ${CardStyles.section}`}>
                            <h3>Media Left</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div> */}
                <div className={`${CardStyles.card} ${CardStyles['card-row']}`}>
                    <img src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17b3f6f851b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17b3f6f851b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E' data-src='holder.js/100px180' alt='100%x180' style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered='true' />
                    <div className={`${CardStyles.section} ${CardStyles['double-padded']}`}>
                        <h3>Media Left</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </div>
        )
    })