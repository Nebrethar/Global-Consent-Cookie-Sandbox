"use strict";

/**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
function initiateCookie() {
    function success() {
        browser.webNavigation.onCommitted.removeListener(initiateCookie);
    }

    /**
     * Creates a new GVCC and adds it to the browser
     */
    function addGVCC(tabs) {
        // this seems to work pretty well for every website
        let domain = tabs[0].url.split("/")[2];
        let cookieset = browser.cookies.set({
            url: tabs[0].url,
            name: "euconsent",
            value: "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA",
            httpOnly: false,
            // temporary
            path: "/",
            firstPartyDomain: "",
            storeId: "firefox-default",
            domain: domain,
        });
        cookieset.then(success);
    }

    // Retrieves information of current tab.
    let getActive = browser.tabs.query({
        active: true,
        currentWindow: true,
    });

    getActive.then(addGVCC);
}

function main() {
    console.log("Begin consent-creator.js");
    // Listeners for actions that would provoke a dialog
    browser.tabs.onActivated.addListener(initiateCookie);
    browser.webNavigation.onCommitted.addListener(initiateCookie);
    browser.webNavigation.onDOMContentLoaded.addListener(initiateCookie);
}

main();
