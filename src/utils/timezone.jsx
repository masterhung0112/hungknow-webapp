// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import moment from 'moment-timezone';

import store from 'stores/redux_store.tsx';

import {getSupportedTimezones as getTimezones} from 'hkclient-redux/selectors/entities/general';

export function getSupportedTimezones(state = store.getState()) {
    return getTimezones(state);
}

export function getBrowserTimezone() {
    return moment.tz.guess();
}

export function getBrowserUtcOffset() {
    return moment().utcOffset();
}

export function getUtcOffsetForTimeZone(timezone) {
    return moment.tz(timezone).utcOffset();
}

export function getCurrentDateForTimezone(timezone) {
    const tztime = moment().tz(timezone);
    return new Date(tztime.year(), tztime.month(), tztime.date());
}

export function getCurrentDateTimeForTimezone(timezone) {
    const tztime = moment().tz(timezone);
    return new Date(tztime.year(), tztime.month(), tztime.date(), tztime.hour(), tztime.minute(), tztime.second());
}

export function getCurrentMomentForTimezone(timezone) {
    return timezone ? moment.tz(timezone) : moment();
}
