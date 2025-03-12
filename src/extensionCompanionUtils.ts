export const sendToExtension = (data: any) => {
    console.log("SENDING TO EXTENSION: ", data);
    if (IS_NEW_EXTENSION()) {
        window.postMessage(data, '*');
        return;
    }
    
    let browserType = getBrowser();
    try {
        switch (browserType) {
            case 'Firefox':
                window.postMessage({ type: "FROM_PAGE_TO_CONTENT_SCRIPT", ...data }, "*");
                break;
            case 'Safari':
            case 'IOS':
                // @ts-expect-error TS(2304): Cannot find name 'browser'.
                browser.runtime.sendMessage("com.getreadefine.readefine.Extension (QK39SRR4H5)", data);
                break;
            case 'Chrome':
            case 'Edge':
                let ext_id = browserType === 'Edge' ? 'cglfmmemieddkpolaaeckmbnaddjbbfe' : 'odfcpcabgcopkkpicbnebpefigppfglm';
                chrome.runtime.sendMessage(ext_id, data, function (response: any) { console.log(response); });
                break;
            default:
                console.log("Unsupported browser.");
        }
    }
    catch (e: any) {
        console.log("error while sending message to extension via externally_connectable: ", e);
    }
}

export const getBrowser = () => {
    // @ts-expect-error TS(2304): Cannot find name 'InstallTrigger'.
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // @ts-expect-error TS(2345): Argument of type '{ new (): HTMLElement; prototype... Remove this comment to see the full error message
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    var isIOS = iOS() && !navigator.userAgent.includes("CriOS");
    var isChrome = !!(window as any).chrome && (!isIOS);
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") !== -1);
    function iOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }
    let browserType = isFirefox ? 'Firefox' : isSafari || isIOS ? 'Safari' : isEdgeChromium ? 'Edge' : 'Chrome';

    return browserType;
}

export const IS_NEW_EXTENSION = () => {
    // check for div with #readefineextension and data-readefine-extension-version attribute
    const extensionDiv = document.getElementById('readefineextension');
    if (extensionDiv && extensionDiv.getAttribute('data-readefine-extension-version')) {
        return true;
    }

    // @ts-ignore -- this needs to be a function that evaluates when called
    return (window.READEFINE_VERSION) ? true : false;
}