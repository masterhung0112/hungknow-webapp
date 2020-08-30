const userAgent = () => window.navigator.userAgent;

export function isChrome(): boolean {
    return userAgent().indexOf('Chrome') > -1 && userAgent().indexOf('Edge') === -1;
}

export function isSafari(): boolean {
    return userAgent().indexOf('Safari') !== -1 && userAgent().indexOf('Chrome') === -1;
}

export function isIosSafari(): boolean {
    return (userAgent().indexOf('iPhone') !== -1 || userAgent().indexOf('iPad') !== -1) && userAgent().indexOf('Safari') !== -1 && userAgent().indexOf('CriOS') === -1;
}

export function isIosChrome(): boolean {
    return userAgent().indexOf('CriOS') !== -1;
}

export function isIosWeb(): boolean {
    return isIosSafari() || isIosChrome();
}

export function isIos(): boolean {
    return userAgent().indexOf('iPhone') !== -1 || userAgent().indexOf('iPad') !== -1;
}

export function isAndroid(): boolean {
    return userAgent().indexOf('Android') !== -1;
}

export function isAndroidChrome(): boolean {
    return userAgent().indexOf('Android') !== -1 && userAgent().indexOf('Chrome') !== -1 && userAgent().indexOf('Version') === -1;
}

export function isAndroidFirefox(): boolean {
    return userAgent().indexOf('Android') !== -1 && userAgent().indexOf('Firefox') !== -1;
}

export function isAndroidWeb(): boolean {
    return isAndroidChrome() || isAndroidFirefox();
}

export function isIosClassic(): boolean {
    return isMobileApp() && isIos();
}

// Returns true if and only if the user is using a Mattermost mobile app. This will return false if the user is using the
// web browser on a mobile device.
export function isMobileApp(): boolean {
    return isMobile() && !isIosWeb() && !isAndroidWeb();
}

// Returns true if and only if the user is using Mattermost from either the mobile app or the web browser on a mobile device.
export function isMobile(): boolean {
    return isIos() || isAndroid();
}

export function isFirefox(): boolean {
    return userAgent().indexOf('Firefox') !== -1;
}

export function isInternetExplorer(): boolean {
    return userAgent().indexOf('Trident') !== -1;
}

export function isEdge(): boolean {
    return userAgent().indexOf('Edge') !== -1;
}

export function isDesktopApp(): boolean {
    return userAgent().indexOf('Mattermost') !== -1 && userAgent().indexOf('Electron') !== -1;
}

export function isWindowsApp(): boolean {
    return isDesktopApp() && isWindows();
}

export function isMacApp(): boolean {
    return isDesktopApp() && isMac();
}

export function isWindows(): boolean {
    return userAgent().indexOf('Windows') !== -1;
}

export function isMac(): boolean {
    return userAgent().indexOf('Macintosh') !== -1;
}

export function isWindows7(): boolean {
    const appVersion = navigator.appVersion;

    if (!appVersion) {
        return false;
    }

    return (/\bWindows NT 6\.1\b/).test(appVersion);
}
