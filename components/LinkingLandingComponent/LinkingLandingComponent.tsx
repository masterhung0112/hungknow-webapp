import React, { PureComponent } from 'react';
import classNames from 'classnames'

import mobileImg from 'images/deep-linking/deeplinking-mobile-img.png';
import desktopImg from 'images/deep-linking/deeplinking-desktop-img.png';

import styles from './LinkingLandingComponent.module.scss'
import { NS } from 'common'

export type LinkingLandingComponentProps = {

}

export type LinkingLandingComponentState = {
    redirectPage: boolean
}

export const LINKING_LANDING = `${NS}-linking-landing`;
export const LINKING_LANDING_DIALOG = `${NS}-dialog`;
export const LINKING_LANDING_GRAPHIC = `${NS}-graphic`;
export const LINKING_LANDING_MOBILE = `${NS}-mobile`;

export default class LinkingLandingComponent extends PureComponent<LinkingLandingComponentProps, LinkingLandingComponentState> {
    constructor(props: LinkingLandingComponentProps) {
        super(props)

        this.state = {
            redirectPage: false
        }
    }

    renderGraphic = () => {
        const isMobile = true //UserAgent.isMobile();

        if (isMobile) {
            return (
                <img src={mobileImg} />
            );
        }

        return (
            <img src={desktopImg} />
        );
    }

    renderDialogBody() {
        if (this.state.redirectPage) {
        }
    }

    render() {
        const isMobile = false //UserAgent.isMobile();

        const graphicClassName = classNames(
            styles[LINKING_LANDING_GRAPHIC],
            {
                [styles[LINKING_LANDING_MOBILE]]: isMobile
            }
        )

        return (
            <div className={classNames(styles[LINKING_LANDING])}>
                <div className={classNames(styles[LINKING_LANDING_DIALOG])}>
                    <div className={classNames(styles[LINKING_LANDING_GRAPHIC],
                        {
                            [styles[LINKING_LANDING_MOBILE]]: isMobile
                        }
                    )}>
                        {this.renderGraphic()}
                    </div>
                    {/* {this.renderDialogBody()} */}
                </div>
            </div>
        )
    }
}