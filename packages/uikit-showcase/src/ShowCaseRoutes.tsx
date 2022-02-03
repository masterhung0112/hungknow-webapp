import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, MenuItem } from '@hungknow/uikit';
import { DocRouteData, docRoutes } from './constant/routes';

export type OnDocRouteDataClick = (docRouteData: DocRouteData) => void
export interface ShowCaseRoutesProps {
    defaultPageId: string
    // activeSectionId: string
    onDocRouteChanged: OnDocRouteDataClick
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

// With the list of routeDatas, display all routes in hierarchy
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

        return <MenuItem tagName="a" href={'#' + docRoute.route} isHeader={isHeader} text={docRoute.title} onClick={(e) => {
            e.stopPropagation()
            // onItemClick(docRoute)
        }} active={isActive} expanded={isExpanded}>
            {/* <ShowCaseMenuItem isActive={isActive} isExpanded={isExpanded} routeData={docRoute} onClick={onClick} /> */}

            {docRoute.children ? <ShowCaseMenu routeDatas={docRoute.children} onItemClick={onItemClick} activeSectionId={activeSectionId} /> : null}
        </MenuItem>
    })

    return <Menu tagName="nav">
        {menus}
    </Menu>
}


export const ShowCaseRoutes: React.VFC<ShowCaseRoutesProps> = ({ defaultPageId, onDocRouteChanged }) => {
    // const [activePageId, setActivePageId] = useState(defaultPageId)
    const [activeSectionId, setActiveSectionId] = useState(defaultPageId)

    // build up static map of all references to their page, for navigation / routing
    const routePathToDocRoute = useMemo(() => {
        const routePathToDocRouteMap = new Map()

        const iterateEachRouteData = (docRoutes: DocRouteData[]) => {
            docRoutes && docRoutes.forEach((docRoute) => {
                routePathToDocRouteMap.set(docRoute.route.toString(), docRoute)
                docRoute.children && iterateEachRouteData(docRoute.children)
            })
        }

        iterateEachRouteData(docRoutes)

        return routePathToDocRouteMap
    }, [])

    const handleNavigation = useCallback((docRouteData: DocRouteData) => {
        if (docRouteData && docRouteData.route) {
            // Set new active section ID
            setActiveSectionId(docRouteData.route)
        }
    }, [routePathToDocRoute])

    // Notify the parent that the selected route changed
    useEffect(() => {
        if (onDocRouteChanged) {
            if (routePathToDocRoute.has(activeSectionId)) {
                onDocRouteChanged(routePathToDocRoute.get(activeSectionId))
            } else {
                console.error('failed to find route data for route ', activeSectionId)
            }
        }
    }, [activeSectionId])

    // This components listen for any change in URL, then update the content display based on the URL
    useEffect(() => {
        const updateHash = () => {
            // update state based on current hash location
            let sectionId = location.hash.slice(1);
            if (sectionId === "") {
                sectionId = defaultPageId
            }
            handleNavigation(routePathToDocRoute.get(sectionId))
        }
        const handleHashChange = () => {
            if (location.hostname.indexOf("hungknow") !== -1) {
                // captures a pageview for new location hashes that are dynamically rendered without a full page request
                (window as any).ga("send", "pageview", {
                    page: location.pathname + location.search + location.hash,
                });
            }
            // Don't call componentWillMount since the HotkeysTarget decorator will be invoked on every hashchange.
            updateHash();
        }
        window.addEventListener("hashchange", handleHashChange)

        // Detect the current document from URL
        updateHash();

        return () => {
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [])

    return (
        <div className="docs-nav">
            <ShowCaseMenu activeSectionId={activeSectionId} routeDatas={docRoutes} onItemClick={handleNavigation} />
        </div>
    )
}
ShowCaseRoutes.displayName = 'ShowCaseRoutes'

function isParentOfRoute(parent: string, route: string) {
    return route.indexOf(parent + "/") === 0 || route.indexOf(parent + ".") === 0;
}