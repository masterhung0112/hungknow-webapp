import React from 'react'
import Router from 'next/router'
import { UserAgent } from 'utils'

type TalkingProps = {

}

type TalkingStates = {
    configLoaded: boolean
}

export default class Talking extends React.Component<TalkingProps, TalkingStates> {
    constructor(props: TalkingProps) {
        super(props)

        this.state = {
            configLoaded: false,
        };
    }

    onConfigLoaded() {
        var { pathname, query, router } = Router
        
        if (pathname == '/' ) {
            Router.push('/hello-nextjs')
        }

        // if (isDevMode()) {
        //     enableDevModeFeatures();
        // }

        const iosDownloadLink = 'ios' //getConfig(store.getState()).IosAppDownloadLink;
        const androidDownloadLink = 'android' // getConfig(store.getState()).AndroidAppDownloadLink;

         // redirect to the mobile landing page if the user hasn't seen it before
         let mobileLanding;
         if (UserAgent.isAndroidWeb()) {
             mobileLanding = androidDownloadLink;
         } else if (UserAgent.isIosWeb()) {
             mobileLanding = iosDownloadLink;
         }

         const toResetPasswordScreen = pathname === '/reset_password_complete';
         //!BrowserStore.hasSeenLandingPage()
        if (mobileLanding && !toResetPasswordScreen && !pathname.includes('/landing')) {
            router.push('/talking/linkingLanding#' + pathname);
            // BrowserStore.setLandingPageSeen(true);
        }

        this.setState(previousState => ({
            ...previousState,
            configLoaded: true
        }))
    }

    componentDidMount() {
        this.onConfigLoaded();
    }

    render() {
        if (!this.state.configLoaded) {
            return <div/>;
        }

        return (
            <div>Talking page</div>
            // <Switch>
            //     <Route
            //         path={'/landing'}
            //         component={require('./talking/linkingLanding')}
            //         />
            // </Switch>
        )
    }
}