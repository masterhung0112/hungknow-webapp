import React, { useState } from 'react'
import { baseRoute, DocRouteData } from './constant/routes'
import { ShowCaseRoutes } from './ShowCaseRoutes'
import {Navbar} from '@hungknow/uikit'

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

const defaultComponent = 'popover'

export default function Root() {
  const [docPath, setDocPath] = useState('')
  const [navIsOpen, setNavOpen] = useState(false)
  
  const onDocRouteChanged = (routeData: DocRouteData) => {
    if (routeData && typeof routeData.sourcePath === 'string' && routeData.sourcePath) {
      setDocPath(routeData.sourcePath)
    }
  }

  return (
    <div className="docs-root hk1 hk-dark">
      <Navbar>
         <button className="navbar-toggler d-md-none py-0 px-1 ms-3" type="button" onClick={() => setNavOpen(!navIsOpen)}>
             <span className="navbar-toggler-icon"></span>
         </button>
       </Navbar>
      <div className='docs-app row'>
        <div className='docs-nav-wrapper col-lg-3'>
          <ShowCaseRoutes onDocRouteChanged={onDocRouteChanged} defaultPageId={`${baseRoute}/components/${defaultComponent}`} hidden={!navIsOpen} />
        </div>
        <main className='docs-content-wrapper col-lg-auto container-xll' role="main">
          <div className="docs-page">
            <LazyThing filePath={docPath} />
          </div>
        </main>
      </div>
    </div>
  );
}
