// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {areTimezonesEnabledAndSupported} from 'selectors/general';

import {GlobalState} from 'types/store';

import {Preferences} from 'utils/constants';

import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {getUserTimezone} from 'hkclient-redux/selectors/entities/timezone';
import {getUserCurrentTimezone} from 'hkclient-redux/utils/timezone_utils';
import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {UserTimezone} from 'hkclient-redux/types/users';

import Timestamp, {Props as TimestampProps, supportsHourCycle} from './timestamp';

type Props = {
    userTimezone?: UserTimezone;
}

function mapStateToProps(state: GlobalState, {userTimezone}: Props) {
    const currentUserId = getCurrentUserId(state);

    let timeZone: TimestampProps['timeZone'];
    let hourCycle: TimestampProps['hourCycle'];
    let hour12: TimestampProps['hour12'];

    if (areTimezonesEnabledAndSupported(state)) {
        timeZone = getUserCurrentTimezone(userTimezone ?? getUserTimezone(state, currentUserId)) ?? undefined;
    }

    const useMilitaryTime = getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false);

    if (supportsHourCycle) {
        hourCycle = useMilitaryTime ? 'h23' : 'h12';
    } else {
        hour12 = !useMilitaryTime;
    }

    return {timeZone, hourCycle, hour12};
}

export default connect(mapStateToProps)(Timestamp);

export {default as SemanticTime} from './semantic_time';
import * as RelativeRanges from './relative_ranges';
export {RelativeRanges};