// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route} from 'react-router-dom';

import Messaging from './components/messaging';
import Composing from './components/composing';
import Mentioning from './components/mentioning';
import Formatting from './components/formatting';
import Attaching from './components/attaching';
import Commands from './components/commands';

type Props = {
    match: {
        url: string;
    };
}

export default class HelpController extends React.PureComponent<Props> {
    public componentDidUpdate(): void {
        // eslint-disable-next-line react/no-find-dom-node
        const helpControllerNode = ReactDOM.findDOMNode(this);

        if (helpControllerNode && helpControllerNode instanceof HTMLDivElement) {
            helpControllerNode.scrollIntoView();
        }
    }

    public render(): JSX.Element {
        return (
            <div className='help-page'>
                <div className='container col-sm-10 col-sm-offset-1'>
                    <Routes>
                        <Route
                            path={`${this.props.match.url}/messaging`}
                            element={Messaging}
                        />
                        <Route
                            path={`${this.props.match.url}/composing`}
                            element={Composing}
                        />
                        <Route
                            path={`${this.props.match.url}/mentioning`}
                            element={Mentioning}
                        />
                        <Route
                            path={`${this.props.match.url}/formatting`}
                            element={Formatting}
                        />
                        <Route
                            path={`${this.props.match.url}/attaching`}
                            element={Attaching}
                        />
                        <Route
                            path={`${this.props.match.url}/commands`}
                            element={Commands}
                        />
                    </Routes>
                </div>
            </div>
        );
    }
}
