// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import './entry.js';

import React from 'react';
import ReactDOM from 'react-dom';

import PDFJS from 'pdfjs-dist';

import {logError} from 'hkclient-redux/actions/errors';

// Import our styles
import 'hk-chat/dist/hkchat-styles.css';
import 'katex/dist/katex.min.css';

import {Utils, App, ReduxStore} from 'hk-chat';

PDFJS.disableWorker = true;

// This is for anything that needs to be done for ALL react components.
// This runs before we start to render anything.
function preRenderSetup(callwhendone) {
    window.onerror = (msg, url, line, column, stack) => {
        if (msg === 'ResizeObserver loop limit exceeded') {
            return;
        }
        var l = {};
        l.level = 'ERROR';
        l.message = 'msg: ' + msg + ' row: ' + line + ' col: ' + column + ' stack: ' + stack + ' url: ' + url;

        const req = new XMLHttpRequest();
        req.open('POST', '/api/v4/logs');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(l));

        if (Utils.isDevMode()) {
            ReduxStore.defaultStore.dispatch(logError({type: 'developer', message: 'DEVELOPER MODE: A JavaScript error has occurred.  Please use the JavaScript console to capture and report the error (row: ' + line + ' col: ' + column + ').'}, true));
        }
    };
    Utils.setCSRFFromCookie();
    callwhendone();
}

function renderRootComponent() {
    ReactDOM.render((
        <App/>
    ),
    document.getElementById('root'));
}

/**
 * Adds a function to be invoked onload appended to any existing onload
 * event handlers.
 *
 * @param   {function} fn onload event handler
 *
 */
function appendOnLoadEvent(fn) {
    if (window.attachEvent) {
        window.attachEvent('onload', fn);
    } else if (window.onload) {
        const curronload = window.onload;
        window.onload = (evt) => {
            curronload(evt);
            fn(evt);
        };
    } else {
        window.onload = fn;
    }
}

appendOnLoadEvent(() => {
    // Do the pre-render setup and call renderRootComponent when done
    preRenderSetup(renderRootComponent);
});
