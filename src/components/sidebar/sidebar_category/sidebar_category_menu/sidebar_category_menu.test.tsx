// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'

import { CategoryTypes } from 'hkclient-ts/lib/constants/channel_categories'
import { CategorySorting } from 'hkclient-ts/lib/types/channel_categories'

import { shallowWithIntl } from 'testlib/helpers/intl-test-helper'

import SidebarCategoryMenu from './sidebar_category_menu'

describe('components/sidebar/sidebar_category/sidebar_category_menu', () => {
  const baseProps: any = {
    category: {
      id: 'category1',
      team_id: 'team1',
      user_id: '',
      type: CategoryTypes.CUSTOM,
      display_name: 'custom_category_1',
      channel_ids: ['channel_id'],
      sorting: CategorySorting.Alphabetical,
      muted: false,
    },
    currentTeamId: 'team1',
    isMuted: false,
    isMenuOpen: false,
    onToggleMenu: jest.fn(),
    actions: {
      openModal: jest.fn(),
      setCategoryMuted: jest.fn(),
      setCategorySorting: jest.fn(),
    },
  }

  test('should match snapshot and contain correct buttons', () => {
    const wrapper = shallowWithIntl(<SidebarCategoryMenu {...baseProps} />)

    expect(wrapper.find('#rename-category1')).toHaveLength(1)
    expect(wrapper.find('#create-category1')).toHaveLength(1)
    expect(wrapper.find('#delete-category1')).toHaveLength(1)

    expect(wrapper).toMatchSnapshot()
  })

  test('should match snapshot when category is favorites', () => {
    const props = {
      ...baseProps,
      category: {
        ...baseProps.category,
        type: CategoryTypes.FAVORITES,
      },
    }

    const wrapper = shallowWithIntl(<SidebarCategoryMenu {...props} />)

    expect(wrapper.find('#rename-category1')).toHaveLength(0)
    expect(wrapper.find('#delete-category1')).toHaveLength(0)

    expect(wrapper).toMatchSnapshot()
  })
})
