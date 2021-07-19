// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {OverlayTrigger as OriginalOverlayTrigger, OverlayTriggerProps} from 'react-bootstrap';
import {IntlContext, IntlShape} from 'react-intl';

import {Provider} from 'react-redux';

import store from 'stores/redux_store';

export type BaseOverlayTrigger = OriginalOverlayTrigger & {
    hide: () => void;
}

type Props = OverlayTriggerProps & {
    disabled?: boolean;
    className?: string;
};

const OverlayTrigger = React.forwardRef((props: Props, ref?: React.Ref<OriginalOverlayTrigger>) => {
    const {
        overlay,
        disabled,
        ...otherProps
    } = props;

    // The overlay is rendered outside of the regular React context, and our version react-bootstrap can't forward
    // that context itself, so we have to manually forward the react-intl context to this component's child.
    const OverlayWrapper = ({intl, ...overlayProps}: { intl: IntlShape }) => (
        <Provider store={store}>
            <IntlContext.Provider value={intl}>
                {React.cloneElement(overlay, overlayProps)}
            </IntlContext.Provider>
        </Provider>
    );

    return (
        <IntlContext.Consumer>
            {(intl): React.ReactNode => {
                const overlayProps = {...overlay.props};
                if (disabled) {
                    overlayProps.style = {visibility: 'hidden', ...overlayProps.style};
                }
                return (
                    <OriginalOverlayTrigger
                        {...otherProps}
                        ref={ref}
                        overlay={
                            <OverlayWrapper
                                {...overlayProps}
                                intl={intl}
                            />
                        }
                    />
                );
            }}
        </IntlContext.Consumer>
    );
});

OverlayTrigger.defaultProps = {
    defaultOverlayShown: false,
    trigger: ['hover', 'focus'],
};
OverlayTrigger.displayName = 'OverlayTrigger';

export default OverlayTrigger;
