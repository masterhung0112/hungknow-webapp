// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Dispatch, bindActionCreators, ActionCreatorsMapObject} from 'redux';

import {setCategoryMuted, setCategorySorting} from 'hkclient-redux/actions/channel_categories';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {ActionFunc} from 'hkclient-redux/types/actions';
import {CategorySorting} from 'hkclient-redux/types/channel_categories';
import {GlobalState} from 'hkclient-redux/types/store';

import {openModal} from 'actions/views/modals';

import SidebarCategoryMenu from './sidebar_category_menu';

function makeMapStateToProps() {
    return (state: GlobalState) => {
        const currentTeam = getCurrentTeam(state);

        return {
            currentTeamId: currentTeam.id,
        };
    };
}

type Actions = {
    openModal: (modalData: {modalId: string; dialogType: React.Component; dialogProps?: any}) => Promise<{
        data: boolean;
    }>;
    setCategoryMuted: (categoryId: string, muted: boolean) => Promise<void>;
    setCategorySorting: (categoryId: string, sorting: CategorySorting) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            openModal,
            setCategoryMuted,
            setCategorySorting,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarCategoryMenu);
