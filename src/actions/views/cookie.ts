export function clearUserCookie() {
    // We need to clear the cookie without the domain, with the domain, and with both the domain and path set because we
    // can't tell if the server set the cookie with or without the domain.
    // The server will have set the domain if ServiceSettings.EnableCookiesForSubdomains is true
    // The server will have set a non-default path if Mattermost is also served from a subpath.
    if (document && window) {
        const windowAny = window as any;
        document.cookie = 'HKUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        document.cookie = `HKUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${windowAny.basename}`;
        document.cookie = `HKUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=/`;
        document.cookie = `HKUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=${windowAny.basename}`;
        document.cookie = 'HKCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        document.cookie = `HKCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${windowAny.basename}`;
        document.cookie = `HKCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=/`;
        document.cookie = `HKCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=${windowAny.basename}`;
    }
}
