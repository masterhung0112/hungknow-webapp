import React from 'react';
import {bindActionCreators} from 'redux';
import Router from 'next/router';
import {UserAgent, Utils} from 'utils';
import * as GlobalActions from 'actions/global_actions';
import {connect} from 'react-redux';

import {loadMeAndConfig} from 'actions/views/root';

import {getSiteURL} from 'utils/url';

import {GlobalState} from 'hkclient-redux/types/store';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import {setUrl} from 'hkclient-redux/actions/general';
import {ActionResult, ActionResultType} from 'hkclient-redux/types/actions';

type TalkingProps = {
    noAccounts: boolean;
    showTermsOfService: boolean;
    actions: {
        loadMeAndConfig: () => Promise<ActionResultType | ActionResultType[]>;

        // getWarnMetricsStatus: Function,
        redirectUserToDefaultTeam: () => Promise<ActionResult>;
    };
}

type TalkingStates = {
    configLoaded: boolean;
}

export class Talking extends React.Component<TalkingProps, TalkingStates> {
    constructor(props: TalkingProps) {
        super(props);

        // Configure the default URL for server
        setUrl(getSiteURL());

        // setUrl('http://localhost:4444')

        this.state = {
            configLoaded: false,
        };
    }

    onConfigLoaded() {
        const {pathname, router} = Router;

        // if (isDevMode()) {
        //     enableDevModeFeatures();
        // }

        if (!router) {
            console.error('router is null')
            return
        }

        if (pathname === '/talking' && this.props.noAccounts) {
            router.push('/signup_user_complete');
        }

        const iosDownloadLink = 'ios'; //getConfig(store.getState()).IosAppDownloadLink;
        const androidDownloadLink = 'android'; // getConfig(store.getState()).AndroidAppDownloadLink;

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

        this.setState((previousState) => ({
            ...previousState,
            configLoaded: true,
        }));
    }

    componentDidUpdate(prevProps: TalkingProps) {
        const {pathname, router} = Router;

        if (!router) {
            console.error('router is null')
            return
        }

        if (pathname === '/talking') {
            if (this.props.noAccounts) {
                router.push('/signup_user_complete');
            } else if (this.props.showTermsOfService) {
                router.push('/terms_of_service');
            }
        }
    }

    componentDidMount() {
        const {pathname} = Router;

        this.props.actions.
            loadMeAndConfig().
            then((response: any) => {
                console.log('response', response);

                // User have loggined before
                if (pathname === '/talking' && response[2] && response[2].data) {
                    this.props.actions.redirectUserToDefaultTeam();
                }
                this.onConfigLoaded();
            }).
            then(() => {
                // if (isCurrentUserSystemAdmin(store.getState())) {
                //     this.props.actions.getWarnMetricsStatus();
                // }
            });

    // trackLoadTime();
    }

    componentWillUnmount() {
    // if (!Utils.isServer()) {
    // (window as any).unbind('storage');
    // }
    }

    render() {
        if (!this.state.configLoaded) {
            return <div/>;
        }

        return <div>Talking page</div>;
    }
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const showTermsOfService = false; //shouldShowTermsOfService(state);
    // const plugins = state.plugins.components.CustomRouteComponent;

    const teamId = ''; //LocalStorageStore.getPreviousTeamId(getCurrentUserId(state));
    // const permalinkRedirectTeam = getTeam(state, teamId);

    return {

        // diagnosticsEnabled: false, //config.DiagnosticsEnabled === 'true',
        noAccounts: config.NoAccounts === 'true',

        // diagnosticId: '', //config.DiagnosticId,
        permalinkRedirectTeamName: '', //permalinkRedirectTeam ? permalinkRedirectTeam.name : '',
    // showTermsOfService,
    // plugins,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(
            {
                loadMeAndConfig,

                // null, //getWarnMetricsStatus,
                redirectUserToDefaultTeam: GlobalActions.redirectUserToDefaultTeam,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Talking);
