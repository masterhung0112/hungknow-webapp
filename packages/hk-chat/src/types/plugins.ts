import {ClientPluginManifest, MarketplacePlugin} from 'hkclient-redux/types/plugins';
import {PostEmbed} from 'hkclient-redux/types/posts';
import {IDMappedObjects} from 'hkclient-redux/types/utilities';

import PluginsConstants from '../constants/plugins';

export interface PluginsAwareState {
    [PluginsConstants.PLUGINS_MODULE_NAME]: PluginsState;
}

export type PluginsState = Readonly<{
    plugins: IDMappedObjects<ClientPluginManifest>;

    components: {
        [componentName: string]: PluginComponent[];
    };

    postTypes: {
        [postType: string]: PostPluginComponent;
    };
    postCardTypes: {
        [postType: string]: PostPluginComponent;
    };

    adminConsoleReducers: {
        [pluginId: string]: any;
    };
    adminConsoleCustomComponents: {
        [pluginId: string]: AdminConsolePluginComponent;
    };
}>

export type PluginComponent = {
    id: string;
    pluginId: string;
    component?: React.Component;
    subMenu?: any[]; // TODO Add more concrete type
    text?: string;
    dropdownText?: string;
    tooltipText?: string;
    icon?: React.ReactElement;
    filter?: (id: string) => boolean;
    action?: (...args: any) => void; // TODO Add more concrete types?
}

export type PostPluginComponent = {
    id: string;
    pluginId: string;
    type: string;
    component: React.Component;
}

export type AdminConsolePluginComponent = {
    pluginId: string;
    key: string;
    component: React.Component;
    options: {
        showTitle: boolean;
    };
}

export type PostWillRenderEmbedPluginComponent = {
    id: string;
    pluginId: string;
    component: React.ComponentType<{ embed: PostEmbed }>;
    match: (arg: PostEmbed) => boolean;
    toggleable: boolean;
}
