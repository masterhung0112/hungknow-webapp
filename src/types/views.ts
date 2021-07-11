import { Channel } from 'hkclient-redux/types/channels'
import { MarketplacePlugin } from 'hkclient-redux/types/plugins'
import { Dictionary } from 'hkclient-redux/types/utilities'
import { DraggingState } from 'react-beautiful-dnd'

import ViewsConstants from '../constants/views'

import { I18nState } from './store/i18n'
import { RhsViewState } from './store/rhs'

export interface ViewsAwareState {
  [ViewsConstants.VIEWS_MODULE_NAME]: ViewsState
}

export type ViewsState = Readonly<{
  admin: {
    navigationBlock: {
      blocked: boolean
      onNavigationConfirmed: () => void
      showNavigationPrompt: boolean
    }
  }

  browser: {
    focused: boolean
  }

  channel: {
    postVisibility: {
      [channelId: string]: number
    }
    lastChannelViewTime: {
      [channelId: string]: number
    }
    loadingPost: {
      [channelId: string]: boolean
    }
    focusedPostId: string
    mobileView: boolean
    lastUnreadChannel: (Channel & { hadMentions: boolean }) | null // Actually only an object with {id: string, hadMentions: boolean}
    lastGetPosts: {
      [channelId: string]: number
    }
    channelPrefetchStatus: {
      [channelId: string]: string
    }
  }

  rhs: RhsViewState

  posts: {
    editingPost: {
      show: boolean
    }
    menuActions: {
      [postId: string]: {
        [actionId: string]: {
          text: string
          value: string
        }
      }
    }
  }

  modals: {
    [modalId: string]: {
      open: boolean
      dialogProps: Dictionary<any>
      dialogType: React.Component
    }
  }

  emoji: {
    emojiPickerCustomPage: 0
  }

  i18n: I18nState

  lhs: {
    isOpen: boolean
  }

  search: {
    modalSearch: string
    modalFilters: {
      roles?: string[]
      channel_roles?: string[]
      team_roles?: string[]
    }
    systemUsersSearch: {
      term: string
      team: string
      filter: string
    }
    userGridSearch: {
      term: string
      filters: {
        roles?: string[]
        channel_roles?: string[]
        team_roles?: string[]
      }
    }
  }

  notice: {
    hasBeenDismissed: {
      [message: string]: boolean
    }
  }

  system: {
    websocketConnectErrorCount: number
  }

  channelSelectorModal: {
    channels: Channel[]
  }

  settings: {
    activeSection: string
    previousActiveSection: string
  }

  marketplace: {
    plugins: MarketplacePlugin[]
    installing: { [pluginId: string]: boolean }
    errors: { [pluginId: string]: string }
    filter: string
  }

  channelSidebar: {
    unreadFilterEnabled: boolean
    draggingState: DraggingState
    newCategoryIds: string[]
    multiSelectedChannelIds: string[]
    lastSelectedChannel: string
  }

  nextSteps: {
    show: boolean
  }

  statusDropdown: {
    isOpen: boolean
  }
}>
