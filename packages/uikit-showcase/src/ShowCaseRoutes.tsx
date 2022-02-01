import React from 'react';
import { Menu, MenuItem } from '@hungknow/uikit';
import { DocRouteData, docRoutes } from './constant/routes';

export type OnDocRouteDataClick = (docRouteData: DocRouteData) => void
export interface ShowCaseRoutesProps {
    activeSectionId: string
    onItemClick: OnDocRouteDataClick
}

const renderOneRoute = (routeData: DocRouteData, onItemClick: OnDocRouteDataClick) => {

}
export interface ShowCaseMenuItemProps {
    isActive: boolean
    isExpanded: boolean
    onClick: () => void
    routeData: DocRouteData
}

// export const ShowCaseMenuItem: React.FC<ShowCaseMenuItemProps> = ({ isActive, isExpanded, onClick, routeData, children }) => {
//     let isHeader = false

//     switch (routeData.tag) {
//         case 'header':
//             isHeader = true
//             break
//         default:
//             break
//     }

//     return
//         {children}
//     </MenuItem>
// }


export interface ShowCaseMenuProps {
    onItemClick: OnDocRouteDataClick
    routeDatas: DocRouteData[]
    activeSectionId: string
}

// With the list of routeDatas, display all route 
export const ShowCaseMenu: React.FC<ShowCaseMenuProps> = ({ onItemClick, routeDatas, activeSectionId }) => {
    const menus = routeDatas.map((docRoute) => {
        const isActive = activeSectionId === docRoute.route
        const isExpanded = isActive || isParentOfRoute(docRoute.route, activeSectionId)

        let isHeader = false

        switch (docRoute.tag) {
            case 'header':
                isHeader = true
                break
            default:
                break
        }

        return <MenuItem isHeader={isHeader} text={docRoute.title} onClick={() => onItemClick(docRoute)} active={isActive} expanded={isExpanded}>
            {/* <ShowCaseMenuItem isActive={isActive} isExpanded={isExpanded} routeData={docRoute} onClick={onClick} /> */}

            {docRoute.children ? <ShowCaseMenu routeDatas={docRoute.children} onItemClick={onItemClick} activeSectionId={activeSectionId} /> : null}
        </MenuItem>
    })

    return <>
        {menus}
    </>
}


export const ShowCaseRoutes: React.VFC<ShowCaseRoutesProps> = ({ activeSectionId, onItemClick }) => {
    return (
        <div className="docs-nav">
            <Menu>
                <ShowCaseMenu activeSectionId={activeSectionId} routeDatas={docRoutes} onItemClick={onItemClick} />
            </Menu>
        </div>
    )
}

function isParentOfRoute(parent: string, route: string) {
    return route.indexOf(parent + "/") === 0 || route.indexOf(parent + ".") === 0;
}