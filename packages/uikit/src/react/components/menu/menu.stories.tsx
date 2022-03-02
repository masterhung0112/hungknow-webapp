import React from 'react'
import {storiesOf} from '@storybook/react'
import '../../../sass/hk-ui.scss'

storiesOf('Core/Components/Menu', module).
    add('css', () => {
        return (
            <div className='hk1-menu'>
                <li className='hk1-menu-header'><h6 className='hk1-heading'>Layouts</h6></li>
                <li className='hk1-menu-message'><h6 className='hk1-intent-danger'>Message goes here</h6></li>
                <a className='hk1-menu-item'>Normal Item...</a>
                <a className='hk1-menu-item hk1-disabled'>Disabled item...</a>
                <div className='hk1-menu-divider'></div>
                <a className='hk1-menu-item hk1-intent-danger'>Delete</a>

                {/* Submenu */}
                <div className='hk1-submenu'>
                    <a className='hk1-submenu-item'>Level 1...</a>
                    <div className='hk1-submenu-content'>
                        <a className='hk1-menu-item'>Level 1-1...</a>

                        <div className='hk1-submenu'>
                            <a className='hk1-submenu-item'>Level 1-2</a>
                            <div className='hk1-submenu-content'>
                                <a className='hk1-menu-item'>Level 2-1...</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submenu with grid */}
                <div className='hk1-submenu'>
                    <div className='hk1-menu-grid'>
                        <div className='hk1-grid row'>
                            <div className='col-sm-6'>
                                <div className='hk1-menu'>
                                    <div className='hk1-menu-header'>Grid 1</div>
                                    <a className='hk1-submenu-item'>Grid 1-1</a>
                                    <a className='hk1-submenu-item'>Grid 1-2</a>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='hk1-menu'>
                                    <div className='hk1-menu-header'>Grid 2</div>
                                    <a className='hk1-submenu-item'>Grid 2-1</a>
                                    <a className='hk1-submenu-item'>Grid 2-2</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })