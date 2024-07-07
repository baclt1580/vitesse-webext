type Environment = 'background' | 'popup' | 'content_script' | 'unknown';

export function getCurrentEnvironment(): Environment {
    // Check if running in a background script
    if (chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() === window) {
        return 'background';
    }

    // Check if running in a popup or options page
    if (window.location.href.startsWith(chrome.runtime.getURL(''))) {
        return 'popup';
    }

    // Check if running in a content script
    if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined' && document instanceof HTMLDocument) {
        return 'content_script';
    }

    // Default case
    return 'unknown';
}