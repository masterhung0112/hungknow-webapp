import React from 'react'

export default function makeAsyncComponent(LazyComponent: React.ComponentType<any>) {
    return (props: React.Props<any>) => (
    <React.Suspense fallback={null}>
        <LazyComponent {...props} />
    </React.Suspense>
    )
}
  