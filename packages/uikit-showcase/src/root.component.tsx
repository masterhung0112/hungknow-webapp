import React from 'react'
import { ShowCaseRoutes } from './routes'

const Placeholder = () => null
const LazyThing = ({filePath, ...props}) => {
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
  return (
    <div className='docs-app hk1 dark'>
      <div className='docs-nav-wrapper'><ShowCaseRoutes /></div>
      <main className='docs-content-wrapper fill' role="main">
        <LazyThing filePath={'./contents/components/button.mdx'} />
      </main>
    </div>
  );
}
