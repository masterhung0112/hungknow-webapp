import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class AbstractPureComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P, S, SS> {
    // constructor(props: Readonly<P> | P);
    // constructor(props: P, context?: any) {
    //     super(props, context)
    //     // if (!isNodeEnv("production")) {
    //     //     this.validateProps(this.props);
    //     // }
    // }
}