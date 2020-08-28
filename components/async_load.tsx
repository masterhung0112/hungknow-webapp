import React from 'react';

export function makeAsyncComponent(LazyComponent) {
    return (props) => (
        <React.Suspense fallback={null}>
            <LazyComponent {...props}/>
        </React.Suspense>
    );
}
