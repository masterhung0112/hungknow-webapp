// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import keyMirror from 'utils/key_mirror';

export default keyMirror({
    GET_LOGS_REQUEST: null,
    GET_LOGS_SUCCESS: null,
    GET_LOGS_FAILURE: null,

    GET_AUDITS_REQUEST: null,
    GET_AUDITS_SUCCESS: null,
    GET_AUDITS_FAILURE: null,

    GET_CONFIG_REQUEST: null,
    GET_CONFIG_SUCCESS: null,
    GET_CONFIG_FAILURE: null,

    UPDATE_CONFIG_REQUEST: null,
    UPDATE_CONFIG_SUCCESS: null,
    UPDATE_CONFIG_FAILURE: null,

    PATCH_CONFIG_REQUEST: null,
    PATCH_CONFIG_SUCCESS: null,
    PATCH_CONFIG_FAILURE: null,
    RELOAD_CONFIG_REQUEST: null,
    RELOAD_CONFIG_SUCCESS: null,
    RELOAD_CONFIG_FAILURE: null,

    GET_ENVIRONMENT_CONFIG_REQUEST: null,
    GET_ENVIRONMENT_CONFIG_SUCCESS: null,
    GET_ENVIRONMENT_CONFIG_FAILURE: null,

    TEST_EMAIL_REQUEST: null,
    TEST_EMAIL_SUCCESS: null,
    TEST_EMAIL_FAILURE: null,

    TEST_SITE_URL_REQUEST: null,
    TEST_SITE_URL_SUCCESS: null,
    TEST_SITE_URL_FAILURE: null,

    TEST_S3_REQUEST: null,
    TEST_S3_SUCCESS: null,
    TEST_S3_FAILURE: null,

    INVALIDATE_CACHES_REQUEST: null,
    INVALIDATE_CACHES_SUCCESS: null,
    INVALIDATE_CACHES_FAILURE: null,

    RECYCLE_DATABASE_REQUEST: null,
    RECYCLE_DATABASE_SUCCESS: null,
    RECYCLE_DATABASE_FAILURE: null,

    CREATE_COMPLIANCE_REQUEST: null,
    CREATE_COMPLIANCE_SUCCESS: null,
    CREATE_COMPLIANCE_FAILURE: null,

    GET_COMPLIANCE_REQUEST: null,
    GET_COMPLIANCE_SUCCESS: null,
    GET_COMPLIANCE_FAILURE: null,

    UPLOAD_BRAND_IMAGE_REQUEST: null,
    UPLOAD_BRAND_IMAGE_SUCCESS: null,
    UPLOAD_BRAND_IMAGE_FAILURE: null,

    DELETE_BRAND_IMAGE_REQUEST: null,
    DELETE_BRAND_IMAGE_SUCCESS: null,
    DELETE_BRAND_IMAGE_FAILURE: null,

    GET_CLUSTER_STATUS_REQUEST: null,
    GET_CLUSTER_STATUS_SUCCESS: null,
    GET_CLUSTER_STATUS_FAILURE: null,

    TEST_LDAP_REQUEST: null,
    TEST_LDAP_SUCCESS: null,
    TEST_LDAP_FAILURE: null,

    SYNC_LDAP_REQUEST: null,
    SYNC_LDAP_SUCCESS: null,
    SYNC_LDAP_FAILURE: null,

    GET_LDAP_GROUPS_REQUEST: null,
    GET_LDAP_GROUPS_SUCCESS: null,
    GET_LDAP_GROUPS_FAILURE: null,

    LINK_LDAP_GROUP_REQUEST: null,
    LINK_LDAP_GROUP_SUCCESS: null,
    LINK_LDAP_GROUP_FAILURE: null,

    UNLINK_LDAP_GROUP_REQUEST: null,
    UNLINK_LDAP_GROUP_SUCCESS: null,
    UNLINK_LDAP_GROUP_FAILURE: null,

    SAML_CERT_STATUS_REQUEST: null,
    SAML_CERT_STATUS_SUCCESS: null,
    SAML_CERT_STATUS_FAILURE: null,

    UPLOAD_SAML_PUBLIC_REQUEST: null,
    UPLOAD_SAML_PUBLIC_SUCCESS: null,
    UPLOAD_SAML_PUBLIC_FAILURE: null,

    UPLOAD_SAML_PRIVATE_REQUEST: null,
    UPLOAD_SAML_PRIVATE_SUCCESS: null,
    UPLOAD_SAML_PRIVATE_FAILURE: null,

    UPLOAD_SAML_IDP_REQUEST: null,
    UPLOAD_SAML_IDP_SUCCESS: null,
    UPLOAD_SAML_IDP_FAILURE: null,

    DELETE_SAML_PUBLIC_REQUEST: null,
    DELETE_SAML_PUBLIC_SUCCESS: null,
    DELETE_SAML_PUBLIC_FAILURE: null,

    DELETE_SAML_PRIVATE_REQUEST: null,
    DELETE_SAML_PRIVATE_SUCCESS: null,
    DELETE_SAML_PRIVATE_FAILURE: null,

    DELETE_SAML_IDP_REQUEST: null,
    DELETE_SAML_IDP_SUCCESS: null,
    DELETE_SAML_IDP_FAILURE: null,

    UPLOAD_LICENSE_REQUEST: null,
    UPLOAD_LICENSE_SUCCESS: null,
    UPLOAD_LICENSE_FAILURE: null,

    REMOVE_LICENSE_REQUEST: null,
    REMOVE_LICENSE_SUCCESS: null,
    REMOVE_LICENSE_FAILURE: null,
    PREV_TRIAL_LICENSE_SUCCESS: null,

    GET_ANALYTICS_REQUEST: null,
    GET_ANALYTICS_SUCCESS: null,
    GET_ANALYTICS_FAILURE: null,

    TEST_ELASTICSEARCH_REQUEST: null,
    TEST_ELASTICSEARCH_SUCCESS: null,
    TEST_ELASTICSEARCH_FAILURE: null,

    PURGE_ELASTICSEARCH_INDEXES_REQUEST: null,
    PURGE_ELASTICSEARCH_INDEXES_SUCCESS: null,
    PURGE_ELASTICSEARCH_INDEXES_FAILURE: null,

    UPLOAD_PLUGIN_REQUEST: null,
    UPLOAD_PLUGIN_SUCCESS: null,
    UPLOAD_PLUGIN_FAILURE: null,

    INSTALL_PLUGIN_FROM_URL_REQUEST: null,
    INSTALL_PLUGIN_FROM_URL_SUCCESS: null,
    INSTALL_PLUGIN_FROM_URL_FAILURE: null,

    GET_PLUGIN_REQUEST: null,
    GET_PLUGIN_SUCCESS: null,
    GET_PLUGIN_FAILURE: null,

    GET_PLUGIN_STATUSES_REQUEST: null,
    GET_PLUGIN_STATUSES_SUCCESS: null,
    GET_PLUGIN_STATUSES_FAILURE: null,

    REMOVE_PLUGIN_REQUEST: null,
    REMOVE_PLUGIN_SUCCESS: null,
    REMOVE_PLUGIN_FAILURE: null,

    ENABLE_PLUGIN_REQUEST: null,
    ENABLE_PLUGIN_SUCCESS: null,
    ENABLE_PLUGIN_FAILURE: null,

    DISABLE_PLUGIN_REQUEST: null,
    DISABLE_PLUGIN_SUCCESS: null,
    DISABLE_PLUGIN_FAILURE: null,

    RECEIVED_LOGS: null,
    RECEIVED_AUDITS: null,
    RECEIVED_CONFIG: null,
    RECEIVED_ENVIRONMENT_CONFIG: null,
    RECEIVED_COMPLIANCE_REPORT: null,
    RECEIVED_COMPLIANCE_REPORTS: null,
    RECEIVED_CLUSTER_STATUS: null,
    RECEIVED_SAML_CERT_STATUS: null,
    RECEIVED_SYSTEM_ANALYTICS: null,
    RECEIVED_TEAM_ANALYTICS: null,
    RECEIVED_USER_ACCESS_TOKEN: null,
    RECEIVED_USER_ACCESS_TOKENS: null,
    RECEIVED_USER_ACCESS_TOKENS_FOR_USER: null,
    RECEIVED_PLUGINS: null,
    RECEIVED_PLUGIN_STATUSES: null,
    RECEIVED_LDAP_GROUPS: null,
    LINKED_LDAP_GROUP: null,
    UNLINKED_LDAP_GROUP: null,
    REMOVED_PLUGIN: null,
    ENABLED_PLUGIN: null,
    DISABLED_PLUGIN: null,

    RECEIVED_SAML_METADATA_RESPONSE: null,
    SET_SAML_IDP_SUCCESS: null,

    UPLOAD_LDAP_PUBLIC_SUCCESS: null,
    UPLOAD_LDAP_PRIVATE_SUCCESS: null,
    DELETE_LDAP_PUBLIC_SUCCESS: null,
    DELETE_LDAP_PRIVATE_SUCCESS: null,

    RECEIVED_DATA_RETENTION_CUSTOM_POLICIES: null,
    RECEIVED_DATA_RETENTION_CUSTOM_POLICY: null,
    DELETE_DATA_RETENTION_CUSTOM_POLICY_SUCCESS: null,
    DELETE_DATA_RETENTION_CUSTOM_POLICY_FAILURE: null,
    RECEIVED_DATA_RETENTION_CUSTOM_POLICY_TEAMS: null,
    RECEIVED_DATA_RETENTION_CUSTOM_POLICY_CHANNELS: null,
    RECEIVED_DATA_RETENTION_CUSTOM_POLICY_TEAMS_SEARCH: null,
    RECEIVED_DATA_RETENTION_CUSTOM_POLICY_CHANNELS_SEARCH: null,
    CREATE_DATA_RETENTION_CUSTOM_POLICY_SUCCESS: null,
    UPDATE_DATA_RETENTION_CUSTOM_POLICY_SUCCESS: null,
    ADD_DATA_RETENTION_CUSTOM_POLICY_TEAMS_SUCCESS: null,
    ADD_DATA_RETENTION_CUSTOM_POLICY_CHANNELS_SUCCESS: null,
    REMOVE_DATA_RETENTION_CUSTOM_POLICY_TEAMS_SUCCESS: null,
    REMOVE_DATA_RETENTION_CUSTOM_POLICY_TEAMS_FAILURE: null,
    REMOVE_DATA_RETENTION_CUSTOM_POLICY_CHANNELS_SUCCESS: null,
    REMOVE_DATA_RETENTION_CUSTOM_POLICY_CHANNELS_FAILURE: null,
});
