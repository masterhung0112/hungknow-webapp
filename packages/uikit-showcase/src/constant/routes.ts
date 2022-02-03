export interface DocRouteData {
    title: string
    route: string
    children?: DocRouteData[]
    tag?: string
    sourcePath?: string
}

export const docRoutes: DocRouteData[] = [{
    tag: 'header',
    title: 'Components',
    route: 'components',
    children: [{
        route: 'components/button',
        title: 'Button',
        sourcePath: './contents/components/button.mdx'
    }, {
        route: 'components/collapse',
        title: 'Collapse',
        sourcePath: './contents/components/collapse.mdx'
    }, {
        route: 'components/menu',
        title: 'Menu',
        sourcePath: './contents/components/menu.mdx'
    }, {
        route: 'components/nav',
        title: 'Nav',
        sourcePath: './contents/components/nav.mdx'
    }, {
        route: 'components/navbar',
        title: 'Navbar',
        sourcePath: './contents/components/navbar.mdx'
    }, {
        route: 'components/popover',
        title: 'Popover',
        sourcePath: './contents/components/popover.mdx'
    }],
}]