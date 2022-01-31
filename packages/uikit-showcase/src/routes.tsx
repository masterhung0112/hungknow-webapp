import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu, MenuItem } from '@hungknow/uikit';

export const ShowCaseRoutes = () => {
    return (
        <div className="hk1">
            <Menu>
                <a className="menu-header"><h4>Elements</h4></a>
                <div className="sub-menu">
                    <MenuItem text="Button" />
                    <Menu>
                        <MenuItem text="nav" />
                        <MenuItem text="CSS" />
                    </Menu>
                </div>
                <a className="menu-item">Nav</a>
            </Menu>
        </div>
    )
}