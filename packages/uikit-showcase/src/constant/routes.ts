export interface DocRouteData {
  title: string
  route: string
  children?: DocRouteData[]
  tag?: string
  sourcePath?: string
}

export const baseRoute = 'uikit-docs'

export const docRoutes: DocRouteData[] = [
  {
    tag: 'header',
    title: 'Components',
    route: `${baseRoute}/components`,
    children: [
      {
        route: `${baseRoute}/components/button`,
        title: 'Button',
        sourcePath: './contents/components/button.mdx',
      },
      {
        route: `${baseRoute}/components/button-group`,
        title: 'Button Group',
        sourcePath: './contents/components/buttongroup.mdx',
      },
      {
        route: `${baseRoute}/components/collapse`,
        title: 'Collapse',
        sourcePath: './contents/components/collapse.mdx',
      },
      {
        route: `${baseRoute}/components/menu`,
        title: 'Menu',
        sourcePath: './contents/components/menu.mdx',
      },
      {
        route: `${baseRoute}/components/nav`,
        title: 'Nav',
        sourcePath: './contents/components/nav.mdx',
      },
      {
        route: `${baseRoute}/components/navbar`,
        title: 'Navbar',
        sourcePath: './contents/components/navbar.mdx',
      },
      {
        route: `${baseRoute}/components/popover`,
        title: 'Popover',
        sourcePath: './contents/components/popover.mdx',
      },
      {
        route: `${baseRoute}/components/dropdown`,
        title: 'Dropdown',
        sourcePath: './contents/components/dropdown.mdx',
      },
    ],
  },
]
