import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import mobileImg from 'images/deep-linking/deeplinking-mobile-img.png'
import desktopImg from 'images/deep-linking/deeplinking-desktop-img.png'

import styles from './linkingLandingComponent.module.scss'
import { Intent } from 'common'
import * as UserAgent from 'utils/UserAgent'
import { AnchorButton } from 'core/components'
import { Utils } from 'utils'

export type LinkingLandingComponentProps = Record<string, any>

export type LinkingLandingComponentState = {
  redirectPage: boolean
  nativeLocation: string
}

export default class LinkingLandingComponent extends PureComponent<
  LinkingLandingComponentProps,
  LinkingLandingComponentState
> {
  constructor(props: LinkingLandingComponentProps) {
    super(props)

    let location = ''

    if (!Utils.isServer) {
      location = window.location.href.replace('/landing#', '')
    }

    this.state = {
      redirectPage: false,
      nativeLocation: location.replace(/^(https|http)/, 'hungknow'),
    }
  }

  renderGraphic = () => {
    const isMobile = UserAgent.isMobile()

    if (isMobile) {
      return <img src={mobileImg} />
    }

    return <img src={desktopImg} />
  }

  // renderDialogHeader = () => {

  // }

  renderSystemDialogMessage = () => {
    const isMobile = UserAgent.isMobile()

    if (isMobile) {
      return <FormattedMessage id="get_app.systemDialogMessageMobile" defaultMessage="View in App" />
    }

    return <FormattedMessage id="get_app.systemDialogMessage" defaultMessage="View in Desktop App" />
  }

  renderGoNativeAppMessage = () => {
    return (
      <AnchorButton intent={Intent.PRIMARY} href={Utils.isMobile() ? '#' : this.state.nativeLocation}>
        {this.renderSystemDialogMessage()}
      </AnchorButton>
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
    )
  }

  renderDialogBody() {
    // if (this.state.redirectPage) {
    // }

    return (
      <div className={styles['hk-dialog-body']}>
        {/* {this.renderDialogHeader()} */}
        <div className={styles['hk-buttons']}>
          <div className={styles['hk-status']}>{this.renderGoNativeAppMessage()}</div>
        </div>
      </div>
    )
  }

  render() {
    const isMobile = UserAgent.isMobile()

    const graphicClassName = classNames(styles['hk-graphic'], {
      [styles['hk-mobile']]: isMobile,
    })

    return (
      <div className={styles['hk-linking-landing']}>
        <div className={styles['hk-dialog']}>
          <div
            className={classNames(styles['hk-graphic'], {
              [styles['hk-mobile']]: isMobile,
            })}
          >
            {this.renderGraphic()}
          </div>
          {this.renderDialogBody()}
        </div>
      </div>
    )
  }
}
