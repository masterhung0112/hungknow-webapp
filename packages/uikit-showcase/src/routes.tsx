import React from 'react';
import { Menu, MenuItem } from '@hungknow/uikit';

interface RouteData {
    title: string
    route: string
    children?: RouteData[]
    tag?: string
    sourcePath?: string
}

const routes: RouteData = {
    tag: 'header',
    title: 'Components',
    route: 'components',
    children: [{
        route: 'components/button',
        title: 'Button',
    },{
        route: 'components/menu',
        title: 'Menu',
    }],
}

const renderOneRoute = (routeData: RouteData) => {
    let isHeader = false

    switch(routeData.tag) {
        case 'header':
            isHeader = true
            break
        default:
            break
    }

    return <MenuItem isHeader={isHeader} text={routeData.title}>
        {Array.isArray(routeData.children) && routeData.children.length > 0 ? 
        routeData.children.map((child) => {
            return renderOneRoute(child)
        }) : null }
    </MenuItem>
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
        <div className="hk1">
            <Menu>
                {/* <a className="menu-header"><h4>Elements</h4></a>
                <div className="sub-menu">
                    <MenuItem text="Button" />
                    <MenuItem>
                        <MenuItem text="nav" />
                        <MenuItem text="CSS" />
                        <MenuItem text="Menu" />
                    </MenuItem>
                </div>
                <a className="menu-item">Nav</a> */}
                {renderOneRoute(routes)}
            </Menu>
        </div>
    )
}

function isParentOfRoute(parent: string, route: string) {
    return route.indexOf(parent + "/") === 0 || route.indexOf(parent + ".") === 0;
}