import React from 'react';
import { Menu, MenuItem } from '@hungknow/uikit';

interface Route1 {
    title: string
    route: string
    children: Route1[]
    tag?: string
    sourcePath?: string
}

const routes = {
    tag: 'header',
    title: 'Components',
    route: 'components',
    children: [{
        route: 'components/button',
        title: 'Button',
    }],
}

export const ShowCaseRoutes: React.VFC = ({}) => {
    // const handleNavigation = (activeSectionId: string) => {
    //     // only update state if this section reference is valid
    //     const activePageId = this.routeToPage[activeSectionId];
    //     if (activeSectionId !== undefined && activePageId !== undefined) {
    //         this.setState({ activePageId, activeSectionId, isNavigatorOpen: false });
    //         this.scrollToActiveSection();
    //     }
    // }
    return (
        <div className="hk1 dark">
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

function isParentOfRoute(parent: string, route: string) {
    return route.indexOf(parent + "/") === 0 || route.indexOf(parent + ".") === 0;
}