import React from 'react'
import { isNodeEnv } from './utils';

/**
 * An abstract component that components can extend
 * in order to add some common functionality like runtime props validation.
 */
export abstract class AbstractPureComponent<P, S = {}, SS = {}> extends React.PureComponent<P, S, SS> {
    // unsafe lifecycle method
    public componentWillUpdate: never;
    public componentWillReceiveProps: never;
    public componentWillMount: never;
    // this should be static, not an instance method
    public getDerivedStateFromProps: never;

    /** Component displayName should be `public static`. This property exists to prevent incorrect usage. */
    protected displayName: never;

    constructor(props: P, context?: any) {
        super(props, context);
        if (!isNodeEnv("production")) {
            this.validateProps(this.props);
        }
    }

     /**
     * Ensures that the props specified for a component are valid.
     * Implementations should check that props are valid and usually throw an Error if they are not.
     * Implementations should not duplicate checks that the type system already guarantees.
     *
     * This method should be used instead of React's
     * [propTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) feature.
     * Like propTypes, these runtime checks run only in development mode.
     */
    protected validateProps(_props: P) {
        // implement in subclass
    }
}