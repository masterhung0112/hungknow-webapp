import React, { useState } from 'react'
import { DocRouteData } from './constant/routes'
import { ShowCaseRoutes } from './ShowCaseRoutes'

const Placeholder = () => null
const LazyThing = ({ filePath, ...props }) => {
  // While the component is loading, we'll render a fallback placeholder.
  // (The Placeholder is a component that renders nothing).
  const [Component, setComponent] = React.useState(() => Placeholder)
  // After the initial render, kick off a dynamic import to fetch
  // the real component, and set it into our state.
  React.useEffect(() => {
    if (filePath) {
      import(`${filePath}`).then(Thing => setComponent(() => Thing.default))
    }
  }, [filePath])
  return <Component {...props} />
}

export default function Root(props) {
  const [activeSectionId, setActiveSectionId] = useState('components/menu')
  const [docPath, setDocPath] = useState('./contents/components/button.mdx')

  const onRouteClick = (routeData: DocRouteData) => {
    if (typeof routeData.sourcePath === 'string' && routeData.sourcePath) {
      setActiveSectionId(routeData.route)
      setDocPath(routeData.sourcePath)
    }
  }

  return (
    <div className="docs-root hk1 hk-dark">
      <div className='docs-app'>
        <div className='docs-nav-wrapper'>
          <ShowCaseRoutes onItemClick={onRouteClick} activeSectionId={activeSectionId} />
        </div>
        <main className='docs-content-wrapper fill' role="main">
          <div className="docs-page">
            <LazyThing filePath={docPath} />
          </div>
        </main>
      </div>
    </div>
  );
}
