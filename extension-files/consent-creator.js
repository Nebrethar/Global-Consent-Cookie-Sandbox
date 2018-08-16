"use strict";

/**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
async function initiateCookie() {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});

    // this seems to work pretty well for every website
    let domain = tabs[0].url.split("/")[2];
    await browser.cookies.set({
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

    browser.webNavigation.onCommitted.removeListener(initiateCookie);
}

function main() {
    console.log("Begin consent-creator.js");
    // Listeners for actions that would provoke a dialog
    browser.tabs.onActivated.addListener(initiateCookie);
    browser.webNavigation.onCommitted.addListener(initiateCookie);
    browser.webNavigation.onDOMContentLoaded.addListener(initiateCookie);
}

main();
