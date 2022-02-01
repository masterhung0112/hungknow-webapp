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
        route: 'components/menu',
        title: 'Menu',
        sourcePath: './contents/components/menu.mdx'
    }],
}]