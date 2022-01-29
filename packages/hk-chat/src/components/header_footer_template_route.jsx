// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import { Outlet } from 'react-router-dom';

const HeaderFooterTemplate = React.lazy(() => import('components/header_footer_template'));
const LoggedIn = React.lazy(() => import('components/logged_in'));

export const HFTRoute = () => (
    <React.Suspense fallback={null}>
        <HeaderFooterTemplate>
            <Outlet/>
        </HeaderFooterTemplate>
    </React.Suspense>
);

export const LoggedInHFTRoute = () => (
    <React.Suspense fallback={null}>
        <LoggedIn>
            <React.Suspense fallback={null}>
                <HeaderFooterTemplate>
                    <Outlet/>
                </HeaderFooterTemplate>
            </React.Suspense>
        </LoggedIn>
    </React.Suspense>
);
