import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import mobileImg from 'images/deep-linking/deeplinking-mobile-img.png';
import desktopImg from 'images/deep-linking/deeplinking-desktop-img.png';

import styles from './linkingLandingComponent.module.scss'
import { NS, Intent } from 'common'
import * as UserAgent from 'utils/UserAgent'
import { AnchorButton } from 'core/components';
import { Utils } from 'utils'

export type LinkingLandingComponentProps = {

}

export type LinkingLandingComponentState = {
    redirectPage: boolean;
    nativeLocation: string;

}

export const LINKING_LANDING = `${NS}-linking-landing`;
export const LINKING_LANDING_DIALOG = `${NS}-dialog`;
export const LINKING_LANDING_DIALOG_BODY = `${NS}-dialog-body`;
export const LINKING_LANDING_GRAPHIC = `${NS}-graphic`;
export const LINKING_LANDING_MOBILE = `${NS}-mobile`;
export const LINKING_LANDING_BUTTONS = `${NS}-buttons`;
export const LINKING_LANDING_STATUS = `${NS}-status`;
export const LINKING_LANDING_DOWNLOAD = `${NS}-download`;


export default class LinkingLandingComponent extends PureComponent<LinkingLandingComponentProps, LinkingLandingComponentState> {
    constructor(props: LinkingLandingComponentProps) {
        super(props)

        let location = ''

        if (!Utils.isServer) {
            location = window.location.href.replace('/landing#', '');
        }

        this.state = {
            redirectPage: false,
            nativeLocation: location.replace(/^(https|http)/, 'hungknow'),
        }
    }

    renderGraphic = () => {
        const isMobile = UserAgent.isMobile();

        if (isMobile) {
            return (
                <img src={mobileImg} />
            );
        }

        return (
            <img src={desktopImg} />
        );
    }

    renderDialogHeader = () => {

    }

    renderSystemDialogMessage = () => {
        const isMobile = UserAgent.isMobile();

        if (isMobile) {
            return (
                <FormattedMessage
                    id='get_app.systemDialogMessageMobile'
                    defaultMessage='View in App'
                />
            );
        }

        return (
            <FormattedMessage
                id='get_app.systemDialogMessage'
                defaultMessage='View in Desktop App'
            />
        );
    }

    renderGoNativeAppMessage = () => {
        return (
            <AnchorButton intent={Intent.PRIMARY} href={Utils.isMobile() ? '#' : this.state.nativeLocation}>{this.renderSystemDialogMessage()}</AnchorButton>
            // <a
            //     // href={Utils.isMobile() ? '#' : this.state.nativeLocation}
            //     onMouseDown={() => {
            //         // this.setPreference(LandingPreferenceTypes.MATTERMOSTAPP, true);
            //     }}
            //     onClick={() => {
            //         // this.setState({redirectPage: true, navigating: true});
            //         // if (Utils.isMobile()) {
            //         //     if (UserAgent.isAndroidWeb()) {
            //         //         const timeout = setTimeout(() => {
            //         //             window.location.replace(this.getDownloadLink()!);
            //         //         }, 2000);
            //         //         window.addEventListener('blur', () => {
            //         //             clearTimeout(timeout);
            //         //         });
            //         //     }
            //         //     window.location.replace(this.state.nativeLocation);
            //         // }
            //     }}
            //     className={classNames('btn', 'btn-primary', 'btn-lg', styles[LINKING_LANDING_DOWNLOAD])}
            // >
               
            // </a>
        );
    }

    renderDialogBody() {
        if (this.state.redirectPage) {
        }

        return (
            <div className={styles[LINKING_LANDING_DIALOG_BODY]}>
                {this.renderDialogHeader()}
                <div className={styles[LINKING_LANDING_BUTTONS]}>
                    <div className={styles[LINKING_LANDING_STATUS]}>
                        {this.renderGoNativeAppMessage()}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const isMobile = UserAgent.isMobile();

        const graphicClassName = classNames(
            styles[LINKING_LANDING_GRAPHIC],
            {
                [styles[LINKING_LANDING_MOBILE]]: isMobile
            }
        )

        return (
            <div className={styles[LINKING_LANDING]}>
                <div className={styles[LINKING_LANDING_DIALOG]}>
                    <div className={classNames(styles[LINKING_LANDING_GRAPHIC],
                        {
                            [styles[LINKING_LANDING_MOBILE]]: isMobile
                        }
                    )}>
                        {this.renderGraphic()}
                    </div>
                    {this.renderDialogBody()}
                </div>
            </div>
        )
    }
}